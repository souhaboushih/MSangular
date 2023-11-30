// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./sevices/user.service";
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideComponent } from './side/side.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EleveComponent } from './eleve/eleve.component';


@NgModule({
  declarations: [AppComponent, UsersComponent, SignInComponent, SignUpComponent, SideComponent,EnseignantComponent,EleveComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, BrowserAnimationsModule, ReactiveFormsModule],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
