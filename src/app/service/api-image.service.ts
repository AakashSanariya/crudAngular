import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {AddImage} from "../Model/add-image";


@Injectable({
  providedIn: 'root'
})
export class ApiImageService {

  constructor(private http: HttpClient) { }
  
  baseUrl: string = 'http://api.imageupload.com/api';
  
  addImage(addPayload): Observable<AddImage[]>{
    
    let name = this.http.post<AddImage[]>(this.baseUrl + '/uploadimage', addPayload);
    return name;
  }
}
