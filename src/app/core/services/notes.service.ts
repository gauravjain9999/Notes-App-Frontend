import { UrlEndPoint } from '../../constants/urlEndPoints.constant';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(public http: HttpClient) { }

  getNotes(){
    const url = environment.apiServiceUrl + UrlEndPoint.getNotes;
    return this.http.get(url);
  }

  addNotes(notes:any){
    const url = environment.apiServiceUrl + UrlEndPoint.addNotes;
    return this.http.post(url, notes);
  }

  deleteNotes(objectId: any){
    const url = environment.apiServiceUrl + UrlEndPoint.deleteNotes;
    return this.http.delete(`${url}/${objectId}`);
  }

  editNotes(reqData: any){
    const url = environment.apiServiceUrl + UrlEndPoint.editNotes;
    const updatedUrl = `${url}/${reqData._id}`;
    return this.http.put(updatedUrl, reqData);
  }

  loginUser(reqData: any){
    const url = environment.apiServiceUrl + UrlEndPoint.loginUser;
    return this.http.post(url, reqData);
  }

  registerUser(reqData: any){
    const url = environment.apiServiceUrl + UrlEndPoint.signupUser;
    return this.http.post(url, reqData);
  }

}
