import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SedeInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {
  sedes: SedeInterface[]=[];
  ngOnInit(): void{
    this.getSede();
  }
  constructor(
    private router: Router,
    private _sede: SedeService
    ){}

  /*METODOS HTTP*/
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }
  cambiarSede(id: number) {
    this.router.navigate(['/producto-sede', id]);
  }




  @ViewChild('modal') modal!: ElementRef;

  openModal() {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modal.nativeElement.style.display = 'none';
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target === this.modal.nativeElement) {
      this.closeModal();
    }
  }


}
