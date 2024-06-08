import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import asterixAdmin from '../../../assets/images/asterixAdmin.jpeg';

const Dashboard = () => {
    function logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    return (
        
        <>
            <h1 className='titreDashboard'>Dashboard Administrateur</h1>
            <div className='containerGlobal'>
                <div className="dashboard-links">
                    <ul>
                        <li className='lien'><Link to="/admin/utilisateurs">Gestion des Utilisateurs</Link></li>
                        <li className='lien'><Link to="/admin/Avertissement/AdminAvertissements">Gestion des Avertissements</Link></li>
                        <li><Link to="/admin/Avertissement/AdminAvertissements">Gestion des Missions</Link></li>
                        <button onClick={logout}>Déconnexion</button>

                    </ul>
                </div>
                <div className="imageContainer">
                    <img src={asterixAdmin} className='imageDashboard' alt="Banniere Asterix" />
                </div>
            </div>
        </>

    );
};

export default Dashboard;
