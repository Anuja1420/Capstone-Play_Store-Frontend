import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import './menu.css'; 

function Menu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [rating, setRating] = useState('');
    const[category, setCategory] = useState('');

    const handleLogout = () => {
        logout();
        alert("User Logged out Successfully");
        navigate('/login');
    };

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/searchitembyname?name=${searchTerm}`);
        }

        if (category) {
            navigate(`/searchitembycategory?category=${category}`);
        }
        else if (rating) {
            // Navigate to the filtered results page with the rating as a query parameter
            navigate(`/searcheditemsbyrating?rating=${rating}`);

        } 

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img 
                        src="https://techbigs.com/uploads/2021/4/gocut-glowing-video-editor-icon.jpg" 
                        className="bi me-2" 
                        width="90" 
                        height="70" 
                        style={{ borderRadius: 50 }} 
                        alt="Logo" 
                    />
                    Play Store
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/applications">List Applications</Link>
                        </li>
                        {user && user.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/createapplication">Create Application</Link>
                            </li>
                        )}
                    </ul>
                    {/* <div className="d-flex">
                        {user ? (
                            <button className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <button className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                                <button className="btn btn-outline-light" onClick={() => navigate('/register')}>Register</button>
                            </>
                        )}
                        {user && (
                            <div className="text-white ms-3">
                                <h5>Hello {user.username}!</h5>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
            <div className="container mt-3">
                <div className="row mb-3">
                    <div className="col-md-6 d-flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name"
                            className="form-control me-2"
                        />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                    <div className="col-md-6 d-flex">
                        <label htmlFor="ratingFilter" className="form-label me-2">Select Rating:</label>
                        <select
                            id="ratingFilter"
                            className="form-select me-2"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Select Rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                        <button className="btn btn-primary ms-2" onClick={handleSearch}>Filter by Rating</button>
                    </div>
                    <div className="col-md-6 d-flex">
                        <label htmlFor="categoryFilter" className="form-label me-2">Select Category:</label>
                        <select
                            id="categoryFilter"
                            className="form-select me-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="Health">Health</option>
                            <option value="Games">Games</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Women">Women</option>
                        </select>
                        <button className="btn btn-primary ms-2" onClick={handleSearch}>Filter by Category</button>
                    </div>
                </div>
            </div>
            <div className="d-flex">
                        {user ? (
                            <button className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <button className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                                <button className="btn btn-outline-light" onClick={() => navigate('/register')}>Register</button>
                            </>
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




// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext";
// // import axios from 'axios';
// import './menu.css'; 

// function Menu() {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredApplications, setFilteredApplications] = useState([]);
//     const [rating, setRating] = useState('');

//     const handleLogout = () => {
//         logout();
//         alert("User Logged out Successfully");
//         navigate('/login');
//     };

//     const handleSearch = async () => {
//         try {
//             const query = rating
//                 ? `http://localhost:2001/application/getbyrating?ratings=${rating}`
//                 : `http://localhost:2001/application/applications/appbyname/${searchTerm}`;
//             const response = await fetch(query);
//             const data = await response.json();
//             setFilteredApplications(data);
//         } catch (error) {
//             console.error("Error fetching applications:", error);
//         }
//     };

//     return (
//         <nav className="navbar navbar-expand-lg bg-dark rounded">
//             <div className="container-fluid">
//                 <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
//                     <img src="https://techbigs.com/uploads/2021/4/gocut-glowing-video-editor-icon.jpg" className="bi me-2" width="90" height="70" style={{ borderRadius: 50 }} alt="" />
//                     <Link className="navbar-brand col-lg-2 me-5" to="/" style={{ fontWeight: 600, fontSize: 25, color: "white" }}>Play Store</Link>
//                     <ul className="navbar-nav col-lg-8 justify-content-lg-center">
//                         <Link className="nav-link active" aria-current="page" to="/"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li></Link>
//                         <Link className="nav-link active" aria-current="page" to="/applications"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>List Applications</li></Link>
//                         {user && user.role === 'admin' ? (
//                             <Link className="nav-link active" aria-current="page" to="/createapplication"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Create Application</li></Link>
//                         ) : null}
//                     </ul>
//                 </div>

//                 <div className="container mt-3">
//                     <div className="d-flex justify-content-between">
//                         <input
//                             type="text"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             placeholder="Search by name"
//                             className="form-control me-2"
//                         />
//                         <button className="btn btn-primary ms-2" onClick={handleSearch}>Search</button>
//                     </div>

