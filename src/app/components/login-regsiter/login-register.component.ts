import { Application} from './../../core/model/notes.models';
import { NotesService } from 'src/app/core/services/notes.service';
import { RegisterComponent } from './../../register/register.component';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NotifierService } from "angular-notifier";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  constructor(private router: Router, public notifier: NotifierService, public dialog: MatDialog, private service: NotesService){}

  ngOnInit(): void {}

  loginUser(){
    const dialogRef = this.dialog.open(LoginComponent, {
      data:{
        modal: true,
        reqData: {}
      },
      height: '350px',
      width: '450px',
    })

    dialogRef.afterClosed().subscribe(result => {
       if(result.modal){
        this.service.loginUser(result.reqData).subscribe((result: Application) =>{
          console.log('Result is', result);
          if(result.apiResponseStatus){
            sessionStorage.setItem('token', JSON.stringify(result.apiResponseData?.authorizationToken))
            this.notifier.notify('success', `Welcome ${result.apiResponseData?.name} to your Notes Application`);
            this.router.navigate(['notes-app']);
          }
        },
        (catchError) =>{
          this.notifier.notify('error', catchError.error.message);
        })
      }
    });
  }

  registerUser(){
    const dialogRef = this.dialog.open(RegisterComponent, {
      data:{
        modal: true,
        reqData: {}
      },
      height: '600px',
      width: '570px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result.modal){
        this.service.registerUser(result.reqData).subscribe((result: Application) =>{
          this.notifier.notify('success', result.apiResponseData?.apiResponseMessage);
        },
        (catchError) =>{
          this.notifier.notify('error', catchError.error.message);
        })
      }
    });
  }
}
