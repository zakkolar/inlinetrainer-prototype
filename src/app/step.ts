import {GUID} from './helpers/guid';
export class Step{
	text: string;
	private _complete: boolean;
	private _watchCompleteFunction:Function;
	private _watchUncompleteFunction:Function;
	help:Function;
	optional: boolean;
	private _prerequisites: Step[];
	private _subscriptions: Map<string,Function>;

	constructor(params){
		this.text = params.text || null;
		this._complete = false;
		this._watchCompleteFunction = params.watchComplete || function(){};
		this._watchUncompleteFunction = params.watchUncomplete || function(){};
		this.help = params.help || null;
		this.optional = params.optional || false;
		this._prerequisites = params.prerequisites || new Array<Step>();
		this._subscriptions=new Map<string,Function>();
	}

	watchPrerequisites(callback){
		let step = this;
		for(let prerequisite of this._prerequisites){
			prerequisite.subscribe(function(){
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

	watchComplete(){
		let step = this;
		

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
		this._watchUncompleteFunction(function(){
			step.complete=false;
		});
	}

	get complete(): boolean{
		return this._complete;
	}

	set complete(complete: boolean){
		this._complete = complete;
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