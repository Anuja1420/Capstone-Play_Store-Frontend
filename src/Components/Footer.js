import { Link } from "react-router-dom";

function Footer(){
    return(
            <footer className="py-3 my-4 bg-body-tertiary">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" aria-current="page" to="/applications">List of Applications</Link></li>
                <li className="nav-item"><Link className="nav-link" aria-current="page" to="/createapplication">Post Application</Link></li>
                </ul>
                <p class="text-center text-body-secondary">© 2024 Company, Inc</p>
            </footer>
    )

}
export default Footer;