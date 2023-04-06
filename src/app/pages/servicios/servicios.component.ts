import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE

//SERVICE

//FROMS
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';
import { CategoriaServicioInterface, ServiciosInterface } from 'src/app/interfaces/bicistar-api.Interface';
import { CategoriaServicioService } from 'src/app/services/categoria-servicio.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent {

  @ViewChild('top', {static: false}) topElement!: ElementRef;
  searchTerm: string = '';
  titulo: string = 'Servicios bicistar';
  pageSize: number = 20;
  maxToShow = 20;
  minToShow = 0;
  showPut = false;
  id_pro = 0;
  ini = 1;
  fin = 7;
  totalItems: number = 0;
  itemsLista: number = 0;

  servicios: ServiciosInterface[] = [];
  categorias: CategoriaServicioInterface[] = [];


//FUNCION DEL | search
  currentPage: number = 1;
  get serviciosFiltrados(): ServiciosInterface[] {
    return this.servicios.filter(p => {
      return p.nombre_servicio?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  constructor(
    private toastr: ToastrService,
    private _servicio: ServiciosService,
    private _categoriaS: CategoriaServicioService) {
    }


formServicio = new FormGroup({
      nombre_servicio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      descripcion_servicio: new FormControl('', [Validators.maxLength(300)]),
      precio_servicio: new FormControl('', [Validators.required]),
      id_categoria_servicio: new FormControl('', [Validators.required]),
    })

  ngOnInit(): void {
    this.showPut = false;
    this.getC()
      this.getP()
  }

//FUNCION PARA TODOS LOS servicios
  getP() {
    this._servicio.getservicio().subscribe((data: ServiciosInterface[]) => {
      this.servicios = data;
      this.totalItems = this.servicios.length
      this.itemsLista = Math.ceil(this.totalItems / 20 + 1);
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  agregarservicio(){
    const SERVICIO: ServiciosInterface = {
      nombre_servicio: this.formServicio.get('nombre_servicio')?.value ?? "",
      descripcion_servicio: this.formServicio.get('descripcion_servicio')?.value ?? "",
      precio_servicio: parseFloat(this.formServicio.get('precio_servicio')?.value as string),
      id_categoria_servicio: parseInt(this.formServicio.get('id_categoria_servicio')?.value as string)
    }

    this._servicio.postservicio(SERVICIO).subscribe(data => {
      this.toastr.success('El servicio ' + SERVICIO.nombre_servicio + ' fue agregado exitosamente!', 'SERVICIO AGREGADO');
    this.closeModal()
      this.getP()
      this.formServicio.reset();
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })

  }
  putP(id: any){
    const SERVICIO: ServiciosInterface = {
      nombre_servicio: this.formServicio.get('nombre_servicio')?.value ?? "",
      descripcion_servicio: this.formServicio.get('descripcion_servicio')?.value ?? "",
      precio_servicio: parseFloat(this.formServicio.get('precio_servicio')?.value as string),
      id_categoria_servicio: parseInt(this.formServicio.get('id_categoria_servicio')?.value as string)
    }
      this._servicio.putservicio(id, SERVICIO).subscribe(data => {
        this.toastr.info('El servicio ' + SERVICIO.nombre_servicio + ' fue actualizado exitosamente!', 'SERVICIO ACTUALIZADO');
    this.closeModal()
        this.showPut = false;
        this.getP()
        this.formServicio.reset();
      }, error => {
        this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
        console.log(error)
      })
  }
  dropP(id: any){
    if(window.confirm("¿Estás seguro de que deseas eliminar este servicio?")){
      this._servicio.deleteservicio(id).subscribe(data => {
        this.toastr.warning('El servicio fue eliminado exitosamente!', 'SERVICIO ELIMINADO');
        this.getP()
      }, error => {
        this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
        console.log(error)
      })
      this.formServicio.reset();
    }
  }
  obtenerId(id: any){
    this.showPut = true;
    this.openModal()
    this.scrollToTop()
    
    this._servicio.getIdservicio(id).subscribe(data => {
      this.id_pro = data.id_servicio;
      this.formServicio.setValue({
        nombre_servicio: data.nombre_servicio,
        descripcion_servicio: data.descripcion_servicio,
        precio_servicio: data.precio_servicio,
        id_categoria_servicio: data.id_categoria_servicio
      });

    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
    this.formServicio.reset();
  }

  //TRAER CATEGORIAS
  getC() {
    this._categoriaS.getCategoria().subscribe((data: CategoriaServicioInterface[]) => {
      this.categorias = data;
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
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



  //FUNCIONES MODAL
@ViewChild('modal') modal!: ElementRef;
openModal() {
  this.getP();
  this.modal.nativeElement.style.display = 'block';
}
closeModal() {
    this.formServicio.reset()
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
