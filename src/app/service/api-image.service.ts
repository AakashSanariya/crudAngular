import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {AddImage} from "../Model/add-image";
import {ListImage} from "../Model/list-image";


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

  /*List Image*/
  getImageDetails():Observable<ListImage>{
    let image = this.http.get<ListImage>(this.baseUrl);
    return image;
  }

  /*Edit Image Detisl*/
  getImageById(Id):Observable<ListImage>{
    let getImageDetails = this.http.get<ListImage>(this.baseUrl + '/editimage/'+Id);
    return getImageDetails;
  }

  /* Delete Image*/
  deleteImage(deletePayload):Observable<ListImage>{
    let deleteImage = this.http.delete<ListImage>(this.baseUrl + '/deleteimage/' + deletePayload.id);
    return deleteImage;
  }
}
