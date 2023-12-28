// update-prof-class.component.ts

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfClassService } from '../sevices/prof-class.service';
import { EnseignantService } from '../sevices/prof.service';
import { ClasseService } from '../sevices/classe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-prof-class',
  templateUrl: './update-prof-class.component.html',
  styleUrls: ['./update-prof-class.component.css']
})
export class UpdateProfClassComponent {
  @Input() updatedData: any;
  updateProfClassForm: FormGroup;
  enseignants: any[] = [];
  idprofclass!: string;
  classes: any[] = [];

  // Inject the ProfClassService in the constructor
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profClassService: ProfClassService,
    private EnseignantService: EnseignantService,
    private ClasseService: ClasseService
  ) {
    this.updateProfClassForm = this.formBuilder.group({
      newIdProf: ['', Validators.required],
      newIdclaase: ['', Validators.required]
    });

  }

  // Load the enseignants and classes when the component is initialized
  ngOnInit(): void {
    this.loadEnseignants();
    this.loadClasses();
    this.route.paramMap.subscribe(params => {
      this.idprofclass = params.get('id') || '';
    });
  
    this.profClassService.getProfClassDetails(this.idprofclass).subscribe(
      (profClassDetails) => {
        // Pré-remplir le formulaire avec les détails de l'enseignant
        if (profClassDetails && profClassDetails.idprof && profClassDetails.idclass) {
          this.updateProfClassForm.patchValue({
            newIdProf: profClassDetails.idprof,
            newIdclaase: profClassDetails.idclass,
          });
        } else {
          console.error('Les détails de prof class sont incomplets.');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de prof class :', error);
      }
    );
    
  }
  

  loadEnseignants(): void {
    this.EnseignantService.getEnseignants().subscribe((data: any[]) => {
      this.enseignants = data;
    });
  }

  loadClasses() {
    this.ClasseService.getClasses().subscribe(
      (data) => {
        console.log('Classes récupérées avec succès:', data);
        this.classes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des classes :', error);
      }
    );
  }

  submitUpdate() {
    if (this.updateProfClassForm.valid) {
        const updateData = this.updateProfClassForm.value;
        console.log('Update data:', updateData);

        // Log the idprofclass to ensure it is correct
        console.log('ID ProfClass:', this.idprofclass);

        // Pass the correct idprofclass to the updateProfClass method
        this.profClassService.updateProfClass(this.idprofclass, updateData).subscribe(
            (data) => {
                console.log('profClass mis à jour avec succès:', data);
                this.router.navigate(['/prof-classe']);
            },
            (error) => {
                console.error('Erreur lors de la mise à jour de prof class:', error);
            }
        );
    }
}


}
