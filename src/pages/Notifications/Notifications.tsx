import React, { useEffect, useState } from 'react';
import { NotificationService } from '../../storage/NotificationsService';
import './Notifications.css';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

interface NotificationProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({ notification, onMarkAsRead }) => {
  return (
    <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
      <span>{notification.message}</span>
      {!notification.read && (
        <button onClick={() => onMarkAsRead(notification.id)}>Mark as Read</button>
      )}
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

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);

    const updatedNotification = updatedNotifications.find(notification => notification.id === id);
    if (updatedNotification) {
      notificationService.send(updatedNotification);
    }
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={handleMarkAsRead}
        />
      ))}
    </div>
  );
};

export default Notifications;
