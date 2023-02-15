import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { NotesComponent } from "./components/notes/notes.component";
import { HeaderComponent } from "./components/header/header.component";

const routes: Routes = [
  { path: '', redirectTo: '/notes-app', pathMatch: 'full'},
  { path: 'notes-app', component: NotesComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
