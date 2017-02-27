import {Category} from './category';

let categories: {[id:string]: Category}={};


categories['beginning']=new Category('Beginning of the Semester');

categories['course_settings']=new Category('Course Settings',categories['beginning']);
categories['calendar']=new Category('Course Calendar',categories['beginning']);
categories['users']=new Category('Manage users',categories['beginning']);
categories['old_courses']=new Category('Old courses',categories['beginning']);

categories['assignments']=new Category('Managing Assignments');

categories['group']=new Category('Group assignments',categories['assignments']);
categories['individual']=new Category('Individual assignments',categories['assignments']);
categories['assignment_feedback']=new Category('Assignment feedback',categories['assignments']);

categories['content']=new Category('Managing Content');

categories['organize']=new Category('Organize course page',categories['content']);
categories['resources']=new Category('Documents/resources',categories['content']);

categories['communication']=new Category('Communication');

categories['messaging']=new Category('Messaging',categories['communication']);
categories['forums']=new Category('Forums',categories['communication']);

categories['assessment']=new Category('Assessment, Grading, and Feedback');

categories['self']=new Category('Self assessment',categories['assessment']);
categories['gradebook']=new Category('Gradebook',categories['assessment']);

export const CATEGORIES: {[id:string]: Category}=categories;