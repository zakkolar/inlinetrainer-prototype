import {Action} from '../../../action';

import {CATEGORIES} from '../../../categories';

import {Step} from '../../../step';
import {ShowHint} from '../../../helpers/show-hint';
import {OnRouteLoad, OffRouteLoad} from '../../../helpers/on-route-load';
import {OnRouteUnload, OffRouteUnload} from '../../../helpers/on-route-unload';
import {RouteLoaded} from '../../../helpers/route-loaded';
import {CheckAndWatchRouteLoad, UnwatchRouteLoad} from '../../../helpers/check-and-watch-route-load';
import {CheckAndWatchRouteUnload, UnwatchRouteUnload} from '../../../helpers/check-and-watch-route-unload';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {MarkElement,UnmarkElement,CheckElementForMark} from '../../../helpers/mark-element';

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
      }
		});
	steps['syllabus_page']=new Step({
			text:"Click \"Upload Course Syllabus\"",
			help:function(){
				ShowHint('#syllabus_link');
			},
			watchComplete:function(callback){
				OnRouteLoad('/syllabus',this.id(),callback);
			},
			watchUncomplete:function(callback){
				OnRouteUnload('/syllabus',this.id(),callback);
			},
			unwatchComplete:function(){
				OffRouteLoad(this.id());
			},
			unwatchUncomplete:function(){
				OffRouteUnload(this.id());
			},
      checkComplete:function(){
        return RouteLoaded('/syllabus');
      }

		});
	steps['browse']=new Step({
			text:"Browse for your syllabus (PDF or Word document)",
			help:function(){
				ShowHint('#syllabus_form');
			},
			prerequisites:[steps['syllabus_page']],
			watchComplete:function(callback){
				WatchForEvent('change','#syllabus',this.id(),callback);
			},
			unwatchComplete:function(){
				UnwatchForEvent('change','#syllabus',this.id());
			},
      checkComplete:function(){
        let $ = require('jquery');
        return ($('#syllabus').length>0 && $('#syllabus').val()!='');
      }
		});

  let uploadClicked=false;

	steps['upload']=new Step({
			text:"Click \"Upload\"",
			help:function(){
				ShowHint('#syllabus_upload');
			},
			prerequisites:[steps['browse']],
			watchComplete:function(callback){
				WatchForEvent('mousedown','#syllabus_upload',this.id(),function(){
          uploadClicked=true;
          callback();
        });

			},
			unwatchComplete:function(){
				UnwatchForEvent('mousedown','#syllabus_upload',this.id());
			},
      checkComplete:function(){
        return uploadClicked;
      }
		});
	steps['public']=new Step({
			text:"Click \"Make Course Syllabus Public\" to show your syllabus in the public syllabus directory",
			help:function(){
				ShowHint('#course_syllabus_public');
			},
			optional:true,
			prerequisites:[steps['upload']],
			watchComplete:function(callback){
				WatchForEvent('click','#course_syllabus_public',this.id(),callback);
			},
			unwatchComplete:function(){
				UnwatchForEvent('click','#course_syllabus_public',this.id());
			},
      checkComplete:function(){
        let $=require('jquery');
        return $('#course_syllabus_public').text()==='Make Course Syllabus Private';
      }
		});


	steps['course_page'].addPostrequisite(steps['syllabus_page']);

  steps['syllabus_page'].addPostrequisite(steps['upload']);

  steps['browse'].addPostrequisite(steps['upload']);







export const UploadCourseSyllabusAction:Action = new Action({
	name: "Upload course syllabus",
	categories: [CATEGORIES['course_settings']],
	steps:[steps['course_page'], steps['syllabus_page'], steps['browse'], steps['upload'], steps['public']],
	help: "https://kb.brandeis.edu/display/LTS/Upload+Your+Syllabus"
	});
