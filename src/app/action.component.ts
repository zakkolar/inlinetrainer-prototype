import { Component, Input } from '@angular/core';
import {Action} from './action';
import {HELPERS} from './helpers';

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

	// constructor(router:Router) {
	//   router.events.subscribe(event => {
	//     if(event instanceof NavigationEnd) {
	//     	this.set_current_step();
	//     }
	//     // NavigationEnd
	//     // NavigationCancel
	//     // NavigationError
	//     // RoutesRecognized
	//   });
	// }

	click_handler=function($event){
		$event.preventDefault();
		this.recent_actions.add(this.action);
		this.action.shown=!this.action.shown;
		// this.set_current_step();

	};

	// set_current_step=function(){
	// 	let actionComponent = this;
	// 	for(var i=this.action.steps.length-1; i>=0; i--){
	// 		var step = this.action.steps[i];

	// 		// if(!step.checkComplete()){
	// 			this.action.currentStep=step;
	// 			this.currentStepIndex = i;
			
	// 		if(this.currentStepIndex>0 && this.action.steps[this.currentStepIndex-1].checkComplete()){
	// 			this.completeFirstN(i);
	// 			break;
	// 		}

	// 	}
	// 	this.currentStepSubscription=this.action.currentStep.subscribe(function(){
	// 		actionComponent.advanceStep();
	// 	});
	// 	this.action.currentStep.watchComplete();
		
	// }

	// completeFirstN=function(n){
	// 	for(var i=0; i<n; i++){
	// 		this.action.steps[i].complete=true;
	// 	}
	// }

	// advanceStep=function(){
	// 	let actionComponent = this;
	// 	this.action.currentStep.unsubscribe(this.currentStepSubscription);
	// 	if(this.currentStepIndex<this.action.steps.length-1){
	// 		this.currentStepIndex++;
	// 		this.action.currentStep=this.action.steps[this.currentStepIndex];
	// 		this.currentStepSubscription=this.action.currentStep.subscribe(function(){
	// 			actionComponent.advanceStep();
	// 		});
	// 		this.action.currentStep.watchComplete();
	// 	}
	// }



	run_help=function($event,step){
		$event.preventDefault();
		if(step.help!=null){
			step.help();
		}
	}




	@Input() action: Action;

  	@Input() recent_actions: RecentActionsService;

  

}

