// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3002'; // URL de votre backend

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

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`).pipe(
      catchError(this.handleError)
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
