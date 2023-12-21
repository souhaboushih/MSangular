import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';
interface CourseData {
  nom: string;
  description: string;
  datedebut: Date | string;
  matiereId: string;
}
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  courseData: CourseData = {
    nom: '',
    description: '',
    datedebut: new Date(),
    matiereId: '',
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

  onSubmit(): void {
    if (this.isValidForm() && this.courseData.matiereId) {
      const formData = new FormData();
      formData.append('nom', this.courseData.nom);
      formData.append('description', this.courseData.description);
      formData.append('datedebut', this.convertDateToString(this.courseData.datedebut));

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

  convertDateToString(date: Date | string): string {
    if (typeof date === 'string') {
        return date; // Si c'est déjà une chaîne, retournez-la directement
    }
    if (date instanceof Date && !isNaN(date.getTime())) {
        return date.toISOString();
    }
    throw new Error('Invalid date provided');
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
    this.courseData = { nom: '', description: '', datedebut: new Date(), matiereId: '' };
    this.selectedFile = null;
  }
}
