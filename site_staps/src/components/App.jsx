import React, { useState, useEffect } from 'react';
import '../App.css'
import { FormIdSujet } from './FormIdSujet'
import { TableauDonnees } from './TableauDonnees';
import { getListeId, getResumesDonneesSujets } from '../TraitementDonnees';
import { Tableau1Sujet } from './Tableau1Sujet';
import donneesPoussees from '../../donnees_poussees.json'


function App() {

  const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);

  const [inputId, setInputId] = useState(null);

  // console.log('resume tous sujets', getResumesDonneesSujets(donneesPoussees));

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

  const [filtres, setFiltres] = useState({
    genre: '',
    // sport: '',
  });

  const handleChangeFiltre = (e) => {
    const { name, value } = e.target;
    setFiltres((prevState) => ({ ...prevState, [name]: value }));
  };

  // console.log(resumeDonneesSujets);
  const donneesFiltrees = resumeDonneesSujets.filter((sujet) => {
    // console.log(sujet.sexe, filtres.sexe);
    return (
      // sujet
      // sujet.sexe === filtres.sexe
      (!filtres.sexe || filtres.sexe === '' || sujet.sexe === filtres.sexe)
      // &&
      // (filtres.sport === '' || sujet.sport_pratiqué === filtres.sport)
    );
  });
  // console.log(donneesFiltrees);

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
        <label>
          Genre : &nbsp;
          <select name="sexe" value={filtres.sexe} onChange={handleChangeFiltre}>
            <option value="">Tous</option>
            <option value="F">Féminin</option>
            <option value="M">Masculin</option>
          </select>
        </label>
      </div>
      <div>
        <TableauDonnees inputId={inputId ? inputId : null} donneesAafficher={donneesFiltrees} />
      </div>
    </div >
  );
}

export { App }
