import React, { useEffect, useState } from 'react';
import { NotificationService } from '../../storage/Notifications';


interface NotificationProps {
  notification: Notification;
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const NotificationItem: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      {notification.message}
    </div>
  );
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationService = new NotificationService();

  useEffect(() => {
    const subscription = notificationService.list().subscribe(newNotifications => {
      setNotifications(newNotifications);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notifications;
