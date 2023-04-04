import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

//INTERFACE
import { categoriaInterface } from '../../../interfaces/bicistar-api.Interface';

//SERVICE
import { CategoriaService } from '../../../services/categoria.service';

//FROMS
import { FormGroup, Validators, FormControl } from '@angular/forms';

//MENSAJE BONITO
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  searchTerm: string = '';
  titulo = 'Categoria de productos'
  categoriasP: categoriaInterface[] = [];
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
    private _categoriaP: CategoriaService
  ) { }

  /*FORMULARIO GROUP*/
  formCategoria = new FormGroup({
    nombre_categoria_producto: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    descripcion_categoria_producto: new FormControl('', [Validators.maxLength(300)])
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
    this._categoriaP.getCategoria().subscribe(data => {
      this.categoriasP = data;
      this.totalItemsP = data.length
      this.itemsLista = Math.ceil(this.totalItemsP / 10 + 1)
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL');
      console.log(error)
    })
  }
  postCP() {
    const CATEGORIA: categoriaInterface ={
      nombre_categoria_producto: this.formCategoria.get('nombre_categoria_producto')?.value ?? "",
      descripcion_categoria_producto: this.formCategoria.get('descripcion_categoria_producto')?.value ?? ""
    }
    this._categoriaP.postCategoria(CATEGORIA).subscribe(data => {
      this.toastr.success('La categoria ' + CATEGORIA.nombre_categoria_producto + ' fue agregada exitosamente!', 'CATEGORIA CREADA');
      this.closeModal();
      this.formCategoria.reset()
      this.getCP()
    }, error => {
      this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
      console.log(error)
    })
  }
  putCP(id: any) {
      const CATEGORIA: categoriaInterface = {
        nombre_categoria_producto: this.formCategoria.get('nombre_categoria_producto')?.value ?? "",
        descripcion_categoria_producto: this.formCategoria.get('descripcion_categoria_producto')?.value ?? ""
      }
        this._categoriaP.putCategoria(id, CATEGORIA).subscribe(data => {
          this.toastr.info('La categoria ' + CATEGORIA.nombre_categoria_producto + ' fue actualizada exitosamente!', 'CATEGORIA ACTUALIZADA');
          this.closeModal();
          this.showPut = false;
          this.getCP()
          this.formCategoria.reset();
        }, error => {
          this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
          console.log(error)
        })
    }
  deleteCP(id: any){
    if(window.confirm("¿Estás seguro de que deseas eliminar este producto?")){
    this._categoriaP.deleteCategoria(id).subscribe(data =>{
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
  
  this._categoriaP.getIdCategoria(id).subscribe(data => {
    this.idCategoria = data.id_categoria_producto;
    this.formCategoria.setValue({
      nombre_categoria_producto: data.nombre_categoria_producto,
      descripcion_categoria_producto: data.descripcion_categoria_producto
    });

  }, error => {
    this.toastr.error("Hubo un error inesperado en el sistema", 'ALGO SALIO MAL')
    console.log(error)
  })
  this.formCategoria.reset();
}

  //PIPE
  get categoriaPFiltrados(): categoriaInterface[] {
    return this.categoriasP.filter(p => {
      return p.nombre_categoria_producto?.toLowerCase().includes(this.searchTerm.toLowerCase());
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
    this.formCategoria.reset()
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
