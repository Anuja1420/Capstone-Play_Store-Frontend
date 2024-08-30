import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const FetchUser = ({ user }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(() => {
        axios.get(`http://localhost:2001/users/fetchusers`,)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log("Error occurred when fetching users", error);
            });
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleDelete = (Id) => {
        axios.delete(`http://localhost:2001/users/deleteuser/userId/${Id}`,
            
        )
        .then(response => {
            console.log("Application deleted successfully", response.data);
            setUsers(users.filter(user => user._id !== Id));
        })
        .catch(error => {
            console.error("There was an error deleting the application!", error);
        });
    
};



    return (
        <div>
            <h2>All Users</h2>
            {users.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Username</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Role</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{user.username}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{user.role}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{user.status}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>
                                    
                                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>

                                       
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found or not authorized to view users.</p>
            )}
        </div>
    );
};

export default FetchUser;


