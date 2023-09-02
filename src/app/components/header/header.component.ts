import { NotifierService } from 'angular-notifier';
import { NotesService } from 'src/app/core/services/notes.service';
import { Component, ViewChild, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() refreshApplicationList = new EventEmitter<boolean>();
  hideRequiredControl = new FormControl(false);
  mediaFlagObserver = false;


  constructor(public notificationService: NotifierService,  private notesService: NotesService, public mediaObserver: MediaObserver, private router: Router,
  ) { }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      this.mediaFlagObserver =(media[1].mqAlias === 'lt-md') ? true : false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  refreshPage(){
    this.notesService.customLoader(true);
    this.refreshApplicationList.emit(true);
  }

  dashBoardNavigate(){
    this.router.navigate(['notes-app']);
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
    this.router.navigate(['/login']);
    // this.notificationService.notify('success', 'You are successfully logout.')
  }
}
