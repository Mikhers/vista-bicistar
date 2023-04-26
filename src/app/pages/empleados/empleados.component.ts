import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { EmpleadosInterface, SedeInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../../services/empleados.service';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {
  

  searchTerm: string = '';
  titulo="Empleados Bicistar"
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

  password: string="";
  passwordVisible: boolean = false;

  ngOnInit(): void{
    this.getEmpleado();
    this.getSede();
  }
  constructor(
    private toastr: ToastrService,
    private _sede: SedeService,
    private _empleado: EmpleadosService
    ){}



    //FUNCION DEL | search
  currentPage: number = 1;
  get empleadosFiltrados(): EmpleadosInterface[] {
    return this.empleados.filter(p => {
      return p.nombre_empleado?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

    formEmpleado = new FormGroup({
      nombre_empleado: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      apellido_empleado: new FormControl('', [ Validators.maxLength(50)]),
      email_empleado: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password_empleado: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      permiso_empleado: new FormControl('', [Validators.maxLength(50)]),
      rol_empleado: new FormControl('', [Validators.maxLength(50)]),
      salario_empleado: new FormControl("", [Validators.maxLength(50)]),
      id_sede: new FormControl("", [Validators.required])
    })

  /*METODOS HTTP*/
  getEmpleado(){
    this._empleado.getEmpleado().subscribe((data: EmpleadosInterface[])=>{
      this.empleados=data;
      this.totalItems = data.length;
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    },error=>{
      this.error(error);
    })
  }
  postEmpleado(){
    const EMPLEADO: EmpleadosInterface = {
      nombre_empleado: this.formEmpleado.get('nombre_empleado')?.value ?? "",
      apellido_empleado: this.formEmpleado.get('apellido_empleado')?.value ?? "",
      email_empleado: this.formEmpleado.get('email_empleado')?.value ?? "",
      password_empleado: this.formEmpleado.get('password_empleado')?.value ?? "",
      permiso_empleado: this.formEmpleado.get('permiso_empleado')?.value ?? "",
      rol_empleado: this.formEmpleado.get('rol_empleado')?.value ?? "",
      salario_empleado: parseFloat(this.formEmpleado.get('salario_empleado')?.value as string),
      id_sede: parseInt(this.formEmpleado.get('id_sede')?.value as string)
    }
    this._empleado.postEmpleado(EMPLEADO).subscribe(data=>{
      this.getEmpleado();
      this.closeModal();
      this.formEmpleado.reset();
    },error=>{
      this.error(error);
    })
  }
  getId(num: any){
    this.showPut = true;
    this.openModal();
    this._empleado.getIdEmpleado(num).subscribe((data: EmpleadosInterface) =>{
      this.idEmpleado = data.id_empleado ?? 1;
      this.formEmpleado.setValue({
        nombre_empleado: data.nombre_empleado,
        apellido_empleado: data.apellido_empleado!,
        email_empleado: data.email_empleado,
        password_empleado: data.password_empleado,
        permiso_empleado: data.permiso_empleado!,
        rol_empleado: data.rol_empleado!,
        salario_empleado: data.salario_empleado?.toString() ?? null,
        id_sede: data.id_sede?.toString() ?? null
      })
    },error=>{
      this.error(error);
    })
  }
  putEmpleado(){
    const EMPLEADO: EmpleadosInterface = {
      nombre_empleado: this.formEmpleado.get('nombre_empleado')?.value ?? "",
      apellido_empleado: this.formEmpleado.get('apellido_empleado')?.value ?? "",
      email_empleado: this.formEmpleado.get('email_empleado')?.value ?? "",
      password_empleado: this.formEmpleado.get('password_empleado')?.value ?? "",
      permiso_empleado: this.formEmpleado.get('permiso_empleado')?.value ?? "",
      rol_empleado: this.formEmpleado.get('rol_empleado')?.value ?? "",
      salario_empleado: parseFloat(this.formEmpleado.get('salario_empleado')?.value as string),
      id_sede: parseInt(this.formEmpleado.get('id_sede')?.value as string)
    }
    this._empleado.putEmpleado(this.idEmpleado, EMPLEADO).subscribe(data =>{
      this.toastr.info('El empleado ' + EMPLEADO.nombre_empleado + ' fue actualizado exitosamente!', 'EMPLEADO ACTUALIZADO');
      this.getEmpleado();
      this.closeModal();
    },error=>{
      this.error(error);
    })
  }
  dropEmpleado(num:any){
    if(window.confirm("¿Esta seguro que desea eliminar el empleado?")){
    this._empleado.deleteEmpleado(num).subscribe(data=>{
    this.toastr.error('Empleado Eliminado', 'EMPLEADO ELIMINADO');
    this.getEmpleado();
  },error=>{
      this.error(error);
    })
  }
}

error(error:any){
  this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
  console.log(error)
}
//SEDE
getSede(){
  this._sede.getSede().subscribe(data =>{
    this.sedes = data;
  })
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

//PASSWORD
togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
  passwordInput.type = this.passwordVisible ? 'text' : 'password';
}


//FUNCIONES MODAL
  @ViewChild('modal') modal!: ElementRef;
  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }
  closeModal() {
      this.formEmpleado.reset()
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
