// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
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
  private loggedInUsernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private loggedInUserIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string | null>(null);
  public userId = new BehaviorSubject<string | null>(null);
  get loggedInUsername$(): Observable<string | null> {
    return this.loggedInUsernameSubject.asObservable();
  }
  get loggedInUserId$(): Observable<string | null> {
    return this.loggedInUserIdSubject.asObservable();
  }
  constructor(private http: HttpClient) {
    const storedUserId = localStorage.getItem('loggedInUserId');
    if (storedUserId) {
      this.loggedInUserIdSubject.next(storedUserId );
    }
  const storedUsername = localStorage.getItem('loggedInUsername');
  if (storedUsername) {
    this.loggedInUsernameSubject.next(storedUsername);
  }
}
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/signIn`, { username, password })
      .pipe(
        map(response => {
          if (response) {
             this.loggedIn.next(true);
             this.username.next(response.username);
            localStorage.setItem('loggedInUsername', response.username); // Mettre à jour le nom d'utilisateur
             this.userId.next(response.userId);
             localStorage.setItem('loggedInUserId', response.userId);
          }
          return response;
       })
      );
  }
  signUp(username: string, password: string, email: string, numInscrit: number, userClasse: string): Observable<any> {
    const url = `${this.apiUrl}/signup`; // Assuming you have a 'users' endpoint for signup
    const signUpData = { username, password, email, numInscrit, userClasse }; // Include numInscrit and userClasse
    return this.http.post(url, signUpData).pipe(
      catchError(this.handleError)
    );
  }
  logout(): Observable<any> {
    // Call the server's /logout endpoint
    return this.http.post(`${this.apiUrl}/logout`, {});
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
  getAuthenticatedUser(): Observable<Users | null> {
    // Assuming your server provides an endpoint to get the authenticated user
    return this.http.get<Users>(`${this.apiUrl}/authenticated-user`).pipe(
      catchError(this.handleHttpError)
    );
  }
  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user-statistics`).pipe(
      catchError(this.handleHttpError)
    );
  }
  getLoggedInUsername(): Observable<string | null> {
    const storedUsername = localStorage.getItem('loggedInUsername');
    console.log('Stored Username:', storedUsername);
    if (storedUsername) {
      this.loggedInUsernameSubject.next(storedUsername);
    }
    return this.loggedInUsernameSubject.asObservable();
  }

  getLoggedInUserId(): Observable<string | null> {
    const storedUserId = localStorage.getItem('loggedInUserId');
    console.log('Stored Username:', storedUserId);
    if (storedUserId) {
      this.loggedInUserIdSubject.next(storedUserId);
    }
    return this.loggedInUserIdSubject.asObservable();
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
  getCurrentEnseignantId(): string | null {
    return this.userId.value;
  }
}
