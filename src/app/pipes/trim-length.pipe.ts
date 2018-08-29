import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimLength'
})
export class TrimLengthPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const stringValue = value.replace(/<[^>]*>/gi, '');
      if (stringValue.length > 103) {
        return stringValue.substring(0, 100) + '...';
      } else {
        return stringValue;
      }
    }
  }
}
