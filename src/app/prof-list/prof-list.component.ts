import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../sevices/prof.service';
import { Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';

@Component({
  selector: 'app-list-eleve',
  templateUrl: './prof-list.component.html',
  styleUrls: ['./prof-list.component.css']
})
export class EnseignantListComponent implements OnInit {
  successMessage: string = '';
  enseignants: any[] = [];

  constructor(private EnseignantService: EnseignantService, private router: Router, private successMessageService: SuccessMessageService) {}

  ngOnInit() {
    this.loadEnseignant();
      this.successMessageService.successMessage$.subscribe((message) => {
        this.successMessage = message;
      });
  }
  closeAlert() {
    this.successMessage = '';
  }

  loadEnseignant() {
    this.EnseignantService.getEnseignants().subscribe(
      (data) => {
        this.enseignants = data;
        console.log('Eleves array:', this.enseignants);  // Log the eleves array
      },
      (error) => {
        console.error('Erreur lors de la récupération des élèves :', error);
      }
    );
  }

  addEnseignant() {
          // Navigate to the add-prof component or any other component
          this.router.navigate(['/add-prof']); // Update the route as needed

          
  }

  updateEnseignant(enseignantId: string) {
    this.router.navigate(['/update-prof', enseignantId]);
  }

  deleteEnseignant(enseignantId: string) {
    if(confirm('Vouslez-vous supprimer cet Enseignant ?'))
 {
  this.EnseignantService.deleteEnseignant(enseignantId).subscribe(
    (response) => {
      console.log('Enseignant supprimé avec succès:', response);
      this.successMessageService.setSuccessMessage('Enseignant supprimer avec succès.');
      this.loadEnseignant(); // Refresh the list after deleting
    },
    (error) => {
      console.error('Erreur lors de la suppression de l\'élève :', error);
    }
  );
 }
  }
}

