import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-matier-cour',
  templateUrl: './matier-cour.component.html',
  styleUrls: ['./matier-cour.component.css']
})
export class MatierCourComponent implements OnInit {
  matieresCommunes: any[] = [];
  courses: any[] = [];
  matieres: any[] = [];
  selectedMatiereId: string = '';
  selectedCourseId: string = '';
  loading = true;
  error: string | null = null;

  constructor(
    private matiereService: MatiereService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMatieres();
  }

  loadMatieres(): void {
    const enseignantId = this.route.snapshot.paramMap.get('enseignantId');
    const classeId = this.route.snapshot.paramMap.get('classeId');

    if (!enseignantId || !classeId) {
      console.error('IDs non fournis.');
      return;
    }

    this.matiereService.getMatieresCommunes(classeId, enseignantId).subscribe(
      data => {
        this.matieres = data;
      },
      error => {
        console.error('Erreur lors de la récupération des matières communes:', error);
        this.error = 'Erreur lors de la récupération des matières communes.';
        this.loading = false;
      }
    );
  }

  redirectToCours(matiereId: string): void {
    console.log("Matier ID:", matiereId);
    this.router.navigate(['/course-list', matiereId]);
  }
}
