import { NotesService } from './core/services/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Notes-App';

  constructor(public service: NotesService){}

  ngOnInit(): void {
  }

}
