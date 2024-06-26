import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import UserContext from '../../assets/Context/UserContexte';
import menu_hamburger from '../../assets/images/menu_hamburger.png';
import logo from '../../assets/images/logoAsterix.webp';

const Navbar = () => {
    const location = useLocation();
    const { isAdmin } = useContext(UserContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <img className='logo' src={logo} alt='logo' />
            <div className={`nav-links ${isMobile && isOpen ? 'mobile-menu' : ''}`}>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/attractions">Attractions</Link>
                    </li>
                    <li>
                        <Link to="/missions">Missions</Link>
                    </li>
                    <li>
                        <Link to="/Avertissement">Avertissements</Link>
                    </li>
                </ul>
            </div>
            {isMobile && (
                <img className='menu_hamburger' src={menu_hamburger} alt='menu_hamburger' onClick={handleMenuClick} />
            )}
            <div className="nav-links">
                {isAdmin && isAdmin() ? (
                    <ul>
                        <li>
                            <Link to="/admin/Dashboard">Administration</Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
