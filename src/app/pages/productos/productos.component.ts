import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/productos.service';
import { productoInteface, categoriaInterface } from '../../interfaces/producto-Interface';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})
export class ProductosComponent implements OnInit {

  productos: productoInteface[] = [];
  categorias: categoriaInterface[] = [];

  maxToShow = 20;
  minToShow = 0;
  ini = 1;
  fin = 7;
  totalItems: number = 0;
  itemsLista: number = 0;
  constructor(private _producto: ProductoService,
              private _categoria: CategoriaService ){}
  

    getP(){
      this._producto.getProducto().subscribe( (data: productoInteface[]) =>{
      this.productos=data;
      this.totalItems = this.productos.length
      this.itemsLista = Math.ceil(this.totalItems/20+1);
      console.log(this.itemsLista)
      },error =>{
        console.log(error)
      })
    }
    getC(){
      this._categoria.getCategoria().subscribe( (data: categoriaInterface[]) =>{
      this.categorias=data;
      },error =>{
        console.log(error)
      })
    }

    showTable(index: number){
      this.maxToShow =  index*20;
      this.minToShow =  this.maxToShow-20;
    }
    derFelcha(){
      this.fin +=1;
      this.ini += 1;
    }
    izqFelcha(){
      this.ini -= 1;
      this.fin -= 1;
    }
  
    ngOnInit(): void {
      this.getP()
      this.getC()
    }

    range(max: number): number[] {
      return Array.from({length: max}, (_, i) => i);
    }

    ranges(start: number, end: number): number[] {
      return Array.from({length: end - start}, (_, i) => start + i);
    }
    

}

