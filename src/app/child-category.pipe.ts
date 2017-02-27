import { Pipe, PipeTransform } from '@angular/core';

import { Category } from './category';

@Pipe({ name: 'childCategory' })
export class ChildCategoryPipe implements PipeTransform {
  transform(categories, parent) {
  	
    return categories.filter(function(category){
    	return category.value.parent==parent.value;
    });
  }
}