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
openLocation() {
    // Vérifiez si le navigateur prend en charge la géolocalisation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Lorsque la position est obtenue avec succès, vous pouvez la traiter ici
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Exemple : Afficher la position dans la console
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

            // Vous pouvez également rediriger l'utilisateur vers une nouvelle page ou faire d'autres actions ici
            window.location.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
        }, function(error) {
            // Gérez les erreurs ici
            console.error("Erreur lors de la récupération de la position:", error);
            alert("Impossible d'obtenir votre position actuelle.");
        });
    } else {
        alert("La géolocalisation n'est pas prise en charge par votre navigateur.");
    }
}

}
