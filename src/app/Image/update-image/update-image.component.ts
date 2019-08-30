import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiImageService} from "../../service/api-image.service";

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiImageService) {
    this.formCheck();
  }
  editImage: FormGroup;
  ImageName: string;
  ImagePath: string;
  path: File = null;
  /* Form Validation*/
  formCheck(){
    this.editImage = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3)])],
      path: ['']
    });
  }

  /*For Image Select*/
  fileSelect(event){
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
      this.editImage.controls.path.setValue(this.path);
    }
  }

  ngOnInit() {
    let Id = localStorage.getItem("EditId");
    if(!Id){
      alert("Invalid Action Please Try Again");
      this.router.navigate(['/listimage']);
    }
    
    this.apiService.getImageById(Id).subscribe(data => {
      this.editImage.controls.name.setValue(data.data['ImageData'].name);
      this.editImage.controls.path.setValue(data.data['ImageData'].path);
      this.ImageName = data.data['ImageData'].name;
      this.ImagePath = data.data['ImageData'].path;
    });
  }

  onSubmit(){
    if(!localStorage.getItem('EditId')){
      alert("Invalid Action Please Try Again.");
      this.router.navigate(['/listimage']);
    }
    const payLoad = {
      name: this.editImage.controls.name.value,
      path: this.editImage.controls.path.value,
      id : localStorage.getItem('EditId')
    };
    this.apiService.updateImage(payLoad).subscribe(data => {
      alert("Image Update Successfully");
      this.router.navigate(['/listimage']);
    });
  }

}
