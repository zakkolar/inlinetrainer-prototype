import { Component, Input, AfterViewInit } from '@angular/core';

import {CATEGORIES} from './categories';

import {ACTIONS} from './actions';

import {SETTINGS} from './settings';



@Component({
  selector: 'inline-trainer',
  templateUrl: './app.component.html',
})



export class AppComponent implements AfterViewInit  {
	categories=CATEGORIES;
	actions=ACTIONS;

	settings=SETTINGS;

	subcategories={};

	@Input()
  	search: string="";

  

}

