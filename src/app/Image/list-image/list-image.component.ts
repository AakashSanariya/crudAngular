import { Component, OnInit } from '@angular/core';
import {ApiImageService} from "../../service/api-image.service";
import {ListImage} from "../../Model/list-image";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-image',
  templateUrl: './list-image.component.html',
  styleUrls: ['./list-image.component.css']
})
export class ListImageComponent implements OnInit {

  constructor(private apiService: ApiImageService, private router: Router) {

  }
  images: ListImage[];
  spinner = true;

  /* For Listing Image Data*/
  ngOnInit() {
    this.apiService.getImageDetails().subscribe(data => {
      this.images = data.data['ImageData'];
      this.spinner = false;
    });
  }

  /* For Editing Image Details*/
  editImage(editPayload){
    localStorage.removeItem('EditId');
    localStorage.setItem('EditId', editPayload.id);
    this.router.navigate(['/editimage']);
  }

  /* For Deleting Image Details*/
  deleteImage(deletePayLoad){
    this.apiService.deleteImage(deletePayLoad).subscribe(data => {
      alert("Image Deleted Successfully");
      this.router.navigate(['/addimage']);
    });
  }

}
