import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EleveService } from '../sevices/eleve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessMessageService } from '../sevices/success-message.service';
import { ClasseService } from '../sevices/classe.service';


@Component({
  selector: 'app-update-eleve',
  templateUrl: './update-eleve.component.html',
  styleUrls: ['./update-eleve.component.css']
})
export class UpdateEleveComponent implements OnInit {
  updateEleveForm: FormGroup;
  eleveId!: string;
  classes: any[] = []; // Ajoutez cette ligne pour stocker la liste des classes

  constructor(
    private formBuilder: FormBuilder,
    private eleveService: EleveService,
    private route: ActivatedRoute,
    private router: Router,
    private successMessageService: SuccessMessageService,
    private ClasseService: ClasseService
  ) {
    this.updateEleveForm = this.formBuilder.group({
      newUsername: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      newNumInscrit: ['', Validators.required],
      newUserClass: ['', Validators.required],
      newPassword: ['', Validators.required],
      newEtat: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Récupérez l'ID de l'élève depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.eleveId = params.get('id') || '';

      // Utilisez l'ID de l'élève pour récupérer ses données
      this.eleveService.getEleveDetails(this.eleveId).subscribe(
        (eleveDetails) => {
          // Pré-remplir le formulaire avec les détails de l'élève
          this.updateEleveForm.patchValue({
            newUsername: eleveDetails.username,
            email: eleveDetails.email,
            newNumInscrit: eleveDetails.numInscrit,
            newUserClass: eleveDetails.userClass,
            newPassword: eleveDetails.password,
            newEtat: eleveDetails.etat, // Vous pouvez pré-remplir ou non le mot de passe, en fonction de vos besoins
          });

          // Récupérez la liste des classes et stockez-la dans la propriété 'classes'
          this.ClasseService.getClasses().subscribe(
            (classes) => {
              this.classes = classes;
            },
            (error) => {
              console.error('Erreur lors de la récupération des classes :', error);
            }
          );
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'élève :', error);
        }
      );
    });
  }

  submitUpdate() {
    if (this.updateEleveForm.valid) {
      const updateData = this.updateEleveForm.value;
      console.log('Update data:', updateData);

      // Convert newEtat to a number before sending it to the server

      this.eleveService.updateEleve(this.eleveId, updateData).subscribe(
        (data) => {
          console.log('Élève mis à jour avec succès :', data);
          // Utilisez une barre oblique au lieu de 'eleve-list'
          this.successMessageService.setSuccessMessage('Mise à jour de l\'étudiant avec succès.');
          this.router.navigate(['/list-eleve']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'élève :', error);
        }
      );
    }
  }
}
