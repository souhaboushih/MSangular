// eleve.service.ts

import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private baseUrl = 'http://localhost:3003'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getEleves(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/eleves`);
  }
  getEleveDetails(eleveId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getEleveDetails/${eleveId}`);
  }

  addEleve(username: string, password: string, email: string, numInscrit: string, userClass: string): Observable<any> {
   
      const url = `${this.baseUrl}/addEleve`; // Assuming you have a 'users' endpoint for signup
      const signUpData = { username, password, email, numInscrit, userClass }; // Include numInscrit and userClasse
      return this.http.post(url, signUpData).pipe(
        catchError(this.handleError)
      );
    }
   
  

    updateEleve(eleveId: string, eleveData: any): Observable<any> {
      console.log('Updating eleve with data:', eleveData); // Ajoutez cette ligne pour vérifier les données envoyées
      return this.http.put<any>(`${this.baseUrl}/updateEleve/${eleveId}`, eleveData).pipe(
        catchError(this.handleError)
      );
    }

  deleteEleve(eleveId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteEleve/${eleveId}`);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Une erreur s\'est produite:', error.error.message);
    } else {
      console.error(`Code d'erreur: ${error.status}, Body: ${error.error}`);
    }
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }

  private handleHttpError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      // Handle unauthorized error
      console.error('Unauthorized access. Please log in.');
    } else if (error.status === 403) {
      // Handle forbidden error
      console.error('Access forbidden. You do not have permission to perform this action.');
    }
    // Add more cases as needed
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');

  }
}