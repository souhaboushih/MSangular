// side.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../sevices/user.service";
import { SidebarService } from "../sevices/siderbar.service";


@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  isOpen$ = this.sidebarService.isOpen$;
  shouldShowSidebar: boolean = true;
  username: string = '';
  useremail: string = '';
  constructor(private userService: UserService, private router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
    // Souscrivez aux changements d'URL pour décider si le sidebar doit être affiché
    this.router.events.subscribe((val) => {
      console.log('Current URL:', this.router.url);
    
      const excludedUrls = [
        '/sign-in',
        '/sign-up',
        '/course-list/:matiereId',
        '/cours/:id',
        '/cours-eleve',
        '/add-course/:id',
        '/home-enseignants/:id',
        '/eleve',
        '/course-list-eleve/:matiereId',
        '/cours-eleve'
      ];
    
      this.shouldShowSidebar = !excludedUrls.some(url => this.router.url.includes(url));
    
      console.log('Should show sidebar:', this.shouldShowSidebar);
    });
    
  
  this.userService.getAuthenticatedUser().subscribe(
      authenticatedUser => {
        if (authenticatedUser) {
          this.username = authenticatedUser.username;
          this.useremail = authenticatedUser.email;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  redirectToAcceptUsers(): void {
    this.router.navigate(['/users']);
  }
  redirectToListEleve(): void {
    this.router.navigate(['/list-eleve']);
  }
  redirectToListProf(): void {
    this.router.navigate(['/list-prof']);
  }
  redirectToListClass(): void {
    this.router.navigate(['/classe']);
  }
  redirectToListProfClass(): void {
    this.router.navigate(['/prof-classe']);
  }
  redirectToListMatiere(): void {
    this.router.navigate(['/matier']);
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
