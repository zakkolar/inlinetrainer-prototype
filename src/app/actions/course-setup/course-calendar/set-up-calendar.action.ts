import {Action} from '../../../action';

import {CATEGORIES} from '../../../categories';

import {Step} from '../../../step';
import {ShowHint} from '../../../helpers/show-hint';

import {OnRouteLoad, OffRouteLoad} from '../../../helpers/on-route-load';
import {OnRouteUnload, OffRouteUnload} from '../../../helpers/on-route-unload';
import {RouteLoaded} from '../../../helpers/route-loaded';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {WatchForElement} from '../../../helpers/watch-for-element';


var steps={};
	steps['course_page']=new Step({
      text:"Navigate to course page",
      help:function(){
        ShowHint('#course_link');
      },
      watchComplete:function(callback){
        OnRouteLoad('/course',this.id(),callback);
      },
      watchUncomplete:function(callback){
        OnRouteUnload('/course',this.id(),callback);
      },
      unwatchComplete:function(){
        OffRouteLoad(this.id());
      },
      unwatchUncomplete:function(){
        OffRouteUnload(this.id());
      },
      checkComplete:function(){
        return RouteLoaded('/course');
      },
      identifier:'course_page'
    });
	steps['editing_on']=new Step({
		text:"Click \"Turn editing on\"",
		help:function(){
			ShowHint('#editing_button');
		},
    watchComplete:function(callback){
      WatchForEvent('click','#editing_button',this.id(),callback);
    },
    unwatchComplete:function(){
      UnwatchForEvent('click','#editing_button',this.id());
    },
		watchUncomplete:function(callback){
			WatchForEvent('click','#editing_button',this.id(), callback);
		},
		unwatchUncomplete:function(){
			UnwatchForEvent('click','#editing_button',this.id());
		},
    checkComplete:function(){
      let $ = require('jquery');
      return $('#editing_button').text()==='Turn editing off';
    },
    identifier:'editing_on'

	});
	steps['add_block']=new Step({
		text:"Scroll to the \"Add a Block\" block on the left side of the screen and select \"Calendar\" from the dropdown menu",
		help:function(){
			ShowHint('#add_block');
		},
		prerequisites:[steps['editing_on']],
    watchComplete:function(callback){
      WatchForEvent('change','#add_block_dropdown',this.id(),function(){
        let $ = require('jquery');
        if($('#add_block select').val()===''){
          callback();
        }
      });
    },
    unwatchComplete:function(){
      UnwatchForEvent('change','#add_block_dropdown',this.id());
    },
    checkComplete:function(){
      let $ = require('jquery');
      return $('#calendar').length>0;
    },
    skipPrerequisitesOnInit:true
	});

  steps['course_page'].addPostrequisite(steps['editing_on']);
  steps['editing_on'].addPostrequisite(steps['add_block']);





export const SetUpCalendarAction:Action = new Action({
	name: "Set Up Calendar",
	categories: [CATEGORIES['calendar']],
	steps:[steps['course_page'], steps['editing_on'], steps['add_block']],
  identifier:'set-up-calendar'
	});
