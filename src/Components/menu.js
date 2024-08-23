import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import './menu.css'; 

function Menu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [rating, setRating] = useState('all');
    const [filteredApplications, setFilteredApplications] = useState([]);

    const handleLogout = () => {
        logout();
        alert("User Logged out Successfully");
        navigate('/login');
    };

    useEffect(() => {
        // Fetch filtered applications based on search, category, and rating
        const fetchFilteredApplications = async () => {
            try {
                let query = `http://localhost:2001/application/searchapp?/`;
                
                if (searchTerm) {
                query += `name=${searchTerm}&`;
                    }
                if (category !== 'all') {
                query += `category=${category}&`;
                }
                if (rating !== 'all') {
                query += `rating=${rating}`;
                }

                const response = await axios.get(query);
                console.log(response);
                setFilteredApplications(response.data);
            } catch (error) {
                console.error("Error fetching filtered applications:", error);
            }
        
        };
        fetchFilteredApplications();
    }, [searchTerm, category, rating]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark rounded">
            <div className="container-fluid">
                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                    <img src="https://techbigs.com/uploads/2021/4/gocut-glowing-video-editor-icon.jpg" className="bi me-2" width="90" height="70" style={{ borderRadius: 50 }} alt="" />
                    <Link className="navbar-brand col-lg-2 me-5" to="/" style={{ fontWeight: 600, fontSize: 25, color: "white" }}>Play Store</Link>
                    <ul className="navbar-nav col-lg-8 justify-content-lg-center">
                        <Link className="nav-link active" aria-current="page" to="/"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li></Link>
                        <Link className="nav-link active" aria-current="page" to="/applications"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>List Applications</li></Link>

                        {user && user.role === 'admin' ? (
                            <Link className="nav-link active" aria-current="page" to="/createapplication"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Create Application</li></Link>
                        ) : null}
                        </ul>

                        {/* {user && (
                            <li className="nav-item" style={{ marginRight: 30 }}>
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
                {!user && (
                    <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
                    </div>
                )} */}
                
            </div>

            {/* Search and Filter Section */}
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name"
                        className="form-control me-2"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select me-2"
                    >
                        <option value="all">All Categories</option>
                        <option value="games">Games</option>
                        <option value="beauty">Beauty</option>
                        <option value="fashion">Fashion</option>
                        <option value="women">Women</option>
                        <option value="health">Health</option>
                    </select>
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">All Ratings</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                </div>
                <div className="mt-3">
                    {filteredApplications.length > 0 ? (
                        <ul className="list-group">
                            {filteredApplications.map(application => (
                                <li key={application._id} className="list-group-item">
                                    <h5>{application.name}</h5>
                                    <p>{application.description}</p>
                                    <p><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</p>
                                    <p><strong>Version:</strong> {application.version}</p>
                                    <p><strong>Ratings:</strong> {application.ratings}</p>
                                    <p><strong>Genre:</strong> {application.genre}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No applications found.</p>
                    )}
                </div>
                </div>
                
                
                <ul>

                {user && (
                            <li className="nav-item" style={{ marginRight: 30 }}>
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                
                {!user && (
                    <div className="d-flex">
                        <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>Login</button>
                        <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
                    </div>
                )}
                {user && (
                    <div className="text-white ms-3">
                        <h5>Hello {user.username}!</h5>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Menu;


// import { Link,useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import './menu.css'; 


// function Menu() {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         alert("User Logged out Successfully");
//         navigate('/login');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg bg-dark rounded">
//             <div className="container-fluid">
//                 <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
//                 <img src="https://techbigs.com/uploads/2021/4/gocut-glowing-video-editor-icon.jpg" class="bi me-2" width="90" height="70" style={{"borderRadius":50}} alt=""/>
//                 <Link class="navbar-brand col-lg-2 me-5" to="/" style={{"fontWeight":600, "fontSize":25, "color":"white"}}>Play Store</Link>
//                     <ul className="navbar-nav col-lg-8 justify-content-lg-center">
//                     <Link className="nav-link active" aria-current="page" to="/"><li className="nav-item" style={{"marginRight":30, "color":"white", "fontWeight":600}}>Home</li></Link>
//                     <Link className="nav-link active" aria-current="page" to="/applications"><li className="nav-item" style={{"marginRight":30, "color":"white", "fontWeight":600}}>List Applications</li></Link>
                    
//                     {user && user.role === 'admin' ?(
//                     <Link className="nav-link active" aria-current="page" to="/createapplication"><li className="nav-item" style={{"marginRight":30, "color":"white", "fontWeight":600}}>Create Application</li></Link>
//                     ):null}

//                         {user && (
//                             <li className="nav-item" style={{ marginRight: 30 }}>
//                                 <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
//                             </li>
//                         )}
//                     </ul>
//                 </div>
//                 {!user && (
//                     <div className="d-flex">
//                         <button className="btn btn-primary me-2" onClick={() => navigate('/login')}>Login</button>
//                         <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
//                     </div>
//                 )}
//                 {user && (
//                     <div className="text-white ms-3">
//                         <h5>Hello {user.username}!</h5>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Menu;

//--------------------------------------------------------------

