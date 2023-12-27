// sign-up.component.ts
import { Component } from '@angular/core';
import { UserService } from '../sevices/user.service';
import { Router } from '@angular/router';
import { ClasseService } from '../sevices/classe.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpData = {username: '', password: '', email: '', numInscrit: 0, userClasse: ''}; // Set numInscrit to 0 by default
  classes: any[] = [];
  constructor(private userService: UserService, private router:Router, private ClasseService:ClasseService) {
  }
  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.ClasseService.getClasses().subscribe(
      (data) => {
        console.log('Classes récupérées avec succès:', data);
        this.classes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    );
  }

  signUp() {
    // Client-side validation
    if (!this.signUpData.username || !this.signUpData.password || !this.signUpData.email) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    this.userService.signUp(
      this.signUpData.username,
      this.signUpData.password,
      this.signUpData.email,
      this.signUpData.numInscrit,
      this.signUpData.userClasse
    ).subscribe(
      (data) => {
        console.log('Réponse du service:', data);
        // Handle successful signup, e.g., redirect to login page
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        // Log the specific error message from the server
      }
    );
  }
  navigateToSignIn() {
    this.router.navigate(['/sign-in']);
  }
}
