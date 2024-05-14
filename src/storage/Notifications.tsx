import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export class NotificationService {
  private notificationsKey = 'notifications';
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>(this.getNotificationsFromStorage());

  constructor() {
    const notifications = this.getNotificationsFromStorage();
    this.notificationsSubject.next(notifications);
  }

  private getNotificationsFromStorage(): Notification[] {
    const notificationsJson = localStorage.getItem(this.notificationsKey);
    return notificationsJson ? JSON.parse(notificationsJson) : [];
  }

  private saveNotificationsToStorage(notifications: Notification[]): void {
    localStorage.setItem(this.notificationsKey, JSON.stringify(notifications));
  }

  send(notification: Notification): void {
    const notifications = this.notificationsSubject.value;
    notifications.push(notification);
    this.saveNotificationsToStorage(notifications);
    this.notificationsSubject.next(notifications);
  }

  list(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  unreadCount(): Observable<number> {
    return this.notificationsSubject.pipe(
      map(notifications => notifications.filter(notification => !notification.read).length)
    );
  }
}


