// side.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../sevices/user.service";


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {

  constructor(private userService: UserService, private router: Router) { }

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
