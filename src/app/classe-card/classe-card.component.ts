import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../sevices/classe.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-classe-card',
  templateUrl: './classe-card.component.html',
  styleUrls: ['./classe-card.component.css']
})
export class ClasseCardComponent implements OnInit {
  classes: any[] = [];
  enseignantId: string | null = null;

  constructor(private classeService: ClasseService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.enseignantId = this.route.snapshot.paramMap.get('id');
    this.fetchClasses();
  }

  fetchClasses() {
    if (this.enseignantId) {
      this.classeService.getprofclass(this.enseignantId).subscribe(
        data => {
          this.classes = data;
        },
        error => {
          console.error("Erreur lors de la récupération des classes:", error);
        }
      );
    } else {
      console.error("ID de l'enseignant non fourni.");
    }
  }
  navigateToMatiereDetail(classeId: string) {
    this.router.navigate(['/matieres-communes', classeId,this.enseignantId]);
    // this.classeService.getMatiereByClasseId(classeId).subscribe(
    //   data => {
    //     const matiereId = data[0]._id;  // Supposons que le premier élément soit celui que vous voulez
    //     this.router.navigate(['/cours', matiereId]);
    //   },
    //   error => {
    //     console.error("Erreur lors de la récupération de la matière:", error);
    //   }
    // );
  }
}
