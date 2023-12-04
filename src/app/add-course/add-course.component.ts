// add-course.component.ts
import { Component } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent {
  courseData: any = {};
  selectedFile: File | null = null;

  constructor(private courseService: CourseService) {}

  onSubmit(): void {
    if (this.courseData.title && this.courseData.description && this.courseData.date) {
      const formData = new FormData();
      formData.append('title', this.courseData.title);
      formData.append('description', this.courseData.description);
      formData.append('date', this.courseData.date.toISOString());

      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      this.courseService.addCourse(formData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          // Optionally, reset the form
          this.courseData = {};
          this.selectedFile = null;
        },
        (error) => {
          console.error('Error adding course:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
}
