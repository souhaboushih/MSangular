import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  courseData: { nom: string, description: string, datedebut: string, matiereId: string } = {
    nom: '',
    description: '',
    datedebut: '',
    matiereId: '', // Add matiereId to the courseData
  };
  selectedFile: File | null = null;
  matieres: any[] = [];
  constructor(private courseService: CourseService, private matiereService: MatiereService) {}

  ngOnInit() {
    this.loadMatieres();
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }
  onSelectMatiere(): void {
    // This method is called when a matière is selected in the dropdown
    console.log('Selected Matiere ID:', this.courseData.matiereId);
  }


  onSubmit(): void {
    if (this.isValidForm() && this.courseData.matiereId) {
      const formData = new FormData();
      formData.append('nom', this.courseData.nom);
      formData.append('description', this.courseData.description);
      formData.append('datedebut', this.courseData.datedebut);

      if (this.selectedFile) {
        formData.append('fichier', this.selectedFile, this.selectedFile.name);
      }
      this.courseService.ajouterCours(this.courseData.matiereId, formData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding course:', error);
        }
      );
    } else {
      console.error('Please fill in all required fields and select a matière.');
    }
  }


  loadMatieres() {
    this.matiereService.getMatieres().subscribe(
      (matieres: any[]) => {
        this.matieres = matieres;
      },
      error => {
        console.error('Erreur lors de la récupération des matières :', error);
      }
    );
  }

  private isValidForm(): boolean {
    return !!this.courseData.nom && !!this.courseData.description && !!this.courseData.datedebut && !!this.courseData.matiereId;
  }

  private resetForm(): void {
    this.courseData = { nom: '', description: '', datedebut: '', matiereId: '' };
    this.selectedFile = null;
  }
}
