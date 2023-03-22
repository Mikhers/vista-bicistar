import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//PIPES
// import { FiltrarYContarPipe } from '../../pipes/filter.pipe';

//INTERFACE
import { productoInteface, categoriaInterface } from '../../interfaces/bicistar-api.Interface';

//SERVICE
import { ProductoService } from 'src/app/services/productos.service';
import { CategoriaService } from '../../services/categoria.service';

//FROMs
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']

})
export class ProductosComponent implements OnInit {
  @ViewChild('top', {static: false}) topElement!: ElementRef;
  searchTerm: string = '';
  pageSize: number = 20;
  maxToShow = 20;
  minToShow = 0;
  showPut = false;
  id_pro = 0;
  ini = 1;
  fin = 7;
  totalItems: number = 0;
  itemsLista: number = 0;
  
  productos: productoInteface[] = [];
  categorias: categoriaInterface[] = [];



  currentPage: number = 1;

  get productosFiltrados(): productoInteface[] {
    return this.productos.filter(p => {
      return p.nombre_producto?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }



  constructor(
    private toastr: ToastrService,
    private _producto: ProductoService,
    private _categoria: CategoriaService) {

    }

formProducto = new FormGroup({
      nombre_producto: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion_producto: new FormControl('', [Validators.maxLength(300)]),
      precio_producto: new FormControl('', [Validators.required]),
      cantidad_producto: new FormControl(''),
      stock: new FormControl(''),
      id_categoria_producto: new FormControl('', [Validators.required]),
    })


  ngOnInit(): void {
  this.showPut = false;
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

    const PRODUCTO: productoInteface[] = [{
      nombre_producto: this.formProducto.get('nombre_producto')?.value ?? "",
      descripcion_producto: this.formProducto.get('descripcion_producto')?.value ?? "",
      precio_producto: this.formProducto.get('precio_producto')?.value as number | undefined,
      cantidad_producto: this.formProducto.get('cantidad_producto')?.value  as number | undefined,
      stock: this.formProducto.get('stock')?.value  as number | undefined,
      id_categoria_producto: parseInt(this.formProducto.get('id_categoria_producto')?.value as string)
    }]

    this._producto.postProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto ' + this.formProducto.get('nombre_producto')?.value + ' fue agregado exitosamente!', 'PRODUCTO AGREGADO');
      this.getP()

    }, error => {
      console.log(error)
    })
    this.formProducto.reset();

  }
  dropP(id: any){
    this._producto.deleteProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado exitosamente!', 'PRODUCTO ELIMINADO');
      this.getP()

    }, error => {
      console.log(error)
    })
    this.formProducto.reset();
  }
  scrollToTop() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  obtenerId(id: any){
    this.showPut = true;
    this.scrollToTop()
    
    this._producto.getIdProducto(id).subscribe(data => {
      this.id_pro = data.id_producto;
      this.formProducto.setValue({
        nombre_producto: data.nombre_producto,
        descripcion_producto: data.descripcion_producto,
        precio_producto: data.precio_producto,
        cantidad_producto: data.cantidad_producto,
        stock: data.stock,
        id_categoria_producto: data.id_categoria_producto
      });

    }, error => {
      console.log(error)
    })
    this.formProducto.reset();

  }
  closed(){
    this.showPut = false;
    this.formProducto.reset()
  }
  putP(id: any){
    console.log(id)
    const PRODUCTO: productoInteface = {
      nombre_producto: this.formProducto.get('nombre_producto')?.value ?? "",
      descripcion_producto: this.formProducto.get('descripcion_producto')?.value ?? "",
      precio_producto: this.formProducto.get('precio_producto')?.value as number | undefined,
      cantidad_producto: this.formProducto.get('cantidad_producto')?.value  as number | undefined,
      stock: this.formProducto.get('stock')?.value  as number | undefined,
      id_categoria_producto: parseInt(this.formProducto.get('id_categoria_producto')?.value as string)
    }
      this._producto.putProducto(id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto fue actualizado exitosamente!', 'PRODUCTO ACTUALIZADO');
        this.showPut = false;
        this.getP()
      }, error => {
        console.log(error)
      })
      this.formProducto.reset();
  }

  





}
