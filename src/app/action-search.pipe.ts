import { Pipe, PipeTransform } from '@angular/core';

import { Action } from './action';
import { Category } from './category';

@Pipe({ name: 'actionSearch', pure:false })
export class ActionSearchPipe implements PipeTransform {
  transform(actions: Action[], search: string) {
  	console.log('running');
    return actions.filter(action => action.name.toLowerCase().indexOf(search.toLowerCase())>-1);
  }
}