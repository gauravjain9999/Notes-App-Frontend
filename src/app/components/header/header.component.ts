import { NotifierService } from 'angular-notifier';
import { NotesService } from 'src/app/core/services/notes.service';
import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { FormControl } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{

  @ViewChild('sidenav') drawer?: MatSidenav;
  hideRequiredControl = new FormControl(false);
  mediaFlagObserver = false;

  constructor(public notificationService: NotifierService,  private notesList: NotesService, public mediaObserver: MediaObserver, private router: Router,
  ) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      this.mediaFlagObserver =(media[1].mqAlias === 'lt-md') ? true : false;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {}

  refreshPage(){
   window.location.reload();
  }

  dashboardRedirect(){
    this.router.navigate(['/notes-app']);
  }

  close(event: any) {
    this.drawer?.close();
  }

  userProfile(){
    this.router.navigate(['user-profile']);
  }

  logOut(){
    sessionStorage.removeItem('user-info');
    sessionStorage.removeItem('token');
    localStorage.removeItem('myImage');
    // this.notificationService.notify('success', 'You are successfully logout.')
  }
}
