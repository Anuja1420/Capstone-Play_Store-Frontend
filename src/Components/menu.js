import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
// import './menu.css'; 


function Menu() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert("User Logged out Successfully");
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark rounded">
            <div className="container-fluid">
                <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
                    <ul className="navbar-nav col-lg-8 justify-content-lg-center">
                        {user && (
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



// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/authContext";

// function Menu() {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         alert("User Logged out Successfully"); // Optionally, show an alert
//         navigate('/login');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg bg-dark rounded" aria-label="Thirteenth navbar example">
//             <div className="container-fluid">
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="true" aria-label="Toggle navigation" style={{ color: "white" }}>
//                     {/* <span className="navbar-toggler-icon navbar-dark"></span> */}
//                 </button>
                
//                 <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
//                     <ul className="navbar-nav col-lg-8 justify-content-lg-center">
//                         {user && (
//                             <>
//                                 <li className="nav-item" style={{ marginRight: 30 }}>
//                                     <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
//                                 </li>
//                             </>
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
