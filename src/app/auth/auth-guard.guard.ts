import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanActivate{
  constructor(private router: Router, private authService: AuthenticationService){ }

  canActivate(router: ActivatedRouteSnapshot, status: RouterStateSnapshot){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      alert("Please Login First");
      this.router.navigate(['/login']);
    }
  }
}
