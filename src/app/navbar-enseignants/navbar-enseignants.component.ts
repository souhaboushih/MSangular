import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../sevices/user.service";
@Component({
  selector: 'app-navbar-enseignants',
  templateUrl: './navbar-enseignants.component.html',
  styleUrls: ['./navbar-enseignants.component.css']
})
export class NavbarEnseignantsComponent implements OnInit {
  loggedInUsername: string | null = null;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      this.loggedInUsername = username;
    });
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
