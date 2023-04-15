import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  userData: any;
  name: any;
  phoneNumber: any;
  userProfile = new FormGroup ({
    name: new FormControl('',    [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  constructor(){
   if(sessionStorage.getItem('user-info')){
    this.userData = JSON.parse(sessionStorage.getItem('user-info') as string);
    console.log('USer Data', this.userData);
    this.name = this.userData.userName;
    this.phoneNumber = this.userData.phone;
   }

  }

  ngOnInit(): void {
  }


}
