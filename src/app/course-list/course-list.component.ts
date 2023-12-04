// course-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list', // Corrected selector
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit { // Corrected component name
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error loading courses:', error);
      }
    );
  }
}
