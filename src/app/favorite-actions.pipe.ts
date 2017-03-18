import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'favoriteActions', pure:false })
export class FavoriteActionsPipe implements PipeTransform {
  transform(actions) {
    return actions.filter(action => action.favorite);
  }
}