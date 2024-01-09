import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../../sevices/matier.service';
import { ClasseService } from '../../sevices/classe.service';
import { RefreshService } from '../../sevices/refresh.service';
@Component({
  selector: 'app-matier',
  templateUrl: './matier.component.html',
  styleUrls: ['./matier.component.css']
})
export class MatierComponent implements OnInit {
  classeId = ''; // Type string est déduit, donc pas nécessaire de l'initialiser
  matieres: any[] = [];
  nouvelleMatiere: any = {};
  classes: any[] = [];
  selectedClasses: string[] = [];
  matiereData = {
    nom: '',
    description: '',
    classes: [] as string[] // Typer le tableau pour plus de sécurité
  };

  constructor(
    private matiereService: MatiereService,
    private toastr: ToastrService,
    private refreshService: RefreshService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.getMatiereList();
    this.refreshService.refresh$.subscribe(() => {
      this.getMatiereList();
    });
    this.loadClasses(); // Utilisation d'une méthode distincte pour charger les classes
  }

  loadClasses(): void {
    this.classeService.getClasses().subscribe(
      classes => {
        this.classes = classes;
      },
      error => {
        this.toastr.error('Erreur lors du chargement des classes.'); // Notification à l'utilisateur
        console.error('Error fetching classes:', error);
      }
    );
  }

  getMatiereList(): void {
    this.matiereService.getMatieres().subscribe(
      matieres => {
        this.matieres = matieres;
      },
      error => {
        this.toastr.error('Erreur lors du chargement des matières.'); // Notification à l'utilisateur
        console.error('Error fetching matieres:', error);
      }
    );
  }

  onClassChange(event: any): void {
    const classeId = event.target.value;
    if (event.target.checked) {
      this.matiereData.classes.push(classeId);
    } else {
      const index = this.matiereData.classes.indexOf(classeId);
      if (index > -1) {
        this.matiereData.classes.splice(index, 1);
      }
    }
  }
  onClass(event: any, classeId: string): void {
    console.log('Checkbox changed for class:', classeId);

    let targetArray = this.nouvelleMatiere.classes || this.matiereData.classes;

    if (event.target.checked) {
      if (!targetArray.includes(classeId)) {
        targetArray.push(classeId);
      }
    } else {
      const index = targetArray.indexOf(classeId);
      if (index > -1) {
        targetArray.splice(index, 1);
      }
    }
  }



  onSubmit(): void {
    this.matiereService.createMatiere(this.matiereData).subscribe(
      response => {
        this.toastr.success('Matière créée avec succès.');
        console.log('Matière créée avec succès:', response);
        this.getMatiereList();
      },
      error => {
        this.toastr.error('Erreur lors de la création de la matière.');
        console.error('Erreur lors de la création de la matière:', error);
      }
    );
  }

  mettreAJourMatiere(): void {
    // Mettez à jour la matière avec la liste finale des classes sélectionnées
    this.nouvelleMatiere.classes = this.selectedClasses;

    const idMatiereAModifier = this.nouvelleMatiere._id;

    this.matiereService.updateMatiere(idMatiereAModifier, this.nouvelleMatiere)
      .subscribe(
        matiereMiseAJour => {
          console.log('Matière mise à jour avec succès', matiereMiseAJour);
          this.matiereService.emitRefresh();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la matière', error);
        }
      );
}
isSelected(classId: string): boolean {
  return this.nouvelleMatiere.classes?.includes(classId) || false;
}


  supprimerMatiere(id: string): void {
    if(confirm('Vouslez-vous supprimer cette matiere ?'))
 {
    this.matiereService.deleteMatiere(id).subscribe(
      response => {
        this.getMatiereList();
        console.log('Matière supprimée avec succès:', response);
      },
      error => {
        console.error('Erreur lors de la suppression de la matière:', error);
      }
    );
  }
}
  afficherToast(message: string, titre: string): void {
    this.toastr.success(message, titre);
  }
  async initializeNouvelleMatiere(matiereId: string): Promise<void> {
    try {
      this.matiereService.getMatiereById(matiereId).subscribe(
        matiere => {
          this.nouvelleMatiere = {
            ...matiere,
            classes: matiere.classes.map((classe: any) => classe.$oid) // Convertit les classes en un tableau d'ID
          };
        },
        error => {
          console.error("Erreur lors de la récupération de la matière:", error);
        }
      );
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la matière:", error);
    }
  }




  // Ajoutez la fonction suivante
  preparerEdition(event: any, matiere: any): void {
    event.stopPropagation();
    this.initializeNouvelleMatiere(matiere._id); // Assurez-vous que l'ID est accessible depuis votre objet matiere
}




}
