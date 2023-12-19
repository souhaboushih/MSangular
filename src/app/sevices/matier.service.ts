// matier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { RefreshService } from './refresh.service';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiUrl = 'http://localhost:3000/matieres';

  constructor(private http: HttpClient, private refreshService: RefreshService) { }

  getMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mat`);
  }
  getClassesByMatiereId(matiereId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${matiereId}`);
  }
  addMatiere(newMatiere: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, newMatiere).pipe(
      switchMap(matiere => {
        // Ajouter une entrée dans ClasseMatiere ici
        const classeMatiereData = {
          matiereId: matiere._id,
          classeId: newMatiere.classes // Supposant que newMatiere.classes contient l'ID de la classe sélectionnée
        };
        return this.http.post<any>(`${this.apiUrl}/classMatiere`, classeMatiereData);
      })
    );
  }



  deleteMatiere(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Fonction pour mettre à jour une matière
  updateMatiere(id: string, matiere: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, matiere);
  }
  searchMatieresByName(nom: string): Observable<any[]> {
    const url = `${this.apiUrl}/searchByName?nom=${nom}`;
    return this.http.get<any[]>(url);
  }
  // Émet un événement de rafraîchissement après chaque opération
  emitRefresh(): void {
    this.refreshService.emitRefresh();
  }
}
