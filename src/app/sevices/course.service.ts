

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8888/SPRINT3/cours';
  private  api = 'http://localhost:8081/cours';
  constructor(private http: HttpClient) {}
  ajouterCours(idMatiere: string, coursData: FormData): Observable<any> {
    const url = `${this.apiUrl}/ajouterCours/${idMatiere}`;
    return this.http.post(url, coursData);
  }
  getCoursByMatiere(matiereId: string): Observable<any[]> {
    const url = `${this.api}/coursByMatiere/${matiereId}`;
    return this.http.get<any[]>(url);
}
  getAllCourses(): Observable<any[]> {
    const url = this.apiUrl;
    return this.http.get<any[]>(url);
  }

  updateCourse(courseId: string, courseData: FormData): Observable<any> {
    const url = `${this.apiUrl}/updateCours/${courseId}`;
    return this.http.put(url, courseData); // Use HTTP PUT for updates
  }

  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${courseId}`;
    return this.http.delete(url);
  }

  deleteAllCourses(): Observable<any> {
    const url = `${this.apiUrl}/deleteAll`;
    return this.http.delete(url);
  }
}
