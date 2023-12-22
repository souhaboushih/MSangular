import { Component, OnInit } from '@angular/core';
import { EleveService } from '../sevices/eleve.service';
import { Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';
import { ClassematiereService } from '../sevices/classematiere.service';

@Component({
  selector: 'app-add-eleve',
  templateUrl: './add-eleve.component.html',
  styleUrls: ['./add-eleve.component.css']
})
export class AddEleveComponent implements OnInit {
  signUpData = { username: '', password: '', email: '', numInscrit: '', userClass: '' };
  classes: any[] = [];

  constructor(
    private eleveService: EleveService,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private ClassematiereService: ClassematiereService
  ) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.ClassematiereService.getClasses().subscribe(
      (data) => {
        console.log('Classes récupérées avec succès:', data);
        this.classes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    );
  }

  addEleve() {
    // Client-side validation
    if (!this.signUpData.username || !this.signUpData.password || !this.signUpData.email) {
      console.error('Veuillez remplir tous les champs.');
      return;
    }

    // Parse numInscrit to number
    this.eleveService
      .addEleve(
        this.signUpData.username,
        this.signUpData.password,
        this.signUpData.email,
        this.signUpData.numInscrit,
        this.signUpData.userClass
      )
      .subscribe(
        (data) => {
          console.log('Réponse du service:', data);
          // Handle successful signup, e.g., redirect to login page
          this.successMessageService.setSuccessMessage('Étudiant ajouté avec succès.');
          this.router.navigate(['/list-eleve']);
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          // Handle signup error, e.g., display an error message
        }
      );
  }
}