//                     <div className="mb-3 mt-3">
//                         <label htmlFor="ratingFilter" className="form-label">Select Rating</label>
//                         <select
//                             id="ratingFilter"
//                             className="form-select"
//                             value={rating}
//                             onChange={(e) => setRating(e.target.value)}
//                         >
//                             <option value="">Select Rating</option>
//                             <option value="1">1 Star</option>
//                             <option value="2">2 Stars</option>
//                             <option value="3">3 Stars</option>
//                             <option value="4">4 Stars</option>
//                             <option value="5">5 Stars</option>
//                         </select>
                        
//                         <button className="btn btn-primary ms-2" onClick={handleSearch}>Filter by Rating</button>
//                     </div>
//                 </div>

//                 <div className="mt-3">
//                     {filteredApplications.length > 0 ? (
//                         <ul className="list-group">
//                             {filteredApplications.map(application => (
//                                 <li key={application._id} className="list-group-item">
//                                     <h5>{application.name}</h5>
//                                     <p><strong>Description: </strong>{application.description}</p>
//                                     <p><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</p>
//                                     <p><strong>Version:</strong> {application.version}</p>
//                                     <p><strong>Ratings:</strong> {application.ratings}</p>
//                                     <p><strong>Genre:</strong> {application.genre}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No applications found.</p>
//                     )}
//                 </div>

//                 <ul>
//                     {user && (
//                         <li className="nav-item" style={{ marginRight: 30 }}>
//                             <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
//                         </li>
//                     )}
//                 </ul>

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






// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/authContext";



// import './menu.css'; 

// function Menu() {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredApplications, setFilteredApplications] = useState([]);

//     const handleLogout = () => {
//         logout();
//         alert("User Logged out Successfully");
//         navigate('/login');
//     };

//     const handleSearch = async () => {
//         try {
//             const query = `http://localhost:2001/application/applications/appbyname/${searchTerm}`;
//             const response = await fetch(query);
//             const data = await response.json();
//             setFilteredApplications(data);
//         } catch (error) {
//             console.error("Error fetching filtered applications:", error);
//         }
//     };

  

//     return (
//         <nav className="navbar navbar-expand-lg bg-dark rounded">
//             <div className="container-fluid">
//                 <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
//                     <img src="https://techbigs.com/uploads/2021/4/gocut-glowing-video-editor-icon.jpg" className="bi me-2" width="90" height="70" style={{ borderRadius: 50 }} alt="" />
//                     <Link className="navbar-brand col-lg-2 me-5" to="/" style={{ fontWeight: 600, fontSize: 25, color: "white" }}>Play Store</Link>
//                     <ul className="navbar-nav col-lg-8 justify-content-lg-center">
//                         <Link className="nav-link active" aria-current="page" to="/"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Home</li></Link>
//                         <Link className="nav-link active" aria-current="page" to="/applications"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>List Applications</li></Link>

//                         {user && user.role === 'admin' ? (
//                             <Link className="nav-link active" aria-current="page" to="/createapplication"><li className="nav-item" style={{ marginRight: 30, color: "white", fontWeight: 600 }}>Create Application</li></Link>
//                         ) : null}
//                     </ul>
//                 </div>

//                 {/* Search Section */}
//                 <div className="container mt-3">
//                     <div className="d-flex justify-content-between">
//                         <input
//                             type="text"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             placeholder="Search by name"
//                             className="form-control me-2"
//                         />
//                         <button className="btn btn-primary ms-2" onClick={handleSearch}>Search</button>
                        
//                     </div>
//                     <div className="mt-3">
//                         {filteredApplications.length > 0 ? (
//                             <ul className="list-group">
//                                 {filteredApplications.map(application => (
//                                     <li key={application._id} className="list-group-item">
//                                         <h5>{application.name}</h5>
//                                         <p><strong>Description: </strong>{application.description}</p>
//                                         <p><strong>Release Date:</strong> {new Date(application.releaseDate).toLocaleDateString()}</p>
//                                         <p><strong>Version:</strong> {application.version}</p>
//                                         <p><strong>Ratings:</strong> {application.ratings}</p>
//                                         <p><strong>Genre:</strong> {application.genre}</p>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p>No applications found.</p>
//                         )}
//                     </div>
//                 </div>

//                 <ul>
//                     {user && (
//                         <li className="nav-item" style={{ marginRight: 30 }}>
//                             <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
//                         </li>
//                     )}
//                 </ul>

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

