import './Navbar.css';

const Navbar = () => {
    return (

        <nav>
            <div className="container">
                <nav className="navbar">
                    <a href="/">Accueil</a>
                    <a href="/attractions">Attractions</a>
                    <a href="/missions">Missions</a>
                    <div className="logs">
                        <a className='inscription' href="/connexion">Connection</a>
                    </div>
                    <div className="bordure"></div>

                </nav>
            </div>
        </nav>

    );
};

export default Navbar;
