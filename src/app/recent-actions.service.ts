import {Action} from './action';

export class RecentActionsService{

	actions: Action[]=[];

	max_recent: number = 5;

	public add(action){
		var index = this.actions.indexOf(action);
		if(index>-1){
			this.actions.splice(index,1);
		}
		this.actions.push(action);
		if(this.actions.length>this.max_recent){
			this.actions.shift();
		}
	}
};