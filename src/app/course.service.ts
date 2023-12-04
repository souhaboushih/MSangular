import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8081/cours';

  constructor(private http: HttpClient) {}

  addCourse(courseData: FormData): Observable<any> {
    const url = `${this.apiUrl}/ajouterCours`;
    return this.http.post(url, courseData);
  }

  getAllCourses(): Observable<any[]> {
    const url = this.apiUrl;
    return this.http.get<any[]>(url);
  }
}
