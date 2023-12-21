// success-message.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessMessageService {
  private successMessageSource = new BehaviorSubject<string>('');
  successMessage$ = this.successMessageSource.asObservable();

  setSuccessMessage(message: string) {
    this.successMessageSource.next(message);
  }
}
