import { Pipe, PipeTransform } from '@angular/core';

import { Action } from './trainer/action';
import { Category } from './trainer/category';

@Pipe({ name: 'actionSearch', pure:false })
export class ActionSearchPipe implements PipeTransform {
  transform(actions: Action[], search: string) {
  	if(search===""){
  		return [];
  	}
    return actions.filter(action => action.name.toLowerCase().indexOf(search.toLowerCase())>-1);
  }
}
