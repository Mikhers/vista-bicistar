import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return (item.nombre_producto && item.nombre_producto.toLowerCase().includes(searchText));
    });
  }
}

@Pipe({
  name: 'filterCP'
})
export class FilterPipeCP implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return (item.nombre_categoria_producto && item.nombre_categoria_producto.toLowerCase().includes(searchText));
    });
  }
}

