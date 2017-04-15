import {Action} from './action';

import {CATEGORIES} from './categories';

import {Category} from './category';

import {Step} from './step';

import {HINT} from './tour_components/hint';
import {SLIDE} from './tour_components/slide';
import {UNBLOCK_ELEMENT} from './tour_components/unblock_element';

import {GUID} from './helpers/guid';

import {ShowHint} from './helpers/show-hint';

import {WatchForEvent} from './helpers/watch-for-event';


var showHint = ShowHint;


function assembleActions(collection:Action[], categories, actions, extras={}){
	for(let action of actions){
		let newAction = new Action({
			name:action,
			categories:categories,
			steps:extras['steps'],
			help: extras['help'],
		});
		// collection.push(newAction);
	}
}

let actions:Action[]=[];




// let completeOnEvent=function(event,target,callback){
// 	let $ = require('jquery');
// 	let id = "zk"+GUID();
// 	$(target).on(event+'.'+id,function(){
// 		callback();
// 		$(target).off('change.'+id);
// 	});
// }




import {UploadCourseSyllabusAction} from './actions/course-setup/sharing-course-information/upload-course-syllabus.action';
actions.push(UploadCourseSyllabusAction);

import {SetUpCalendarAction} from './actions/course-setup/course-calendar/set-up-calendar.action';
actions.push(SetUpCalendarAction);

assembleActions(actions,[CATEGORIES['old_courses']],[
	"Reuse an existing course",
	]);

// assembleActions(actions,[CATEGORIES['course_settings']],[
// 	'Set course date'
// 	]);

assembleActions(actions,[CATEGORIES['organize']],[
	'Change Course Layout',
	]);

assembleActions(actions,[CATEGORIES['calendar']],[
	"Set up calendar"
	],{
		steps:[
			new Step({
				text:"Click \"Turn editing on\"",
				help:function(){
					showHint('#editing_button');
				}
			}),
			new Step({
				text:"Scroll to the \"Add a Block\" block on the left side of the screen and select \"Calendar\" from the dropdown menu",
				help:function(){
					showHint('#add_block');
				}
			})
		]
	});


assembleActions(actions,[CATEGORIES['calendar']],[
	'Add entry to calendar',
	],
	{
		steps:[
			new Step({
				text:"Scroll to the \"Calendar\" block on the left side of the screen and click the name of the current month",
				help:function(){
					showHint('#calendar');
				}
			}),
			new Step({
				text:"Click \"New Event\"",
				help:function(){
					showHint('#new_event_button');
				}
			}),
			new Step({
				text:"Change \"Type of event\" to \"Course\"",
				help:function(){
					showHint('#event_type');
				}
			}),
			new Step({
				text:"Type your event's title in \"Event Title\"",
				help:function(){
					showHint('#event_title');
				}
			}),
			new Step({
				text:"Type your event's description in \"Description\"",
				help:function(){
					showHint('#event_description');
				},
				optional:true
			}),
			new Step({
				text:"Type your event's date and time in \"Date\"",
				help:function(){
					showHint('#event_date');
				}
			}),
			new Step({
				text:"Click \"Save Changes\"",
				help:function(){
					showHint('#save_event'); 
				}
			})
		]
	});

assembleActions(actions,[CATEGORIES['users']],[
	'Add students',
	'Add TAs',
	]);

assembleActions(actions,[CATEGORIES['individual']],[
	'Create an assignment',
	]);

assembleActions(actions,[CATEGORIES['group']],[
	'Create a group',
	'Create a group assignment',
	]);

assembleActions(actions,[CATEGORIES['content']],[
	]);

assembleActions(actions,[CATEGORIES['organize']],[
	'Create sections',
	'Edit sections',
	'Sort materials',
	]);

assembleActions(actions,[CATEGORIES['resources']],[
	'Upload document',
		]);

assembleActions(actions,[CATEGORIES['links']],[
	'Create links',
		]);

assembleActions(actions,[CATEGORIES['media']],[
	'Upload video clip'
	]);

assembleActions(actions,[CATEGORIES['communication']],[

	]);

assembleActions(actions,[CATEGORIES['messaging']],[
	'Send a message to student(s)',
	'Post a course announcement'
	]);

assembleActions(actions,[CATEGORIES['forums']],[
	'Create a forum',
	'Post in forum',
	'Reply to a post in a forum'
	]);

assembleActions(actions,[CATEGORIES['self']],[
	'Enable progress markers',
	]);

assembleActions(actions,[CATEGORIES['gradebook']],[
	'Set up gradebook',
	]);



assembleActions(actions, [CATEGORIES['assignment_feedback'],CATEGORIES['gradebook']],[
	'Grade an assignment',
	]);


export const ACTIONS:Action[] = actions;