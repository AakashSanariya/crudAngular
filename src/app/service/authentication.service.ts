import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../Model/api-response";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl = "http://api.imageupload.com/api";

  /* For Login */
  login(loginPayLoad):Observable<ApiResponse>{
    let token = this.http.post<ApiResponse>(this.baseUrl + '/users/login',loginPayLoad);
    return token;
  }

  /* For Logout */
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
