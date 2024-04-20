import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import banniere_asterix from '../../../assets/images/banniere_asterix.png';

const Dashboard = () => {
    return (
        <>
            <h1 className='titreDashboard'>Dashboard de l'administrateur</h1>
            <div className='containerGlobal'>
                <div className="dashboard-links">
                    <ul>
                        <li className='lien'><Link to="/admin/utilisateurs">Gestion des Utilisateurs</Link></li>
                        <li className='lien'><Link to="/admin/Avertissement/AdminAvertissements">Gestion des Avertissements</Link></li>
                        <li className='lien'><Link to="/admin/Avertissement/AdminAvertissements">Gestion des Missions</Link></li>
                        <li><Link to="/admin/Avertissement/AdminAvertissements">Gestion des Attractions</Link></li>

                    </ul>
                </div>
                <div className="image-container">
                    <img src={banniere_asterix} className='imageDashboard' alt="Banniere Asterix" />
                </div>
            </div>
        </>

    );
};

export default Dashboard;
