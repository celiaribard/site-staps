import { getDonneesSujet, typesPratiqueRenommes, typesPratiqueTri, getResumesDonneesSujets, getResumeDonneesSujet, colonnesRenommees, getListeId, parametresAafficher, niveauTri } from "../TraitementDonnees";
import React, { useState } from "react"
import donneesPoussees from '../../donnees_poussees.json'

function TableauDonnees() {
    const listeId = getListeId(donneesPoussees);
    const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);
    // console.log('donnees a afficher', donneesSujet);

    const comparerValeurs = (a, b) => {
        if (typeof a === "number" && typeof b === "number") {
            return a - b;
        }

        if (typeof a === "string" && typeof b === "string") {
            return a.localeCompare(b);
        }

        // Autres types de valeurs (dates, objets, etc.)
        // Ajoutez des conditions pour les comparer selon vos besoins

        return 0; // Les valeurs sont considérées comme égales
    };

    const [donneesTriees, setDonneesTriees] = useState(resumeDonneesSujets); // Remplacez "donnees" par votre tableau de données initial
    const [triColonne, setTriColonne] = useState(''); // Colonne de tri actuelle
    const [triOrdre, setTriOrdre] = useState('desc'); // Ordre de tri actuel (ascendant ou descendant)

    // Fonction de tri appelée lorsqu'on clique sur l'intitulé de la colonne
    const handleTriColonne = (colonne) => {
        // Vérifie si la colonne de tri actuelle est la même que celle sur laquelle on a cliqué
        const estMemeColonne = triColonne === colonne;

        // Détermine le nouvel ordre de tri en fonction de l'état actuel
        const nouvelOrdre = estMemeColonne && triOrdre === 'asc' ? 'desc' : 'asc';

        // Effectue le tri des données en fonction de la colonne et de l'ordre de tri
        const donneesTriees = [...resumeDonneesSujets].sort((a, b) => {
            var a1 = a[colonne];
            var b1 = b[colonne];


            if (colonne === "type_pratique") {
                a1 = typesPratiqueTri[a1];
                b1 = typesPratiqueTri[b1];
            }

            if (colonne === 'sport_pratiqué') {
                console.log('lowercase');
                a1 = a1.toLowerCase();
                b1 = b1.toLowerCase();
            }

            if (colonne === "niveau_sportif") {
                a1 = niveauTri[a1];
                b1 = niveauTri[b1];
                console.log('niveau');
            }

            if (!isNaN(a1) && !isNaN(b1)) {
                a1 = parseFloat(a1);
                b1 = parseFloat(b1);
            }

            if (a1 < b1) {
                // console.log(a1, '<', b1);
                return nouvelOrdre === 'desc' ? -1 : 1;
            }
            if (a1 > b1) {
                // console.log(b1, '<', a1);
                return nouvelOrdre === 'desc' ? 1 : -1;
            }
            return 0;
        });

        // Met à jour les données triées, la colonne de tri et l'ordre de tri
        setDonneesTriees(donneesTriees);
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
                            {/* {triColonne === parametre && (
                                <FontAwesomeIcon icon={triOrdre === 'asc' ? faSortUp : faSortDown} />
                            )} */}
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
                                {parametre === 'type_pratique' ? typesPratiqueRenommes[resumeDonneesSujet[parametre]] : resumeDonneesSujet[parametre]}
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