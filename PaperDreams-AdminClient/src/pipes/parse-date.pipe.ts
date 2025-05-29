import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate'
})
export class ParseDatePipe implements PipeTransform {
  transform(value: any): Date | null {
    try {
      const parsed = new Date(value);
      return parsed;
      // return isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      return null;
    }
  }

}
