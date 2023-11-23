// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Users {
  // Définissez les propriétés du type Users

  username: string;
  email : string;
  password : string;
  // ... autres propriétés
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8888/APP'; // URL de votre passerelle Spring Boot

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signIn`, { username, password }).pipe(
      catchError(this.handleError)
    );
  }

  signUp(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { username, password, email }).pipe(
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
        })
      );
  }

  rejectUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/users/reject/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  acceptUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/users/accept/${userId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite:', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(`Code d'erreur: ${error.status}, Body: ${error.error}`);
    }
    // Retourne une observable avec une erreur pour que le composant puisse la gérer
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }
}
