import {Step} from '../step';
import {Action} from '../action';
let lscache=require('lscache');
lscache.setBucket('zk_inline_trainer');
export const SyncAction=function(action:Action, expiration:number=10){
  for(let step of action.steps){
    step.subscribe(function(){
      if(step.persistent){
        lscache.set(action.identifier,action.exportStepCompletion(), expiration);
      }
    });
  }

}
export const RetrieveAction=function(action:Action){
  return lscache.get(action.identifier) || {};
}
