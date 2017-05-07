import { Component, Input, OnInit } from '@angular/core';

import {CATEGORIES} from './categories';

import {ACTIONS} from './actions';

import {SETTINGS} from './settings';

import {HELPERS} from './helpers';

import {RecentActionsService} from './recent-actions.service';

import {Router, NavigationEnd} from '@angular/router';

import {COURSE_UTILITIES} from './course-utilities';

const routeLabels = {
  syllabus: 'Syllabus',
  calendar: 'Calendar',
  new_event: 'Calendar'
};

const globals = {
  editing: false,
  blocks: {
    calendar: true
  }
};


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
}) export class AppComponent  {

  router;

  course_utilties = COURSE_UTILITIES;

  syllabus_public=false;

  globals=globals;


  constructor(private _router: Router ) {
    this.router = _router;

  }

  routeName(route){
    return routeLabels[route.substr(1)];
  }

  addBlock(event){
    var block = event.target.value;
    this.globals.blocks[block]=true;
  }

  ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}

