import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { UrlEndPoint } from "src/app/constants/urlEndPoints.constant";
import { NotesService } from "../services/notes.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  @Output() closeGlobalOverlay = new EventEmitter<any>();
  isCustomSpinner: boolean = false;

  constructor(
    private notifierService: NotifierService, private notesService: NotesService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if(event && event.body.apiResponseStatus && event.status === 200
            && (request.url.includes(UrlEndPoint.editNotes) || request.url.includes(UrlEndPoint.deleteNotes)
            || request.url.includes(UrlEndPoint.addNotes) || request.url.includes(UrlEndPoint.getNotes))){
            this.notesService.customLoader(this.isCustomSpinner);
          }
        }
        return event;
      }),
      catchError((response: any)=> {
        this.notesService.customLoader(this.isCustomSpinner);
        return throwError(() => new Error(response))
      }))
    }
}
