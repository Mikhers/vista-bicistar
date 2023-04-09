import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmpleadosInterface, ProveedorInterface, SedeInterface, productoInteface, PedidosInterface, PedidoProductoInterface, ServiciosInterface, facturasInterface, ClientesInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { ProductoService } from '../../services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ServiciosService } from 'src/app/services/servicios.service';
import { facturaService } from 'src/app/services/factura.service';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent {

  cc_cliente: number = 0;
  searchTerm: string = '';
  titulo="Factura  Bicistar"
  horaActual!: string;
  infoProducto: any = {}
  infoServicio: any = {}

  showPutServicio=false;
  showPutProducto=false;
  showEdit=false;
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;

  totalFactura=0
  cedulaExiste=false;
  verFormCliente=false
  idProductoArray=0
  idServicioArray=0


  
  sedes: SedeInterface[]=[];
  clientes: ClientesInterface[]=[];
  empleados: EmpleadosInterface[]=[];
  productos: productoInteface[]=[];
  servicios: ServiciosInterface[]=[];
  
  productosForm: any[]=[];            //Pedidos-productos
  serviciosForm: any[]=[];            //Pedidos-productos

  formFactura = new FormGroup({
    id_cliente: new FormControl('', [Validators.required]),
    id_sede: new FormControl('', [Validators.required]),
    id_empleado: new FormControl('', [Validators.required])
  })

  formProductos = new FormGroup({
    id_producto: new FormControl('', [Validators.required]),
    cantidad_producto: new FormControl('', [Validators.required]),
    precio_unitario: new FormControl('', [Validators.required])
  })
  formServicios = new FormGroup({
    id_servicio: new FormControl('', [Validators.required]),
    cantidad_servicio: new FormControl('', [Validators.required]),
    precio_unitario: new FormControl('', [Validators.required])
  })
  formCliente = new FormGroup({
    cc_cliente: new FormControl(0, [Validators.maxLength(50)]),
    nombre_cliente: new FormControl('', [Validators.maxLength(50)]),
    apellido_cliente: new FormControl('', [Validators.maxLength(50)]),
    telefono_cliente: new FormControl(0, [Validators.maxLength(255)]),
    email_cliente: new FormControl('', [Validators.email ,Validators.maxLength(255)]),
    direccion_cliente: new FormControl('', [Validators.maxLength(50)]),
  })

  constructor(
    private location: Location,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,

    private _factura: facturaService,

    private _producto: ProductoService,
    private _servicio: ServiciosService,
    
    private _sede: SedeService,
    private _empleado: EmpleadosService,
    private _cliente: ClientesService,

    ){
      // this.idPedidoPut = this.aRouter.snapshot.paramMap.get('id')

  }
  ngOnInit(): void{
    // if(this.idPedidoPut != null){
      this.showEdit = false
      // this.llenarCamposPedido();
    // }else{
      this.showEdit = true
    // }
    const fechaHora = new Date();
    this.horaActual = fechaHora.toLocaleDateString() + ' ' + fechaHora.toLocaleTimeString();
    this.getEmpleado();
    this.getSede();
    this.getClientes()
  }


  //                                                        ARRAY PRODUCTOS
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
  validarObjetoProducto(objeto: { id_producto: number, nombre_producto: string }): boolean {
    const idExistente = this.productosForm.some(item => item.id_producto === objeto.id_producto);
    if (!idExistente) {
      return true
    }
    return false
  }
  addProductoArray(){
    const OBJETO = this.addProducto();
    if(this.validarObjetoProducto({id_producto:OBJETO.id_producto, nombre_producto:OBJETO.nombre_producto})){
      this.totalFactura = this.totalFactura + OBJETO.cantidad_producto * OBJETO.precio_unitario;
      this.productosForm.push(OBJETO);
      this.formProductos.reset();
      this.closeModal2();
    }
    else{
      this.toastr.error('El producto ' + OBJETO.nombre_producto + ' ya existe en la lista.', "PRODUCTO YA FUE AGREGADO");
    }
  }
  llenarCamposProductoForm(num:number){
    this.showPutProducto = true;
    // this.idPedidoProducto = num;
    this.idProductoArray = num;
    this.formProductos.setValue({
      id_producto: this.productosForm[num].id_producto,
      cantidad_producto: this.productosForm[num].cantidad_producto,
      precio_unitario: this.productosForm[num].precio_unitario
    })
    this.openModal2();
  }
  deleteProductoArray(num:number){
    if(window.confirm("¿Estas seguro que deseas eliminar este producto de tu factura?")){
      this.totalFactura = this.totalFactura - this.productosForm[num].cantidad_producto * this.productosForm[num].precio_unitario
      this.productosForm.splice(num, 1);
      this.toastr.warning("Producto eliminado de tu factura", "PRODUCTO ELIMINADO DE LA FACTURA");
    }
  }
  actualizarProductoArray(){
    this.productosForm[this.idProductoArray].cantidad_producto = this.formProductos.get('cantidad_producto')?.value
    this.productosForm[this.idProductoArray].precio_unitario = this.formProductos.get('precio_unitario')?.value
    this.actualizarTotalFactura();
    this.closeModal2()
  }
  //                                                         ARRAY SERVICIOS
  validarObjetoServicio(objeto: { id_servicio: number, nombre_servicio: string }): boolean {
    const idExistente = this.serviciosForm.some(item => item.id_servicio === objeto.id_servicio);
    if (!idExistente) {
      return true
    }
    return false
  }
  addServicio(){
    const servicioo: any =
    {
      id_servicio: this.infoServicio.id_servicio,
      nombre_servicio: this.infoServicio.nombre_servicio,
      cantidad_servicio: this.formServicios.get('cantidad_servicio')?.value,
      precio_unitario: this.formServicios.get('precio_unitario')?.value
    }
    return servicioo;
  }
  addServicioArray(){
    const OBJETO = this.addServicio();
    if(this.validarObjetoServicio({id_servicio:OBJETO.id_servicio, nombre_servicio:OBJETO.nombre_servicio})){
      this.totalFactura = this.totalFactura + OBJETO.cantidad_servicio * OBJETO.precio_unitario;
      this.serviciosForm.push(OBJETO);
      this.formServicios.reset();
      this.closeModal();
    }
    else{
      this.toastr.error('El servicio ' + OBJETO.nombre_servicio + ' ya existe en la lista.', "SERVICIO YA FUE AGREGADO");
    }
  }
  llenarCamposServicioForm(num:number){
    this.showPutServicio = true;
    // this.idProductoArray = num;
    this.idServicioArray = num;
    this.formServicios.setValue({
      id_servicio: this.serviciosForm[num].id_servicio,
      cantidad_servicio: this.serviciosForm[num].cantidad_servicio,
      precio_unitario: this.serviciosForm[num].precio_unitario
    })
    this.openModal();
  }
  deleteServicioArray(num:number){
    if(window.confirm("¿Estas seguro que deseas eliminar este servicio de tu factura?")){
      this.totalFactura = this.totalFactura - this.serviciosForm[num].cantidad_servicio * this.serviciosForm[num].precio_unitario
      this.serviciosForm.splice(num, 1);
      this.toastr.warning("Servicio eliminado de tu factura", "SERVICIO ELIMINADO DE LA FACTURA");
  }
}
  actualizarServicioArray(){
    this.serviciosForm[this.idServicioArray].cantidad_servicio = this.formServicios.get('cantidad_servicio')?.value
    this.serviciosForm[this.idServicioArray].precio_unitario = this.formServicios.get('precio_unitario')?.value
    this.actualizarTotalFactura();
    this.closeModal()
  }
  actualizarTotalFactura(){
    this.totalFactura=0
    for (let i = 0; i < this.serviciosForm.length; i++) {
      this.totalFactura =  this.totalFactura + this.serviciosForm[i].precio_unitario * this.serviciosForm[i].cantidad_servicio
    }
    for (let i = 0; i < this.productosForm.length; i++) {
      this.totalFactura =  this.totalFactura + this.productosForm[i].precio_unitario * this.productosForm[i].cantidad_producto
    }
  }
  //                                                        FUNCION DEL | search
  currentPage: number = 1;
  get clientesFiltrados(): ClientesInterface[] {
    return this.clientes.filter(p => {
      return p.cc_cliente?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
  buscarCedula(){
    const NUM:number = this.formCliente.get('cc_cliente')?.value ?? 0
    var ARREGLO_CEDULAS: number[]=[];
    for (let i = 0; i < this.clientes.length; i++) {
      ARREGLO_CEDULAS[i] = parseInt(this.clientes[i].cc_cliente);
    }
    if (ARREGLO_CEDULAS.includes(NUM)){
      this.cedulaExiste = true
      this.verFormCliente = false
      return true
    }
    else{
      this.cedulaExiste = false
      this.verFormCliente = true
      return false
    }
  }

    /*                                                              FACTURA                               */
  postFactura(){
    const now: string = new Date().toISOString();
    const FACTURA: facturasInterface = {
      fecha_factura: now,
      total: this.totalFactura,
      id_cliente: parseInt(this.formFactura.get('id_cliente')?.value as string),
      id_sede: parseInt(this.formFactura.get('id_sede')?.value as string),
      id_empleado: parseInt(this.formFactura.get('id_empleado')?.value as string)
    }
    this._factura.postfactura(FACTURA).subscribe(data=>{
      // this.idPedido = data.id_pedido
      this.toastr.success("Se ha creado una nueva factura", "NUEVA FACTURA REGISTRADA");
    },error=>{
      this.toastr.error("Hubo un error inesérado en el sistema", "ALGO A SALIDO MAL");
      console.log(error)
    })
  }
  //                                                              CLIENTES
  getClientes(){
    this._cliente.getcliente().subscribe((data:ClientesInterface[])=>{
      this.clientes = data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })
  }
  /*                                                              PRODUCTO                                              */
  getP() {
    this._producto.getProducto().subscribe((data: productoInteface[]) => {
      this.productos = data;
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
    /*                                                            SERVICIO                                              */
  getServicio() {
    this._servicio.getservicio().subscribe((data: ServiciosInterface[]) => {
      this.servicios = data;
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  /*                                                              EMPLEADO                                              */
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })
  }
  /*                                                                  SEDE                                                */
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }

/*                                                             FUNCIONES MODALES                                    */
  @ViewChild('modalProducto') modalProducto!: ElementRef;
  openModal2() {
    this.modalProducto.nativeElement.style.display = 'block';
    this.getP()
  }
  closeModal2() {
    this.modalProducto.nativeElement.style.display = 'none';
    this.formProductos.reset()
      this.showPutProducto = false;
  }

  //FUNCIONES MODAL
  @ViewChild('modalServicio') modalServicio!: ElementRef;
  openModal() {
    this.modalServicio.nativeElement.style.display = 'block';
    this.getServicio();
  }
  closeModal() {
      this.formServicios.reset()
      this.modalServicio.nativeElement.style.display = 'none';
      this.showPutServicio = false;
  }



  //                                                              RETROCEDER
  goBack(): void {
    this.location.back();
  }

}
