import {Action} from './action';

import {CATEGORIES} from './categories';

import {Category} from './category';

import {Step} from './step';


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
		{text:"Navigate to course page"},
		{text:"Click \"Upload Course Syllabus\""},
		{text:"Browse for your syllabus"},
		{text:"Click \"Upload\""}
		],
		help: "https://kb.brandeis.edu/display/LTS/Upload+Your+Syllabus"
	});

assembleActions(actions,[CATEGORIES['course_settings']],[
	'Set course date'
	]);

assembleActions(actions,[CATEGORIES['course_settings'],CATEGORIES['organize']],[
	'Change course format',
	]);

assembleActions(actions,[CATEGORIES['calendar']],[
	'Set up calendar',
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