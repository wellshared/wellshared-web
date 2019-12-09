import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate'
})
export class ExpiryDatePipe implements PipeTransform {

  transform(value: string): any {
    const str = String(value);
    if (str.length > 2) {
      const first = str.substr(0, 2);
      return first + '/' + str.substr(2, str.length);
    }
    return value;
  }

}
