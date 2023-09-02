import { AddNotesComponent } from './../add-notes/add-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { NotesService } from "src/app/core/services/notes.service";
import { EditNotesComponent } from "../edit-notes/edit-notes.component";
import { NotifierService } from 'angular-notifier';
import { Application } from "src/app/core/model/notes.models";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  dashboardGridCols = 4;
  titleNotes = '';
  descriptionNotes = '';
  listApp: unknown[] = [];
  searchValue = '';
  isCustomSpinner = false;

  constructor( private notifierService: NotifierService,  public mediaObserver: MediaObserver,
    public dialog: MatDialog, private notesService: NotesService){
    this.getListNotes();
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
    });

    this.notesService.customSpinner.subscribe(event =>{
      if(event){
        this.isCustomSpinner = true;
      }
      else{
        this.isCustomSpinner =false;
      }
    })
  }

  clearSearchData(){
    this.searchValue = '';
  }

  refreshPage(eventValue: boolean){
    if(eventValue){
      this.getListNotes();
    }
  }

  editNotes(item: unknown){
    const dialogRef = this.dialog.open(EditNotesComponent, {
      data: {
        modal: true,
        reqData: {item}
      },
      height: '400px',
      width: '450px',
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.notesService.editNotes(result.reqData.item).subscribe((result: Application) =>{
        if(result.apiResponseStatus){
          this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage);
          this.getListNotes();
        }
        else{
          this.notifierService.notify('error', result.apiResponseData?.apiResponseMessage);
        }
      })
    }
  });
}

  deleteNotes(item: any, index: number){
    this.notesService.deleteNotes(item._id).subscribe((result: Application) =>{
      if(result.apiResponseStatus){
        this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage);
        this.listApp = this.listApp.splice(item, index);
        this.getListNotes();
      }
      else{
        this.notifierService.notify('error', result.apiResponseData?.apiResponseMessage);
      }
    })
  }

  getListNotes(){
    this.notesService.getNotes().subscribe((result: Application) =>{
      if(result.apiResponseStatus){
        this.listApp = result.apiResponseData?.notesList;
        console.log('Notes List', this.listApp);
      }
      else{
        this.notifierService.notify('error', result.apiResponseData?.apiResponseMessage);
      }
    })
  }

  addNotes(){
    const dialogRef = this.dialog.open(AddNotesComponent, {
      height: '550px',
      width: '450px',
      panelClass: 'bg-color'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Result', result);
       if(result){
        this.notesService.addNotes(result).subscribe((result: Application) =>{
          if(result.apiResponseStatus){
            this.notifierService.notify('success', result.apiResponseData?.apiResponseMessage);
            this.getListNotes();
          }
          else{
            this.notifierService.notify('error', result.apiResponseData?.apiResponseMessage);
          }
        })
      }
    });
  }
}
