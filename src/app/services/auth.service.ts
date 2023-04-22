import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = false;

  constructor() { }

  login() {
    // Simulamos el inicio de sesión y establecemos el estado de inicio de sesión en verdadero.
    this.loggedIn = true;
  }
  
  logout() {
    // Simulamos el cierre de sesión y establecemos el estado de inicio de sesión en falso.
    this.loggedIn = false;
    localStorage.removeItem("persona")
    localStorage.removeItem("token")
  }

  isLoggedIn(): boolean {
    // Devolvemos el estado de inicio de sesión actual.
    return this.loggedIn;
  }
}
  
