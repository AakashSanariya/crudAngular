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

  /*Edit Image Details*/
  getImageById(Id):Observable<ListImage>{
    let getImageDetails = this.http.get<ListImage>(this.baseUrl + '/editimage/'+Id);
    return getImageDetails;
  }

  /*Update Image Details*/
  updateImage(payLoad):Observable<ListImage>{
    console.log(payLoad);
    let formData = new FormData();
    formData.append('name', payLoad.name);
    formData.append('path', payLoad.path);
    console.log(formData);
    let update = this.http.post<ListImage>(this.baseUrl + '/updateimage/' + payLoad.id, formData);
    return update;
  }

  /* Delete Image*/
  deleteImage(deletePayload):Observable<ListImage>{
    let deleteImage = this.http.delete<ListImage>(this.baseUrl + '/deleteimage/' + deletePayload.id);
    return deleteImage;
  }
}
