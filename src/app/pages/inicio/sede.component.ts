import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SedeInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {
  showPut=false;
  idSede=0
  sedes: SedeInterface[]=[];
  ngOnInit(): void{
    this.getSede();
  }
  constructor(
    private toastr: ToastrService,
    private _sede: SedeService
    ){}

    formSede = new FormGroup({
      nombre_sede: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      direccion_sede: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      ciudad_sede: new FormControl('',[Validators.required, Validators.maxLength(255)])
    })

  /*METODOS HTTP*/
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }
  posSede(){
    const SEDE: SedeInterface = {
      nombre_sede: this.formSede.get('nombre_sede')?.value ?? "",
      direccion_sede: this.formSede.get('direccion_sede')?.value ?? "",
      ciudad_sede: this.formSede.get('ciudad_sede')?.value ?? "",
    }
    this._sede.postSede(SEDE).subscribe(data=>{
      this.getSede();
      this.closeModal();
      this.formSede.reset();
    },error=>{
      this.error(error);
    })
  }
  getIdSede(num: any){
    this.showPut = true;
    this.openModal();
    this._sede.getIdSede(num).subscribe((data:SedeInterface)=>{
      this.idSede = data.id_sede ?? 1;
      this.formSede.setValue({
        nombre_sede: data.nombre_sede,
        direccion_sede: data.direccion_sede,
        ciudad_sede: data.ciudad_sede
      })
    })
  }
  putSede(){
    const SEDE: SedeInterface = {
      id_sede: this.idSede,
      nombre_sede: this.formSede.get('nombre_sede')?.value ?? "",
      direccion_sede: this.formSede.get('direccion_sede')?.value ?? "",
      ciudad_sede: this.formSede.get('ciudad_sede')?.value ?? ""
    }
    this._sede.putSede(this.idSede,SEDE).subscribe(data =>{
      this.toastr.info('La sede ' + SEDE.nombre_sede + ' fue actualizada exitosamente!', 'SEDE ACTUALIZADA');
      this.getSede();
      this.closeModal();
    },error=>{
      this.error(error);
    })
  }
  dropSede(num:any){
    if(window.confirm("¿Esta seguro que desea eliminar la sede?")){
    this._sede.deleteSede(num).subscribe(data=>{
    this.toastr.error('Sede Eliminada', 'SEDE ELIMINADA');
    this.getSede();
    },error=>{
      this.error(error);
    })
  }
}





//FUNCIONES MODAL
  @ViewChild('modal') modal!: ElementRef;
  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }
  closeModal() {
      this.formSede.reset()
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
  this.toastr.error("Hubo un error inesperado en el sistema", "ALGO A SALIDO MAL")
  console.log(error)
}
}
