import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = false;

  OnInit(){
    if (this.cookieService.check("token")){
      this.loggedIn = true;
    }
  }

  constructor(
    private cookieService: CookieService,
    private router: Router) { }

  login(token: string) {
    // Simulamos el inicio de sesión y establecemos el estado de inicio de sesión en verdadero.
    this.cookieService.set('token', token, 3, '/');
    this.loggedIn = true;
    this.router.navigate(['/'])
  }
  
  logout() {
    // Simulamos el cierre de sesión y establecemos el estado de inicio de sesión en falso.
    this.cookieService.delete("token")
    localStorage.removeItem("persona")
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    // Devolvemos el estado de inicio de sesión actual.
    return this.loggedIn;
  }
}
  
