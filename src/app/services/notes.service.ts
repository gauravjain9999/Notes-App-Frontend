import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public http: HttpClient) { }

  getNotes(){
    return this.http.get(environment.apiServiceUrl + '/notes');
  }

  addNotes(notes:any){
    return this.http.post(environment.apiServiceUrl + '/add-notes', notes);
  }

  delete(objectId: any){
    return this.http.delete(environment.apiServiceUrl + `/delete/${objectId}`);
  }

}
