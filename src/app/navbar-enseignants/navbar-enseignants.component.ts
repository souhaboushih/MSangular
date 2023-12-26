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
  loggedInUsername$: Observable<string | null>;
  loggedInUserId$: Observable<string | null>;
  enseignantId: string= "";
  constructor(private userService: UserService, private router: Router) {
    this.loggedInUsername$ = this.userService.getLoggedInUsername();
    this.loggedInUserId$ = this.userService.getLoggedInUserId();
  }

  ngOnInit(): void {
  }
  navigateToHome() {
    this.userService.userId.subscribe(userId => {
      if (userId) {
        console.log('User ID:', userId);
        this.router.navigate(['/home-enseignants',userId]);
      }
    });
  }
  navigateToCourse() {
    this.userService.userId.subscribe(userId => {
      if (userId) {
        console.log('User ID:', userId);
        this.router.navigate(['/add-course',userId]);
      }
    });
  }
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
    console.error("click:");
    // Vérifiez si le navigateur prend en charge la géolocalisation
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Lorsque la position est obtenue avec succès, vous pouvez la traiter ici
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Construisez l'URL pour afficher la localisation du lycée dans Google Maps
            const mapUrl = `https://www.google.com/maps/place/Institute+of+Technological+Studies+of+Bizerte/@37.2351619,9.8853473,19.03z/data=!4m7!3m6!1s0x12e31ff1faae6e19:0xa4da7162624c5788!4b1!8m2!3d37.2349582!4d9.8857319!16s%2Fg%2F1tn_wk9_?entry=ttu`;

            // Ouvrez la localisation du lycée dans une nouvelle fenêtre/onglet
            window.open(mapUrl, '_blank');
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
