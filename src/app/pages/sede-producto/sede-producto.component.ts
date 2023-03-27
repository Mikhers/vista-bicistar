import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  @ViewChild('top', {static: false}) topElement!: ElementRef;
  titulo = '';


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
      id_producto: new FormControl('',[Validators.required]),
      stock: new FormControl(1,[Validators.required]),
    })

  ngOnInit(): void {
    this.showPut = false;
    this.getPSede();
    this.getP();
    this.getC();
    this.getSede()
  }

//PRODUCTOS DE UNA SEDE
getPSede(){
  this._sedeProducto.getIdSedeProducto(this.id).subscribe((data: SedeProductoInterface[]) => {
    this.totalItems = data.length
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    this.sedeProductos = data;
    for (let index = 0; index < data.length; index++) {
      this._producto.getIdProducto(data[index].id_producto).subscribe((data2: productoInteface) =>{
        data2['stock']=data[index].stock;
        this.conStock.push(data2);
      },error=>{
        console.log(error)
      })
    }

  }, error => {
    console.log(error)
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
    this.getPSede();
    this.formSedeProducto.reset();
  }, error=>{
    console.log(error)
  })
}
obtenerId(num:any){
  this.showPut = true;
  this.scrollToTop()
  this.id_pro=num;
  this._sedeProducto.getSedeProducto_id_idd(this.id, num).subscribe((data: SedeProductoInterface)=>{
    this._producto.getIdProducto(num).subscribe((data2: productoInteface)=>{
      this.formSedeProducto.setValue({
        id_producto: data2.nombre_producto ?? null,
        stock: data.stock
      })
    },error=>{
      console.log(error)
    })
  },error=>{
    console.log(error)
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
    this.showPut = false;
    this.getPSede();
  },error=>{
    console.log(error)
  })
}
dropSedeProducto(num:any){
  if(window.confirm("¿Estas seguro de eliminar este producto de esta sede?")){
  this._sedeProducto.deleteSedeProducto(this.id, num).subscribe(data=>{
    this.toastr.error('El producto fue eliminado exitosamente!', 'PRODUCTO ELIMINADO');
    this.getPSede();
  },error=>{
    console.log(error)
  })
}
}

//OBTENER SEDE
getSede(){
  this._sede.getIdSede(this.id).subscribe((data: SedeInterface)=>{
    this.titulo = data.nombre_sede;
  })
  this._sede.getSede().subscribe((data: SedeInterface[]) =>{
    this.sedes=data;
  },error=>{
    console.log(error)
  })
}

//FUNCION PARA TODOS LOS PRODUCTOS
  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
    }, error => {
      console.log(error)
    })
  }

//TRAER CATEGORIAS
  getC() {
    this._categoria.getCategoria().subscribe((data: categoriaInterface[]) => {
      this.categorias = data;
    }, error => {
      console.log(error)
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
  closed(){
    this.showPut = false;
    this.formSedeProducto.reset()
  }


  





}
