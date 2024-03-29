import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';




const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
    
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // ...
        } else if (response.status === 401) {
            // Handle unauthorized error
            console.error('Erreur de connexion: 401');
        } else {
            // Handle other errors
            console.error('Une erreur inattendue est survenue');
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
        <div>
            {isLoggedIn ? (
                <div>
                    <p>Vous êtes connecté</p>
                    <button onClick={handleLogout}>Déconnexion</button>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <div className='caca'>
                        <h1>Connexion</h1>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            )}
        </div>
    );
}

export default LoginForm;
