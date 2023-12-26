// matier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { RefreshService } from './refresh.service';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private refreshService: RefreshService) { }

  getMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres/mat`);
  }
  getClassesByMatiereId(matiereId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres/${matiereId}`);
  }
  getMatiereById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/matieres/${id}`);
  }
  getMatieresByEnseignantId(enseignantId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/enseignants/matieres/${enseignantId}`);
  }



  createMatiere(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/matieres`, data);
  }

  deleteMatiere(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/matieres/${id}`);
  }

  // Fonction pour mettre à jour une matière
  updateMatiere(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/matieres/${id}`, data);
  }
  searchMatieresByName(nom: string): Observable<any[]> {
    const url = `${this.apiUrl}/searchByName?nom=${nom}`;
    return this.http.get<any[]>(url);
  }
  // Émet un événement de rafraîchissement après chaque opération
  emitRefresh(): void {
    this.refreshService.emitRefresh();
  }
  getMatieresCommunes(classeId: string, enseignantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/matieres-communes/${classeId}/${enseignantId}`);
  }
}
