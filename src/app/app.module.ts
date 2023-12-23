// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from "./sevices/user.service";
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideComponent } from './side/side.component';
import { HomeComponent } from './home/home.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
//import { UpdateCoursComponent } from './update-cours/update-cours.component';

// Import the CourseService
import { CourseService } from './sevices/course.service';
import { MatCardModule } from '@angular/material/card';
import { EleveComponent } from './eleve/eleve.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatierComponent } from './matier/matier/matier.component';
import { ClasseComponent } from './classe/classe/classe.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EleveService } from './sevices/eleve.service';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { UpdateEleveComponent } from './update-eleve/update-eleve.component';





@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SignInComponent,
    SignUpComponent,
    SideComponent,
    HomeComponent,
    EleveComponent,
    NavbarComponent,
    AddCourseComponent,
    CourseListComponent,
    MatierComponent,
    ClasseComponent,
    AddEleveComponent,
    ListEleveComponent,
    UpdateEleveComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, MatButtonModule, MatDialogModule, MatTableModule, BrowserAnimationsModule, MatIconModule, ReactiveFormsModule, MatInputModule, MatCardModule,ToastrModule.forRoot({
    timeOut: 3000, // Durée d'affichage du toast en millisecondes
    positionClass: 'toast-top-right', // Position du toast
    preventDuplicates: true, // Empêche l'affichage de toasts dupliqués
  })],
  providers: [UserService, CourseService, EleveService], // Add CourseService to providers
  bootstrap: [AppComponent, SideComponent],
})
export class AppModule {}
