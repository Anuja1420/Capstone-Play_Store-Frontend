import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../context/authContext";
import './menu.css'; 

function Menu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState('');

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
        } else if (rating) {
            navigate(`/searcheditemsbyrating?rating=${rating}`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
            <div className="container-fluid d-flex align-items-center">
                <Link className="navbar-brand d-flex align-items-center" to="/">
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
                <div className="collapse navbar-collapse d-flex align-items-center" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/applications">List Applications</Link>
                            
                        </li>
                        
                        {user && user.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/createapplication">Create Application</Link>
                            </li>
                        )}
                        {user && user.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/fetchusers">View Users</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/notification">
                                <FontAwesomeIcon icon={faBell} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mt-3 d-flex align-items-center justify-content-between">
                <div className="search-group d-flex align-items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name"
                        className="form-control me-2"
                        style={{ width: '150px' }}
                    />
                    <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
                </div>

                <div className="filter-group d-flex align-items-center">
                    <select
                        id="categoryFilter"
                        className="form-select me-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '180px' }}
                    >
                        <option value="">Select Category</option>
                        <option value="Health">Health</option>
                        <option value="Games">Games</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Women">Women</option>
                    </select>
                    <button className="btn btn-primary me-4" onClick={handleSearch}>Filter</button>

                    <select
                        id="ratingFilter"
                        className="form-select me-2"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="">Select Rating</option>
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleSearch}>Filter</button>
                </div>
            </div>

            <div className="d-flex align-items-center">
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




