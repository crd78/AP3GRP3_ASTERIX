import { useState, useEffect } from 'react';
import axios from 'axios';

const Avertissement = () => {
    const [Avertissements, setAvertissements] = useState([]);

    useEffect(() => {
        const fetchAvertissements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/avertissements');
                setAvertissements(response.data);
            } catch (error) {
                console.error('Error fetching avertissements:', error);
            }
        };

        fetchAvertissements();
    }, []);

    

    return (
        <div>
            {Avertissements.map((avertissement) => (
                <div key={avertissement.id}>
                    <p>{avertissement.message}</p>
                    <p>{avertissement.id_niveaux}</p>
                </div>
            ))}
        </div>
    );
};

export default Avertissement;