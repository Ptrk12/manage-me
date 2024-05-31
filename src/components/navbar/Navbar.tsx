import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from '../Logout/Logout'
import { NotificationService } from "../../storage/NotificationsService";
import "./navbar.scss"

const Navbar = () => {

    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
    const notificationService = new NotificationService();

    useEffect(() => {
        const subscription = notificationService.unreadCount().subscribe({
            next: count => setUnreadNotifications(count),
            error: error => console.error('Failed to fetch unread notifications count', error),
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [notificationService]);

    let navigate = useNavigate();
    const pageUrl = window.location.href;
    const splitted = pageUrl.toString().split('/');
    const isHomeScreen: boolean = splitted[splitted.length - 1] === 'projects';
    
    return (
        <div className="navbar">
            <div className="buttons">
                {!isHomeScreen &&
                    <Button variant="contained" size="small" onClick={() => navigate(-1)}>
                        Go back
                    </Button>
                }
                <Link to={`/app/projects`}>
                    <Button variant="contained">HOME</Button>
                </Link>
                <div className="notificationsButton">
                    <Link to={`/app/notifications`}>
                        <Button variant="contained">NOTIFICATIONS</Button>
                        <span className="unread-notifications">{unreadNotifications}</span>
                    </Link>
                </div>
            </div>
            <Logout />
        </div>
    )
}

export default Navbar
