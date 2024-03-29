
import './Navbar.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../../assets/Context/UserContexte';
import { useContext } from 'react';


const Navbar = () => {
    const { isAdmin } = useContext(UserContext);

    console.log("coucou2", isAdmin ? isAdmin() : null, Date.now());

    return (
        <nav>
            <div className="container">
                <nav className="navbar">
                    <a href="/">Accueil</a>
                    <a href="/attractions">Attractions</a>
                    <a href="/missions">Missions</a>
                  
                    {isAdmin && isAdmin() && (
                        <Link to="/admin/avertissements">Admin Link</Link>
                    )} 
                    {isAdmin && !isAdmin() && (
                        <Link to="/Avertissement">User Link</Link>
                    )}

                    <a href="/login">Connexion</a>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
