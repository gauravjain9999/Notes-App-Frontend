import { AddNotesComponent } from './../add-notes/add-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { NotesService } from "src/app/services/notes.service";
import { EditNotesComponent } from "../edit-notes/edit-notes.component";

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

  constructor(public mediaObserver: MediaObserver, public dialog: MatDialog, private service: NotesService){
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

  editInfo(item: any, index: any){
    const dialogRef = this.dialog.open(EditNotesComponent, {
      height: '40px',
      width: '450px',
    })
    console.log('ITem is ', item, index);
  }

  deleteNotes(item: any, index: any){
    this.service.delete(item._id).subscribe(data =>{
      console.log('Notes List is', data);
      this.listApp = this.listApp.splice(item, index);
      this.getListNotes();
    });
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
        this.service.addNotes(result).subscribe(data =>{
          console.log('Data', data);
          this.getListNotes();
        })
      }
    });
  }
}
