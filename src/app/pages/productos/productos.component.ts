import { Component, OnInit } from '@angular/core';

//INTERFACE
import { productoInteface, categoriaInterface } from '../../interfaces/bicistar-api.Interface';

//SERVICE
import { ProductoService } from 'src/app/services/productos.service';
import { CategoriaService } from '../../services/categoria.service';

//FROMs
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

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
  constructor(
    private _producto: ProductoService,
    private _categoria: CategoriaService) {}



formProducto = new FormGroup({
      nombre_producto: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion_producto: new FormControl('', [Validators.maxLength(300)]),
      precio_producto: new FormControl('', [Validators.required]),
      cantidad_producto: new FormControl(''),
      stock: new FormControl(''),
      id_categoria_producto: new FormControl('', [Validators.required]),
    })

  ngOnInit(): void {
    this.getP()
    this.getC()
  }


  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
      this.totalItems = this.productos.length
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    }, error => {
      console.log(error)
    })
  }
  getC() {
    this._categoria.getCategoria().subscribe((data: categoriaInterface[]) => {
      this.categorias = data;
    }, error => {
      console.log(error)
    })
  }

  showTable(index: number) {
    this.maxToShow = index * 20;
    this.minToShow = this.maxToShow - 20;
  }
  derFelcha() {
    this.fin += 1;
    this.ini += 1;
  }
  izqFelcha() {
    this.ini -= 1;
    this.fin -= 1;
  }



  range(max: number): number[] {
    return Array.from({ length: max }, (_, i) => i);
  }

  ranges(start: number, end: number): number[] {
    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  agregarProducto(){
    console.log(this.formProducto.get('nombre_producto')?.value);
  }


}

