import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  matieres: any[] = [];
  selectedMatiereId: string = '';
  selectedCourseId: string = '';
  // course-list.component.ts
selectedCourse: any = '';

  constructor(private courseService: CourseService, private matiereService: MatiereService,private route: ActivatedRoute) {}

  ngOnInit(): void {

    const matiereId = this.route.snapshot.paramMap.get('matiereId');
    console.log('matiereId en cours:', matiereId);
    if (matiereId) {
      this.getCoursForMatiere(matiereId);
    }
  }

getCoursForMatiere(matiereId: string): void {
  this.courseService.getCoursByMatiere(matiereId).subscribe(
    (cours: any[]) => {
        console.log('Cours reçus:', cours);
        this.courses = cours;
    },
    error => {
        console.error('Erreur lors de la récupération des cours par matière:', error);
    }
);

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
        this.selectedCourseId = courseId;
    this.selectedCourse = this.courses.find(c => c.id === courseId);
  }

  onSubmit(): void {
    // Vérifiez si un cours est sélectionné
    if (!this.selectedCourse) {
      console.error('No course selected for update');
      return;
    }


    console.log('formdata', this.selectedCourse);

    this.courseService.updateCourse(this.selectedCourseId, this.selectedCourse).subscribe(
      () => {
        console.log('Course updated successfully');
      },
      (error) => {
        console.error('Error updating course:', error);
      }
    );
  }


   loadCourses(): void {
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
