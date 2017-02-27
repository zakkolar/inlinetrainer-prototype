import {Action} from './action';

import {CATEGORIES} from './categories';

import {Category} from './category';


function assembleActions(collection:Action[], categories, actions){
	for(var i=0; i<actions.length; i++){
		collection.push({
			name:actions[i],
			categories:categories
		});
	}
}

let actions:Action[]=[];

assembleActions(actions,[CATEGORIES['old_courses']],[
	"Reuse an existing course",
	]);

assembleActions(actions,[CATEGORIES['course_settings']],[
	"Upload course syllabus",
	'Set course date',
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
	'Insert link'
	]);



assembleActions(actions,[CATEGORIES['communication']],[

	]);

assembleActions(actions,[CATEGORIES['messaging']],[
	'Send a message to student(s)',
	'Post a course announcement'
	]);

assembleActions(actions,[CATEGORIES['forums']],[
	'Create a forum',
	'Post in forum'
	]);

assembleActions(actions,[CATEGORIES['assessment']],[
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