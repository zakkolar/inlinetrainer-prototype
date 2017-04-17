import {Action} from '../../../action';

import {CATEGORIES} from '../../../categories';

import {Step} from '../../../step';
import {ShowHint} from '../../../helpers/show-hint';

import {CheckAndWatchRouteLoad, UnwatchRouteLoad} from '../../../helpers/check-and-watch-route-load';
import {CheckAndWatchRouteUnload, UnwatchRouteUnload} from '../../../helpers/check-and-watch-route-unload';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {WatchForElement} from '../../../helpers/watch-for-element';


var steps={};
	steps['course_page']=new Step({
			text:"Navigate to course page",
			help:function(){
				ShowHint('#course_link');
			},
			watchComplete:function(callback){
				CheckAndWatchRouteLoad('/course',this.id(),callback);
			},
			watchUncomplete:function(callback){
				CheckAndWatchRouteUnload('/course',this.id(),callback);
			},
			unwatchComplete:function(){
				UnwatchRouteLoad(this.id());
			},
			unwatchUncomplete:function(){
				UnwatchRouteUnload(this.id());
			}
		});
	steps['editing_on']=new Step({
		text:"Click \"Turn editing on\"",
		help:function(){
			ShowHint('#editing_button');
		},
		watchComplete:function(callback){
			let $ = require('jquery');
			if($('#editing_button').html()=="Turn editing off"){
				callback();
			}
			else{
				WatchForEvent('click','#editing_button',this.id(),callback);
			}
		},
		unwatchComplete:function(){
			UnwatchForEvent('click','#editing_button',this.id());
		}
	});
	steps['add_block']=new Step({
		text:"Scroll to the \"Add a Block\" block on the left side of the screen and select \"Calendar\" from the dropdown menu",
		help:function(){
			ShowHint('#add_block');
		},
		watchComplete:function(callback){
			WatchForElement('#calendar',callback);
		},
		prerequisites:[steps['editing_on']],
	});





export const SetUpCalendarAction:Action = new Action({
	name: "Set Up Calendar",
	categories: [CATEGORIES['calendar']],
	steps:[steps['course_page'], steps['editing_on'], steps['add_block']],
	});