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
    // this.checkForm();
  }

  addImage: FormGroup;
  path: File = null;
  /*Validation Form*/
  checkForm(){
    this.addImage = this.formBuilder.group({
      name : ['', Validators.required],
      path: ['', Validators.required]
    });
  }

  fileSelect(event){
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
     this.addImage.controls.path.setValue(this.path);
    }
  }

  /* On Submit Api Call*/
  onSubmit(){
    if(this.addImage.invalid){
      return true;
    }
    const addPayload = {
      name: this.addImage.controls.name.value,
      path: this.addImage.controls.path.value
    };
    console.log(addPayload);
    this.apiService.addImage(addPayload).subscribe(data => {
      console.log(data);
    });
  }
  ngOnInit() {
    this.addImage = this.formBuilder.group({
      name : ['', Validators.required],
      path: ['', Validators.required]
    });
  }

}
