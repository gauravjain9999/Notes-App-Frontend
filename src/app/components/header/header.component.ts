import { Component, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { FormControl } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('sidenav') drawer?: MatSidenav;
  hideRequiredControl = new FormControl(false);
  mediaFlagObserver = false;

  constructor(public mediaObserver: MediaObserver) { }

  ngOnInit(): void {

    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      this.mediaFlagObserver =(media[1].mqAlias === 'lt-md') ? true : false;
    })

  }


  close(event: any) {
    this.drawer?.close();
  }



}
