import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminAvertissement.css';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash } from 'react-icons/fi';


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
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            const response = await axios.get('http://localhost:3000/admin/avertissements', {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });
            setAvertissements(response.data);
        } catch (error) {
            console.error('Error fetching avertissements:', error);
        }
    };

    const updateAvertissement = async (id, data) => {
        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            await axios.put(`http://localhost:3000/admin/ModifAvertissements/${id}`, data, {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });
            fetchAvertissements();
            setEditing(null);
        } catch (error) {
            console.error('Error updating avertissement:', error);
        }
    };

    const deleteAvertissement = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            await axios.delete(`http://localhost:3000/admin/DelAvertissements/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });
            fetchAvertissements();
            
        } catch (error) {
            console.error('Error deleting avertissement:', error);
        }
    };

    const createAvertissement = async (event) => {
        event.preventDefault();
    
        if (!newMessage) {
            alert('Veuillez entrer un message');
            return;
        }

        if (!(newIdNiveaux > 0 && newIdNiveaux < 5 )) {
            alert('Veuillez entrer un niveau entre 1 et 4');
            return;
        }
        if (newIdNiveaux == null) {
            alert('Veuillez entrer un niveau');
            return;
        }
        

        try {
            const token = localStorage.getItem('token'); // Récupérez le token du localStorage
            await axios.post('http://localhost:3000/admin/CreateAvertissements', { message: newMessage, id_niveaux: newIdNiveaux }, {
                headers: {
                    Authorization: 'Bearer ' + token // Utilisez le token pour l'autorisation
                }
            });
            fetchAvertissements();
            setNewMessage('');
            setNewIdNiveaux('');
            setShowCreateForm(false);
            toast.success("Avertissement créé");

        } catch (error) {
            console.error('Error creating avertissement:', error);
            toast.error("Erreur lors de la création de l'avertissement");
        }
    };

    const handleInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleInputChangeIdNiveaux = (event) => {
        setNewIdNiveaux(event.target.value);
    };

    return (
        <div className='AdminAdvertMargin'>
            <div className='AdvertAdminContainer'>
                <h1>Gestion des Avertissements</h1>
                <div className="CreeAvertissement">
                    {!showCreateForm && (
                        <button onClick={() => setShowCreateForm(true)}>Create
                        </button>
                    )}
                    {showCreateForm && (

                        <form onSubmit={createAvertissement}>
                            <input type="text" value={newMessage} onChange={handleInputChange} placeholder="New message" />
                            <input type="number" value={newIdNiveaux} onChange={handleInputChangeIdNiveaux} placeholder="New id_niveaux" />
                            <button type="submit">Confirmer</button>

                        </form>
                    )}
                </div>

                {Avertissements.sort((a, b) => a.id_niveaux - b.id_niveaux).map((avertissement) => (
                    <div className="AffichageAvertissement" key={avertissement.id}>
                        <div>
                            <h2>Message:</h2>
                            <p>{avertissement.message}</p>
                            <h2>Niveaux:</h2>
                            <p>{avertissement.id_niveaux}</p>
                            {editing === avertissement.id ? (
                                <>
                                    <input type="text" value={newMessage} onChange={handleInputChange} />
                                    <input type="number" value={newIdNiveaux} onChange={handleInputChangeIdNiveaux} placeholder='niveau' />
                                    <button onClick={() => updateAvertissement(avertissement.id, { message: newMessage, id_niveaux: newIdNiveaux })}>Confirm</button>
                                </>
                            ) : (
                                <button onClick={() => setEditing(avertissement.id)}><FiEdit /></button>
                            )}
                            <button onClick={() => deleteAvertissement(avertissement.id)}><FiTrash /></button>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default Avertissement;