import { Component, OnInit } from '@angular/core';
import { EleveService } from '../sevices/eleve.service';
import { Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';

@Component({
  selector: 'app-list-eleve',
  templateUrl: './list-eleve.component.html',
  styleUrls: ['./list-eleve.component.css']
})
export class ListEleveComponent implements OnInit {
  successMessage: string = '';
  eleves: any[] = [];

  constructor(private eleveService: EleveService, private router: Router, private successMessageService: SuccessMessageService) {}

  ngOnInit() {
    this.loadEleves();
      this.successMessageService.successMessage$.subscribe((message) => {
        this.successMessage = message;
      });
  }
  closeAlert() {
    this.successMessage = '';
  }

  loadEleves() {
    this.eleveService.getEleves().subscribe(
      (data) => {
        this.eleves = data;
        console.log('Eleves array:', this.eleves);  // Log the eleves array
      },
      (error) => {
        console.error('Erreur lors de la récupération des élèves :', error);
      }
    );
  }

  addEleve() {
          // Navigate to the add-student component or any other component
          this.router.navigate(['/add-student']); // Update the route as needed

          
  }

  updateEleve(eleveId: string) {
    this.router.navigate(['/update-eleve', eleveId]);
  }

  deleteEleve(eleveId: string) {
    if(confirm('Vouslez-vous supprimer cet élève ?'))
 {
  this.eleveService.deleteEleve(eleveId).subscribe(
    (response) => {
      console.log('Élève supprimé avec succès:', response);
      this.successMessageService.setSuccessMessage('Étudiant supprimer avec succès.');
      this.loadEleves(); // Refresh the list after deleting
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'élève :', error);
    }
  );
 }
  }
}

