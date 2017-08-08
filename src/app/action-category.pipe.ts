import { Pipe, PipeTransform } from '@angular/core';

import { Action } from './trainer/action';
import { Category } from './trainer/category';

@Pipe({ name: 'actionCategory' })
export class ActionCategoryPipe implements PipeTransform {
  transform(actions: Action[], category: Category) {
    return actions.filter(action => action.categories.indexOf(category)>-1);
  }
}
