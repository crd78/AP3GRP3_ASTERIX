import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Avertissement = () => {
    const [Avertissements, setAvertissements] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [newIdNiveaux, setNewIdNiveaux] = useState('');
    const [editing, setEditing] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

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

    const createAvertissement = async () => {
        event.preventDefault();

        if (!newMessage) {
            alert('Veuillez entrer un message');
            return;
        }

        if (newIdNiveaux > 0 || newIdNiveaux > 5 || newIdNiveaux === '') {
            alert('Veuillez entrer un niveau entre 1 et 4');
            return;
        }

        try {
            await axios.post('http://localhost:3000/admin/CreateAvertissements', { message: newMessage, id_niveaux: newIdNiveaux });
            fetchAvertissements();
            setNewMessage('');
            setNewIdNiveaux('');
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating avertissement:', error);
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
        
            <button onClick={() =>setShowCreateForm(true)}>Create</button>
            {showCreateForm && (
                <form onSubmit={createAvertissement}>
                    <input type="text" value={newMessage} onChange={handleInputChange} placeholder="New message" />
                    <input type="number" value={newIdNiveaux} onChange={handleInputChangeIdNiveaux} placeholder="New id_niveaux" />
                    <button type="submit">Confirmer</button>
                </form>
            )}
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