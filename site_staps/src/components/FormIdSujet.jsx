import React, { useState, useEffect } from 'react';

function FormIdSujet({ onFormSubmit }) {
    const [inputId, setInputId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(inputId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Entrez votre identifiant: &nbsp;
                <input type="text" maxLength='4' placeholder="ex: 1234" value={inputId} onChange={(e) => setInputId(e.target.value)} />
            </label>
            &nbsp;
            <button type="submit">OK</button>
        </form>
    );
}

export { FormIdSujet }