import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiImageService} from "../../service/api-image.service";

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router ,private apiService: ApiImageService) {
    this.checkForm();
  }

  addImage: FormGroup;
  path: File = null;
  spinner = false;
  /*Validation Form*/
  checkForm(){
    this.addImage = this.formBuilder.group({
      name : ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      path: ['', Validators.required],
    });
  }

  /* For Select File And Replace it*/
  fileSelect(event){
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
     this.addImage.controls.path.setValue(this.path);
    }
  }
  isvalidateForm = false;
  /* On Submit Api Call*/
  onSubmit(){
    this.spinner = true;
    this.isvalidateForm = false;
    if(this.addImage.invalid){
      return;
    }
    const addPayload = {
      name: this.addImage.controls.name.value,
      path:this.addImage.controls.path.value
    };
    this.isvalidateForm = true;
    this.apiService.addImage(addPayload).subscribe(data => {
      this.spinner = false;
      if(data.meta['status_code'] === 422){
        alert("Data Validation Error");
        this.spinner = false;
      }
      if(data.meta['status_code'] === 401){
        alert("You don't have permission to add image");
        this.spinner = false;
      }
      if(data.meta['status_code'] === 200){
        alert("Image Uploaded Successfully Please Check Your Email");
        this.router.navigate(['/listimage']);
      }
      else{
        alert("!Oops Some Error Occurs in Server");
        this.spinner = false;
      }
    });
  }
  ngOnInit() {
  }

}
