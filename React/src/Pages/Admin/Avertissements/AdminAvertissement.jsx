import { useState, useEffect } from 'react';
import axios from 'axios';

const Avertissement = () => {
    const [Avertissements, setAvertissements] = useState([]);

    useEffect(() => {
        const fetchAvertissements = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await axios.get('http://localhost:3000/admin/avertissements', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Send the token in the request headers
                    }
                });
                setAvertissements(response.data);
            } catch (error) {
                console.error('Error fetching avertissements:', error);
            }
        };
    
        fetchAvertissements();
    }, []);

    // const updateAvertissement = async (id, message, id_niveaux) => {
    //     try {
    //         const token = localStorage.getItem('token'); // Get the token from local storage
    //         await axios.put(`http://localhost:3000/admin/ModifAvertissements/${id}`, {
    //             message,
    //             id_niveaux
    //         }, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}` // Send the token in the request headers
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error updating avertissement:', error);
    //     }
    // };

    // const deleteAvertissement = async (id) => {
    //     try {
    //         const token = localStorage.getItem('token'); // Get the token from local storage
    //         await axios.delete(`http://localhost:3000/admin/Delavertissements/${id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}` // Send the token in the request headers
    //             }
    //         });
    //     } catch (error) {
    //         console.error('Error deleting avertissement:', error);
    //     }
    // };


    return (
        <div>
            {Avertissements.map((avertissement) => (
                <div key={avertissement.id}>
                    <p>{avertissement.message}</p>
                    <p>{avertissement.id_niveaux}</p>
                    {/* <button onClick={() => updateAvertissement(avertissement.id, { message: 'New message', id_niveaux: 2 })}>Update</button>
                    <button onClick={() => deleteAvertissement(avertissement.id)}>Delete</button> */}
                </div>
            ))}
        </div>
    );
};

export default Avertissement;