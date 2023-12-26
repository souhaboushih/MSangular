

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8888/SPRINT3/cours';
  private  api = 'http://localhost:8081/cours';
  //private apiBase='http://localhost:3000'
  constructor(private http: HttpClient) {}
  ajouterCours(idMatiere: string, coursData: FormData): Observable<any> {
    const url = `${this.api}/ajouterCours/${idMatiere}`;
    return this.http.post(url, coursData);
  }
  // lierCours(classeId: string, coursId: string): Observable<any> {
  //   const body = { classeId, coursId };
  //   return this.http.post((`${this.apiBase}/lier-cours`), body);
  // }
  getCoursByMatiere(matiereId: string): Observable<any[]> {
    const url = `${this.api}/coursByMatiere/${matiereId}`;
    return this.http.get<any[]>(url);
}
  // getAllCourses(): Observable<any[]> {
  //   const url = this.api;
  //   return this.http.get<any[]>(url);
  // }

  updateCourse(courseId: string, courseData: FormData): Observable<any> {
    const url = `${this.api}/updateCours/${courseId}`;
    return this.http.put<any>(url, courseData).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du cours:', error);
        throw error;
      })
    );
  }
  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/cours/${id}`);
  }
  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.api}/delete/${courseId}`;
    return this.http.delete(url);
  }
  downloadFile(id: string): Observable<Blob> {
    return this.http.get(`${this.api}/download/${id}`, {
      responseType: 'blob'
    });
  }
  // deleteAllCourses(): Observable<any> {
  //   const url = `${this.api}/deleteAll`;
  //   return this.http.delete(url);
  // }
}
