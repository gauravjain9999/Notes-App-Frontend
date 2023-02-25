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

  constructor( private dialogRef: MatDialogRef<AddNotesComponent>){}

  ngOnInit(): void {}

  close(){
    this.dialogRef.close();
  }

  onSubmit(){}

}
