import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { NotesComponent } from "./components/notes/notes.component";

const routes: Routes = [
  { path: '', redirectTo: '/notes-app', pathMatch: 'full'},
  { path: 'notes-app', component: NotesComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
