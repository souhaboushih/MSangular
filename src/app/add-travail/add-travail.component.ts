// travail.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravailService } from '../sevices/travail.service';
import { SuccessMessageService } from '../sevices/success-message.service';

@Component({
  selector: 'app-add-travail',
  templateUrl: './add-travail.component.html',
  styleUrls: ['./add-travail.component.css'],
})
export class AddTravailComponent {
  title: string = '';
  idEleve: string | null = null;
  fichier: File | null = null;
 

  constructor(
    private travailService: TravailService,
    private route: ActivatedRoute,
    private router: Router,
    private successMessageService: SuccessMessageService
  ) {}

  ngOnInit() {
    const idEleveParam = this.route.snapshot.paramMap.get('idEleve');
    this.idEleve = idEleveParam !== null ? idEleveParam : '';
   
   
  }

  onSubmit() {
    this.travailService.addTravail(this.title, this.idEleve || '', this.fichier!)
      .subscribe(response => {
        console.log('Travail added successfully', response);
        this.successMessageService.setSuccessMessage('Travail ajouté avec succès.');
        console.log('idEleve:',this.idEleve)
        
      }, error => {
        console.error('Error adding travail', error);
        this.successMessageService.setSuccessMessage('Travail ajouté avec succès.');
        this.router.navigate(['/cours-eleve',]);
        
      });
  }

  onFileSelected(event: any) {
    this.fichier = event.target.files[0];
  }
}
