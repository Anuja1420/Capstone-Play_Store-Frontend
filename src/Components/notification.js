import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { user} = useContext(AuthContext);

    useEffect(() => {
            axios.get('http://localhost:2001/notification/allnotifications', {
                
            })
            .then(response => {
                if(user.role === "admin")
                    {
                        const filteredApplications = response.data.filter(app => app.title === "Application Downloaded").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setNotifications(filteredApplications);
                    }
                    else
                    {
                        const filteredApplications = response.data.filter(app => app.title === "Application Updated").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        setNotifications(filteredApplications);
                    }
                
                
            })
            .catch(error => {
                console.error("Error fetching notifications", error);
            });
        
    }, [user]);

    return (
        <div className="container">
            <h2 className="border-bottom pb-2 mb-4">Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <div key={notification._id} className="alert alert-info">
                        <strong>{notification.title}</strong>
                        <p>{notification.message}</p>
                        <small>{new Date(notification.createdAt).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>No notifications.</p>
            )}
        </div>
    );
}

export default Notifications;


