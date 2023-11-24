// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Users {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3002'; // Update this with your actual Spring Boot API URL

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
    return this.http.get<Users[]>(`${this.apiUrl}/user`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
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
      console.error('Une erreur s\'est produite:', error.error.message);
    } else {
      console.error(`Code d'erreur: ${error.status}, Body: ${error.error}`);
    }
    return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // Handle unauthorized error
      console.error('Unauthorized access. Please log in.');
    } else if (error.status === 403) {
      // Handle forbidden error
      console.error('Access forbidden. You do not have permission to perform this action.');
    }
    // Add more cases as needed
  }
}
