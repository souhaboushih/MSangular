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
import { MatierCourComponent } from './matier-cour/matier-cour.component';
import { EnseignantListComponent } from './prof-list/prof-list.component';
import { AddProfComponent } from './add-prof/add-prof.component';
import { UpdateProfComponent } from './update-prof/update-prof.component';
import { HomeEnseignantsComponent } from './home-enseignants/home-enseignants.component';
import { CoursEleveComponent } from './cours-eleve/cours-eleve.component';
import { ProfClassComponent } from './prof-class/prof-class.component';
import { UpdateProfClassComponent } from './update-prof-class/update-prof-class.component';
import { CoursListEleveComponent } from './cours-list-eleve/cours-list-eleve.component';
import { AddTravailComponent } from './add-travail/add-travail.component';
const routes: Routes = [

  { path: 'users', component: UsersComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'eleve', component: EleveComponent },
  { path: 'add-course/:id', component: AddCourseComponent },
  { path: 'course-list/:matiereId', component: CourseListComponent },
  { path: 'cours/:id', component: MatierCourComponent },
  {
    path: 'matieres-communes/:classeId/:enseignantId',
    component: MatierCourComponent
  },
  { path: 'matier', component: MatierComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'list-eleve', component: ListEleveComponent },
  { path: 'add-student', component: AddEleveComponent },
  { path: 'update-eleve/:id', component: UpdateEleveComponent },
  { path: 'list-prof', component: EnseignantListComponent },
  { path: 'add-prof', component: AddProfComponent },
  { path: 'update-prof/:id', component: UpdateProfComponent },
  { path: 'home-enseignants/:id', component:  HomeEnseignantsComponent },
  { path: 'cours-eleve', component:  CoursEleveComponent },
  { path: 'prof-classe', component:  ProfClassComponent },
  { path: 'update-prof-class/:id', component: UpdateProfClassComponent },
  { path: 'course-list-eleve/:matiereId', component: CoursListEleveComponent },
  { path: 'add-travail/:idEleve', component: AddTravailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
