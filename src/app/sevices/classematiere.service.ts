// classe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class ClassematiereService {
  private apiUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient, private refreshService: RefreshService) { }


  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes/clas`);
  }

  emitRefresh(): void {
    this.refreshService.emitRefresh();
  }
}
