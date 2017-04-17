import {GUID} from './helpers/guid';
export class Step{
	text: string;
	private _complete: boolean;
	private _watchCompleteFunction:Function;
	private _watchUncompleteFunction:Function;
	private _unwatchCompleteFunction:Function;
	private _unwatchUncompleteFunction:Function;
	help:Function;
	optional: boolean;
	private _prerequisites: Step[];
	private _postrequisites: Step[];
	private _subscriptions: Map<string,Function>;
	private _id: string;
  private _postrequisiteSubscriptions: Map<string,Step>;
  private _prerequisiteSubscriptions: Map<string,Step>;

	constructor(params){
		this.text = params.text || null;
		this._complete = false;
		this._watchCompleteFunction = params.watchComplete || function(callback){};
		this._watchUncompleteFunction = params.watchUncomplete || function(callback){};
		this._unwatchCompleteFunction = params.unwatchComplete || function(){};
		this._unwatchUncompleteFunction = params.unwatchUncomplete || function(){};
		this.help = params.help || null;
		this.optional = params.optional || false;
		this._prerequisites = params.prerequisites || new Array<Step>();
		this._postrequisites = params.postrequisites || new Array<Step>();
		this._subscriptions=new Map<string,Function>();
		this._id = GUID();
    this._postrequisiteSubscriptions=new Map<string,Step>();
    this._prerequisiteSubscriptions=new Map<string,Step>();
	}

  static UnsubscribeMap(map:Map<string,Step>){
    map.forEach(function(step:Step, subscription:string){
      step.unsubscribe(subscription);
      map.delete(subscription);
    });
  }

  unsubscribePostrequisites(){
    Step.UnsubscribeMap(this._postrequisiteSubscriptions);
  }

  unsubscribePrerequisites(){
    Step.UnsubscribeMap(this._prerequisiteSubscriptions);
  }

	id(){
		return this._id;
	}

	addPostrequisite(step:Step){
		this._postrequisites.push(step);
	}

	watchPrerequisites(callback){
		let step = this;
		for(let prerequisite of this._prerequisites){
			prerequisite.subscribe(function(){
				callback();
			});
		}
	}

	watchPostrequisites(callback){
		let step = this;
		for(let postrequisite of this._postrequisites){
			postrequisite.subscribe(function(){
				callback();
			});
		}
	}

	prerequisitesComplete(){
		for(let prerequisite of this._prerequisites){
			if(!prerequisite.complete){
				return false;
			}
		}
		return true;
	}

	postrequisitesComplete(){
		for(let postrequisite of this._postrequisites){
			if(postrequisite.complete){
				return true;
			}
		}
		return false;
	}


  syncWithPostrequisites(){
    if(this.postrequisitesComplete()){
      this.complete=true;
      this.unsubscribePostrequisites();
    }
  }

  syncWithPrerequisites(){
    if(!this.prerequisitesComplete()){
      this.complete=false;
      this.unsubscribePrerequisites();
    }
  }

  subscribeToPostrequisites(callback){
    let step = this;
    for(let postrequisite of step._postrequisites){
      step._postrequisiteSubscriptions.set(postrequisite.subscribe(function(){
        callback();
      }),step);
    }
    //run this once in case the postrequisites got completed before we started listening
    callback();
  }

  subscribeToPrerequisites(callback){
    let step = this;
    for(let prerequisite of step._prerequisites){
      step._prerequisiteSubscriptions.set(prerequisite.subscribe(function(){
        callback();
      }),step);
    }
    //run this once in case the postrequisites got completed before we started listening
    callback();
  }

	watchComplete(){
		let step = this;

    //automatically mark the step as complete if any of its postrequisites are complete
    step.subscribeToPostrequisites(function(){
      step.syncWithPostrequisites();
    });

		let afterPrerequisites = function(){
			if(step.prerequisitesComplete()){
				step._watchCompleteFunction(function(){
					step.complete=true;
				});
			}
		};

		if(step._prerequisites.length>0){
			step.watchPrerequisites(function(){
				afterPrerequisites();
			});
		}
		else{
			afterPrerequisites();
		}
	}



  watchUncomplete(){
    let step = this;


    //automatically mark the step as incomplete if any of its prerequisites are not complete
    step.subscribeToPrerequisites(function(){
      step.syncWithPrerequisites();
    });

    this._watchUncompleteFunction(function(){
      if(!step.postrequisitesComplete()){
        step.complete=false;
      }
    });

  }

	get complete(): boolean{
		return this._complete;
	}

	set complete(complete: boolean){
		this._complete = complete;
    if(complete){
      console.log('complete',this);
      this._unwatchCompleteFunction();
      this.watchUncomplete();
    }
    else{
      console.log('uncomplete:',this);
      this._unwatchUncompleteFunction();
      this.watchComplete();
    }
		this._subscriptions.forEach((subscription: Function, key: string)=>{
			subscription();
		});
	}

	subscribe(subscription:Function): string{
		let key:string;
		do{
			key = GUID();
		}
		while(this._subscriptions.has(key));

		this._subscriptions.set(key,subscription);
		return key;
	}

	unsubscribe(key){
		this._subscriptions.delete(key);
	}
}
