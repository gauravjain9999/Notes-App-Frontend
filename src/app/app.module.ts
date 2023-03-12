import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import { MaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesComponent } from "./components/notes/notes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/header/header.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginRegisterComponent } from "./components/login-regsiter/login-register.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HeaderInterceptor } from "./core/interceptor/header.interceptor";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 20
		},
		vertical: {
			position: 'top',
			distance: 5,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
   AppComponent,
   NotesComponent,
   HeaderComponent,
   AddNotesComponent,
   LoginRegisterComponent,
   LoginComponent,
   EditNotesComponent,
   RegisterComponent,
   UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    MaterialModule,
    BrowserAnimationsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
