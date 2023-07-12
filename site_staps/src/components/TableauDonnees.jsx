import {
    typesPratiqueRenommes,
    typesPratiqueTri,
    colonnesRenommees,
    parametresAafficher,
    niveauTri,
    Capitalize,
} from "../TraitementDonnees";
import { useEffect, useState } from "react";
import icone_up from "../images/up_arrow1.png";
import icone_down from "../images/down_arrow1.png";
import icone_default from "../images/default1.png";

const TableauDonnees = ({ inputId, donneesAafficher, filtres }) => {
    const [donneesTriees, setDonneesTriees] = useState(donneesAafficher);
    const [triColonne, setTriColonne] = useState("");
    const [triOrdre, setTriOrdre] = useState("asc");

    useEffect(() => {
        const donneesFiltrees = donneesAafficher.filter((sujet) => {
            console.log('filtre', filtres);
            return (
                (!filtres.sexe || filtres.sexe === "" || sujet.sexe === filtres.sexe)
                &&
                (!filtres.sport_pratiqué || filtres.sport_pratiqué === "" || sujet.sport_pratiqué === filtres.sport_pratiqué)
                &&
                (!filtres.niveau_sportif || filtres.niveau_sportif === "" || sujet.niveau_sportif === filtres.niveau_sportif)
            );
        })
        console.log(donneesFiltrees);
        setDonneesTriees(donneesFiltrees);
    }, [donneesAafficher, filtres]); // le useEffect s'actualise chaque fois que donneesAafficher ou filtres change

    // Fonction de tri appelée lorsqu'on clique sur l'intitulé de la colonne
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

        // console.log(donneesAafficher);
        // Met à jour les données triées, la colonne de tri et l'ordre de tri
        setDonneesTriees(nouvellesDonneesTriees);
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
                            {parametresAafficher.map((parametre) => {
                                // console.log('aa', typeof (resumeDonneesSujet.id), typeof (inputId));

                                return (
                                    <td key={parametre}>
                                        {parametre === "type_pratique"
                                            ? Capitalize(
                                                typesPratiqueRenommes[resumeDonneesSujet[parametre]]
                                            )
                                            : Capitalize(resumeDonneesSujet[parametre])}
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

export { TableauDonnees };