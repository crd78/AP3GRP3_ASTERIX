
import './Navbar.css';
import {Link, useLocation} from 'react-router-dom';
import {UserContext} from '../../assets/Context/UserContexte';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';





const Navbar = () => {
    const location = useLocation();
    const { isAdmin } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 100);
    const [isOpen, setisOpen] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 1000);
        });
    }, []);

    useEffect(() => { 
        setisOpen(false);
    }, [location.pathname, setisOpen]);
 

    return (
        <nav>
            <div className="container">
                <nav className="navbar">
                    {isMobile && (
                        <button className='MenuNav' onClick={() => setisOpen(!isOpen)}>
                            {isOpen ? <FaBars /> : <FaBars />}
                            
                        </button>
                    )}
                    {(isOpen || !isMobile) && (
                        
                        <div className="nav-links">
                            <Link to="/">Accueil</Link>
                            <Link to="/attractions">Attractions</Link>
                            <Link to="/missions">Missions</Link>
                    
                            {isAdmin && isAdmin() && (
                                <Link to="/admin/Avertissement/AdminAvertissements">Gérer Avertissement</Link>
                            )} 
                            {isAdmin && !isAdmin() && (
                                <Link to="/Avertissement">Avertissement</Link>
                            )}
                            <div className="Connexion">
                                <Link to="/login">Connexion</Link>
                            </div>
                        </div>
                        )}
                </nav>
            </div>
        </nav>
    );
};




export default Navbar;
