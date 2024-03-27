import './Navbar.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from '../User/Home/Home';
import Attractions from '../User/Attractions/Attractions';

const Navbar = () => {
    return (
        
        <nav>
            <div className="container">
                <nav className="navbar">
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/attractions" element={<Attractions />} />
                            <Route path="/missions" element={<Missions />} />
                            <div className="logs">
                                <Route path="/Connexion" element={<Connexion />} />
                            </div>
                        </Routes>
                    </Router>
                    <div className="bordure"></div>
                    
                </nav>
            </div>
        </nav>
        
    );
};

export default Navbar;
