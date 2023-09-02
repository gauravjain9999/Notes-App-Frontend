import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { environment } from "src/environments/environment";
import { UrlEndPoint } from "src/app/constants/urlEndPoints.constant";
import { NotifierService } from "angular-notifier";
import { NotesService } from "../services/notes.service";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  isCustomSpinner = true;
  constructor(private notifierService: NotifierService, private notesService: NotesService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeout = 0;
    let token: any= '';
    if(sessionStorage.getItem(('token'))){
      token = sessionStorage.getItem(('token'));
      // console.log('Token is',token);
    }

    if(httpRequest.url.includes(UrlEndPoint.getNotes) || httpRequest.url.includes(UrlEndPoint.editNotes)
    || httpRequest.url.includes(UrlEndPoint.deleteNotes) || httpRequest.url.includes(UrlEndPoint.addNotes)){
      this.notesService.customLoader(this.isCustomSpinner);
    }

    return next.handle(httpRequest.clone({ setHeaders: {'authorizationToken': token}
  })
  ).pipe(delay(timeout));
 }
}
