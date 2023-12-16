import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../../sevices/matier.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RefreshService } from '../../sevices/refresh.service';
@Component({
  selector: 'app-matier',
  templateUrl: './matier.component.html',
  styleUrls: ['./matier.component.css']
})
export class MatierComponent implements OnInit {
  matieres: any[]=[];
  nouvelleMatiere: any = {};
  searchNom: string = '';
  //searchForm: FormGroup;
  constructor(private matiereService: MatiereService, private toastr: ToastrService,private refreshService: RefreshService) {
  }

  ngOnInit(): void {
    this.getMatiereList();
    this.refreshService.refresh$.subscribe(() => {
      // Mettez à jour vos données localement ici
      this.getMatiereList();
    });
  }

  getMatiereList(): void {
    this.matiereService.getMatieres()
      .subscribe(matieres => this.matieres = matieres);
  }
  ajouterMatiere(): void {
    this.matiereService.addMatiere(this.nouvelleMatiere)
      .subscribe(matiereEnregistree => {
        console.log('Matière ajoutée avec succès', matiereEnregistree);
        // Mettez à jour votre liste locale si nécessaire
        this.matieres.push(matiereEnregistree);
        // Réinitialisez les données du formulaire
        this.nouvelleMatiere = {};
        //this.afficherToast();
      }, error => {
        console.error('Erreur lors de l\'ajout de la matière', error);
      });
  }
  mettreAJourMatiere(): void {
    const idMatiereAModifier = this.nouvelleMatiere._id;

    this.matiereService.updateMatiere(idMatiereAModifier, this.nouvelleMatiere)
      .subscribe(
        matiereMiseAJour => {
          console.log('Matière mise à jour avec succès', matiereMiseAJour);
          // Mettez à jour localement vos données si nécessaire
          this.matiereService.emitRefresh();
        },
        error => {
          console.error('Erreur lors de la mise à jour de la matière', error);
          // Gérez l'erreur en conséquence
        }
      );
  }
  supprimerMatiere(id: string): void {
    this.matiereService.deleteMatiere(id)
      .subscribe(
        matiereSupprimee => {
          console.log('Matière supprimée avec succès', matiereSupprimee);
          // Mettez à jour localement vos données si nécessaire

          // Émettez un événement de rafraîchissement
          this.matiereService.emitRefresh();
        },
        error => {
          console.error('Erreur lors de la suppression de la matière', error);
          // Gérez l'erreur en conséquence
        }
      );
  }
  rechercherMatieresParNom(): void {
    this.matiereService.searchMatieresByName(this.searchNom)
      .subscribe(result => {
        // Mettre à jour les résultats de la recherche dans votre liste matieres
        console.log(result);
      }, error => {
        console.error('Erreur lors de la recherche des matières par nom', error);
      });
  }
  afficherToast(message: string, titre: string): void {
    this.toastr.success(message, titre);
  }

  // Ajoutez la fonction suivante
  preparerEdition(event: any, matiere: any): void {
    event.stopPropagation();
    this.nouvelleMatiere = { ...matiere };
  }


}
