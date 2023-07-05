import { getDonneesSujet, getResumesDonneesSujets, getResumeDonneesSujet, colonnesRenommees, getListeId, parametresAafficher } from "../TraitementDonnees";
import React, { useState } from "react"
import donneesPoussees from '../../donnees_poussees.json'

function TableauDonnees() {
    const listeId = getListeId(donneesPoussees);
    const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);
    // console.log('donnees a afficher', donneesSujet);

    const [donneesTriees, setDonneesTriees] = useState(resumeDonneesSujets); // Remplacez "donnees" par votre tableau de données initial
    const [triColonne, setTriColonne] = useState(''); // Colonne de tri actuelle
    const [triOrdre, setTriOrdre] = useState('asc'); // Ordre de tri actuel (ascendant ou descendant)

    // Fonction de tri appelée lorsqu'on clique sur l'intitulé de la colonne
    const handleTriColonne = (colonne) => {
        // Vérifie si la colonne de tri actuelle est la même que celle sur laquelle vous avez cliqué
        const estMemeColonne = triColonne === colonne;

        // Détermine le nouvel ordre de tri en fonction de l'état actuel
        const nouvelOrdre = estMemeColonne && triOrdre === 'asc' ? 'desc' : 'asc';

        // Effectue le tri des données en fonction de la colonne et de l'ordre de tri
        const donneesTrieesNouvelles = [...resumeDonneesSujets].sort((a, b) => {
            if (a[colonne] < b[colonne]) return nouvelOrdre === 'asc' ? -1 : 1;
            if (a[colonne] > b[colonne]) return nouvelOrdre === 'asc' ? 1 : -1;
            return 0;
        });

        // Met à jour les données triées, la colonne de tri et l'ordre de tri
        setDonneesTriees(donneesTrieesNouvelles);
        setTriColonne(colonne);
        setTriOrdre(nouvelOrdre);

    };

    return (
        <table>
            <caption> Toutes les données </caption>
            <thead>
                <tr>
                    {parametresAafficher.map((parametre) => (
                        <th key={parametre} onClick={() => handleTriColonne(parametre)}>
                            {colonnesRenommees[parametre] || parametre}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {donneesTriees.map((resumeDonneesSujet, index) => (
                    <tr key={index}>
                        {parametresAafficher.map((parametre) => (
                            // { console.log(parametre) }
                            < td key={parametre} >
                                {resumeDonneesSujet[parametre]}
                            </td>
                        ))}
                    </tr>
                )
                )}

            </tbody>
        </table >
    );
}

export { TableauDonnees }