import {Action} from '../../../action';

import {CATEGORIES} from '../../../categories';

import {Step} from '../../../step';

import {ShowHint} from '../../../helpers/show-hint';


let steps={};





steps['click_calendar']=new Step({
        text:"Scroll to the \"Calendar\" block on the left side of the screen and click the name of the current month",
        help:function(){
          ShowHint('#calendar');
        }
      });
steps['new_event']=new Step({
        text:"Click \"New Event\"",
        help:function(){
          ShowHint('#new_event_button');
        }
      });
steps['event_type']=new Step({
        text:"Change \"Type of event\" to \"Course\"",
        help:function(){
          ShowHint('#event_type');
        }
      });
steps['event_title']=new Step({
        text:"Type your event's title in \"Event Title\"",
        help:function(){
          ShowHint('#event_title');
        }
      });
steps['event_description']=new Step({
        text:"Type your event's description in \"Description\"",
        help:function(){
          ShowHint('#event_description');
        },
        optional:true
      });
steps['event_date']=new Step({
        text:"Type your event's date and time in \"Date\"",
        help:function(){
          ShowHint('#event_date');
        }
      });
steps['save_event']=new Step({
        text:"Click \"Save Changes\"",
        help:function(){
          ShowHint('#save_event');
        }
      });




export const AddEntryToCalendarAction:Action = new Action({
  name: "Add Entry To Calendar",
  categories: [CATEGORIES['calendar']],
  steps:[steps['click_calendar'],steps['new_event'],steps['event_type'],steps['event_title'],steps['event_description'],steps['event_date'],steps['save_event']],
  identifier:'add_entry_to_calendar'
  });
