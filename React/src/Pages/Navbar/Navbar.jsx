import { Router, Routes } from 'express';
import './Navbar.css';
import LoginForm from '../Public/Connexion/LoginForm';

const Navbar = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
            </Routes>
        </Router>

    );
};

export default Navbar;
