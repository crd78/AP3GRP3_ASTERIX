import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './LoginForm.css';
import AsterixLogoConnexion from '../../../assets/images/AsterixLogoConnexion.png';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                //const decodedToken = jwtDecode(data.token);
                //setEmail(decodedToken.email);
                toast.success('Connexion réussie');
                console.log('Connexion réussie');
                setIsLoggedIn(true);
                setEmail('');
                setPassword('');
            } else {
                console.log('ERREUR');
                console.error('Erreur de connexion:', response.status);
                toast.warning('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/deconnexion', {
                method: 'POST'
            });

            if (response.ok) {
                // Supprimer le token du localStorage
                localStorage.removeItem('token');

                console.log('Déconnexion réussie');
                toast.success('Déconnexion réussie');
                setIsLoggedIn(false);
            } else {
                console.error('Erreur de déconnexion:', response.status);
                toast.warning('Erreur de déconnexion');
            }
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            //const decodedToken = jwtDecode(token);
            //setEmail(decodedToken.email);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="connexion-container">
            <div className="image-containerLogin">
                <img src={AsterixLogoConnexion} className='asterixConnexion' alt="Ajouter un utilisateur" />
            </div>

            <div className="form-container">
                {isLoggedIn ? (
                    <div>
                        <p>Vous êtes connecté</p>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </div>
                ) : (

                    <form onSubmit={handleLogin} className='loginForm'>

                        <h1>Connexion</h1>

                        <input
                            type="email"
                            id="email"
                            placeholder='Email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className='email'
                        />

                        <input
                            type="password"
                            id="password"
                            placeholder='Mot de passe'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className='password'

                        />
                        <button type="submit" className='seConnecter'>Se connecter</button>
                    </form>
                )}
            </div>
        </div>
    );

}

export default LoginForm;
