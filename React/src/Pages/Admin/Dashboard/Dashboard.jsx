import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>Tableau de bord</h1>
            <ul>
                <li><Link to="/admin/utilisateurs">Gestion des Utilisateurs</Link></li>
            </ul>
        </div>
    );
};

export default Dashboard;
