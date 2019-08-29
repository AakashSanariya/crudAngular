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

  /* Add Image To Server*/
  addImage(addPayload): Observable<AddImage>{
    let formData = new FormData();
    formData.append('name', addPayload.name);
    formData.append('path', addPayload.path);
    let name = this.http.post<AddImage>(this.baseUrl + '/uploadimage', formData);
    return name;
  }
}
