// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { EleveComponent } from './eleve/eleve.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseListComponent } from './course-list/course-list.component';
import { MatierComponent } from './matier/matier/matier.component';
import { ClasseComponent } from './classe/classe/classe.component';
import { MatierCourComponent } from './matier-cour/matier-cour.component';
import { ListEleveComponent } from './list-eleve/list-eleve.component';
import { AddEleveComponent } from './add-eleve/add-eleve.component';
import { UpdateEleveComponent } from './update-eleve/update-eleve.component';
const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'eleve', component: EleveComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'course-list/:matiereId', component: CourseListComponent },
  { path: 'cours', component: MatierCourComponent },
  { path: 'matier', component: MatierComponent },
  { path: 'classe', component: ClasseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

