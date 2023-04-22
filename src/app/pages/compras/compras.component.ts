import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ClientesInterface, EmpleadosInterface, SedeInterface, facturasInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { facturaService } from 'src/app/services/factura.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {

  searchTerm: string = '';
  titulo="facturas Bicistar"
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
  seeIdFactura_Sede:any;



  

  sedes: SedeInterface[]=[];
  empleados: EmpleadosInterface[]=[];
  clientes: ClientesInterface[]=[];
  facturas: facturasInterface[]=[];


  ngOnInit(): void{
    if(this.seeIdFactura_Sede != null){
      this.getFacturaSede();
    }else{
      this.getPedido();
    }
      this.getClientes();
      this.getSede();
      this.getEmpleado();
  }

  formFechaRango = new FormGroup({
    fechaDesde: new FormControl('', [Validators.required]),
    fechaHasta: new FormControl('', [Validators.required])
  })

  buscar(){
    this.facturas = this.facturas.filter(fecha => {
      const tiempoFecha = new Date(fecha.fecha_factura ?? '').getTime();
      const tiempoDesde = new Date(this.formFechaRango.get('fechaDesde')?.value ?? '').getTime();
      const tiempoHasta = new Date(this.formFechaRango.get('fechaHasta')?.value ?? '').getTime();
      return tiempoFecha >= tiempoDesde && tiempoFecha <= tiempoHasta;
    });
    this.closeModal();
    this.conFiltroFecha = true
  }

  constructor(
    private toastr: ToastrService,
    private _factura: facturaService,
    private _sede: SedeService,
    private _empleado: EmpleadosService,
    private _cliente: ClientesService,
    private aRouter: ActivatedRoute,
    ){
      this.seeIdFactura_Sede = this.aRouter.snapshot.paramMap.get('id')
    }



  /*                                               facturas      GET    POST    PUT   DELETE                               */
getPedido(){
  this.conFiltroFecha = false
  this._factura.getfactura().subscribe((data:facturasInterface[])=>{
    this.facturas = data;
    this.totalItems = data.length;
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);


  },error=>{
    this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
    console.log(error)
  })
}
dropPedido(num:number){
  if(window.confirm("¿Estas seguro que deseas eliminar la factura?")){
    this._factura.deletefactura(num).subscribe(data=>{
     this.toastr.warning("Se ha ELIMINADO el pedido","FACTURA ELIMINADO")
     this.getPedido();
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
      console.log(error)
    }) 
  }
}
getFacturaSede(){
  this._factura.getIdfacturaSede(this.seeIdFactura_Sede).subscribe((data:facturasInterface[])=>{
    this.facturas = data;
    this.totalItems = data.length;
    this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
  })
}
/*                                                                SEDE                                                */  
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
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
  //                                                             CLIENTES
  getClientes(){
    this._cliente.getcliente().subscribe((data:ClientesInterface[])=>{
      this.clientes = data;
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", "ALGO SALIO MAL")
      console.log(error)
    })
  }

  //PARA LOS NOMBRES EN VEZ DE LOS ID
  setCliente(id:string): string {
    const CLIENTE = this.clientes.find(cliente => cliente.cc_cliente === id);
    return CLIENTE?.cc_cliente ?? "Sin dato"
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
}
