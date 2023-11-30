import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';




interface Users {
  username: string;
  email: string;
  password: string;
  class: string;
}

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private apiUrl = 'http://localhost:3003'; // Update this with your actual Spring Boot API URL

  constructor(private http: HttpClient) {}


  addeleve (username: string, password: string, email: string, userClass: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/addEleve`, { username, password, email, userClass }).pipe(
      catchError(this.handleError)
    );
  }



  getEleve(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/eleves`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError('echec');
      })
    );
  }

  deleteeleve(elid: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteEleve/${elid}`).pipe(
      catchError(this.handleError)
    );
  }


  updateeleve(id: string ,username: string, password: string, email: string, classe: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateEleve/${id}`,{username,password,email,classe}).pipe(
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


