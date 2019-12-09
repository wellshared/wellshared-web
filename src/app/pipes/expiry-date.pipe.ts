import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate'
})
export class ExpiryDatePipe implements PipeTransform {

  transform(value: string): any {
    const str = String(value);
    if (str.length > 2) {
      const first = str.substr(0, 2);
      const thrd = str.substr(2, 1);
      let result = first;
      if (thrd !== '/') {
        result += '/' + str.substr(2, str.length);
      } else {
        result += '/' + str.substr(3, str.length);
      }
      return result;
    }
    return value;
  }

}
