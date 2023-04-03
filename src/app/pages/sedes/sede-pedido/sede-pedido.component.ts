import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EmpleadosInterface, ProveedorInterface, SedeInterface, PedidosInterface } from '../../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../../services/sede.service';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../../services/empleados.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sede-pedido',
  templateUrl: './sede-pedido.component.html',
  styleUrls: ['./sede-pedido.component.css']
})
export class SedePedidoComponent {

  nombre_sede!: string
  titulo="Pedidos ";
  searchTerm: string = '';
  infoProducto: any = {}
  showPut=false;
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;

  conFiltroFecha = false

  fechaDesde!: Date;
  fechaHasta!: Date;

  idSede:any;

  empleados: EmpleadosInterface[]=[];
  proveedores: ProveedorInterface[]=[];
  pedidos: PedidosInterface[]=[];


  ngOnInit(): void{
    this.setSede();
    this.getPedido();
    this.getProveedor();
    // this.getSede();
    this.getEmpleado();
  }


  formFechaRango = new FormGroup({
    fechaDesde: new FormControl('', [Validators.required]),
    fechaHasta: new FormControl('', [Validators.required])
  })

  constructor(
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private _pedido: PedidosService,
    private _proveedor: ProveedorService,
    private _sede: SedeService,
    private _empleado: EmpleadosService
    ){
      this.idSede = this.aRouter.snapshot.paramMap.get('id')
    }


    buscar(){
      this.pedidos = this.pedidos.filter(fecha => {
        const tiempoFecha = new Date(fecha.fecha_realizado ?? '').getTime();
        const tiempoDesde = new Date(this.formFechaRango.get('fechaDesde')?.value ?? '').getTime();
        const tiempoHasta = new Date(this.formFechaRango.get('fechaHasta')?.value ?? '').getTime();
        return tiempoFecha >= tiempoDesde && tiempoFecha <= tiempoHasta;
      });
      this.closeModal();
      this.conFiltroFecha = true
    }


  /*                                               PEDIDOS      GET    POST    PUT   DELETE                               */
getPedido(){
  this.conFiltroFecha = false
  this._pedido.getSedePedido(this.idSede).subscribe((data:PedidosInterface[])=>{
    this.pedidos = data;
    this.totalItems = data.length;
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);

  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
    console.log(error)
  })
}
dropPedido(num:number){
  if(window.confirm("¿Estas seguro que deseas eliminar el pedido?")){
    this._pedido.deletePedido(num).subscribe(data=>{
     this.toastr.warning("Se ha ELIMINADO el pedido","PEDIDO ELIMINADO")
     this.getPedido();
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
      console.log(error)
    }) 
  }
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
  /*                                                               EMPLEADO                                              */
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })
  }

  //PARA LOS NOMBRES EN VEZ DE LOS ID
  setProveedor(id:number): string {
    const NOMBRE_PROVEEDOR = this.proveedores.find(proveedor => proveedor.id_proveedor === id);
    return NOMBRE_PROVEEDOR?.nombre_proveedor ?? "Algo salio mal"
  }
  setSede(){
    this._sede.getIdSede(this.idSede).subscribe((data:SedeInterface)=>{
      this.nombre_sede = data.nombre_sede;
      this.titulo += data.nombre_sede;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })

  }
  setEmpleado(id:number): string {
    const NOMBRE_EMPLEADO = this.empleados.find(proveedor => proveedor.id_empleado === id);
    return NOMBRE_EMPLEADO?.nombre_empleado ?? "Algo salio mal"
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




    //FUNCIONES MODAL
@ViewChild('modal') modal!: ElementRef;
openModal() {
  // this.getCP();
  this.modal.nativeElement.style.display = 'block';
}
closeModal() {
    // this.formCategoria.reset()
    this.modal.nativeElement.style.display = 'none';
    this.formFechaRango.reset();
}
@HostListener('document:click', ['$event'])
onClick(event: MouseEvent) {
  if (event.target === this.modal.nativeElement) {
    this.closeModal();
  }
}
}
