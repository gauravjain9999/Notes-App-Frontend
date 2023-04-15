import { NotifierService } from 'angular-notifier';
import { NotesService } from 'src/app/core/services/notes.service';
import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { map } from "rxjs";
import { HttpEventType } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from "@angular/forms";
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent {

  progress = 0;
  title = '';
  description = '';
  myFile: any; // Variable to store file
  image = '';
  requiredFieldTitle = false;
  requiredFieldDescription = false;
  message = '';
  imageFileSize = 0;
  fileSizeError = false;
  isFilePresent = false;

  formData = new FormGroup({
    title:  new FormControl('',  [Validators.required]),
    description:  new FormControl('',  [Validators.required]),
    image: new FormControl('',  [Validators.required])
  });

  constructor(public notifier: NotifierService, public service: NotesService, private dialogRef: MatDialogRef<AddNotesComponent>){}

  close(formData: any){
    this.dialogRef.close(formData);
  }

  fileSizeValidation(file: any){
    if(file === undefined || file === null){
      this.isFilePresent = true;
      return false;
    }
    const fileSize = (file.size / (1024*1024)).toFixed(2);
    this.imageFileSize = Number(fileSize);
    console.log('Size file', (this.imageFileSize), typeof(this.imageFileSize));
    if(this.imageFileSize > 10){
      this.fileSizeError = true;
      return false;
    }
    this.fileSizeError = false;
    this.isFilePresent = false;
    return true;
  }

  getFileDetails(event: any): any{
    this.fileSizeError = false;
    this.isFilePresent = false;
    this.myFile = event.target.files[0];
    console.log('Image is', this.myFile);

    if(!this.fileSizeValidation(this.myFile)){
      return false;
    }

    if(this.myFile){
      const reader = new FileReader();
      reader.readAsDataURL(this.myFile);
      reader.onload = (e:any) =>{
       this.image = e.target.result;
       console.log('Image is', this.image);
       if(this.image){
        window.localStorage.setItem('myImage', JSON.stringify(this.image));
       }
      };
    }
    this.notifier.notify('success', 'Image is Successfully uploaded.');
  }

  submitFile(){
    this.progress = 1;
    if(this.myFile){
      const formData = new FormData();
      formData.append('image', this.myFile);
      console.log('Form Data', formData);
      this.service.uploadFile(formData).pipe().subscribe(data =>{
        console.log('Data is', data);
      });
    }
  }

  removeFile(){
    this.myFile = null;
    this.image = '';
    this.fileSizeError = false;
    this.progress = 0;
    this.isFilePresent =  false;
  }

  onSubmit(): any{
    console.log('Add Form Submit', this.formData.value);
    if(!this.validateField()){
      return false;
    }
    if(!this.fileSizeValidation(this.myFile)){
      return false;
    }
    this.submitFile();
    if(this.formData.status === 'VALID'){
      delete this.formData.value.image;
      this.close(this.formData.value);
    }
  }

  validateField(){
    if(this.formData.value.title === ''){
      this.requiredFieldTitle = true;
      return false;
    }

    if(this.formData.value.description === ''){
      this.requiredFieldDescription = true;
      return false;
    }
    return true;
  }

  getFormData(event: any){
    if(event === 'title'){
      this.requiredFieldTitle = false;
    }
    else if(event === 'description'){
      this.requiredFieldDescription = false;
    }
  }

}
