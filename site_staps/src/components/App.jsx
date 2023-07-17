import "../App.css";
import donneesPoussees from "../../donnees_poussees.json";
import { useState, useEffect } from "react";
import { FormIdSujet } from "./FormIdSujet";
import {
  getResumesDonneesSujets,
  getListeSports,
  getListeNiveaux,
  capitalize,
  filtrerDonnees,
  parametresAffiches,
  parametresAffiches2,
  getDonneesSujet
} from "../TraitementDonnees";
import { TableauAvecTri } from "./TableauAvecTri";

const App = () => {
  const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);

  const [inputId, setInputId] = useState(null);
  const [filtres, setFiltres] = useState({
    sexe: "",
    sport_pratiqué: '',
    niveau_sportif: ''
  });
  const [donneesTriees, setDonneesTriees] = useState(resumeDonneesSujets);
  const [donnees1Sujet, setDonnees1Sujet] = useState(getDonneesSujet(donneesPoussees, inputId));

  useEffect(() => {
    setDonnees1Sujet(getDonneesSujet(donneesPoussees, inputId))
  }, [inputId])

  useEffect(() => {
    const donneesFiltrees = filtrerDonnees(resumeDonneesSujets, filtres);
    setDonneesTriees(donneesFiltrees);
  }, [filtres]); // le useEffect s'actualise chaque fois que la variable filtres change

  // pour le tableau avec les données d'1 sujet
  const handleChangeDonneesSujet = (nouvellesDonnees) => {
    setDonnees1Sujet(nouvellesDonnees);
  }

  // pour le tableau avec toutes les données
  const handleChangeDonneesSujets = (nouvellesDonnees) => {
    setDonneesTriees(nouvellesDonnees);
  }

  const handleFormSubmit = (id) => {
    const userExists = donneesPoussees.some(
      (item) => item.id.toString() === id
    );
    if (userExists) {
      setInputId(id);
    } else {
      setInputId(null);
      alert("Aucun utilisateur trouvé pour cet ID.");
    }
  };

  const handleChangeFiltre = (e) => {
    const { name, value } = e.target;
    setFiltres((prevState) => ({ ...prevState, [name]: value }));
  };

  const listeSports = getListeSports(donneesPoussees); // par contre ça prend pas en compte s'il y a des filtres, ça affiche tous les sports de la BD
  const listeNiveaux = getListeNiveaux(donneesPoussees);

  return (
    <div>
      <div>
        <FormIdSujet onFormSubmit={handleFormSubmit} />
      </div>
      <br />
      {inputId &&
        <div>
          <TableauAvecTri
            donneesTriees={donnees1Sujet}
            parametresAffiches={parametresAffiches2}
            titreTableau={undefined}
            inputId={undefined}
            handleChangeDonnees={handleChangeDonneesSujet}
          />
        </div>}


      <br />
      <div>
        <label>
          Genre: &nbsp;
          <select
            name="sexe"
            value={filtres.sexe}
            onChange={handleChangeFiltre}
          >
            <option value="">Tous</option>
            <option value="F">Féminin</option>
            <option value="M">Masculin</option>
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          Sport pratiqué: &nbsp;
          <select
            name="sport_pratiqué"
            value={filtres.sport_pratiqué}
            onChange={handleChangeFiltre}
          >
            <option value="">Tous</option>
            {listeSports.map((sport) => (
              <option
                key={sport}
                value={sport}
                onChange={handleChangeFiltre}>{capitalize(sport)}
              </option>
            ))}
          </select>
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          Niveau : &nbsp;
          <select
            name="niveau_sportif"
            value={filtres.niveau_sportif}
            onChange={handleChangeFiltre}
          >
            <option value="">Tous</option>
            {listeNiveaux.map((sport) => (
              <option
                key={sport}
                value={sport}
                onChange={handleChangeFiltre}>{capitalize(sport)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <TableauAvecTri
          parametresAffiches={parametresAffiches}
          donneesTriees={donneesTriees}
          titreTableau="Données sujets"
          inputId={inputId ? inputId : null}
          handleChangeDonnees={handleChangeDonneesSujets}
        />
      </div>
    </div>
  );
};

export { App };