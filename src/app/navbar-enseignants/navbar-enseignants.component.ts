import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../sevices/user.service";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar-enseignants',
  templateUrl: './navbar-enseignants.component.html',
  styleUrls: ['./navbar-enseignants.component.css']
})
export class NavbarEnseignantsComponent implements OnInit {
  loggedInUsername$: Observable<string | null>; // Observable pour le nom d'utilisateur

  constructor(private userService: UserService, private router: Router) {
    this.loggedInUsername$ = this.userService.getLoggedInUsername();
  }

  ngOnInit(): void {}

  logout(): void {
    this.userService.logout().subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/sign-in']);
      },
      error => {
        console.error(error);
      }
    );
  }

}
