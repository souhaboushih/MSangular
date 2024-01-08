import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../sevices/user.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUsername: string | null = null;
  loggedInUserId: string | null = null;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      this.loggedInUsername = username;
    });
    this.userService.getLoggedInUserId().subscribe((userId) => {
      this.loggedInUserId = userId;
    });
  }
  redirectToHomeEleve(): void {
    this.router.navigate(['/eleve']);
  }
  redirectToCours(): void {
    this.router.navigate(['/cours-eleve']);
  }
  logout(): void {
    this.userService.logout().subscribe(
      response => {
        console.log(response); // Log the server response (e.g., 'Déconnexion réussie')
        // Navigate to the sign-in page after successful logout
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.error(error); // Log any errors that occurred during the logout request
        // Handle errors or show appropriate messages to the user
      }
    );
  }
}
