import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toStars'
})
export class ToStarsPipe implements PipeTransform {

  transform(value: number): string {
    let str = '', i;
    for (i = 0; i < value; i++) {
      str += '★';
    }
    for (i = 0; i < 5 - value; i++) {
      str += '☆';
    }
    return str;
  }

}
