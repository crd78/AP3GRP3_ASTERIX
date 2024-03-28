import './Navbar.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Attractions from '../User/Attractions/Attractions';
import Connexion from '../Public/Connexion/Connexion';
import Missions from '../User/Missions/Mission';
import Avertissement from '../User/Avertissements/Avertissement';
import Accueil from '../Public/Accueil/Accueil';

const Navbar = () => {
    return (
        
        <nav>
            <div className="container">
                <nav className="navbar">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Accueil />} />Accueil
                            <Route path="/attractions" element={<Attractions />} />
                            <Route path="/missions" element={<Missions />} />
                            <Route path="/Advertissement" element={<Avertissement />} />
                            <Route path="/Connexion" element={<Connexion />} />
                        </Routes>
                    </Router>
                    <div className="bordure"></div>
                    
                </nav>
            </div>
        </nav>
        
    );
};

export default Navbar;
