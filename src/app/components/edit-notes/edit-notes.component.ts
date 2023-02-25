import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  formData: any = {};
  title: any = '';
  description: any='';
  dialogData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, private dialogRef: MatDialogRef<EditNotesComponent>){
    this.dialogData = data;
    this.formData.title = this.dialogData.reqData.item.title;
    this.formData.description =  this.dialogData.reqData.item.description;
  }
  ngOnInit(): void {}

  onSubmit(){
    this.getFormData();
    if(this.formData.title && this.formData.description){
      this.dialogRef.close(this.dialogData);
    }
  }

  getFormData(){
    this.dialogData.reqData.item.title = this.formData.title;
    this.dialogData.reqData.item.description = this.formData.description;
  }

  close(){
    this.dialogRef.close(false);
  }

}
