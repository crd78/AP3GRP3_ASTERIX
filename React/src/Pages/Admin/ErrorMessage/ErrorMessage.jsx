// ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <h1>Erreur</h1>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
