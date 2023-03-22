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


  // @Pipe({
  //   name: 'filtrarYContar'
  // })
  // export class FiltrarYContarPipe implements PipeTransform {
  //   transformlen(items: any[], searchTerm: string): any[] {
  //     if (!items) {
  //       return [];
  //     }
  //     if (!searchTerm) {
  //       return items;
  //     }
  //     searchTerm = searchTerm.toLowerCase();
  //     const filteredItems = items.filter(item =>
  //       item.nombre_producto.toLowerCase().includes(searchTerm)
  //     );
  //     this.cantidadFiltrada = filteredItems.length;
  //     return filteredItems;
  //   }
    
  //   cantidadFiltrada: number = 0;
  // }

