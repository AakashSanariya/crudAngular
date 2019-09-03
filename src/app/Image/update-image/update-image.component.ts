import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, NgForm} from "@angular/forms";
import {ApiImageService} from "../../service/api-image.service";


@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiImageService) {
    // this.formCheck();
  }
  editImage: NgForm;
  ImageDetails: string;
  ImagePath: string;
  path: File = null;
  /* Form Validation*/
  /*formCheck(){
    this.editImage = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3)])],
      path: ['']
    });
  }*/

  /*For Image Select*/
  fileSelect(event){
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
    }
  }

  ngOnInit() {
    let Id = localStorage.getItem("EditId");
    if(!Id){
      alert("Invalid Action Please Try Again");
      this.router.navigate(['/listimage']);
    }
    
    this.apiService.getImageById(Id).subscribe(data => {
      // this.ImageName = data.data['ImageData'].name;
      this.ImageDetails = data.data['ImageData'];
      /*this.ImagePath ="http://192.168.10.184/ImageUploadApi/public/" +data.data['ImageData'].path;
      this.editImage.controls.name.setValue(data.data['ImageData'].name);
      this.editImage.controls.path.setValue(this.ImagePath);*/
    });
  }

  onSubmit(editImage:any){
    // if(this.editImage.invalid){
    //   return;
    // }
    console.log(editImage);
    if(!localStorage.getItem('EditId')){
      alert("Invalid Action Please Try Again.");
      this.router.navigate(['/listimage']);
    }
    let payLoad;

    /*If Image Not Update*/
    if(editImage.path == null){
      payLoad = {
        name: editImage.name,
        path: null,
        id: localStorage.getItem('EditId')
      }
    }
    else{
      payLoad = {
        name: editImage.name,
        path: this.path,
        id : localStorage.getItem('EditId')
      };

    }
    console.log(payLoad);
    this.apiService.updateImage(payLoad).subscribe(data => {
      alert("Image Update Successfully");
      this.router.navigate(['/listimage']);
    });
  }

}
