// classe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'http://localhost:3000/classes'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient, private refreshService: RefreshService) { }

  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clas`);
  }
  addClasse(nouvelleClasse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nouvelleClasse);
  }
  updateClasse(id: string, classeModifiee: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, classeModifiee);
  }
  deleteClasse(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  emitRefresh(): void {
    this.refreshService.emitRefresh();
  }
  getprofclass(enseignantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignants/${enseignantId}`);
  }
  getMatiereByClasseId(classeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/matiere/${classeId}`);
  }
}
