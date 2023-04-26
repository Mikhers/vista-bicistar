import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientesInterface } from 'src/app/interfaces/bicistar-api.Interface';
import { ClientesService } from 'src/app/services/clientes.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {



  searchTerm: string = '';
  titulo = "Clientes Bicistar"
  showPut = false;
  maxToShow = 10;
  minToShow = 0;
  itemsLista = 0
  totalItems = 0
  ini = 1;
  fin = 7;
  idCliente=""
  clientes: ClientesInterface[] = [];

  ngOnInit(): void {
    this.getEmpleado();
  }
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _cliente: ClientesService
  ) { }



  //FUNCION DEL | search
  currentPage: number = 1;
  get clientesFiltrados(): ClientesInterface[] {
    return this.clientes.filter(p => {
      return p.nombre_cliente?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  formCliente = new FormGroup({
    cc_cliente: new FormControl('', [ Validators.required, Validators.maxLength(50)]),
    nombre_cliente: new FormControl('', [Validators.maxLength(50)]),
    apellido_cliente: new FormControl('', [Validators.maxLength(50)]),
    telefono_cliente: new FormControl(0, [Validators.maxLength(255)]),
    email_cliente: new FormControl('', [Validators.email ,Validators.maxLength(255)]),
    direccion_cliente: new FormControl('', [Validators.maxLength(50)]),
  })

  /*METODOS HTTP*/
  getEmpleado() {
    this._cliente.getcliente().subscribe((data: ClientesInterface[]) => {
      this.clientes = data;
      this.totalItems = data.length;
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    }, error => {
      this.error(error);
    })
  }
  postCliente() {
    const CLIENTE: ClientesInterface = {
      nombre_cliente: this.formCliente.get('nombre_cliente')?.value ?? "",
      apellido_cliente: this.formCliente.get('apellido_cliente')?.value ?? "",
      email_cliente: this.formCliente.get('email_cliente')?.value ?? "",
      telefono_cliente: this.formCliente.get('telefono_cliente')?.value?.toString() ?? "",
      cc_cliente: this.formCliente.get('cc_cliente')?.value ?? "",
      direccion_cliente: this.formCliente.get('direccion_cliente')?.value ?? ""
    }
    this._cliente.postcliente(CLIENTE).subscribe(data => {
      this.toastr.success("Se ha creado un nuevo cliente", "NUEVO CLIENTE REGISTRADO");
      this.getEmpleado();
      this.closeModal();
      this.formCliente.reset();
    }, error => {
      this.error(error);
    })
  }
  getId(num: any) {
    this.showPut = true;
    this.openModal();
    this._cliente.getIdcliente(num).subscribe((data: ClientesInterface) => {
      this.idCliente = data.cc_cliente ?? "1";
      this.formCliente.setValue({
        cc_cliente: data.cc_cliente!,
        nombre_cliente: data.nombre_cliente!,
        apellido_cliente: data.apellido_cliente!,
        email_cliente: data.email_cliente!,
        telefono_cliente: parseInt(data.telefono_cliente!),
        direccion_cliente: data.direccion_cliente!,
      })
    }, error => {
      this.error(error);
    })
  }
  putCliente() {
    const CLIENTE: ClientesInterface = {
      nombre_cliente: this.formCliente.get('nombre_cliente')?.value ?? "",
      apellido_cliente: this.formCliente.get('apellido_cliente')?.value ?? "",
      email_cliente: this.formCliente.get('email_cliente')?.value ?? "",
      telefono_cliente: this.formCliente.get('telefono_cliente')?.value?.toString() ?? "",
      cc_cliente: this.formCliente.get('cc_cliente')?.value ?? "",
      direccion_cliente: this.formCliente.get('direccion_cliente')?.value ?? ""
    }
    this._cliente.putcliente(this.idCliente, CLIENTE).subscribe(data => {
      this.toastr.info('El cliente ' + CLIENTE.nombre_cliente + ' fue actualizado exitosamente!', 'CLIENTE ACTUALIZADO');
      this.getEmpleado();
      this.closeModal();
    }, error => {
      this.error(error);
    })
  }
  dropCliente(num: any) {
    if (window.confirm("¿Esta seguro que desea eliminar el cliente?")) {
      this._cliente.deletecliente(num).subscribe(data => {
        this.toastr.warning('Cliente Eliminado', 'CLIENTE ELIMINADO');
        this.getEmpleado();
      }, error => {
        this.error(error);
      })
    }
  }

error(error:any){
  this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
  console.log(error)
}

  // FUNCIONES DE LA TABLA
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
    this.modal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.formCliente.reset()
    this.modal.nativeElement.style.display = 'none';
    this.showPut = false;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target === this.modal.nativeElement) {
      this.closeModal();
    }
  }


}
