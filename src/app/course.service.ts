// course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses'; // Adjust the URL based on your server

  constructor(private http: HttpClient) {}

  addCourse(courseData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, courseData);
  }
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
