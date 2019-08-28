import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {
    this.checkForm();
  }

  loginForm: FormGroup;

  /*Validate Form*/
  checkForm(){
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }
  /* Login check Credential at Api Calling*/
  onSubmit(){
    if(this.loginForm.invalid){
      return true;
    }
    const loginPayLoad = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
  this.authService.login(loginPayLoad).subscribe(data => {
    if(data.meta['status_code'] === 200){
      window.localStorage.setItem('token', data.data['token']);
      this.router.navigate(['listimage']);
    }
    else{
      alert("!Opps Some Error Occurs while Login");
      this.router.navigate(['/login']);
    }
    });
  }


  /* For Validation Credentials*/
  ngOnInit() {
  }
}
