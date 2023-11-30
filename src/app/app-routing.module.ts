// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EleveComponent } from './eleve/eleve.component';


export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'enseignant', component: EnseignantComponent },
  { path: 'eleve', component: EleveComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}

