import {Action} from '../../../action';

import {CATEGORIES} from '../../../categories';

import {Step} from '../../../step';
import {ShowHint} from '../../../helpers/show-hint';
import {CheckAndWatchRoute} from '../../../helpers/check-and-watch-route';
import {CompleteOnEvent} from '../../../helpers/complete-on-event';

var steps={};
	steps['course_page']=new Step({
			text:"Navigate to course page",
			help:function(){
				ShowHint('#course_link');
			},
			watchComplete:function(callback){
				CheckAndWatchRoute('/course',callback);
			}
		});
	steps['syllabus_page']=new Step({
			text:"Click \"Upload Course Syllabus\"",
			help:function(){
				ShowHint('#syllabus_link');
			},
			watchComplete:function(callback){
				CheckAndWatchRoute('/syllabus',callback);
				}
		});
	steps['browse']=new Step({
			text:"Browse for your syllabus (PDF or Word document)",
			help:function(){
				ShowHint('#syllabus_form');
			},
			prerequisites:[steps['syllabus_page']],
			watchComplete:function(callback){
				CompleteOnEvent('change','#syllabus',callback);
			}	
		});
	steps['upload']=new Step({
			text:"Click \"Upload\"",
			help:function(){
				ShowHint('#syllabus_upload');
			},
			prerequisites:[steps['browse']],
			watchComplete:function(callback){
				CompleteOnEvent('click','#syllabus_upload',callback);
			}
		});
	steps['public']=new Step({
			text:"Click \"Make Course Syllabus Public\" to show your syllabus in the public syllabus directory",
			help:function(){
				ShowHint('#course_syllabus_public');
			},
			optional:true,
			prerequisites:[steps['upload']]
		});






export const UploadCourseSyllabus:Action = new Action({
	name: "Upload course syllabus",
	categories: [CATEGORIES['course_settings']],
	steps:[steps['course_page'], steps['syllabus_page'], steps['browse'], steps['upload'], steps['public']],
	help: "https://kb.brandeis.edu/display/LTS/Upload+Your+Syllabus"
	});