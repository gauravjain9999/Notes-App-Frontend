
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NotesService } from "../core/services/notes.service";
import { Application } from "../core/model/notes.models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userName: any = '';
  password: any = '';
  email: any = '';
  phone: any = 0;
  userType: any = '';
  dialogData: any;
  errName = false;
  errEmail = false;
  errPhone = false;
  errUserType = false;
  errPassword = false;
  validateEmailFlag = false;
  maxPasswordLength = false;
  hide: boolean = true;
  genderList = ['Male', 'Female'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog, public notification: NotifierService,
    public router: Router, public service: NotesService){
    this.dialogData = data;
    console.log('Dialog data', this.dialogData);
  }

  register = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('',    [Validators.required, Validators.email]),
    phone: new FormControl('',    [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    userType: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    this.userName = this.register.value.username;
    this.email = this.register.value.email;
    this.phone = this.register.value.phone;
    this.userType = this.register.value.userType;
    this.password = this.register.value.password;
  }

  errorMessage(event: any){
    console.log('e');

    this.notification.notify('error', 'Name is Required');
    if(event === 'name'){
    }
  }

  onRegister(): any{
    this.onSubmit();
    if(!this.validateFormField()){
      return false;
    }

    if(this.register.value.username && this.register.value.password
      && this.register.value.password && this.register.value.phone){
      this.dialogData.reqData = this.register.value;
      this.service.registerUser(this.dialogData.reqData).subscribe((response: Application) =>{
        if(response.apiResponseStatus){
          console.log('Message', response.apiResponseData?.apiResponseMessage);
          this.notification.notify('success', response.apiResponseData?.apiResponseMessage);
          this.router.navigate(['/login']);
        }
        else{
          this.notification.notify('success', response.apiResponseData?.apiResponseMessage);
        }
      })
    }
  }

  patternValidation(email: string){
    if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/g).test(email) && email){
      return false;
    }
    return true;
  }

  validateFormField(){
    if(!this.userName){
      this.errName = true;
      this.errorMessage('name');
      return false;
    }

    if(!this.email){
      this.errEmail = true;
      return false;
    }

    if(!this.password){
      this.errPassword = true;
      return false;
    }

    if(!this.phone){
      this.errPhone = true;
      return false;
    }

    if(!this.userType){
      this.errUserType = true;
      return false;
    }

    if(!this.patternValidation(this.email)){
      this.validateEmailFlag = true;
      return false;
    }

    if(this.password.length < 8){
      this.maxPasswordLength = true;
      return false;
    }
    return true;
  }

  changeFormData(event: any){
    this.validateEmailFlag = false;
    console.log('Event is', event);
    if(event === 'Name'){
      this.errName = false;
    }
    else if(event === 'Email'){
      this.errEmail = false;
    }
    else if(event === 'Email' && this.patternValidation(this.email)){
      this.validateEmailFlag = false;
    }
    else if(event === 'phone'){
      this.errPhone = false;
    }
    else if(event === 'password'){
      this.errPassword = false;
    }
    else if(event === 'password' && this.password.length  < 8){
      this.maxPasswordLength = false;
    }
    else if(event === 'userType'){
      this.errUserType = false;
    }
  }

  changePassword(event: any) {
    this.password = event;
    this.errPassword = false;
    this.maxPasswordLength = false;
  }


  keyPressNumbers(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}

