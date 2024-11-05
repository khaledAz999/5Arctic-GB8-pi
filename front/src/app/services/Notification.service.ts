import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notify(message: string) {
    // Here you can implement your notification logic, for example, displaying a notification bar or toast
    alert(message);
  }
}
