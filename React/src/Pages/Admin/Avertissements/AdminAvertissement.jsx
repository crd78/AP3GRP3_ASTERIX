import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Avertissement = () => {
    const [Avertissements, setAvertissements] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [newIdNiveaux, setNewIdNiveaux] = useState('');
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        fetchAvertissements();
    }, []);

    const fetchAvertissements = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/avertissements');
            setAvertissements(response.data);
        } catch (error) {
            console.error('Error fetching avertissements:', error);
        }
    };

    const updateAvertissement = async (id, data) => {
        try {
            await axios.put(`http://localhost:3000/admin/ModifAvertissements/${id}`, data);
            fetchAvertissements();
            setEditing(null);
        } catch (error) {
            console.error('Error updating avertissement:', error);
        }
    };

    const deleteAvertissement = async (id, data) => {
        try {
            await axios.delete(`http://localhost:3000/admin/DelAvertissements/${id}`, data);
            fetchAvertissements();
            
        } catch (error) {
            console.error('Error deleting avertissement:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleInputChangeIdNiveaux = (event) => {
        setNewIdNiveaux(event.target.value);
    };

    return (
        <div>
            {Avertissements.map((avertissement) => (
                <div key={avertissement.id}>
                    <p>{avertissement.message}</p>
                    <p>{avertissement.id_niveaux}</p>
                    {editing === avertissement.id ? (
                        <>
                            <input type="text" value={newMessage} onChange={handleInputChange} />
                            <input type="number" value={newIdNiveaux} onChange={handleInputChangeIdNiveaux} placeholder='niveau' />
                            <button onClick={() => updateAvertissement(avertissement.id, { message: newMessage, id_niveaux: newIdNiveaux })}>Confirm</button>
                        </>
                    ) : (
                        <button onClick={() => setEditing(avertissement.id)}>Update</button>
                    )}
                    <button onClick={() => deleteAvertissement(avertissement.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Avertissement;