import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './GestionUtilisateurs.css';
import AsterixLogoInscription from '../../../assets/images/AsterixLogoInscription.png';
import { FiEdit, FiTrash } from 'react-icons/fi';
import UserContext from '../../../assets/Context/UserContexte';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const GestionUtilisateurs = () => {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        code_postal: '',
        ville: '',
        adresse: ''
    });
    const [nouvelUtilisateur, setNouvelUtilisateur] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        code_postal: '',
        ville: '',
        adresse: '',
        id_roles: '',
        id_metiers: ''
    });
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchUtilisateurs();
    }, []);

    if (user && user.role !== 'admin') {
        return <ErrorMessage message="Accès refusé. Cette page n'est accessible qu'aux administrateurs." />;
    }

    const fetchUtilisateurs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/utilisateurs');
            setUtilisateurs(response.data);
        } catch (error) {
            console.error('Error fetching utilisateurs:', error);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditedUserData({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            code_postal: user.code_postal,
            ville: user.ville,
            adresse: user.adresse
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedUserData({ ...editedUserData, [name]: value });
    };

    const handleInputChangeNouvelUtilisateur = (event) => {
        const { name, value } = event.target;
        setNouvelUtilisateur({ ...nouvelUtilisateur, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/admin/modifierUtilisateur/${selectedUser.id}`, editedUserData);
            toast.success('Utilisateur mis à jour avec succès');
            fetchUtilisateurs();
        } catch (error) {
            console.error('Error updating utilisateur:', error);
            toast.error("Erreur lors de la mise à jour de l'utilisateur");
        } finally {
            setLoading(false);
            setSelectedUser(null);
        }
    };

    const ajouterUtilisateur = async () => {
        try {
            await axios.post(`http://localhost:3000/admin/ajouterUtilisateur`, nouvelUtilisateur);
            fetchUtilisateurs();
            toast.success('Utilisateur ajouté avec succès');
            // Réinitialiser le formulaire
            setNouvelUtilisateur({
                nom: '',
                prenom: '',
                email: '',
                password: '',
                code_postal: '',
                ville: '',
                adresse: '',
                id_roles: '',
                id_metiers: ''
            });
        } catch (error) {
            console.error('Error lors de l\'ajout d\'utilisateurs:', error);
            toast.error('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    const handleDeleteClick = (userId) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");
        if (confirmDelete) {
            deleteUtilisateur(userId);
        }
    };

    const deleteUtilisateur = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/admin/supprimerUtilisateur/${id}`);
            fetchUtilisateurs();
            toast.success('Utilisateur supprimé avec succès');
        } catch (error) {
            console.error('Error deleting utilisateur:', error);
            toast.error('Erreur lors de la suppression de l\'utilisateur');
        }
    };

    return (
        <div className='gestion-utilisateurs'>
            <h1>Gestion des utilisateurs</h1>

            <div className='container-ajoutUser'>
                <div className='image-container'>
                    <img src={AsterixLogoInscription} className='asterixInscription' alt="Ajouter un utilisateur" />
                </div>

                <div className='formulaire-container'>
                    <h2 className='AddUser'>Ajouter un utilisateur</h2>
                    <form onSubmit={ajouterUtilisateur}>
                        <input className='inPut' type="text" name="nom" value={nouvelUtilisateur.nom} onChange={handleInputChangeNouvelUtilisateur} placeholder="Nom" />
                        <input className='inPut' type="text" name="prenom" value={nouvelUtilisateur.prenom} onChange={handleInputChangeNouvelUtilisateur} placeholder="Prénom" />
                        <input className='inPut' type="email" name="email" value={nouvelUtilisateur.email} onChange={handleInputChangeNouvelUtilisateur} placeholder="Email" />
                        <input className='inPut' type="text" name="password" value={nouvelUtilisateur.password} onChange={handleInputChangeNouvelUtilisateur} placeholder="Password" />
                        <input className='inPut' type="number" name="code_postal" value={nouvelUtilisateur.code_postal} onChange={handleInputChangeNouvelUtilisateur} placeholder="Code Postal" />
                        <input className='inPut' type="text" name="adresse" value={nouvelUtilisateur.adresse} onChange={handleInputChangeNouvelUtilisateur} placeholder="Adresse" />
                        <input className='inPut' type="number" name="id_roles" value={nouvelUtilisateur.id_roles} onChange={handleInputChangeNouvelUtilisateur} placeholder="Rôle" />
                        <input className='inPut' type="number" name="id_metiers" value={nouvelUtilisateur.id_metiers} onChange={handleInputChangeNouvelUtilisateur} placeholder="Métier" />
                        <button className="btnAjouter" type="submit">Ajouter</button>
                    </form>
                </div>
            </div>


            <hr className='hr'></hr>


            <h1>Liste des utilisateurs</h1>
            <div className='liste_utilisateurs'>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Modifier</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs.map((utilisateur) => (
                            <tr key={utilisateur.id}>
                                <td>{utilisateur.nom}</td>
                                <td>{utilisateur.prenom}</td>
                                <td>{utilisateur.email}</td>
                                <td>
                                    <button className='btn' onClick={() => handleEditClick(utilisateur)}>
                                        <FiEdit />
                                    </button>
                                </td>
                                <td>
                                    <button className='btn' onClick={() => handleDeleteClick(utilisateur.id)}>
                                        <FiTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


            {selectedUser && (
                <div className='formulaire-container'>
                    <h2>Modifier l'utilisateur</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nom:
                            <input className='inPut' type="text" name="nom" value={editedUserData.nom} onChange={handleInputChange} />
                        </label>
                        <label>
                            Prénom:
                            <input className='inPut' type="text" name="prenom" value={editedUserData.prenom} onChange={handleInputChange} />
                        </label>
                        <label>
                            Email:
                            <input className='inPut' type="email" name="email" value={editedUserData.email} onChange={handleInputChange} />
                        </label>
                        <label>
                            Code Postal:
                            <input className='inPut' type="text" name="code_postal" value={editedUserData.code_postal} onChange={handleInputChange} />
                        </label>
                        <label>
                            Ville:
                            <input className='inPut' type="text" name="ville" value={editedUserData.ville} onChange={handleInputChange} />
                        </label>
                        <label>
                            Adresse:
                            <input className='inPut' type="text" name="adresse" value={editedUserData.adresse} onChange={handleInputChange} />
                        </label>
                        <button type="submit" disabled={loading}>Enregistrer</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default GestionUtilisateurs;
