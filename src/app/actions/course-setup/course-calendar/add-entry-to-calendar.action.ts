import {Action} from '../../../trainer/action';

import {CATEGORIES} from '../../../trainer/categories';

import {Step} from '../../../step/step';
import {RouteStep} from '../../../step/route-step';
import {EventStep} from '../../../step/event-step';

import {ShowHint} from '../../../helpers/show-hint';
import {CheckValue} from '../../../helpers/check-value';


const steps = {};


steps['click_calendar'] = new RouteStep({
  text: 'Scroll to the "Calendar" block on the left side of the screen and click the name of the current month',
  help: function() {
    ShowHint('#calendar');
  },
  route: '/calendar',
  identifier: 'click_calendar'
});
steps['new_event'] = new RouteStep({
  text: 'Click "New Event"',
  help: function(){
    ShowHint('#new_event_button');
  },
  route: '/new_event',
  identifier: 'new_event'
});
steps['event_type'] = new EventStep({
  text: 'Change "Type of event" to "Course"',
  help: function(){
    ShowHint('#event_type');
  },
  completeEvent: 'change',
  completeTarget: '#type',
  checkComplete: function(){
    return CheckValue('#type', 'course');
  },
  identifier: 'event_type',

});
steps['event_title'] = new EventStep({
  text: 'Type your event\'s title in "Event Title"',
  completeEvent: 'change keyup',
  completeTarget: '#title',
  help: function(){
    ShowHint('#event_title');
  },
  checkComplete: function(){
    return CheckValue('#title', '', true);
  },
  identifier: 'event_title',

});
steps['event_description'] = new EventStep({
  text: 'Type your event\'s description in "Description"',
  help: function(){
    ShowHint('#event_description');
  },
  optional: true,
  completeEvent: 'change keyup',
  completeTarget: '#description',
  checkComplete: function(){
    return CheckValue('#description', '', true);
  },
  identifier: 'event_description',
});
steps['event_date'] = new EventStep({
  text: 'Type your event\'s date and time in "Date"',
  help: function(){
    ShowHint('#event_date');
  },
  checkComplete: function(){
    return CheckValue('#date', '', true);
  },
  completeEvent: 'change keyup',
  completeTarget: '#date',
  identifier: 'event_date',
});
steps['save_event'] = new RouteStep({
  text: 'Click "Save Changes"',
  help: function(){
    ShowHint('#save_event');
  },
  route: '/calendar',
  identifier: 'save_event',
  prerequisites: [steps['event_title'], steps['event_date']],
  persistent: true
});

steps['click_calendar'].addPostrequisite(steps['new_event']);

steps['new_event'].addPostrequisite(steps['save_event']);




export const AddEntryToCalendarAction: Action = new Action({
  name: 'Add Entry To Calendar',
  categories: [CATEGORIES['calendar']],
  steps: [steps['click_calendar'], steps['new_event'], steps['event_type'], steps['event_title'],
    steps['event_description'], steps['event_date'], steps['save_event']],
  identifier: 'add_entry_to_calendar'
});
