import { useState } from "react";
import {
    typesPratiqueRenommes,
    typesPratiqueTri,
    colonnesRenommees,
    niveauTri,
    capitalize,
    arrondis
} from "../TraitementDonnees";
import icone_up from "../images/up_arrow1.png";
import icone_down from "../images/down_arrow1.png";
import icone_default from "../images/default1.png";

// les données doivent être filtrées au préalable
// titre et inputId facultatifs
const TableauAvecTri = ({ parametresAffiches, donneesTriees, titreTableau, inputId, handleChangeDonnees }) => {

    const [triColonne, setTriColonne] = useState("");
    const [triOrdre, setTriOrdre] = useState("asc");

    const handleTriColonne = (colonne) => {
        // Vérifie si la colonne de tri actuelle est la même que celle sur laquelle on a cliqué
        const estMemeColonne = triColonne === colonne;

        // Détermine le nouvel ordre de tri en fonction de l'état actuel
        const nouvelOrdre = estMemeColonne && triOrdre === "asc" ? "desc" : "asc";

        // Effectue le tri des données en fonction de la colonne et de l'ordre de tri
        const nouvellesDonneesTriees = [...donneesTriees].sort((a, b) => {
            var a1 = a[colonne];
            var b1 = b[colonne];

            if (colonne === "type_pratique") {
                a1 = typesPratiqueTri[a1];
                b1 = typesPratiqueTri[b1];
            }

            if (colonne === "sport_pratiqué") {
                a1 = a1.toLowerCase();
                b1 = b1.toLowerCase();
            }

            if (colonne === "niveau_sportif") {
                a1 = niveauTri[a1];
                b1 = niveauTri[b1];
            }

            if (!isNaN(a1) && !isNaN(b1)) {
                a1 = parseFloat(a1);
                b1 = parseFloat(b1);
            }

            if (a1 < b1) {
                // console.log(a1, '<', b1);
                return nouvelOrdre === "asc" ? -1 : 1;
            }
            if (a1 > b1) {
                // console.log(b1, '<', a1);
                return nouvelOrdre === "asc" ? 1 : -1;
            }
            return 0;
        });

        // Met à jour les données triées, la colonne de tri et l'ordre de tri
        handleChangeDonnees(nouvellesDonneesTriees);
        setTriColonne(colonne);
        setTriOrdre(nouvelOrdre);
    };

    return (
        <table>
            {titreTableau && <caption> {titreTableau} </caption>}
            <thead>
                <tr>
                    {parametresAffiches.map((parametre) => (
                        <th key={parametre} onClick={() => handleTriColonne(parametre)}>
                            {colonnesRenommees[parametre] || parametre}
                            &nbsp;
                            {
                                <img
                                    className="iconeTri"
                                    src={
                                        triColonne === parametre && triOrdre === "asc"
                                            ? icone_up
                                            : triColonne === parametre && triOrdre === "desc"
                                                ? icone_down
                                                : icone_default
                                    }
                                />
                            }
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {donneesTriees.map((resumeDonneesSujet, index) => {
                    return (
                        <tr
                            key={index}
                            className={
                                inputId &&
                                    parseFloat(resumeDonneesSujet.id) === parseFloat(inputId)
                                    ? "ligneGrisee"
                                    : ""
                            }
                        >
                            {parametresAffiches.map((parametre) => {
                                return (
                                    <td key={parametre}>
                                        {parametre === "type_pratique"
                                            ? capitalize(
                                                typesPratiqueRenommes[resumeDonneesSujet[parametre]]
                                            )
                                            : (arrondis[parametre] ? parseFloat(resumeDonneesSujet[parametre]).toFixed(arrondis[parametre])
                                                : capitalize(resumeDonneesSujet[parametre]))}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export { TableauAvecTri }