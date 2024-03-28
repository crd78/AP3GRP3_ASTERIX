import { useState, useEffect } from 'react';
import axios from 'axios';

const Avertissement = () => {
    const [avertissements, setAvertissements] = useState([]);

    useEffect(() => {
        const fetchAvertissements = async () => {
            try {
                const response = await axios.get('/api/user/avertissements');
                setAvertissements(response.data);
            } catch (error) {
                console.error('Error fetching avertissements:', error);
            }
        };

        fetchAvertissements();
    }, []);

    return (
        <div>
            {avertissements.map((avertissement) => (
                <div key={avertissement.id}>
                    <p>{avertissement.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Avertissement;