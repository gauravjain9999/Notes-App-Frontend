import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { NotesComponent } from "./components/notes/notes.component";
import { LoginRegisterComponent } from "./components/login-regsiter/login-register.component";

const routes: Routes = [
  { path: '', redirectTo: '/notes-app', pathMatch: 'full'},
  { path: 'notes-app', component: NotesComponent},
  { path: 'login-Register', component: LoginRegisterComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
