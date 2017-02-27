import { Pipe, PipeTransform } from '@angular/core';

import { Category } from './category';

@Pipe({ name: 'topLevelCategory' })
export class TopLevelCategoryPipe implements PipeTransform {
  transform(categories) {
    return categories.filter(category => category.value.parent==null);
  }
}