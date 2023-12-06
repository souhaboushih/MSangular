// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./sevices/user.service";
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideComponent } from './side/side.component';
import { HomeComponent } from './home/home.component';
import { EleveComponent } from './eleve/eleve.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [AppComponent, UsersComponent, SignInComponent, SignUpComponent, SideComponent, HomeComponent, EleveComponent,NavbarComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [UserService],
  bootstrap: [AppComponent,SideComponent],
})
export class AppModule {}
