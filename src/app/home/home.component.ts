import { Component, OnInit } from '@angular/core';
import { EnseignantService } from '../sevices/prof.service';
import { EleveService } from '../sevices/eleve.service';
import { MatiereService } from '../sevices/matier.service';
import { ClasseService } from '../sevices/classe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  enseignantsCount: number = 0;
  elevesCount: number = 0;
  matieresCount: number = 0;
  classesCount: number = 0;

  constructor(
    private enseignantService: EnseignantService,
    private eleveService: EleveService,
    private matiereService: MatiereService,
    private classeService: ClasseService
  ) { }

  ngOnInit(): void {
    this.fetchEnseignantsCount();
    this.fetchElevesCount();
    this.fetchMatieresCount();
    this.fetchClassesCount();
  }

  fetchEnseignantsCount() {
    this.enseignantService.getEnseignants().subscribe(
      enseignants => this.enseignantsCount = enseignants.length,
      error => console.error('Error fetching enseignants:', error)
    );
  }

  fetchElevesCount() {
    this.eleveService.getEleves().subscribe(
      eleves => this.elevesCount = eleves.length,
      error => console.error('Error fetching eleves:', error)
    );
  }

  fetchMatieresCount() {
    this.matiereService.getMatieres().subscribe(
      matieres => this.matieresCount = matieres.length,
      error => console.error('Error fetching matieres:', error)
    );
  }

  fetchClassesCount() {
    this.classeService.getClasses().subscribe(
      classes => this.classesCount = classes.length,
      error => console.error('Error fetching classes:', error)
    );
  }
}
