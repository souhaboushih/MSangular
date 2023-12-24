// enseignant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private baseUrl = 'http://localhost:3003'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/enseignants`);
  }

  getEnseignantDetails(enseignantId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getEnseignantDetails/${enseignantId}`);
  }

  addEnseignant(username: string, password: string, email: string, matiere: string): Observable<any> {
   
    const url = `${this.baseUrl}/addEnseignant`; // Assuming you have a 'users' endpoint for signup
    const signUpData = { username, password, email, matiere }; // Include numInscrit and userClasse
    return this.http.post(url, signUpData).pipe(
      catchError(this.handleError)
    );
  }

  updateEnseignant(enseignantId: string, enseignantData: any): Observable<any> {
      console.log('Updating eleve with data:', enseignantData); // Ajoutez cette ligne pour vérifier les données envoyées
      return this.http.put<any>(`${this.baseUrl}/updateEnseignant/${enseignantId}`, enseignantData).pipe(
        catchError(this.handleError)
      );
    }

  deleteEnseignant(enseignantId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteEnseignant/${enseignantId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite:', error.error.message);
    } else {
      console.error(`Code d'erreur: ${error.status}, Body: ${error.error}`);
    }
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
}
