import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout = 0;
    let token: any= '';
    if(sessionStorage.getItem(('token'))){
      token = sessionStorage.getItem(('token'));
      console.log('Token is',token);
    }
    return next.handle(httpRequest.clone({ setHeaders: {'authorizationToken': token}
  })
  ).pipe(delay(timeout));
 }
}
