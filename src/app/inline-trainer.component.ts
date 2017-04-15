import { Component, Input, AfterViewInit } from '@angular/core';

import {CATEGORIES} from './categories';

import {ACTIONS} from './actions';

import {Action} from './action';

import {SETTINGS} from './settings';

import {HELPERS} from './helpers';

import {RecentActionsService} from './recent-actions.service';



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
			action.initSteps();
		}
	}

	

	stringify=HELPERS.stringify;
	search="";

  	@Input() globals;

}

