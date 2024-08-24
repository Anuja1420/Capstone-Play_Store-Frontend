import { useState, useEffect, useContext, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function ListAllApplications() {
    const [applications, setApplications] = useState([]);
    const [reviews, setReviews] = useState([]); // Added state for reviews
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
                setApplications(applications.filter(application => application._id !== Id));
            })
            .catch(error => {
                console.error("There was an error deleting the application!", error);
            });
        }
    };

    const handleDownload = (appId) => {
        if (user && user.token) {
            axios.post(`http://localhost:2001/download/applications/${appId}/download`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            })
            .then(response => {
                alert("Application downloaded successfully!");
            })
            .catch(error => {
                console.error("Error occurred while downloading the application", error);
                alert("Failed to download application.");
            });
        }
    };

    const handleSubmitReview = async (appId, reviewData) => {
        try {
            const response = await axios.post(`http://localhost:2001/review/reviews/${appId}/${user.id}`, reviewData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
    
            if (response.status === 201) {
                alert('Review submitted successfully!');
                fetchReviews(appId);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review.');
        }
    };
    
    const fetchReviews = async (appId,userId) => {
        try {
            const response = await axios.get(`http://localhost:2001/review/reviews/${appId}/${userId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleWriteReview = (appId) => {
        // Logic to open a modal or navigate to a review form
        console.log('Write a review for application:', appId);
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
                                    {user && user.role === 'admin' ? (
                                        <>
                                            <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(application._id)}>Delete</button>
                                        </>
                                    ) : null}
                                    {user && user.role === 'user' ? (
                                        <>
                                    <button className="btn btn-primary" onClick={() => handleDownload(application._id)}>Download</button>
                                    {/* <button className="btn btn-secondary" onClick={() => handleWriteReview(application._id)}>Write Review</button> */}
                                    <button className="btn btn-warning" onClick={() => { navigate(`/writereview/${application._id}`) }}>Write Review</button>
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

//     const handleDelete = (Id) => {
//         if (user && user.token) {
//             axios.delete(`http://localhost:2001/application/deleteapp/appId/${Id}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             })
//             .then(response => {
//                 console.log("Application deleted successfully", response.data);
//                 // Update the state to remove the deleted application
//                 setApplications(applications.filter(application => application._id !== Id));
//             })
//             .catch(error => {
//                 console.error("There was an error deleting the application!", error);
//             });
//         }
//     };

//     const handleDownload = (appId) => { //Work on it
//         if (user && user.token) {
//             axios.post(`http://localhost:2001/download/applications/${appId}/download`, {}, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             })
//             .then(response => {
//                 alert("Application downloaded successfully!");
//                 // Optionally, you might want to update the state or do additional actions here
//             })
//             .catch(error => {
//                 console.error("Error occurred while downloading the application", error);
//                 alert("Failed to download application.");
//             });
//         }
//     };

//     //***************************************** */
//     const handleSubmitReview = async (appId, reviewData) => {
//         try {
//             const response = await axios.post(`http://localhost:2001/reviews/${appId}/${user.id}`, reviewData, {
//                 headers: { Authorization: `Bearer ${user.token}` }
//             });
    
//             if (response.status === 201) {
//                 alert('Review submitted successfully!');
//                 // Refetch the reviews to update the frontend
//                 fetchReviews(appId);
//             }
//         } catch (error) {
//             console.error('Error submitting review:', error);
//             alert('Failed to submit review.');
//         }
//     };
    
//     // Function to fetch and update reviews
//     const fetchReviews = async (appId) => {
//         try {
//             const response = await axios.get(`http://localhost:2001/review/reviews/${appId}`, {
//                 headers: { Authorization: `Bearer ${user.token}` }
//             });
//             setReviews(response.data);  // Assuming you have a state called 'reviews'
//         } catch (error) {
//             console.error('Error fetching reviews:', error);
//         }
//     };
    
//     //****************************************** */

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
                                    
//                                     <ul className="list-unstyled">
//                                     <li><strong>Description:</strong> {application.description}</li>
//                                         <li><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</li>
//                                         <li><strong>Version:</strong> {application.version}</li>
//                                         <li><strong>Ratings:</strong> {application.ratings}</li>
//                                         <li><strong>Genre:</strong> {application.genre}</li>
//                                         <li><strong>Category:</strong> {application.category}</li>
//                                     </ul>
//                                 </div>
//                                 <div className="card-footer d-flex justify-content-between">
//                                     {user && user.role === 'admin' ? (
//                                         <>
//                                             <button className="btn btn-warning" onClick={() => { navigate(`/updateapplication/${application._id}`) }}>Update</button>
//                                             <button className="btn btn-danger" onClick={() => handleDelete(application._id)}>Delete</button>
//                                         </>
//                                     ) : null}
//                                     {user && user.role === 'user' ? (
//                                         <>
//                                     <button className="btn btn-primary" onClick={() => handleDownload(application._id)}>Download</button>
//                                     {/* <button className="btn btn-secondary" onClick={() => handleWriteReview(application._id)}>Write Review</button> */}
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

