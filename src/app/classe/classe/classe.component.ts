import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../sevices/classe.service';
import { RefreshService } from '../../sevices/refresh.service';
import { NgForm } from '@angular/forms'; // Importez NgForm ici

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classes: any[] = [];
  nouvelleClasse: any = {};
  // classeAModifier: any = {};

  constructor(private classeService: ClasseService, private refreshService: RefreshService) { }

  ngOnInit(): void {
    this.getClasses();
    this.refreshService.refresh$.subscribe(() => {
      this.getClasses();
    });
  }

  getClasses(): void {
    this.classeService.getClasses()
      .subscribe(classes => this.classes = classes);
  }

  ajouterClasse(): void {
    this.classeService.addClasse(this.nouvelleClasse)
      .subscribe(classeEnregistree => {
        console.log('Classe ajoutée avec succès', classeEnregistree);
        this.nouvelleClasse = {};
        this.classeService.emitRefresh();
      }, error => {
        console.error('Erreur lors de l\'ajout de la classe', error);
      });
  }

  mettreAJourClasse(): void {
    const idClasseModifier = this.nouvelleClasse._id;

    this.classeService.updateClasse(idClasseModifier, this.nouvelleClasse)
      .subscribe(
        classeMiseAJour => {
          console.log('Classe mise à jour avec succès', classeMiseAJour);
          this.classeService.emitRefresh();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la classe', error);
        }
      );
  }
  supprimerClasse(id: string): void {
    if(confirm('Vouslez-vous supprimer cette classe?'))
 {
    this.classeService.deleteClasse(id)
      .subscribe(() => {
        console.log('Classe supprimée avec succès');
        this.getClasses(); // Rafraîchissez la liste après la suppression
      }, error => {
        console.error('Erreur lors de la suppression de la classe', error);
      });
  }
}


  preparerEdition(event: any, classe: any): void {
    event.stopPropagation();
    this.nouvelleClasse = { ...classe };
  }

}
