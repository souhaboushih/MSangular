// course-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  selectedCourseId: string | null = null;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  getDownloadLink(course: any): string {
    return course.fichier;
  }

  deleteCourse(courseId: string): void {
    // Call the service method to delete the specific course
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        console.log('Course deleted successfully');
        // Reload the courses after deletion
        this.loadCourses();
      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  deleteAllCourses(): void {
    // Call the service method to delete all courses
    this.courseService.deleteAllCourses().subscribe(
      () => {
        console.log('All courses deleted successfully');
        // Reload the courses after deletion
        this.loadCourses();
      },
      (error) => {
        console.error('Error deleting all courses:', error);
      }
    );
  }
  updateCourse(courseId: string): void {
    // Set the selected course id to show the update form
    this.selectedCourseId = courseId;
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
