import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE
import { ProveedorInterface } from '../../interfaces/bicistar-api.Interface';

//SERVICE
import { ProveedorService } from '../../services/proveedor.service';

//FROMS
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {

  searchTerm: string = '';
  titulo = 'Proveedores Bicistar'
  showPut = false;
  totalItemsP = 0;
  maxToShow = 10;
  minToShow = 0;
  ini = 1;
  fin = 6;
  itemsLista: number = 0;
  idProvee=0
  
  proveedores: ProveedorInterface[]=[];

  constructor(
    private toastr: ToastrService,
    private _proveedor: ProveedorService
  ) { }

  /*FORMULARIO GROUP*/
  formProveedor = new FormGroup({
    nombre_proveedor: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    direccion_proveedor: new FormControl('', [Validators.maxLength(100)]),
    telefono_proveedor: new FormControl('', [Validators.maxLength(20)]),
    email_proveedor: new FormControl('', [Validators.maxLength(255), Validators.email])
  })


  ngOnInit(): void {
    this.getProveedor()
  }
  @ViewChild('top', {static: false}) topElement!: ElementRef;
  scrollToTop() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  /* METODOS GET POST PUT DELETE DEL PROVEEDOR  */
  getProveedor(){
    this._proveedor.getProveedor().subscribe((data: ProveedorInterface[])=>{
      this.totalItemsP = data.length;
      this.proveedores = data;
    },error=>{
      this.error(error);
    })
  }
  postProveedores(){
    this.openModal();
    this.scrollToTop();
    const PROVEEDORES: ProveedorInterface = {
      nombre_proveedor: this.formProveedor.get('nombre_proveedor')?.value ?? "",
      direccion_proveedor: this.formProveedor.get('direccion_proveedor')?.value ?? "",
      telefono_proveedor: this.formProveedor.get('telefono_proveedor')?.value ?? "",
      email_proveedor: this.formProveedor.get('email_proveedor')?.value ?? ""
    }
    this._proveedor.postProveedor(PROVEEDORES).subscribe(data=>{
      this.toastr.success("Se a creado un nuevo proveedor: "+PROVEEDORES.nombre_proveedor,"PROVEDOR CREADO")
      this.getProveedor();
      this.closeModal();
      this.formProveedor.reset();
    },error=>{
      this.error(error);
    })
  }
  putProveedor(){
    this.openModal();
    this.scrollToTop();
    const PROVEEDORES: ProveedorInterface = {
      nombre_proveedor: this.formProveedor.get('nombre_proveedor')?.value ?? "",
      direccion_proveedor: this.formProveedor.get('direccion_proveedor')?.value ?? "",
      telefono_proveedor: this.formProveedor.get('telefono_proveedor')?.value ?? "",
      email_proveedor: this.formProveedor.get('email_proveedor')?.value ?? ""
    }
    this._proveedor.putProveedor(this.idProvee,PROVEEDORES).subscribe(data=>{
      this.toastr.info("Se a actualizado el proveedor: "+PROVEEDORES.nombre_proveedor,"PROVEDOR ACUALIZADO")
      this.closeModal();
      this.getProveedor();
      this.formProveedor.reset();
    },error=>{
      this.error(error);
    })
  }
  obtenerId(id:any, nom:string, dir:string, tel:string, email:string){
    this.showPut=true;
    this.idProvee = id;
    this.openModal();
    this.formProveedor.setValue({
      nombre_proveedor: nom,
      direccion_proveedor: dir,
      telefono_proveedor: tel,
      email_proveedor: email
    })
  }
  dropProveedor(num:any){
    if(window.confirm("¿Estas seguro que deseas eliminar este proveedor?")){
    this._proveedor.deleteProveedor(num).subscribe(data =>{
      this.toastr.warning("Se a eliminado un proveedor", "PROVEEDOR ELIMINADO")
      this.getProveedor();
    },error=>{
      this.error(error);
    })
  }
}

//RELLRNAR LOS CAMPOS DEL FORMULARIO PUT

  //PIPE
  get proveedoresFiltrados(): ProveedorInterface[] {
    return this.proveedores.filter(p => {
      return p.nombre_proveedor?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }



  /* LIMITE Y FUNCIONES DE LA TABLA */
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
  showTable(index: number) {
    this.maxToShow = index * 10;
    this.minToShow = this.maxToShow - 10;
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
