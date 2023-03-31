import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmpleadosInterface, ProveedorInterface, SedeInterface, productoInteface, PedidosInterface, PedidoProductoInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { ProductoService } from '../../services/productos.service';
import { ProveedorService } from '../../services/proveedor.service';
import { PedidosService } from '../../services/pedidos.service';
import { PedidoProductoService } from '../../services/pedido-producto.service';


@Component({
  selector: 'app-form-pedidos',
  templateUrl: './form-pedidos.component.html',
  styleUrls: ['./form-pedidos.component.css']
})
export class FormPedidosComponent {

  searchTerm: string = '';
  titulo="Pedidos Bicistar"
  infoProducto: any = {}
  showPut=false;
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;
  totalPedido=0

  horaActual!: string;


  sedes: SedeInterface[]=[];
  empleados: EmpleadosInterface[]=[];
  productos: productoInteface[]=[];
  proveedores: ProveedorInterface[]=[];
  pedidos: PedidosInterface[]=[];

  productosForm: any[]=[];            //Pedidos-productos

  ngOnInit(): void{
    const fechaHora = new Date();
    this.horaActual = fechaHora.toLocaleDateString() + ' ' + fechaHora.toLocaleTimeString();
    this.getEmpleado();
    this.getProveedor();
    this.getSede();
    this.getP();
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


    formPedido = new FormGroup({
      fecha_realizado: new FormControl(''),
      fecha_llegada: new FormControl('', [Validators.required]),//requerido
      estado_pedido: new FormControl(''),//requerido
      total_pedido: new FormControl(''),//requerido
      id_sede: new FormControl('', [Validators.required]),//requerido
      id_proveedor: new FormControl('', [Validators.required]),//requerido
      id_empleado: new FormControl('', [Validators.required])//requerido
    })


    formProductos = new FormGroup({
      id_producto: new FormControl('', [Validators.required]),
      cantidad_producto: new FormControl('', [Validators.required]),
      precio_unitario: new FormControl('', [Validators.required])
    })

  addProducto(): any{
    const productoo: any =
      {
        id_producto: this.infoProducto.id_producto,
        nombre_producto: this.infoProducto.nombre_producto,
        cantidad_producto: this.formProductos.get('cantidad_producto')?.value,
        precio_unitario: this.formProductos.get('precio_unitario')?.value
      }
      return productoo;
  }
  asignarProducto(){
    const OBJETO = this.addProducto();
    if(this.agregarObjeto({id_producto:OBJETO.id_producto, nombre_producto:OBJETO.nombre_producto})){
      this.totalPedido = this.totalPedido + OBJETO.cantidad_producto * OBJETO.precio_unitario;
      this.productosForm.push(OBJETO);
      this.formProductos.reset();
    }
    else{
      this.toastr.error('El producto ' + OBJETO.nombre_producto + ' ya existe en la lista.', "PRODUCTO YA FUE AGREGADO");
    }
  }
  agregarObjeto(objeto: { id_producto: number, nombre_producto: string }): boolean {
    const idExistente = this.productosForm.some(item => item.id_producto === objeto.id_producto);
    if (!idExistente) {
      return true
    }
    return false
  }

  /*                                               PEDIDOS      GET    POST    PUT   DELETE                               */
getPedido(){
  this._pedido.getPedido().subscribe((data:PedidosInterface[])=>{
    this.pedidos = data;
    this.totalItems = data.length;
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);

  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
    console.log(error)
  })
}
postPedido(){
  const now: string = new Date().toISOString();
  console.warn(now)
  const PEDIDO: PedidosInterface = {
    fecha_realizado: now,
    fecha_llegada: this.formPedido.get('fecha_llegada')?.value?.toString() ?? "",
    estado_pedido: "en proceso",
    total_pedido: this.totalPedido,
    id_sede: parseInt(this.formPedido.get('id_sede')?.value as string),
    id_proveedor: parseInt(this.formPedido.get('id_proveedor')?.value as string),
    id_empleado: parseInt(this.formPedido.get('id_empleado')?.value as string)
  }
  console.log(PEDIDO);
  console.log(this.formPedido.get('fecha_realizado')?.value);
  this._pedido.postPedido(PEDIDO).subscribe(data=>{
    
    this.toastr.success("Se ha creado un nuevo pedido", "NUEVO PEDIDO REGISTRADO");
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
  },error=>{
    this.toastr.error("Hubo un error inesérado en el sistema", "ALGO A SALIDO MAL");
    console.log(error)
  })
}

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
    /////////////////////////////////////////////////////////////////////////////////////////////
  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema","ALGO SALIO MAL")
    console.log(error)
  })
}
/*                                                               PEDIDO-PRODUCTO                                    */

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
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  /*                                                               EMPLEADO                                              */
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
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

/*                                                                 FUNCIONES MODAL                                    */
  @ViewChild('modalProducto') modalProducto!: ElementRef;
  openModal2() {
    this.modalProducto.nativeElement.style.display = 'block';
    this.getP()
  }
  closeModal2() {
    this.modalProducto.nativeElement.style.display = 'none';
    this.formProductos.reset()
      this.showPut = false;
  }



}
