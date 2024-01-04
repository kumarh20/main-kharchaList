import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(value: string, ...args: any[]) {
    args.forEach((arg) => {
      if((arg.date).toLowerCase() == value.toLowerCase()) {
        return arg;
      }else{
        return null;
      }
    })
  }

}
