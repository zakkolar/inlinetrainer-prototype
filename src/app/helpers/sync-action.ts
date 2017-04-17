import {Step} from '../step';
import {Action} from '../action';
let Lockr=require('lockr');
export const SyncAction=function(action:Action){
  for(let step of action.steps){
    step.subscribe(function(){
      Lockr.set(action.identifier,action.exportStepCompletion());
    });
  }

}
export const RetrieveAction=function(action:Action){
  return Lockr.get(action.identifier);
}
