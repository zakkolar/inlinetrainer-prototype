import {GUID} from './helpers/guid';
export class Step{
	text: string;
	private _complete: boolean;
	private _watchCompleteFunction:Function;
	private _watchUncompleteFunction:Function;
	private _unwatchCompleteFunction:Function;
	private _unwatchUncompleteFunction:Function;
  private _checkCompleteFunction:Function;
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
    this._checkCompleteFunction=params.checkComplete || function(){return true;}
	}

  id(){
    return this._id;
  }

  addPostrequisite(step:Step){
    this._postrequisites.push(step);
  }

  postrequisitesComplete(){
    let step = this;
    for(let postrequisite of step._postrequisites){
      if(postrequisite.complete){
        return true;
      }
    }
    return false;
  }

  prerequisitesComplete(){
    let step = this;
    for(let prerequisite of step._prerequisites){
      if(!prerequisite.complete){
        return false;
      }
    }
    return true;
  }

  checkComplete(){
    let step = this;
    if(!step.prerequisitesComplete()){
      step.complete = false;
    }
    else if(step._checkCompleteFunction() || step.postrequisitesComplete()){
      step.complete=true;
    }
  }

  watchPostrequisites(){
    let step = this;
    for(let postrequisite of step._postrequisites){
      postrequisite.subscribe(function(){
        step.checkComplete();
      });
    }
  }

  watchPrerequisites(){
    let step = this;
    for(let prerequisite of step._prerequisites){
      prerequisite.subscribe(function(){
        step.checkComplete();
      });
    }
  }

  watchComplete(){
    let step = this;
    step._watchCompleteFunction(function(){
       step.checkComplete();
    });

  }

  watchUncomplete(){
    let step = this;
    step._watchUncompleteFunction(function(){
      if(!step.postrequisitesComplete()){
        step.complete = false;
      }
    })
  }

  initWatch(){
    let step = this;
    step.watchPostrequisites();
    step.watchPrerequisites();
    step.checkComplete();
    step.watchComplete();
  }

  get complete(){
    return this._complete;
  }

	set complete(complete: boolean){
    let old = this._complete;
		this._complete = complete;
    if(old!=complete){
      if(complete){
      this._unwatchCompleteFunction();
      this.watchUncomplete();
      }
      else{
        this._unwatchUncompleteFunction();
      }

      this._subscriptions.forEach((subscription: Function, key: string)=>{
        subscription();
      });
    }
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
