// sign-up.component.ts
import { Component } from '@angular/core';
import { UserService } from '../sevices/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpData = {username: '', password: '', email: '', numInscrit: 0, userClasse: ''}; // Set numInscrit to 0 by default

  constructor(private userService: UserService) {
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
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        // Handle signup error, e.g., display an error message
      }
    );
  }
}
