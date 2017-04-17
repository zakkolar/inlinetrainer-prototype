import { Component, Input, AfterViewInit } from '@angular/core';

import {CATEGORIES} from './categories';

import {ACTIONS} from './actions';

import {Action} from './action';

import {SETTINGS} from './settings';

import {HELPERS} from './helpers';

import {RecentActionsService} from './recent-actions.service';

import {SyncAction, RetrieveAction} from './helpers/sync-action';



var subcategories={};

var panels={};

var showSearch=false;


for(var category in CATEGORIES){
	if(CATEGORIES[category].parent!=null){
		CATEGORIES[category].open=false;
	}
}



@Component({
  selector: 'inline-trainer',
  templateUrl: './inline-trainer.component.html',
})





export class InlineTrainerComponent implements AfterViewInit  {
	categories=CATEGORIES;
	actions:Action[]=ACTIONS;

	settings=SETTINGS;

	subcategories=subcategories;

	recent_actions = new RecentActionsService();

	ngAfterViewInit(){
		for(let action of this.actions){
      action.importStepCompletion(RetrieveAction(action));
			action.initSteps();
      SyncAction(action,120);
		}



	}



	stringify=HELPERS.stringify;
	search="";

  	@Input() globals;

}

