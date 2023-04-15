import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  formData: any = {
    title: '',
    description: ''
  };
  title: any = '';
  description: any='';
  dialogData: any;
  requiredFieldTitle: boolean = false;
  requiredFieldDescription: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, private dialogRef: MatDialogRef<EditNotesComponent>){
    this.dialogData = data;
    this.formData.title = this.dialogData.reqData.item.title;
    this.formData.description =  this.dialogData.reqData.item.description;
  }

  ngOnInit(): void {}




  getFormDataChange(event: any){
    if(event === 'title'){
      this.requiredFieldTitle = false;
    }
    else if(event === 'description'){
      this.requiredFieldDescription = false;
    }
  }

  validateField(){

    if(this.formData.title === ''){
      this.requiredFieldTitle = true;
      return false;
    }

    if(this.formData.description === ''){
      this.requiredFieldDescription = true;
      return false;
    }
    return true;
  }

  onSubmit(): any{
    this.getFormData();

    if(!this.validateField()){
      return false;
    }

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
