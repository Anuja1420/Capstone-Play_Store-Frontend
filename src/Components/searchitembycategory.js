import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchedItemsByCategory() {
    const [applications, setApplications] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get('category');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`http://localhost:2001/application/getbycategory?category=${category}`);
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, [category]);

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

export default SearchedItemsByCategory;
