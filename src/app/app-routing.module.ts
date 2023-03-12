import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "src/app/components/page-not-found/page-not-found.component";
import { NotesComponent } from "./components/notes/notes.component";
import { LoginRegisterComponent } from "./components/login-regsiter/login-register.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'notes-app', component: NotesComponent, canActivate: [AuthGuard]},
  { path: 'login-Register', component: LoginRegisterComponent},
  { path: 'user-profile', component: UserProfileComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
