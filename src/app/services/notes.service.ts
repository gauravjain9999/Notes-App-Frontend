import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = "http://localhost:7000";

  constructor(public http: HttpClient) { }

  getNotes(){
    return this.http.get(this.baseUrl + '/notes');
  }

  addNotes(notes:any){
    return this.http.post(this.baseUrl + '/add-notes', notes);
  }

}
