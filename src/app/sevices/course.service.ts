

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  //private apiUrl = 'http://localhost:8888/SPRINT3/cours';
  private  api = 'http://localhost:8081/cours';
  constructor(private http: HttpClient) {}
  ajouterCours(idMatiere: string, coursData: FormData): Observable<any> {
    const url = `${this.api}/ajouterCours/${idMatiere}`;
    return this.http.post(url, coursData);
  }
  getCoursByMatiere(matiereId: string): Observable<any[]> {
    const url = `${this.api}/coursByMatiere/${matiereId}`;
    return this.http.get<any[]>(url);
}
  getAllCourses(): Observable<any[]> {
    const url = this.api;
    return this.http.get<any[]>(url);
  }

  updateCourse(courseId: string, courseData: FormData): Observable<any> {
    const url = `${this.api}/updateCours/${courseId}`;
    return this.http.put<any>(url, courseData).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du cours:', error);
        throw error;
      })
    );
  }

  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.api}/delete/${courseId}`;
    return this.http.delete(url);
  }

  deleteAllCourses(): Observable<any> {
    const url = `${this.api}/deleteAll`;
    return this.http.delete(url);
  }
}
