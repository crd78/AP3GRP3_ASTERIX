import './Navbar.css';
import {useState, useEffect} from 'react';


const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            const decodedToken = JSON.parse(jsonPayload);
            setIsAdmin(decodedToken.isAdmin);
        }

    }, []);
    return (

        <nav>
            <div className="container">
                <nav className="navbar">
                    <a href="/">Accueil</a>
                    <a href="/attractions">Attractions</a>
                    <a href="/missions">Missions</a>
                    
                        <a href={isAdmin ? "/admin/avertissements" : "/avertissement"} >Avertissement</a>
                    <div className="logs">
                        <a className='inscription' href="/login">Connection</a>
                    </div>
                    <div className="bordure"></div>

                </nav>
            </div>
        </nav>

    );
};

export default Navbar;
