import { Component, OnInit } from '@angular/core';
import { CourseService } from '../sevices/course.service';
import { MatiereService } from '../sevices/matier.service';
import { NotificationService } from '../sevices/notification.service';
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

  constructor(private courseService: CourseService, private matiereService: MatiereService,private notificationService: NotificationService) {}

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
            this.notify();
          },
          (error) => {
            console.error('Error adding course:', error);
            this.notify();
          }
        );
    } else {
      console.error('Please fill in all required fields and select a matière.');
    }
  }

  convertDateToString(date: Date | string): string {
    if (typeof date === 'string') {
        return date;
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
  notify(): void {
    console.log("Tentative d'affichage de la notification");
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
      </svg>
    `;

    // Convertir l'icône SVG en base64
    const base64Icon = 'data:image/svg+xml;base64,' + btoa(svgIcon);

    this.notificationService.showNotification('Nouveau cours ajouté', {
      body: 'Un nouveau cours a été ajouté à la plateforme.',
      icon: base64Icon
    });
  }

}
