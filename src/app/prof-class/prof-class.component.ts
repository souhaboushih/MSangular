// prof-class.component.ts

import { Component, OnInit } from '@angular/core';
import { ProfClassService } from '../sevices/prof-class.service';
import { ClasseService } from '../sevices/classe.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-prof-class',
  templateUrl: './prof-class.component.html',
  styleUrls: ['./prof-class.component.css']
})
export class ProfClassComponent implements OnInit {
  profClasses: any[] = [];
  enseignantId: string = '';
  classeId: string = '';
  updatedData: any = {};

  // Ajouter ces propriétés
  enseignants: any[] = [];
  classes: any[] = [];

  constructor(private router: Router, private profClassService: ProfClassService, private classeService: ClasseService) { }


  ngOnInit(): void {
    this.loadProfClasses();
    this.loadEnseignants();
    this.loadClasses();
  }

  loadProfClasses(): void {
    this.profClassService.getAllProfClass().subscribe((data: any[]) => {
      this.profClasses = data;
    });
  }
  
  loadEnseignants(): void {
    this.profClassService.getAllEnseignants().subscribe((data: any[]) => {
      this.enseignants = data;
    });
  }
  
  loadClasses(): void {
    this.classeService.getClasses().subscribe((data: any[]) => {
      this.classes = data;
    });
  }

  // Ajoutez cette méthode pour obtenir le nom de l'enseignant par ID
  getEnseignantNameById(id: string): string {
    const enseignant = this.enseignants.find(e => e._id === id);
    return enseignant ? enseignant.username : '';
  }

  // Ajoutez cette méthode pour obtenir le nom de la classe par ID
  getClasseNameById(id: string): string {
    const classe = this.classes.find(c => c._id === id);
    return classe ? classe.nom : '';
  }

  addProfClass(): void {
    this.profClassService.addProfClass(this.enseignantId, this.classeId).subscribe(() => {
      this.loadProfClasses();
    });
  }

  updateProfClass(idProfClass: string): void {
    // Navigate to the update-prof-class route with the ProfClass ID
    this.router.navigate(['/update-prof-class', idProfClass]);
  }

 
  removeProfClass(idProfClass: string) {
    if(confirm('Vouslez-vous supprimer cet relation ?'))
 {
  this.profClassService.removeProfClass(idProfClass).subscribe(
    (response) => {
      console.log('ProfClass supprimé avec succès:', response);
      
      this.loadProfClasses(); // Refresh the list after deleting
    },
    (error) => {
      console.error('Erreur lors de la suppression de ProfClass :', error);
    }
  );
 }
  }
}
