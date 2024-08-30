import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function SearchedItemsByName() {
    const [applications, setApplications] = useState([]);
    const location = useLocation();
    const [reviews, setReviews] = useState({});
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const name = query.get('name');
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:2001/application/applications/appbyname/${name}`,
                    {

                        headers: {
        
                            Authorization: `Bearer ${user.token}`,  //User authentication
        
                        },
        
                    });
                
                const data = await response.json();
                if(user.role === "admin")
                    {
                        setApplications(data);
                    }
                    else
                    {
                        // Filter applications based on visibility for non-admin users
                    const filteredApplications = data.filter(app => app.visibility === true);
                    setApplications(filteredApplications);
                    }
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, );
    // }, [name]);


    useEffect(() => {
        const fetchReviews = async (appId) => {
            try {
                const response = await axios.get(`http://localhost:2001/review/reviews/${appId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setReviews(prevReviews => ({
                    ...prevReviews,
                    [appId]: response.data
                }));
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        applications.forEach(app => {
            if (app) {
                fetchReviews(app._id);
            }
        });

        // Cleanup function to avoid memory leaks
        return () => {
            setReviews({});
        };
    }, [applications, user.token]);


    const handleDownload = (appId) => {
        if (user && user.token) {
            axios.post(`http://localhost:2001/download/applications/${appId}`, {},)
                
            
            .then(() => {
                // Notify admin about the download
                axios.post('http://localhost:2001/notification/notifications', {
                    title: 'Application Downloaded',
                    
                    recipient: user._id, // User is sending notification by downloading application
                    application: appId,
                    message: `User ${user.username} has downloaded the application with ID ${appId}.`
                }, {
                    
                })
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

    return (
        <div className="container mt-3">
            {applications.length > 0 ? (
                <div className="row">
                    {applications.map(application => (
                        <div key={application._id} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                <img 
                                 src={application.imageUrl} 
                                     className="card-img-top" 
                                     alt={application.name} 
                                     style={{ height: "200px", objectFit: "cover" }}
                                 />
                                    <h5 className="card-title">{application.name}</h5>

                                    <p className="card-text"><strong>Description: </strong>{application.description}</p>
                                    <p className="card-text"><strong>Release Date: </strong>{new Date(application.releaseDate).toLocaleDateString()}</p>
                                    <p className="card-text"><strong>Version: </strong>{application.version}</p>
                                    <p className="card-text"><strong>Ratings: </strong>{application.ratings}</p>
                                    <p className="card-text"><strong>Genre: </strong>{application.genre}</p>
                                    <p className="card-text"><strong>Category: </strong>{application.category}</p>

                                    <div className="list-group">
                                    {reviews.length > 0 ? (
                                        reviews.map(review => (
                                            <div className="list-group-item" key={review._id}>
                                                <h5>{review.userId.name}</h5>
                                                {/* <p>{review.review}</p> */}
                                                <p><strong>Review:</strong> {review.review}</p>
                                                <p><strong>Rating:</strong> {review.rating}/5</p>
                                                <small className="text-muted">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</small>
                                    </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
                                    {user && user.role === 'user' && (
                                        <div className="mt-3">
                                            <button className="btn btn-primary" style={{ marginRight: '18px' }}  onClick={() => handleDownload(application._id)}>Download</button>
                                            <button className="btn btn-warning" style={{ marginRight: '18px' }}  onClick={() => navigate(`/writereview/${application._id}`)}>Write Review</button>
                                            <button className="btn btn-info" onClick={() => navigate(`/showreviews/${application._id}`)}>Show Reviews</button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No applications found.</p>
            )}
        </div>
    );
}

export default SearchedItemsByName;


