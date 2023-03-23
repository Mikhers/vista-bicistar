import { Component, OnInit } from '@angular/core';
import { SedeInterface } from '../../interfaces/bicistar-api.Interface';
import { SedeService } from '../../services/sede.service';

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
    private _sede: SedeService
    ){}

  /*METODOS HTTP*/
  getSede(){
    this._sede.getSede().subscribe(data =>{
      this.sedes = data;
    })
  }



}
