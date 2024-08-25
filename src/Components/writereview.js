import { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function WriteReview() {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const navigate = useNavigate();
    const { appId } = useParams(); // Removed userId from URL params
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                const userId = user._id; // Get userId from context
                
                if (!userId) { // Check if userId is available
                    console.error('User ID is not available.');
                    alert('Failed to submit review: User ID is not available.');
                    return;
                }

                const response = await axios.post(
                    `http://localhost:2001/review/reviews/appId/${appId}/userId/${userId}`, // Updated URL with userId from context
                    { review, rating },
                    {
                        headers: { Authorization: `Bearer ${user.token}` }
                    }
                );
                
                console.log(response);
                alert("Review submitted successfully!");
                navigate(`/applications`); // Redirect to applications list or any other page
            } catch (error) {
                console.error("Error submitting review", error.response ? error.response.data : error.message); // Improved error handling
                alert("Failed to submit review.");
            }
        } else {
            alert('User is not logged in.');
        }
    };

    return (
        <div className="container">
            <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Write a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="review" className="form-label">Review</label> {/* Changed 'review' to 'Review' */}
                    <textarea 
                        id="review"
                        className="form-control"
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input 
                        type="number" 
                        id="rating" 
                        className="form-control" 
                        min="1" 
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
}

export default WriteReview;


// import { useState, useContext } from "react";
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/authContext";

// function WriteReview() {
//     const [review, setReview] = useState('');
//     const [rating, setRating] = useState(1);
//     const navigate = useNavigate();
//     const { appId, userId } = useParams();
//     const { user } = useContext(AuthContext);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (user) {
//             // axios.post(`http://localhost:2001/review/reviews/${appId}/${user._id}`, { review, rating }, {
//                 axios.post(`http://localhost:2001/review/reviews/appId/${appId}/userId/${userId}`, { review, rating },
                
//             )
//             .then(response => {
//                 console.log(response);
//                 alert("Review submitted successfully!");
//                 navigate(`/listapplication`); // Redirect to applications list or any other page
//             })
//             .catch(error => {
//                 console.error("Error submitting review", error);
//                 alert("Failed to submit review.");
//             });
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Write a Review</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="review" className="form-label">review</label>
//                     <textarea 
//                         id="review"
//                         className="form-control"
//                         rows="4"
//                         value={review}
//                         onChange={(e) => setReview(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="rating" className="form-label">Rating</label>
//                     <input 
//                         type="number" 
//                         id="rating" 
//                         className="form-control" 
//                         min="1" 
//                         max="5"
//                         value={rating}
//                         onChange={(e) => setRating(Number(e.target.value))}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit Review</button>
//             </form>
//         </div>
//     );
// }

// export default WriteReview;


// Comment-----
// import { useState, useContext } from "react";
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AuthContext } from "../context/authContext";

// function WriteReview() {
//     const [comment, setComment] = useState('');
//     const [rating, setRating] = useState(1);
//     const navigate = useNavigate();
//     const { appId } = useParams();
//     const { user } = useContext(AuthContext);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (user && user.token) {
//             axios.post(`http://localhost:2001/review/reviews/${appId}/${user._id}`, { comment, rating }, {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                 },
//             })
//             .then(response => {
//                 alert("Review submitted successfully!");
//                 navigate(`/applications`); // Redirect to applications list or any other page
//             })
//             .catch(error => {
//                 console.error("Error submitting review", error);
//                 alert("Failed to submit review.");
//             });
//         }
//     };

//     return (
//         <div className="container">
//             <h2 className="border-bottom pb-2 mb-4" style={{ fontWeight: 600, fontFamily: "monospace", marginTop: 40 }}>Write a Review</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="comment" className="form-label">Comment</label>
//                     <textarea 
//                         id="comment"
//                         className="form-control"
//                         rows="4"
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="rating" className="form-label">Rating</label>
//                     <input 
//                         type="number" 
//                         id="rating" 
//                         className="form-control" 
//                         min="1" 
//                         max="5"
//                         value={rating}
//                         onChange={(e) => setRating(Number(e.target.value))}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit Review</button>
//             </form>
//         </div>
//     );
// }

// export default WriteReview;
