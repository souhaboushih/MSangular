// sign-up.component.ts
import { Component } from '@angular/core';
import {UserService} from "../sevices/user.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpData = { username: '', password: '', email: '' };

  constructor(private userService: UserService) {}

  signUp() {
    // Validation côté client
    if (!this.signUpData.username || !this.signUpData.password || !this.signUpData.email) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    this.userService.signUp(this.signUpData.username, this.signUpData.password, this.signUpData.email).subscribe(
      (data) => {
        console.log('Réponse du service:', data);

      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);

      }
    );
  }
}
