import {Action} from '../../../trainer/action';

import {CATEGORIES} from '../../../trainer/categories';

import {Step} from '../../../step/step';
import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';

import {ShowHint} from '../../../helpers/show-hint';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';
import {CheckText} from '../../../helpers/check-text';


const steps = {};

steps['course_page'] = new RouteStep({
  text: 'Navigate to course page',
  help: function(){
    ShowHint('#course_link');
  },
  route: '/course',
  identifier: 'course_page'
});

steps['syllabus_page'] = new RouteStep({
  text: 'Click "Upload Course Syllabus"',
  help: function(){
    ShowHint('#syllabus_link');
  },
  route: '/syllabus',
  identifier: 'syllabus_page'
});
steps['browse'] = new EventStep({
  text: 'Browse for your syllabus (PDF or Word document)',
  help: function(){
    ShowHint('#syllabus_form');
  },
  prerequisites:[steps['syllabus_page']],
  completeEvent: 'change',
  completeTarget: '#syllabus',
  checkComplete: function(){
    let $ = require('jquery');
    return ($('#syllabus').length > 0 && $('#syllabus').val() !== '');
  },
  identifier: 'browse'
});

let uploadClicked = false;

steps['upload'] = new Step({
  text: 'Click "Upload"',
  help: function(){
    ShowHint('#syllabus_upload');
  },
  prerequisites: [steps['browse']],
  watchComplete: function(callback){
    WatchForEvent('mousedown', '#syllabus_upload', this.id(), function(){
      uploadClicked = true;
      callback();
    });

  },
  unwatchComplete: function(){
    UnwatchForEvent('mousedown', '#syllabus_upload', this.id());
  },
  checkComplete: function(){
    return uploadClicked;
  },
  identifier: 'upload',
  persistent: true
});
steps['public'] = new EventStep({
  text: 'Click "Make Course Syllabus Public" to show your syllabus in the public syllabus directory',
  help: function(){
    ShowHint('#course_syllabus_public');
  },
  optional: true,
  prerequisites: [steps['upload']],
  completeEvent: 'click',
  completeTarget: '#course_syllabus_public',
  checkComplete: function(){
    return CheckText('#course_syllabus_public', 'Make Course Syllabus Private');
  },
  identifier: 'make_public',
  persistent: true
});


steps['course_page'].addPostrequisite(steps['syllabus_page']);

steps['syllabus_page'].addPostrequisite(steps['upload']);

steps['browse'].addPostrequisite(steps['upload']);



export const UploadCourseSyllabusAction: Action = new Action({
  name: 'Upload course syllabus',
  categories: [CATEGORIES['course_settings']],
  steps:[steps['course_page'], steps['syllabus_page'], steps['browse'], steps['upload'], steps['public']],
  help: 'https://kb.brandeis.edu/display/LTS/Upload+Your+Syllabus',
  identifier: 'upload_course_syllabus'
});
