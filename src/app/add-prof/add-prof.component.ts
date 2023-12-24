import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../sevices/prof.service';
import { Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';
import { MatiereService } from '../sevices/matier.service';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css']
})
export class AddProfComponent implements OnInit {
  signUpData = { username: '', password: '', email: '', matiere: '' };
  matieres: any[] = [];

  constructor(
    private EnseignantService: EnseignantService,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private MatiereService: MatiereService
  ) {}

  ngOnInit() {
    this.loadMatiere();
    
  }
  loadMatiere() {
    this.MatiereService.getMatieres().subscribe(
      (data) => {
        console.log('Classes récupérées avec succès:', data);
        this.matieres = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    );
  }
 

  addEnseignant() {
    // Client-side validation
    if (!this.signUpData.username || !this.signUpData.password || !this.signUpData.email) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    // Parse numInscrit to number
    this.EnseignantService
      .addEnseignant(
        this.signUpData.username,
        this.signUpData.password,
        this.signUpData.email,
        this.signUpData.matiere
      )
      .subscribe(
        (data) => {
          console.log('Réponse du service:', data);
          // Handle successful signup, e.g., redirect to login page
          this.successMessageService.setSuccessMessage('Enseignant ajouté avec succès.');
          this.router.navigate(['/list-prof']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          // Handle signup error, e.g., display an error message
        }
      );
  }
}
