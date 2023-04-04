import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE
import { CategoriaServicioInterface } from 'src/app/interfaces/bicistar-api.Interface';

//SERVICE
import { CategoriaServicioService } from 'src/app/services/categoria-servicio.service';

//FROMS
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categorias-servicios',
  templateUrl: './categorias-servicios.component.html',
  styleUrls: ['./categorias-servicios.component.css']
})
export class CategoriasServiciosComponent {

  searchTerm: string = '';
  titulo = 'Categoria de servicios'
  categoriaS: CategoriaServicioInterface[] = [];
  idCategoria=0;

  showPut = false;
  totalItemsP = 0;
  maxToShow = 10;
  minToShow = 0;
  ini = 1;
  fin = 6;
  itemsLista: number = 0;

  constructor(
    private toastr: ToastrService,
    private _categoriaS: CategoriaServicioService
  ) { }

  /*FORMULARIO GROUP*/
  formCategoriaS = new FormGroup({
    nombre_servicio: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descripcion_servicio: new FormControl('', [Validators.maxLength(300)])
  })


  ngOnInit(): void {
    this.getCP()
  }
  @ViewChild('top', {static: false}) topElement!: ElementRef;
  scrollToTop() {
    this.topElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  /* METODOS GET POST PUT DELETE DEL SERVICIO _CATEGORIAP  */
  getCP() {
    this._categoriaS.getCategoria().subscribe(data => {
      this.categoriaS = data;
      this.totalItemsP = data.length
      this.itemsLista = Math.ceil(this.totalItemsP / 10 + 1)
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL');
      console.log(error)
    })
  }
  postCP() {
    const CATEGORIA: CategoriaServicioInterface ={
      nombre_servicio: this.formCategoriaS.get('nombre_servicio')?.value ?? "",
      descripcion_servicio: this.formCategoriaS.get('descripcion_servicio')?.value ?? ""
    }
    this._categoriaS.postCategoria(CATEGORIA).subscribe(data => {
      this.toastr.success('La categoria ' + CATEGORIA.nombre_servicio + ' fue agregada exitosamente!', 'CATEGORIA CREADA');
      this.closeModal();
      this.formCategoriaS.reset()
      this.getCP()
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  putCP(id: any) {
      const CATEGORIA: CategoriaServicioInterface = {
        nombre_servicio: this.formCategoriaS.get('nombre_servicio')?.value ?? "",
        descripcion_servicio: this.formCategoriaS.get('descripcion_servicio')?.value ?? ""
      }
        this._categoriaS.putCategoria(id, CATEGORIA).subscribe(data => {
          this.toastr.info('La categoria ' + CATEGORIA.nombre_servicio + ' fue actualizada exitosamente!', 'CATEGORIA ACTUALIZADA');
          this.closeModal();
          this.showPut = false;
          this.getCP()
          this.formCategoriaS.reset();
        }, error => {
          this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
          console.log(error)
        })
    }
  deleteCP(id: any){
    if(window.confirm("¿Estás seguro de que deseas eliminar esta categoria?")){
    this._categoriaS.deleteCategoria(id).subscribe(data =>{
      this.toastr.warning('La categoria fue eliminada exitosamente!', 'CATEGORIA ELIMINADA');
      this.getCP();
    },error=>{
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.warn(error)
    })
  }
}

//RELLRNAR LOS CAMPOS DEL FORMULARIO PUT
obtenerId(id: any){
  this.showPut = true;
  this.scrollToTop();
  this.openModal();
  
  this._categoriaS.getIdCategoria(id).subscribe(data => {
    this.idCategoria = data.id_categoria_servicio;
    this.formCategoriaS.setValue({
      nombre_servicio: data.nombre_servicio,
      descripcion_servicio: data.descripcion_servicio
    });

  }, error => {
    this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
    console.log(error)
  })
  this.formCategoriaS.reset();
}

  //PIPE
  get categoriaPFiltrados(): CategoriaServicioInterface[] {
    return this.categoriaS.filter(p => {
      return p.nombre_servicio?.toLowerCase().includes(this.searchTerm.toLowerCase());
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
  this.getCP();
  this.modal.nativeElement.style.display = 'block';
}
closeModal() {
    this.formCategoriaS.reset()
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
