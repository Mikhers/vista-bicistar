import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE
import { productoInteface, categoriaInterface } from '../../interfaces/bicistar-api.Interface';

//SERVICE
import { ProductoService } from 'src/app/services/productos.service';
import { CategoriaService } from '../../services/categoria.service';

//FROMS
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
  titulo: string = 'Productos bicistar';
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


//FUNCION DEL | search
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
      id_categoria_producto: new FormControl('', [Validators.required]),
    })

  ngOnInit(): void {
    this.showPut = false;
    this.getC()
      this.getP()
  }

//FUNCION PARA TODOS LOS PRODUCTOS
  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
      this.totalItems = this.productos.length
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    }, error => {
      this.error(error);
    })
  }
  agregarProducto(){
    const PRODUCTO: productoInteface[] = [{
      nombre_producto: this.formProducto.get('nombre_producto')?.value ?? "",
      descripcion_producto: this.formProducto.get('descripcion_producto')?.value ?? "",
      precio_producto: this.formProducto.get('precio_producto')?.value as number | undefined,
      id_categoria_producto: parseInt(this.formProducto.get('id_categoria_producto')?.value as string)
    }]

    this._producto.postProducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto ' + PRODUCTO[0].nombre_producto + ' fue agregado exitosamente!', 'PRODUCTO AGREGADO');
    this.closeModal()
      this.getP()
      this.formProducto.reset();
    }, error => {
      this.error(error);
    })

  }
  putP(id: any){
    const PRODUCTO: productoInteface = {
      nombre_producto: this.formProducto.get('nombre_producto')?.value ?? "",
      descripcion_producto: this.formProducto.get('descripcion_producto')?.value ?? "",
      precio_producto: this.formProducto.get('precio_producto')?.value as number | undefined,
      id_categoria_producto: parseInt(this.formProducto.get('id_categoria_producto')?.value as string)
    }
      this._producto.putProducto(id, PRODUCTO).subscribe(data => {
        this.toastr.info('El producto ' + PRODUCTO.nombre_producto + ' fue actualizado exitosamente!', 'PRODUCTO ACTUALIZADO');
    this.closeModal()
        this.showPut = false;
        this.getP()
        this.formProducto.reset();
      }, error => {
        this.error(error);
      })
  }
  dropP(id: any){
    if(window.confirm("¿Estás seguro de que deseas eliminar este producto?")){
      this._producto.deleteProducto(id).subscribe(data => {
        this.toastr.warning('El producto fue eliminado exitosamente!', 'PRODUCTO ELIMINADO');
        this.getP()
      }, error => {
        this.error(error);
      })
      this.formProducto.reset();
    }
  }
  obtenerId(id: any){
    this.showPut = true;
    this.openModal()
    this.scrollToTop()
    
    this._producto.getIdProducto(id).subscribe(data => {
      this.id_pro = data.id_producto;
      this.formProducto.setValue({
        nombre_producto: data.nombre_producto,
        descripcion_producto: data.descripcion_producto,
        precio_producto: data.precio_producto,
        id_categoria_producto: data.id_categoria_producto
      });

    }, error => {
      this.error(error);
    })
    this.formProducto.reset();

  }

  //TRAER CATEGORIAS
  getC() {
    this._categoria.getCategoria().subscribe((data: categoriaInterface[]) => {
      this.categorias = data;
    }, error => {
      this.error(error);
    })
  }

  // FUNCIONES DE LA TABLA
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


//FUNCIONES DE EDITAR
  scrollToTop() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }



  //FUNCIONES MODAL
@ViewChild('modal') modal!: ElementRef;
openModal() {
  this.getP();
  this.modal.nativeElement.style.display = 'block';
}
closeModal() {
    this.formProducto.reset()
    this.modal.nativeElement.style.display = 'none';
    this.showPut = false;
}
@HostListener('document:click', ['$event'])
onClick(event: MouseEvent) {
  if (event.target === this.modal.nativeElement) {
    this.closeModal();
  }
}
error(error:any){
  this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL");
  console.log(error)
}

}
