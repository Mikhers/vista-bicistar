import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE
import { productoInteface, categoriaInterface, SedeProductoInterface, SedeInterface } from '../../interfaces/bicistar-api.Interface';

//SERVICE
import { ProductoService } from 'src/app/services/productos.service';
import { CategoriaService } from '../../services/categoria.service';

//FROMS
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';
import { SedeProductoService } from '../../services/sede-producto.service';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-sede-producto',
  templateUrl: './sede-producto.component.html',
  styleUrls: ['./sede-producto.component.css']
})
export class SedeProductoComponent {
  // @ViewChild('top', {static: false}) topElement!: ElementRef;
  titulo = 'Productos ';


  searchTerm: string = '';
  producto: string = '';
  pageSize: number = 20;
  maxToShow = 20;
  minToShow = 0;
  showPut = false;
  id_pro = 0;
  ini = 1;
  fin = 7;
  totalItems: number = 0;
  itemsLista: number = 0;

  id: any;
  
  productos: productoInteface[] = [];
  categorias: categoriaInterface[] = [];
  sedeProductos: SedeProductoInterface[]=[];
  sedes: SedeInterface[]=[];

  conStock: any[]=[];

//FUNCION DEL | search
  currentPage: number = 1;
  get productosFiltrados(): any[] {
    return this.conStock.filter(p => {
      return p.nombre_producto?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  constructor(
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private _sede: SedeService,
    private _sedeProducto: SedeProductoService,
    private _producto: ProductoService,
    private _categoria: CategoriaService) {
      this.id = this.aRouter.snapshot.paramMap.get('id')
    }


formSedeProducto = new FormGroup({
      id_producto: new FormControl('', [Validators.required]),
      stock: new FormControl(1,[Validators.required]),
    })

  ngOnInit(): void {
    this.showPut = false;
    this.getPSede();
    this.getC();
    this.getSede()
  }

//PRODUCTOS DE UNA SEDE
getPSede(){
  this._sedeProducto.getIdSedeProducto(this.id).subscribe((data: SedeProductoInterface[]) => {
    this.totalItems = data.length
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    this.sedeProductos = data;
    this.conStock=[];
    for (let index = 0; index < data.length; index++) {
      this._producto.getIdProducto(data[index].id_producto).subscribe((data2: productoInteface) =>{
        data2['stock']=data[index].stock;
        this.conStock.push(data2);
      },error=>{
        this.error(error);
      })
    }
  }, error => {
    // this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
    this.error(error);
  })
}
postSedeProducto(){
  const SEDEPRODUCTO: SedeProductoInterface = {
    id_sede: this.id,
    id_producto: parseInt(this.formSedeProducto.get('id_producto')?.value as string),
    stock: this.formSedeProducto.get('stock')?.value ?? 0
  }
  this._sedeProducto.postSedeProducto(SEDEPRODUCTO).subscribe(data =>{
    this.toastr.success('El producto fue agregado exitosamente!', 'PRODUCTO AGREGADO');
    this.closeModal()
    this.getPSede();
    this.formSedeProducto.reset();
  }, error=>{
    this.error(error);
  })
}
obtenerId(num:any){
  this.showPut = true;
  this.openModal()
  this.id_pro=num;
  this._sedeProducto.getSedeProducto_id_idd(this.id, num).subscribe((data: SedeProductoInterface)=>{
    this._producto.getIdProducto(num).subscribe((data2: productoInteface)=>{
      this.producto = data2.nombre_producto ?? '';
      this.formSedeProducto.setValue({
        id_producto: data2.nombre_producto ?? "",
        stock: data.stock
      })
    },error=>{
      this.error(error);
    })
  },error=>{
    this.error(error);
  })
}
putSedePorducto(){
  const SEDEPRODUCTO: SedeProductoInterface = {
    id_sede: this.id,
    id_producto: this.id_pro,
    stock: this.formSedeProducto.get('stock')?.value ?? 1
  }
  this._sedeProducto.putSedeProducto(this.id, this.id_pro, SEDEPRODUCTO).subscribe(data=>{
    this.toastr.info('El Stock fue actualizado exitosamente!\nStock: ' + SEDEPRODUCTO.stock, 'STOCK ACTUALIZADO');
    this.closeModal()
    this.showPut = false;
    this.getPSede();
  },error=>{
    this.error(error);
  })
}
dropSedeProducto(num:any){
  if(window.confirm("¿Estas seguro de eliminar este producto de esta sede?")){
  this._sedeProducto.deleteSedeProducto(this.id, num).subscribe(data=>{
    this.toastr.warning('El producto fue eliminado exitosamente!', 'PRODUCTO ELIMINADO');
    this.getPSede();
  },error=>{
    this.error(error);
  })
}
}

//OBTENER SEDE
getSede(){
  this._sede.getIdSede(this.id).subscribe((data: SedeInterface)=>{
    this.titulo += data.nombre_sede;
  })
  this._sede.getSede().subscribe((data: SedeInterface[]) =>{
    this.sedes=data;
  },error=>{
    this.error(error);
  })
}

//FUNCION PARA TODOS LOS PRODUCTOS
  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
    }, error => {
      this.error(error);
    })
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


  



//FUNCIONES MODAL
@ViewChild('modal') modal!: ElementRef;
openModal() {
  this.getP();
  this.modal.nativeElement.style.display = 'block';
}
closeModal() {
    this.formSedeProducto.reset()
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
