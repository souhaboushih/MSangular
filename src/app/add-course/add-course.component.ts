  import { Component } from '@angular/core';
  import { CourseService } from '../course.service';

  @Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css'],
  })
  export class AddCourseComponent {
    courseData: { nom: string, description: string, datedebut: string } = { nom: '', description: '', datedebut: ''};
    selectedFile: File | null = null;

    constructor(private courseService: CourseService) {}

    onSubmit(): void {
      if (this.isValidForm()) {
        const formData = new FormData();
        formData.append('nom', this.courseData.nom);
        formData.append('description', this.courseData.description);
        formData.append('datedebut', this.courseData.datedebut);

        if (this.selectedFile) {
          formData.append('fichier', this.selectedFile, this.selectedFile.name);
        }

        this.courseService.addCourse(formData).subscribe(
          (response) => {
            console.log('Course added successfully:', response);
            // Optionally, reset the form after successful submission
            this.resetForm();
          },
          (error) => {
            console.error('Error adding course:', error);
          }
        );
      } else {
        console.error('Please fill in all required fields.');
      }
    }

    onFileSelected(event: any): void {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.selectedFile = fileList[0];
      }
    }

    private isValidForm(): boolean {
      return !!this.courseData.nom && !!this.courseData.description && !!this.courseData.datedebut;
    }

    private resetForm(): void {
      this.courseData = { nom: '', description: '', datedebut: '' };
    this.selectedFile = null;
    }

  }
