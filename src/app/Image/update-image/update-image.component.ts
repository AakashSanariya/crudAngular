import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiImageService} from "../../service/api-image.service";
import {Input} from "@angular/compiler/src/core";

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiImageService) {
    // this.formCheck();
  }
  editForm: FormGroup;
  /* Form Validation*/
  formCheck(){
    this.editForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      path: ['', Validators.required]
    });
  }

  ngOnInit() {
    let Id = localStorage.getItem("EditId");
    if(!Id){
      alert("Invalid Action Please Try Again");
      this.router.navigate(['/listimage']);
    }
    
    this.apiService.getImageById(Id).subscribe(data => {
      this.editForm.get('name').setValue(data.data['ImageData'].name);
    });
  }

}
