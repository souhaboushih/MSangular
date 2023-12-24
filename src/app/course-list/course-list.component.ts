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
   private base64String: string =""
  constructor(private courseService: CourseService, private matiereService: MatiereService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseService.getCourseById('658896bb2b172c7e6e0115b2').subscribe(
      data => {
        this.base64String = data.fichier.$binary.base64;
      },
      error => {
        console.error('Erreur lors de la récupération du cours:', error);
      }
    );
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

download(courseId: string): void {
  this.courseService.downloadFile(courseId).subscribe(blob => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${courseId}.pdf`; // Nommez le fichier en utilisant l'ID du cours
    link.click();
  });
}




  deleteCourse(courseId: string): void {
    console.log('ID du cours à supprimer:', courseId);
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.courses = this.courses.filter(c => c.id !== courseId);
        console.log('Course deleted successfully');
      },
      (error) => {
        console.error('Error deleting course:', error);
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
}
