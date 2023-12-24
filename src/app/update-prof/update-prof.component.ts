import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnseignantService } from '../sevices/prof.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';
import { MatiereService } from '../sevices/matier.service';


@Component({
  selector: 'app-update-prof',
  templateUrl: './update-prof.component.html',
  styleUrls: ['./update-prof.component.css']
})
export class UpdateProfComponent implements OnInit {
  updateEnseignantForm: FormGroup;
  enseignantId!: string;
  matieres: any[] = []; // Ajoutez cette ligne pour stocker la liste des classes

  constructor(
    private formBuilder: FormBuilder,
    private EnseignantService: EnseignantService,
    private route: ActivatedRoute,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private MatiereService: MatiereService
  ) {
    this.updateEnseignantForm = this.formBuilder.group({
      newUsername: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
      newMatiere: ['', Validators.required],
      newEtat: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Récupérez l'ID de l'enseignant depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.enseignantId = params.get('id') || '';

      // Utilisez l'ID de l'enseignant pour récupérer ses données
      this.EnseignantService.getEnseignantDetails(this.enseignantId).subscribe(
        (enseignatDetails) => {
          // Pré-remplir le formulaire avec les détails de l'enseignant
          this.updateEnseignantForm.patchValue({
            newUsername: enseignatDetails.username,
            email: enseignatDetails.email,
            newMatiere: enseignatDetails.matiere,
            
            newPassword: enseignatDetails.password,
            newEtat: enseignatDetails.etat, // Vous pouvez pré-remplir ou non le mot de passe, en fonction de vos besoins
          });
            // Récupérez la liste des classes et stockez-la dans la propriété 'classes'
            this.MatiereService.getMatieres().subscribe(
              (matieres) => {
                this.matieres = matieres;
              },
              (error) => {
                console.error('Erreur lors de la récupération des Matieres :', error);
              }
            );
          
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'enseignant :', error);
        }
      );
    });
  }

  submitUpdate() {
    if (this.updateEnseignantForm.valid) {
      const updateData = this.updateEnseignantForm.value;
      console.log('Update data:', updateData);

      // Convert newEtat to a number before sending it to the server

      this.EnseignantService.updateEnseignant(this.enseignantId, updateData).subscribe(
        (data) => {
          console.log('Enseignant mis à jour avec succès :', data);
          // Utilisez une barre oblique au lieu de 'eleve-list'
          this.successMessageService.setSuccessMessage('Mise à jour de l\'enseignant avec succès.');
          this.router.navigate(['/list-prof']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'enseignant :', error);
        }
      );
    }
  }
}
