import { Component, Input } from '@angular/core';
import {Action} from './trainer/action';
import {HELPERS} from './trainer/helpers';

import {Router, NavigationEnd, Event} from '@angular/router';

import {RecentActionsService} from './recent-actions.service';





@Component({
  selector: 'action-button',
  templateUrl: './action.component.html',
})



export class ActionComponent {
	stringify= HELPERS.stringify;

	currentStepIndex = 0;
	currentStepSubscription:string;


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

