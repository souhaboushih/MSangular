// travail.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravailService {
  private baseUrl = 'http://localhost:8081/travails'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  addTravail(title: string, idEleve: string, fichier: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('idEleve', idEleve);
    if (fichier) {
      formData.append('fichier', fichier, fichier.name);
    }

    return this.http.post(`${this.baseUrl}/ajouterTravail/${idEleve}`, formData);
  }
}
