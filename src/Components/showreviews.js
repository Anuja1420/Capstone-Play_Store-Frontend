import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

function ShowReviews() {
    const { appId } = useParams(); 
    const [reviews, setReviews] = useState([]);
    const [application, setApplication] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/application/getappbyappid/${appId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                console.log('Application Details:', response.data); // Debug log
                setApplication(response.data);
            } catch (error) {
                console.error('Error fetching application details:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/review/reviews/${appId}`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchApplicationDetails();
        fetchReviews();
    }, [appId, user.token]); 

    return (
        <div className="container">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>
                Reviews for {application.name}
                
            </h2>
            {application.imageUrl ? (
                <img 
                    src={application.imageUrl} 
                    className="img-fluid mb-4" 
                    alt={application.name} 
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                />
            ) : (
                <p>No image available</p>
            )}
            <div className="list-group">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div className="list-group-item" key={review._id}>
                            <h5>{review.userId.name}</h5>
                            <p><strong>Review:</strong> {review.review}</p>
                            <p><strong>Rating:</strong> {review.rating}/5</p>
                            <small className="text-muted">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
}

export default ShowReviews;

