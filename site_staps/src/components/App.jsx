import React, { useState, useEffect } from 'react';
import '../App.css'
import { FormIdSujet } from './FormIdSujet'
import { TableauDonnees } from './TableauDonnees';
import { getListeId, getResumesDonneesSujets } from '../TraitementDonnees';
import { Tableau1Sujet } from './Tableau1Sujet';
import donneesPoussees from '../../donnees_poussees.json'


function App() {
  const [inputId, setInputId] = useState(null);

  console.log('resume tous sujets', getResumesDonneesSujets(donneesPoussees));

  const handleFormSubmit = (id) => {
    // console.log(id);
    fetch('donnees_poussees.json')
      .then((response) => response.json())
      .then((data) => {
        const userExists = data.some((item) => item.id.toString() === id); //pour que ça marche avec des id numériques ou non (G001). Sinon item.id === parseInt(id, 10)
        if (userExists) {
          setInputId(id);
        } else {
          setInputId(null);
          alert("Aucun utilisateur trouvé pour cet ID.");
        }
      })
      .catch((error) => {
        console.log('Une erreur s\'est produite : ', error);
      });
  };

  return (

    < div >
      <div>
        <FormIdSujet onFormSubmit={handleFormSubmit} />
      </div>
      <br />
      <div>
        {
          inputId ? (
            <Tableau1Sujet inputId={inputId} />
          ) : (
            <p>Aucune donnée à afficher.</p>
          )
        }
      </div>
      <br />
      <div>
        <TableauDonnees />
      </div>
    </div >
  );
}

export { App }
