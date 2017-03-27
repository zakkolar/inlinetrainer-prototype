import {Action} from './action';

import {CATEGORIES} from './categories';

import {Category} from './category';

import {Step} from './step';

import {HINT} from './tour_components/hint';
import {SLIDE} from './tour_components/slide';
import {UNBLOCK_ELEMENT} from './tour_components/unblock_element';

var showHint = function (target, trainer?){
	if(!trainer){
		trainer='#trainer';
	}
	SLIDE(target, function(){
		UNBLOCK_ELEMENT(trainer, target,function(){
			HINT(target);
		});
	});
	
	
}




function assembleActions(collection:Action[], categories, actions, extras={}){
	for(var i=0; i<actions.length; i++){
		var action = {
			name:actions[i],
			categories:categories,
			favorite:false,
			shown:false,
			steps:[],
			help:""
		};
		for(var j in extras){
			action[j]=extras[j];
		}
		collection.push(action);
	}
}

let actions:Action[]=[];

assembleActions(actions,[CATEGORIES['old_courses']],[
	"Reuse an existing course",
	]);

assembleActions(actions,[CATEGORIES['course_settings']],[
	"Upload course syllabus"
	],{
		steps:[
		{text:"Navigate to course page", help:function(){
			showHint('#course_link');
		}},
		{text:"Click \"Upload Course Syllabus\"", help:function(){
			showHint('#syllabus_link');
		}},
		{text:"Browse for your syllabus", help:function(){
			showHint('#syllabus_form');
		}},
		{text:"Click \"Upload\"", help:function(){
			showHint('#syllabus_upload');
		}}
		],
		help: "https://kb.brandeis.edu/display/LTS/Upload+Your+Syllabus"
	});

// assembleActions(actions,[CATEGORIES['course_settings']],[
// 	'Set course date'
// 	]);

assembleActions(actions,[CATEGORIES['course_settings'],CATEGORIES['organize']],[
	'Present Course on LATTE',
	]);

assembleActions(actions,[CATEGORIES['calendar']],[
	"Set up calendar"
	],{
		steps:[
		{text:"Click \"Turn editing on.\"",
		help:function(){
			showHint('#editing_button');
		}},
		{
			text:"Scroll to the \"Add a Block\" block on the left side of the screen and select \"Calendar\" from the dropdown menu.",
			help:function(){
				showHint('#add_block');
			}
		}
		]
	});


assembleActions(actions,[CATEGORIES['calendar']],[
	'Add entry to calendar',
	]);

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