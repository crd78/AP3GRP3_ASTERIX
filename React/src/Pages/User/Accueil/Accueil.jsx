import "./Accueil.css"
import React from 'react';



const Accueil = () => {
    return (
        <div className="container-accueil">
            <div className="img-accueil">
               <img className="img-accueil" src='../src/assets/images/banniere_asterix.png'/>
                <h2 className="titre-accueil">Bienvenue dans l'espace staff du parc</h2>
                <img className="img-icones" src='../src/assets/images/montagne.png'/>
            </div>
        </div>
    );
}
export default Accueil;
