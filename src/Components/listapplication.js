import { useState, useEffect, useContext, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function ListAllApplications() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const fetchApplications = useCallback(() => {
        if (user && user.token) {
            axios.get(`http://localhost:2001/application/getapp`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.log("Error occurred when fetching the applications", error);
            });
        }
    }, [user]);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleDelete = (Id) => {
        if (user && user.token) {
            axios.delete(`http://localhost:2001/application/deleteapp/appId/${Id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(response => {
                console.log("Application deleted successfully", response.data);
                // Update the state to remove the deleted application
                setApplications(applications.filter(application => application._id !== Id));
            })
            .catch(error => {
                console.error("There was an error deleting the application!", error);
            });
        }
    };

    if (!user) {
        return <p>Please log in to view applications.</p>;
    }

    return (
        <div className="container">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Applications</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {applications.length > 0 ? (
                    applications.map(application => (
                        <div className="col" key={application._id}>
                            <div className="card h-100">
                                <img 
                                    src={application.imageUrl} 
                                    className="card-img-top" 
                                    alt={application.name} 
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontFamily: "monospace" }}>{application.name}</h5>
                                    
                                    <ul className="list-unstyled">
                                    <li><strong>Description:</strong> {application.description}</li>
                                        <li><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</li>
                                        <li><strong>Version:</strong> {application.version}</li>
                                        <li><strong>Ratings:</strong> {application.ratings}</li>
                                        <li><strong>Genre:</strong> {application.genre}</li>
                                        <li><strong>Category:</strong> {application.category}</li>
                                        
                                    </ul>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                {user && user.role === 'admin' ?(
                                    <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
                                ):null}
                                    {user && user.role === 'admin' ?(
                                    <button className="btn btn-danger" onClick={() => handleDelete(application._id)}>Delete</button>
                                    ):null}
                                    
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No applications available.</p>
                )}
            </div>
        </div>
    );
}

export default ListAllApplications;



// import { useState, useEffect, useContext, useCallback } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../context/authContext";

// function ListAllApplications() {
//     const [applications, setApplications] = useState([]);
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const fetchApplications = useCallback(() => {
//         if (user && user.token) {
//             axios.get(`http://localhost:2001/application/getapp`, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             })
//             .then(response => {
//                 setApplications(response.data);
//             })
//             .catch(error => {
//                 console.log("Error occurred when fetching the applications", error);
//             });
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchApplications();
//     }, [fetchApplications]);

//     if (!user) {
//         return <p>Please log in to view applications.</p>;
//     }


//     return (
//         <div className="container">
//             <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Applications</h2>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {applications.length > 0 ? (
//                     applications.map(application => (
//                         <div className="col" key={application._id}>
//                             <div className="card h-100">
//                                 <img 
//                                     src={application.imageUrl} 
//                                     className="card-img-top" 
//                                     alt={application.name} 
//                                     style={{ height: "200px", objectFit: "cover" }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title" style={{ fontFamily: "monospace" }}>{application.name}</h5>
//                                     <p className="card-text" style={{ fontFamily: "monospace" }}>{application.description}</p>
//                                     <ul className="list-unstyled">
//                                         <li><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</li>
//                                         <li><strong>Version:</strong> {application.version}</li>
//                                         <li><strong>Ratings:</strong> {application.ratings}</li>
//                                         <li><strong>Genre:</strong> {application.genre}</li>
//                                         <li><strong>Category:</strong> {application.category}</li>
//                                     </ul>
//                                 </div>
//                                 <div className="card-footer d-flex justify-content-between">
                                    
//                                     <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
//                                     {/* <button className="btn btn-danger" onClick={()=>{handleDelete(application.id)}}style={{'float':"inline-end", "width":350}}>Delete</button> */}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No applications available.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ListAllApplications;


