import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(value: string, items: any[]): any[] {
    value = (value.trim().toLowerCase());
    if (!value) {
      return items;
    }

    value = value.toLowerCase();

    return items.filter(item => {
      const itemName = (item.name || '').toLowerCase();
      return itemName.includes(value);
    });
  }
}
