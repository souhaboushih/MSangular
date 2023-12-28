// prof-class.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfClassService {
  private apiUrl = 'http://localhost:3003'; // Assurez-vous de mettre à jour l'URL en fonction de votre backend

  constructor(private http: HttpClient) { }

  getAllProfClass(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllProfClass`);
  }

  addProfClass(enseignantId: string, classeId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addEnseignantToClasse/${enseignantId}/${classeId}`, {});
  }

//   updateProfClass(idProfClass: string, updatedData: any): Observable<any> {
//     return this.http.put<any>(`${this.apiUrl}/updateProfClass/${idProfClass}`, updatedData);
//   }

updateProfClass(idProfClass: string, updatedData: any): Observable<any> {
    console.log('Updating profclass with data:', updatedData);
    return this.http.put<any>(`${this.apiUrl}/updateProfClass/${idProfClass}`, updatedData);
}

getProfClassDetails(idProfClass: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getEnseignantDetails/${idProfClass}`);
  }
  removeProfClass(idProfClass: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/removeEnseignantFromClasse/${idProfClass}`);
  }
 
  getAllEnseignants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/enseignants`);
  }

//   getAllClasses(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/classes`);
//   }
}
