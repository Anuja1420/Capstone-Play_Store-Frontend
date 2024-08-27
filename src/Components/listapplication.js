import { useState, useEffect, useContext, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function ListAllApplications() {
    const [applications, setApplications] = useState([]);
    // const [reviews, setReviews] = useState([]); // Added state for reviews
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
                if(user.role === "admin")
                {
                    setApplications(response.data);
                }
                else
                {
                    // Filter applications based on visibility for non-admin users
                const filteredApplications = response.data.filter(app => app.visibility === true);
                setApplications(filteredApplications);
                }
                
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
                setApplications(applications.filter(application => application._id !== Id));
            })
            .catch(error => {
                console.error("There was an error deleting the application!", error);
            });
        }
    };


    const handleDownload = (appId) => {
        if (user && user.token) {
            axios.post(`http://localhost:2001/download/applications/${appId}`, {}, )
            .then(() => {
                
                // Notify admin about the download
                axios.post('http://localhost:2001/notification/notifications', {
                    title: 'Application Downloaded',
                    
                    recipient: user._id, // User is sending notification by downloading application
                    application: appId,
                    message: `User ${user.username} has downloaded the application with ID ${appId}.`
                    
                },)
                .then(() => {
                    alert("Application downloaded successfully and admin notified!");
                })
                .catch(error => {
                    console.error("Error occurred while notifying the admin", error);
                    alert("Failed to notify admin.");
                });
            })
            .catch(error => {
                console.error("Error occurred while downloading the application", error);
                alert("Failed to download application.");
            });
        }
    };


    // const handleDownload = (appId) => {
    //     if (user && user.token) {
    //         axios.post(`http://localhost:2001/download/applications/${appId}`, {}, {
    //             // headers: {
    //             //     Authorization: `Bearer ${user.token}`
    //             // }
    //         })
    //         .then(() => {
    //             // Notify admin about the download
    //             axios.post('http://localhost:2001/notification/notifications', {
    //                 title: 'Application Downloaded',
                    
    //                 recipient: user._id, // User is sending notification by downloading application
    //                 application: appId,
    //                 message: `User ${user.username} has downloaded the application with ID ${appId}.`
    //                 // application: appId,
    //                 // message: `User ${user.username} has downloaded the application with ID ${appId}.`
    //             }, {
    //                 // headers: {
    //                 //     Authorization: `Bearer ${user.token}`
    //                 // }
    //             })
    //             .then(() => {
    //                 alert("Application downloaded successfully and admin notified!");
    //             })
    //             .catch(error => {
    //                 console.error("Error occurred while notifying the admin", error);
    //                 alert("Failed to notify admin.");
    //             });
    //         })
    //         .catch(error => {
    //             console.error("Error occurred while downloading the application", error);
    //             alert("Failed to download application.");
    //         });
    //     }
    // };
       
    

    // const handleDownload = (appId) => {
    //     if (user && user.token) {
    //         axios.post(`http://localhost:2001/download/applications/${appId}`, {}, 
                
    //         )
    //         .then(response => {
    //             alert("Application downloaded successfully!");
    //         })
    //         .catch(error => {
    //             console.error("Error occurred while downloading the application", error);
    //             alert("Failed to download application.");
    //         });
    //     }
    // };

    

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
                                        <li><strong>Total downloads:</strong> {application.downloadcount}</li>
                                        
                                    </ul>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    {user && user.role === 'admin' ? (
                                        <>
                                            <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(application._id)}>Delete</button>
                                            <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button>
                                        </>
                                    ) : null}
                                    {user && user.role === 'user' ? (
                                        <>
                                    <button className="btn btn-primary" onClick={() => handleDownload(application._id)}>Download</button>
                
                                    {/* <button className="btn btn-warning" onClick={() => { navigate(`/writereview/${application._id}`) }}>Write Review</button>
                                    <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button> */}

                                    <button className="btn btn-warning" onClick={() => { navigate(`/writereview/${application._id}`) }}>Write Review</button>
                                     <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button> 
                                        </>
                                ) : null}
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

//-----------------------------------------


// import { useState, useEffect, useContext, useCallback } from "react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../context/authContext";

// function ListAllApplications() {
//     const [applications, setApplications] = useState([]);
//     // const [reviews, setReviews] = useState([]); // Added state for reviews
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
//                 if(user.role === "admin")
//                 {
//                     setApplications(response.data);
//                 }
//                 else
//                 {
//                     // Filter applications based on visibility for non-admin users
//                 const filteredApplications = response.data.filter(app => app.visibility === true);
//                 setApplications(filteredApplications);
//                 }
                
//             })
//             .catch(error => {
//                 console.log("Error occurred when fetching the applications", error);
//             });
//         }
//     }, [user]);

//     useEffect(() => {
//         fetchApplications();
//     }, [fetchApplications]);

//     const handleDelete = (Id) => {
//         if (user && user.token) {
//             axios.delete(`http://localhost:2001/application/deleteapp/appId/${Id}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             })
//             .then(response => {
//                 console.log("Application deleted successfully", response.data);
//                 setApplications(applications.filter(application => application._id !== Id));
//             })
//             .catch(error => {
//                 console.error("There was an error deleting the application!", error);
//             });
//         }
//     };

//     const handleDownload = (appId) => {
//         if (user && user.token) {
//             axios.post(`http://localhost:2001/download/applications/${appId}`, {}, 
                
//             )
//             .then(response => {
//                 alert("Application downloaded successfully!");
//             })
//             .catch(error => {
//                 console.error("Error occurred while downloading the application", error);
//                 alert("Failed to download application.");
//             });
//         }
//     };

    

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
                                    
//                                     <ul className="list-unstyled">
//                                     <li><strong>Description:</strong> {application.description}</li>
//                                         <li><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</li>
//                                         <li><strong>Version:</strong> {application.version}</li>
//                                         <li><strong>Ratings:</strong> {application.ratings}</li>
//                                         <li><strong>Genre:</strong> {application.genre}</li>
//                                         <li><strong>Category:</strong> {application.category}</li>
//                                         <li><strong>Total downloads:</strong> {application.downloadcount}</li>
                                        
//                                     </ul>
//                                 </div>
//                                 <div className="card-footer d-flex justify-content-between">
//                                     {user && user.role === 'admin' ? (
//                                         <>
//                                             <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
//                                             <button className="btn btn-danger" onClick={() => handleDelete(application._id)}>Delete</button>
//                                             <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button>
//                                         </>
//                                     ) : null}
//                                     {user && user.role === 'user' ? (
//                                         <>
//                                     <button className="btn btn-primary" onClick={() => handleDownload(application._id)}>Download</button>
                
//                                     {/* <button className="btn btn-warning" onClick={() => { navigate(`/writereview/${application._id}`) }}>Write Review</button>
//                                     <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button> */}

//                                     <button className="btn btn-warning" onClick={() => { navigate(`/writereview/${application._id}`) }}>Write Review</button>
//                                      <button className="btn btn-info" onClick={() => { navigate(`/showreviews/${application._id}`) }}>Show Reviews</button> 
//                                         </>
//                                 ) : null}
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
 
//--------------------------------------------
