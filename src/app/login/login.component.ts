import { LoginRegisterComponent } from './../components/login-regsiter/login-register.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddNotesComponent } from "../components/add-notes/add-notes.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  email: any = '';
  password: any = '';
  hide : boolean = true;
  dialogData: any;
  errEmail = false;
  errPassword = false;
  validateEmailFlag = false;
  maxPasswordLength = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, private dialogRef: MatDialogRef<LoginRegisterComponent>){
    this.dialogData = data;
  }

  login = new FormGroup ({
    email: new FormControl('',    [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void {

  }

  changePassword(event: any) {
    this.password = event;
    this.errPassword = false;
    this.maxPasswordLength = false;
  }

  onSubmit() {
  }

  onLogin(): any{

    if(!this.validateFormField()){
      return false;
    }

    if(this.login.value.email && this.login.value.password){
      this.dialogData.reqData = this.login.value;
      this.dialogRef.close(this.dialogData);
    }
  }

  patternValidation(email: string){
    if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g).test(email) && email){
      return false;
    }
    return true;
  }

  validateFormField(){
    if(!this.email){
      this.errEmail = true;
      return false;
    }
    if(!this.patternValidation(this.email)){
      this.validateEmailFlag = true;
      return false;
    }
    if(!this.password){
      this.errPassword = true;
      return false;
    }

    if(this.password.length < 8){
      this.maxPasswordLength = true;
      return false;
    }
    return true;
  }

  getFormData(event: any){
    this.email = event;
    this.errEmail = false;
    this.validateEmailFlag = false;
  }
}
