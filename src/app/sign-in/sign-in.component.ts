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

          // Redirect to a different page (e.g., the user's dashboard)
          this.router.navigate(['/users']);
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
}
