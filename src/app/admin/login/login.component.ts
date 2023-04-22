import { Component } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formUser = new FormGroup({
    email_empleado: new FormControl("", [Validators.required, Validators.email]),
    password_empleado: new FormControl("", [Validators.required])
  })

  constructor(
    private _empleado: EmpleadosService,
    private toastr: ToastrService,
    private _auth: AuthService
    // private router: Router
  ){}


  ngOnInit(): void {
  }
  accessUser(){
    const DATA = {
      email_empleado: this.formUser.get("email_empleado")?.value ?? "",
      password_empleado: this.formUser.get("password_empleado")?.value ?? "",
    }
    this._empleado.postvalidarEmpleado(DATA).subscribe((data:any[])=>{
      localStorage.setItem("token", data[0])
      localStorage.setItem("persona", JSON.stringify(data[1]))
      this._auth.login();

    },error=>{
      this.error(error);
    })
  }
  error(error:any){
    this.toastr.error("Error en el usuario o contraseña", "ERROR DE AUTENTICACIÓN")
    console.log(error)
  }
}
