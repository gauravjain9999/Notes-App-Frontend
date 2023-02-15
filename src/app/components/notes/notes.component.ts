
import { AddNotesComponent } from './../add-notes/add-notes.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { NotesService } from "src/app/services/notes.service";

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

  constructor(public mediaObserver: MediaObserver, public dialog: MatDialog, private service: NotesService) {
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
