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
  //errorMessage: string = '';
  username = '';
  password = '';
  errorMessage = '';
  constructor(private userService: UserService, private router: Router) {}



  signIn() {
    const { username, password } = this.signInData;

    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }
    this.userService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.userType === 'enseignant') {
          this.router.navigate(['/home-enseignants']);
        } else if (response.userType === 'eleve') {
          this.router.navigate(['/eleve']);
        } else if (response.userType === 'user') {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        this.errorMessage = error.error.message;
      }
    );
  }

  //   this.userService.signIn(username, password).subscribe(
  //     (data) => {
  //       console.log('Response from the service:', data);
  //       if (data.token) {
  //         localStorage.setItem('userToken', data.token);

  //         if (data.role === 'eleve') {
  //           if (data.etat === 1) {
  //             this.router.navigate(['/eleve']);
  //           } else {
  //             this.errorMessage = 'L\'utilisateur n\'a pas encore été accepté.';
  //             setTimeout(() => {
  //               this.errorMessage = '';
  //             }, 5000);
  //           }
  //         } else if (data.role === 'enseignant') {
  //           this.router.navigate(['/cours']);
  //         } else {
  //           this.router.navigate(['/dashboard']);
  //         }
  //       } else {
  //         this.errorMessage = 'Unexpected response from the server.';
  //       }
  //     },
  //     (error) => {
  //       console.error('Error from the service:', error);

  //       // Handle specific error cases
  //       if (error.status === 401) {
  //         this.errorMessage = 'Invalid username or password.';
  //       } else if (error.status === 403) {
  //         this.errorMessage = 'User has not been accepted yet.';
  //       } else {
  //         this.errorMessage = 'An unexpected error occurred. Please try again later.';
  //       }
  //     }
  //   );
  // }
  navigateToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
