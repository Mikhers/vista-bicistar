import { Component } from '@angular/core';
import { InfoPaginaService } from './services/info-pagina.service';
// import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    public _servise: InfoPaginaService,
    ){ }
  
  ngOnInit(): void {  }

}
