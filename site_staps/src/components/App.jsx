import "../App.css";
import donneesPousseesBrutes from "../../donnees_poussees.json";
import { useState, useEffect } from "react";
import {
  getResumesDonneesSujets,
  getListeSports,
  getListeNiveaux,
  filtrerDonnees,
  parametresAffiches,
  parametresAffiches2,
  parametresAffichesBar,
  getDonneesSujet
} from "../TraitementDonnees";
import { TableauAvecTri } from "./TableauAvecTri";
import { GraphesPerf } from "./GraphesPerf";
import { Filtres } from "./Filtres";
import { MyNavbar } from "./Navbar";
import { ProfilForceVitesse } from "./ProfilForceVitesse";
import { Routes, Route } from "react-router-dom"
import { BoutonNormaliser } from "./BoutonNormaliser";
import { TestGraphePerf } from "./TestGraphePerf";

const App = () => {
  const donneesPoussees = donneesPousseesBrutes.filter(donnee => donnee.dans_graphe === 1);
  const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);

  const [inputId, setInputId] = useState(null);
  const [filtres, setFiltres] = useState({
    sexe: "",
    sport_pratiqué: '',
    niveau_sportif: ''
  });

  const [donneesTriees, setDonneesTriees] = useState(resumeDonneesSujets);
  const [donnees1Sujet, setDonnees1Sujet] = useState(getDonneesSujet(donneesPoussees, inputId));
  const [isCheckedNormaliser, setIsCheckedNormaliser] = useState(false);
  const [donneesHistogrammes, setDonneesHistogrammes] = useState(resumeDonneesSujets);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsCheckedNormaliser(checked);
  };

  useEffect(() => {
    setDonnees1Sujet(getDonneesSujet(donneesPoussees, inputId))
  }, [inputId])

  useEffect(() => {
    const donneesFiltrees = filtrerDonnees(resumeDonneesSujets, filtres, inputId);
    setDonneesTriees(donneesFiltrees);
    setDonneesHistogrammes(donneesFiltrees);
  }, [filtres, inputId]); // le useEffect s'actualise chaque fois que la variable filtres ou inputId change


  // pour le tableau avec les poussées d'1 sujet
  const handleChangeDonneesSujet = (nouvellesDonnees) => {
    setDonnees1Sujet(nouvellesDonnees);
  }

  // pour le tableau avec toutes les données (et les graphes)
  const handleChangeDonneesSujets = (nouvellesDonnees) => {
    setDonneesTriees(nouvellesDonnees);
  }

  // pour les histogrammes
  const handleChangeDonneesHistogramme = (nouvellesDonnees) => {
    setDonneesHistogrammes(nouvellesDonnees);
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

  const listeSports = getListeSports(donneesPoussees).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())); // par contre ça prend pas en compte les filtres s'il y en a, ça affiche tous les sports de la BD
  const listeNiveaux = getListeNiveaux(donneesPoussees);

  const listeCharges = donneesPoussees.map((donnee) => donnee.pourcentage_masse_corporelle);
  const listeChargesUniques = [...new Set(listeCharges)];

  return (
    <div className="App">
      <MyNavbar onFormSubmit={handleFormSubmit} inputId={inputId} />
      {/* <Routes>
        <Route path="/donnees-sujet" element={
          <ProfilForceVitesse
            donnees={donnees1Sujet}
          ></ProfilForceVitesse>
        }>
        </Route> */}

      <div>
        <div className="container">
          <br />
          {inputId ?
            <div className="d-flex flex-column align-items-center pt-5" id="tableau-mes-donnees">
              <TableauAvecTri
                donneesTriees={donnees1Sujet}
                parametresAffiches={parametresAffiches2}
                titreTableau={donnees1Sujet[0] ? "Toutes les poussées du sujet " + inputId + ": " + donnees1Sujet[0].sexe + ", " + donnees1Sujet[0].sport_pratiqué + ", " + donnees1Sujet[0].niveau_sportif + ", " + donnees1Sujet[0].type_pratique : "Toutes les poussées du sujet " + inputId}
                inputId={undefined}
                handleChangeDonnees={handleChangeDonneesSujet}
              />
            </div> : <div className="d-flex flex-column align-items-center pt-5">Saisissez votre identifiant pour accéder à vos données détaillées.</div>}

          <br />
          {inputId &&
            <div className="pt-5">
              <ProfilForceVitesse
                donnees={donnees1Sujet}
              ></ProfilForceVitesse>
            </div>
          }

          <br />
          <div className="pt-5">
            <Filtres
              filtres={filtres}
              handleChangeFiltre={handleChangeFiltre}
              listeNiveaux={listeNiveaux}
              listeSports={listeSports}
            />
          </div>
          <br />
          <BoutonNormaliser onChange={handleCheckboxChange}></BoutonNormaliser>
          <div>
            <GraphesPerf
              isCheckedNormaliser={isCheckedNormaliser}
              parametresAffiches={parametresAffichesBar}
              donnees={donneesHistogrammes}
              inputId={inputId}
            />
          </div>
          <br />
          <div id="tableau-toutes-donnees" className="pt-5">
            <TableauAvecTri
              parametresAffiches={parametresAffiches}
              donneesTriees={donneesTriees}
              titreTableau="Meilleures perfs de tous les sujets"
              inputId={inputId ? inputId : null}
              handleChangeDonnees={handleChangeDonneesSujets}
            />
          </div>
        </div>
      </div>
      {/* </Routes> */}
    </div>
  );
};

export { App };