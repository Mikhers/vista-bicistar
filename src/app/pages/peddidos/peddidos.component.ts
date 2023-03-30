import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { EmpleadosInterface, ProveedorInterface, SedeInterface, productoInteface, PedidosInterface, PedidoProductoInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { FormGroup, FormControl, Validators, FormArray, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { ProductoService } from '../../services/productos.service';
import { ProveedorService } from '../../services/proveedor.service';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoProductoService } from '../../services/pedido-producto.service';


@Component({
  selector: 'app-peddidos',
  templateUrl: './peddidos.component.html',
  styleUrls: ['./peddidos.component.css']
})
export class PeddidosComponent {

  searchTerm: string = '';
  titulo="Pedidos Bicistar"
  showPut=false;
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;
  idEmpleado=0


  sedes: SedeInterface[]=[];
  empleados: EmpleadosInterface[]=[];
  productos: productoInteface[]=[];
  proveedores: ProveedorInterface[]=[];
  pedidos: PedidosInterface[]=[];
  productosForm: any[]=[];

  password: string="";
  passwordVisible: boolean = false;

  ngOnInit(): void{
    this.getPedido();
  }




  constructor(
    private toastr: ToastrService,
    private _pedido: PedidosService,
    private _pedidoProducto: PedidoProductoService,
    private _producto: ProductoService,
    private _proveedor: ProveedorService,
    private _sede: SedeService,
    private _empleado: EmpleadosService
    ){}



    //FUNCION DEL | search
  currentPage: number = 1;
  get pedidosFiltrados(): PedidosInterface[] {
    return this.pedidos.filter(p => {
      return p.fecha_realizado?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

    formPedido = new FormGroup({
      fecha_realizado: new FormControl(''),
      fecha_llegada: new FormControl('', [Validators.required]),
      estado_pedido: new FormControl('', [Validators.required]),
      total_pedido: new FormControl('', [Validators.required]),
      id_sede: new FormControl('', [Validators.required]),
      id_proveedor: new FormControl('', [Validators.required]),
      id_empleado: new FormControl('', [Validators.required])
    })
    formProductos = new FormGroup({
      formProducto: new FormArray([], [Validators.required])
    })

  // addProducto(): FormGroup{
  //   return new FormGroup(
  //     {
  //       id_producto: new FormControl("", [Validators.required]),
  //       cantidad_producto: new FormControl("", [Validators.required]),
  //       precio_unitario:new FormControl("", [Validators.required])
  //     }
  //   )
  // }
  // asignarProducto():void{
  //   const newProducto = this.formPedido.get('producto') as FormArray;
  //   newProducto.push(this.addProducto());
  // }

  /*                                               PEDIDOS      GET    POST    PUT   DELETE                               */
getPedido(){
  this._pedido.getPedido().subscribe((data:PedidosInterface[])=>{
    this.pedidos = data;
    this.totalItems = data.length;
  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
    console.log(error)
  })
}
postPedido(){
  const now: string = new Date().toISOString();
  const PEDIDO: PedidosInterface = {
    fecha_realizado: this.formPedido.get('fecha_realizado')?. value ?? "",
    fecha_llegada: this.formPedido.get('fecha_llegada')?. value ?? now,
    estado_pedido: this.formPedido.get('estado_pedido')?. value ?? "",
    total_pedido: parseFloat(this.formPedido.get('total_pedido')?. value as string),
    id_sede: parseInt(this.formPedido.get('id_sede')?. value as string),
    id_proveedor: parseInt(this.formPedido.get('id_proveedor')?. value as string),
    id_empleado: parseInt(this.formPedido.get('id_empleado')?. value as string)
  }
  this._pedido.postPedido(PEDIDO).subscribe(data=>{
    this.getPedido();
    this.closeModal();
    this.toastr.success("Se ha creado un nuevo pedido", "NUEVO PEDIDO REGISTRADO");
  },error=>{
    this.toastr.error("Hubo un error inesérado en el sistema", "ALGO A SALIDO MAL");
    console.log(error)
  })
}

arrarPedidoProducto: PedidoProductoInterface[]=[]
getIdPedido(num:number){
  this._pedido.getIdPedido(num).subscribe((data:PedidosInterface)=>{
      this.formPedido.setValue({
        fecha_realizado: data.fecha_realizado ?? "",
        fecha_llegada: data.fecha_llegada,
        estado_pedido: data.estado_pedido,
        total_pedido: data.total_pedido?.toString() ?? null,
        id_sede: data.id_sede?.toString() ?? null,
        id_proveedor: data.id_proveedor?.toString() ?? null,
        id_empleado: data.id_empleado?.toString() ?? null,
    })
  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
    console.log(error)
  })
}

putPedido(num:number){
  const PEDIDO: PedidosInterface = {
    fecha_realizado: this.formPedido.get('fecha_realizado')?. value ?? "",
    fecha_llegada: this.formPedido.get('fecha_llegada')?. value ?? "",
    estado_pedido: this.formPedido.get('estado_pedido')?. value ?? "",
    total_pedido: parseFloat(this.formPedido.get('total_pedido')?. value as string),
    id_sede: parseInt(this.formPedido.get('id_sede')?. value as string),
    id_proveedor: parseInt(this.formPedido.get('id_proveedor')?. value as string),
    id_empleado: parseInt(this.formPedido.get('id_empleado')?. value as string)
  }
  this._pedido.putPedido(num, PEDIDO).subscribe(data=>{
    this.closeModal();
    this.getPedido();
  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema","ALGO SALIO MAL")
    console.log(error)
  })
}

  /*                                                               PROVEEDORES                                              */
  getProveedor(){
    this._proveedor.getProveedor().subscribe((data: ProveedorInterface[])=>{
      this.proveedores = data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  /*                                                               PRODUCTO                                              */
  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
      this.totalItems = this.productos.length
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  /*                                                               EMPLEADO                                              */
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
      this.totalItems = data.length;
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })
  }
/*                                                                SEDE                                                */
getSede(){
  this._sede.getSede().subscribe(data =>{
    this.sedes = data;
  })
}

  /*                                                          FUNCIONES DE LA TABLA                                     */
  showTable(index: number) {
    this.maxToShow = index * 10;
    this.minToShow = this.maxToShow - 10;
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



/*                                                                 FUNCIONES MODAL                                    */
  @ViewChild('modal') modal!: ElementRef;
  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }
  closeModal() {
      this.formPedido.reset()
      this.modal.nativeElement.style.display = 'none';
      this.showPut = false;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target === this.modal.nativeElement) {
      this.closeModal();
    }
  }


  @ViewChild('modalProducto') modalProducto!: ElementRef;
  openModal2() {
    this.modalProducto.nativeElement.style.display = 'block';
  }
  closeModal2() {
      this.formPedido.reset()
      this.modalProducto.nativeElement.style.display = 'none';
      this.showPut = false;
  }
  @HostListener('document:click', ['$event'])
  onClick2(event: MouseEvent) {
    if (event.target === this.modalProducto.nativeElement) {
      this.closeModal2();
    }
  }


}
