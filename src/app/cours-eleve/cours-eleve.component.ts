// Import the Matiere type if available
// import { Matiere } from 'path-to-matiere-type-definition';

import { Component, OnInit } from '@angular/core';
import { EleveService } from '../sevices/eleve.service';
import { ClasseService } from '../sevices/classe.service';
import { MatiereService } from '../sevices/matier.service';
import { UserService } from '../sevices/user.service';
import { CourseService } from '../sevices/course.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cours-eleve',
  templateUrl: './cours-eleve.component.html',
  styleUrls: ['./cours-eleve.component.css']
})
export class CoursEleveComponent implements OnInit {
  matieres: any[] = [];
  coursByMatiere: any = {}; // Store courses by matiere
  
  constructor(private eleveService: EleveService, private router: Router, private userService: UserService, private classeService: ClasseService, private matiereService: MatiereService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.userService.getLoggedInUserId().subscribe((userId) => {
      if (userId) {
        this.eleveService.getEleveDetails(userId).subscribe(eleveDetails => {
          const classeId = eleveDetails.userClass;

          this.classeService.getMatiereByClasseId(classeId).subscribe(matieres => {
            console.log('Matieres:', matieres); // Log matieres to the console
            this.matieres = matieres;

            // Fetch courses for each matiere
            matieres.forEach((matiere: any) => {
              this.courseService.getCoursByMatiere(matiere._id.$oid).subscribe(cours => {
                this.coursByMatiere[matiere._id.$oid] = cours;
              });
            });
          });
        });
      }
    });
  }

  redirectToCours(matiereId: string): void {
    console.log("Matier ID:", matiereId);
    this.router.navigate(['/course-list-eleve', matiereId]);
  }
}
