import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const { user } = useContext(AuthContext);

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
                
                //setNotifications(response.data);
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



// import React, { useEffect, useState } from 'react';
// import NotificationService from '../services/NotificationService';
// import NotificationItem from './NotificationItem';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const data = await NotificationService.getNotifications();
//                 setNotifications(data);

//             } catch (error) {
//                 setError('Failed to load notifications');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     const handleMarkAsRead = async (notificationId) => {
//         try {
//             const updatedNotification = await NotificationService.markAsRead(notificationId);
//             setNotifications((prevNotifications) =>
//                 prevNotifications.map((notification) =>
//                     notification._id === notificationId ? updatedNotification : notification
//                 )
//             );
//         } catch (error) {
//             console.error('Failed to mark notification as read', error);
//         }
//     };

//     const handleDelete = async (notificationId) => {
//         try {
//             await NotificationService.deleteNotification(notificationId);
//             setNotifications((prevNotifications) =>
//                 prevNotifications.filter((notification) => notification._id !== notificationId)
//             );
//         } catch (error) {
//             console.error('Failed to delete notification', error);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <div>
//             <h2>Notifications</h2>
//             {notifications.length === 0 ? (
//                 <p>No notifications</p>
//             ) : (
//                 notifications.map((notification) => (
//                     <NotificationItem
//                         key={notification._id}
//                         notification={notification}
//                         onMarkAsRead={handleMarkAsRead}
//                         onDelete={handleDelete}
//                     />
//                 ))
//             )}
//         </div>
//     );
// };

// export default Notifications;
