import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';
import { Router } from '@angular/router';
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
  constructor(private matiereService: MatiereService,private router: Router) { }

  ngOnInit(): void {
    this.loadMatieres();
  }
  loadMatieres(): void {
    this.matiereService.getMatieres().subscribe(
        (matieres: any[]) => {
            this.matieres = matieres;
        },
        error => {
            console.error('Erreur lors de la récupération des matières :', error);
        }
    );
}
redirectToCours(matiereId: string): void {
  console.log("Matier ID:", matiereId);


  // Naviguer vers la liste des cours de la matière sélectionnée
  this.router.navigate(['/course-list', matiereId]);
}
}
