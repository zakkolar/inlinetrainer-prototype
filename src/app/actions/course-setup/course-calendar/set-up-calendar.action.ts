import {Action} from '../../../trainer/action';

import {CATEGORIES} from '../../../trainer/categories';

import {Step} from '../../../step/step';
import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';
import {ShowHint} from '../../../helpers/show-hint';

import {CheckText} from '../../../helpers/check-text';
import {CheckValue} from '../../../helpers/check-value';
import {WatchForEvent, UnwatchForEvent} from '../../../helpers/watch-for-event';


const steps = {};
steps['course_page'] = new RouteStep({
  text: 'Navigate to course page',
  help: function(){
    ShowHint('#course_link');
  },
  route: '/course',
  identifier: 'course_page'
});

steps['editing_on']= new EventStep({
  text: 'Click "Turn editing on"',
  help: function(){
    ShowHint('#editing_button');
  },
  completeEvent: 'click',
  completeTarget: '#editing_button',
  uncompleteEvent: 'click',
  uncompleteTarget: '#editing_button',

  checkComplete: function(){
    return CheckText('#editing_button', 'Turn editing off');
  },
  identifier: 'editing_on'

});
steps['add_block']= new Step({
  text: 'Scroll to the "Add a Block" block on the left side of the screen and select "Calendar" from the dropdown menu',
  help: function(){
    ShowHint('#add_block');
  },
  prerequisites:[steps['editing_on']],
  watchComplete: function(callback){
    WatchForEvent('change', '#add_block_dropdown', this.id(), function(){
      if (CheckValue('#add_block select', '')) {
        callback();
      }
    });
  },
  unwatchComplete: function(){
    UnwatchForEvent('change', '#add_block_dropdown', this.id());
  },
  checkComplete: function(){
    const $ = require('jquery');
    return $('#calendar').length > 0;
  },
  skipPrerequisitesOnInit: true
});

steps['course_page'].addPostrequisite(steps['editing_on']);
steps['editing_on'].addPostrequisite(steps['add_block']);

export const SetUpCalendarAction: Action = new Action({
  name: 'Set Up Calendar',
  categories: [CATEGORIES['calendar']],
  steps:[steps['course_page'], steps['editing_on'], steps['add_block']],
  identifier: 'set-up-calendar'
});
