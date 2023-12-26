import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatiereService } from '../sevices/matier.service';
@Component({
  selector: 'app-home-enseignants',
  templateUrl: './home-enseignants.component.html',
  styleUrls: ['./home-enseignants.component.css']
})
export class HomeEnseignantsComponent implements OnInit {
  enseignantId: string | null = null;
  matieres: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private matiereService: MatiereService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
    });
    this.enseignantId = this.route.snapshot.paramMap.get('id');

    if (this.enseignantId) {
      this.matiereService.getMatieresByEnseignantId(this.enseignantId)
        .subscribe(
          data => {
            this.matieres = data;
            this.loading = false;
          },
          error => {
            this.error = 'Une erreur est survenue lors de la récupération des matières.';
            this.loading = false;
          }
        );
    } else {
      this.error = 'ID de l\'enseignant non fourni dans l\'URL.';
      this.loading = false;
    }
  }
}
