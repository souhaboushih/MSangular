import { Component } from '@angular/core';
import { UserService } from '../sevices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  signInData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}



  signIn() {
    const { username, password } = this.signInData;

    if (!username || !password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }

    this.userService.signIn(username, password).subscribe(
      (data) => {
        console.log('Response from the service:', data);

        // Check if the server response contains a token or any other relevant information
        if (data.token) {
          // Store the user token in localStorage or a secure storage method
          localStorage.setItem('userToken', data.token);

          if (data.etat === 1) {
            if (data.role === 'eleve') {
              this.router.navigate(['/eleve']); // Redirect to the eleve-page for eleve users
            } else {
              this.router.navigate(['/dashboard']); // Redirect to the user's dashboard for other roles
            }
           
        } else {
            this.errorMessage = 'L\'utilisateur n\'a pas encore été accepté.';
            // Optionally, you can clear the error message after a certain delay
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000); // Clear the message after 5 seconds
        }
        } else {
          // Handle unexpected response format
          this.errorMessage = 'Unexpected response from the server.';
        }
      },
      (error) => {
        console.error('Error from the service:', error);

        // Handle specific error cases
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 403) {
          this.errorMessage = 'User has not been accepted yet.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
