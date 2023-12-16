// matier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshService } from './refresh.service';
@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiUrl = 'http://localhost:3000/matieres';

  constructor(private http: HttpClient, private refreshService: RefreshService) { }

  getMatieres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addMatiere(newMatiere: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newMatiere);
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
