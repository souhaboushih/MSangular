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
  { path: 'course-list', component: CourseListComponent },
  { path: 'matier', component: MatierComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'list-eleve', component: ListEleveComponent },
  { path: 'add-student', component: AddEleveComponent },
  { path: 'update-eleve/:id', component: UpdateEleveComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

