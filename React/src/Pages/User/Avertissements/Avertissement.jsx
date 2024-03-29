import { useState, useEffect } from 'react';
import axios from 'axios';
import './Avertissement.css';
const Avertissement = () => {
    const [Avertissements, setAvertissements] = useState([]);

    useEffect(() => {
        const fetchAvertissements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/avertissements');
                setAvertissements(response.data);
            } catch (error) {
                console.error('Error fetching avertissements:', error);
            }
        };

        fetchAvertissements();
    }, []);

    

    return (
        <div className='UserAvertissementContainer'>
            <h1>Avertissements</h1>
            <div className='UserAvertissementContainertab'> 
                {Avertissements.map((avertissement) => (
                    <div key={avertissement.id}>
                        <h2>Message:</h2>
                        <p>{avertissement.message}</p>
                        <h2>Niveau:</h2>
                        <p>{avertissement.id_niveaux}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Avertissement;