import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {


  constructor(){}

  ngOnInit(): void {}

  openLink($event: any){
    console.log('event is', $event);
  }

  loginUser(){

  }
}
