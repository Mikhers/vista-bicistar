import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EmpleadosInterface, ProveedorInterface, SedeInterface, PedidosInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { ProveedorService } from '../../services/proveedor.service';
import { PedidosService } from '../../services/pedidos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-peddidos',
  templateUrl: './peddidos.component.html',
  styleUrls: ['./peddidos.component.css']
})
export class PeddidosComponent {

  searchTerm: string = '';
  titulo="Pedidos Bicistar"
  infoProducto: any = {}
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;
  conFiltroFecha = false

  fechaDesde!: Date;
  fechaHasta!: Date;



  

  sedes: SedeInterface[]=[];
  empleados: EmpleadosInterface[]=[];
  proveedores: ProveedorInterface[]=[];
  pedidos: PedidosInterface[]=[];


  ngOnInit(): void{
    this.getPedido();
    this.getProveedor();
    this.getSede();
    this.getEmpleado();
  }

  formFechaRango = new FormGroup({
    fechaDesde: new FormControl('', [Validators.required]),
    fechaHasta: new FormControl('', [Validators.required])
  })

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

  constructor(
    private toastr: ToastrService,
    private _pedido: PedidosService,
    private _proveedor: ProveedorService,
    private _sede: SedeService,
    private _empleado: EmpleadosService
    ){}



  /*                                               PEDIDOS      GET    POST    PUT   DELETE                               */
getPedido(){
  this.conFiltroFecha = false
  this._pedido.getPedido().subscribe((data:PedidosInterface[])=>{
    this.pedidos = data;
    this.totalItems = data.length;
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);


  },error=>{
    this.error(error);
  })
}
dropPedido(num:number){
  if(window.confirm("¿Estas seguro que deseas eliminar el pedido?")){
    this._pedido.deletePedido(num).subscribe(data=>{
     this.toastr.warning("Se ha ELIMINADO el pedido","PEDIDO ELIMINADO")
     this.getPedido();
    },error=>{
      this.error(error);
    }) 
  }
}
  /*                                                               PROVEEDORES                                              */
  getProveedor(){
    this._proveedor.getProveedor().subscribe((data: ProveedorInterface[])=>{
      this.proveedores = data;
    },error=>{
      this.error(error);
    })
  }
/*                                                                SEDE                                                */  
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    },error=>{
      this.error(error);
    })
  }
  /*                                                               EMPLEADO                                              */
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
    },error=>{
      this.error(error);
    })
  }

  //PARA LOS NOMBRES EN VEZ DE LOS ID
  setProveedor(id:number): string {
    const NOMBRE_PROVEEDOR = this.proveedores.find(proveedor => proveedor.id_proveedor === id);
    return NOMBRE_PROVEEDOR?.nombre_proveedor ?? "Algo salio mal"
  }
  setSede(id:number): string {
    const NOMBRE_SEDE = this.sedes.find(proveedor => proveedor.id_sede === id);
    return NOMBRE_SEDE?.nombre_sede ?? "Algo salio mal"
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
error(error:any){
  this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
  console.log(error)
}
}
