import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";



import './menu.css'; 

function Menu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplications, setFilteredApplications] = useState([]);

    const handleLogout = () => {
        logout();
        alert("User Logged out Successfully");
        navigate('/login');
    };

    const handleSearch = async () => {
        try {
            const query = `http://localhost:2001/application/applications/appbyname/${searchTerm}`;
            const response = await fetch(query);
            const data = await response.json();
            setFilteredApplications(data);
        } catch (error) {
            console.error("Error fetching filtered applications:", error);
        }
    };

  

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
                </div>

                {/* Search Section */}
                <div className="container mt-3">
                    <div className="d-flex justify-content-between">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name"
                            className="form-control me-2"
                        />
                        <button className="btn btn-primary ms-2" onClick={handleSearch}>Search</button>
                        
                    </div>
                    <div className="mt-3">
                        {filteredApplications.length > 0 ? (
                            <ul className="list-group">
                                {filteredApplications.map(application => (
                                    <li key={application._id} className="list-group-item">
                                        <h5>{application.name}</h5>
                                        <p><strong>Description: </strong>{application.description}</p>
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

