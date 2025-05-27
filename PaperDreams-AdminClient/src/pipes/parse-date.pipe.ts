import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate'
})
export class ParseDatePipe implements PipeTransform {
  transform(value: any): Date | null {
    try {
      console.log("ParseDatePipe transform called with value:", value);
      console.log(value);
      
      const parsed = new Date(value);
      console.log(parsed);
      return parsed;
      // return isNaN(parsed.getTime()) ? null : parsed;
    } catch {
      return null;
    }
  }

}
