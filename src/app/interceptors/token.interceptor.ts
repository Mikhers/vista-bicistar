import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // Obtener la cookie de token
    const token = this.cookieService.get('token');
    console.log(token)

    // Si existe la cookie de token, agregar el encabezado de autorización con el token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
