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
  courses: any[] = [];
  matieres: any[] = [];
  selectedMatiereId: string = '';
  selectedCourseId: string = '';
  enseignantId: string | null = null;
  loading = true;
  error: string | null = null;
  constructor(private matiereService: MatiereService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMatieres();
  }
  loadMatieres(): void {
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
redirectToCours(matiereId: string): void {
  console.log("Matier ID:", matiereId);


  // Naviguer vers la liste des cours de la matière sélectionnée
  this.router.navigate(['/course-list', matiereId]);
}
}
