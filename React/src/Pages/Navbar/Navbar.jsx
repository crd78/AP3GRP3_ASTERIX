
import './Navbar.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../../assets/Context/UserContexte';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import logo from '../../assets/images/logoAsterix.webp';


const Navbar = () => {
    const { isAdmin } = useContext(UserContext);
    const [isOpen, setisOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 100);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1000);
        });
    }, []);

    return (
        <nav>
            <div className="container">
                <nav className="navbar">
                    {isMobile && (
                        <button onClick={() => setisOpen(!isOpen)}>
                            {isOpen ? 'Fermer' : 'Ouvrir'}
                        </button>
                    )}
                    {(isOpen || !isMobile) && (
                        
                        <div className="nav-links">
                            <img className='logo' src={logo} alt='logo'/>
                            <a href="/">Accueil</a>
                            <a href="/attractions">Attractions</a>
                            <a href="/missions">Missions</a>
                    
                            {isAdmin && isAdmin() && (
                                <Link to="/admin/avertissements">Gérer Avertissement</Link>
                            )} 
                            {isAdmin && !isAdmin() && (
                                <Link to="/Avertissement">Avertissement</Link>
                            )}
                            <div className="Connexion">
                                <a href="/login">Connexion</a>
                            </div>
                        </div>
                        )}
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
