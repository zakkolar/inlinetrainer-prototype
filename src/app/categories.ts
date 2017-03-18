import {Category} from './category';

let categories: {[id:string]: Category}={};


categories['beginning']=new Category('Course Setup', null, "The tasks you need to set up your course and manage its settings, calendar, and students/TAs.");

categories['course_settings']=new Category('Course Settings',categories['beginning']);
categories['calendar']=new Category('Course Calendar',categories['beginning']);
categories['users']=new Category('Manage users',categories['beginning']);
categories['old_courses']=new Category('Old courses',categories['beginning']);



categories['content']=new Category('Uploading and Organizing Course Materials', null, "Upload and organize lectures, documents, media files, and other materials for your course.");


categories['resources']=new Category('Documents',categories['content']);
categories['organize']=new Category('Organize course page',categories['content']);
categories['links']=new Category('External Links',categories['content']);
categories['media']=new Category('Multi Media',categories['content']);

categories['assignments']=new Category('Student Work and Assessment', null, 'Create, edit and grade assignments; manage gradebook.');

categories['group']=new Category('Group assignments',categories['assignments']);
categories['individual']=new Category('Individual assignments',categories['assignments']);
categories['assignment_feedback']=new Category('Assignment feedback',categories['assignments']);


categories['communication']=new Category('Communication and Discussion', null, 'Manage forums and message students.');

categories['messaging']=new Category('Messaging',categories['communication']);
categories['forums']=new Category('Forums',categories['communication']);

categories['self']=new Category('Self assessment',categories['assignments']);
categories['gradebook']=new Category('Gradebook',categories['assignments']);

export const CATEGORIES: {[id:string]: Category}=categories;