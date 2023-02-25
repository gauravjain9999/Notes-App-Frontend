import { catchError } from 'rxjs';
import { ApiResponseData, Application } from './../../core/model/notes.models';
import { AddNotesComponent } from './../add-notes/add-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { NotesService } from "src/app/services/notes.service";
import { EditNotesComponent } from "../edit-notes/edit-notes.component";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  dashboardGridCols: number = 4;
  titleNotes: string = '';
  descriptionNotes: string = '';
  listApp: any[] = [];
  searchValue: string = '';

  constructor( private notifierService: NotifierService,  public mediaObserver: MediaObserver,
    public dialog: MatDialog, private service: NotesService){
    this.getListNotes()
  }

  ngOnInit(): void {
    this.mediaObserver.asObservable().subscribe((media: MediaChange[]) =>{
      if(media.some(mediaChange => mediaChange.mqAlias == 'lt-sm')){
        this.dashboardGridCols = 1;
      }
      else if(media.some(mediaChange => mediaChange.mqAlias == 'lt-md')){
        this.dashboardGridCols = 2;
      }
      else{
        this.dashboardGridCols = 4;
      }
    })
  }

  clearSearchData(){
    this.searchValue = '';
  }

  editNotes(item: any, index: any){
    const dialogRef = this.dialog.open(EditNotesComponent, {
      data: {
        modal: true,
        reqData: {item}
      },
      height: '400px',
      width: '450px',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("Result is",result);

      if(result){
        this.service.editNotes(result.reqData.item).subscribe((result: Application) =>{
        if(result.apiResponseStatus){
          this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage);
          this.getListNotes();
        }
      }, (catchError) =>{
         this.notifierService.notify('error', catchError.error.message);
      });
    }
  });
}

  deleteNotes(item: any, index: any){
    this.service.deleteNotes(item._id).subscribe((result: Application) =>{
      if(result.apiResponseStatus){
        this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage);
        this.listApp = this.listApp.splice(item, index);
        this.getListNotes();
      }
    },
    (catchError) =>{
      this.notifierService.notify('error', catchError.error.message);
    })
  }

  getListNotes(){
    this.service.getNotes().subscribe((res: any) =>{
      this.listApp = res;
      console.log('Notes List', this.listApp);
    });
  }


  addNotes(){
    const dialogRef = this.dialog.open(AddNotesComponent, {
      height: '400px',
      width: '450px',
    })

    dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.service.addNotes(result).subscribe((result: Application) =>{
          if(result.apiResponseStatus){
            this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage)
            this.getListNotes();
          }
        },
        (catchError) =>{
          this.notifierService.notify('error', catchError.error.message);
        })
      }
    });
  }
}
