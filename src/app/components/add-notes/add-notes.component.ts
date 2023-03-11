import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {

  formData: any = {};
  title: string = '';
  description: string = '';
  myFile: any; // Variable to store file
  photo = '';

  constructor( private dialogRef: MatDialogRef<AddNotesComponent>){}

  ngOnInit(): void {}

  close(){
    this.dialogRef.close();
  }

  getFileDetails(event: any){
    this.myFile = event.target.files[0];
    var sizeInMB = (this.myFile.size / (1024*1024)).toFixed(2);
    console.log('Size file', sizeInMB);

    console.log('Image is', this.myFile);
    if(this.myFile){
      const reader = new FileReader();
      reader.readAsDataURL(this.myFile);

      reader.onload = (e:any) =>{
       this.photo = e.target.result;
       if(this.photo){
         window.localStorage.setItem('myImage', JSON.stringify(this.photo));
       }
      };
     }
  }

  onSubmit(){}

}
