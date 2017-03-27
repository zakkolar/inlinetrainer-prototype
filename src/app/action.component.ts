import { Component, Input } from '@angular/core';
import {Action} from './action';
import {HELPERS} from './helpers';

import {RecentActionsService} from './recent-actions.service';





@Component({
  selector: 'action-button',
  templateUrl: './action.component.html',
})



export class ActionComponent  {
	stringify= HELPERS.stringify;

	click_handler=function($event){
		$event.preventDefault();
		this.recent_actions.add(this.action);
		this.action.shown=!this.action.shown;
	};

	run_help=function($event,step){
		$event.preventDefault();
		if(step.help!=null){
			step.help();
		}
	}

	@Input() action: Action;

  	@Input() recent_actions: RecentActionsService;

  

}

