import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor() {}

  showNotification(title: string, options?: any) {
    if (!("Notification" in window)) {
      console.error("Ce navigateur ne supporte pas les notifications desktop");
      alert("Ce navigateur ne supporte pas les notifications desktop");
    } else if (Notification.permission === "granted") {
      try {
        new Notification(title, options);
      } catch (error) {
        console.error("Erreur lors de la création de la notification:", error);
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          try {
            new Notification(title, options);
          } catch (error) {
            console.error("Erreur lors de la création de la notification:", error);
          }
        }
      });
    }
  }
}
