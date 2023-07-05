import { getDonneesSujet, getResumesDonneesSujets, getResumeDonneesSujet, colonnesRenommees, getListeId, parametresAafficher } from "../TraitementDonnees";
import React from "react"
import donneesPoussees from '../../donnees_poussees.json'

function TableauDonnees() {
    const listeId = getListeId(donneesPoussees);
    const resumeDonneesSujets = getResumesDonneesSujets(donneesPoussees);
    // console.log('donnees a afficher', donneesSujet);

    return (
        <table>
            <caption> Toutes les données </caption>
            <thead>
                <tr>
                    {parametresAafficher.map((parametre) => (
                        <th key={parametre}>{colonnesRenommees[parametre] || parametre}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {resumeDonneesSujets && resumeDonneesSujets.map((resumeDonneesSujet) => {
                    return (
                        <tr>
                            {parametresAafficher.map((parametre, index) => (
                                // { console.log(parametre) }
                                < td key={index} >
                                    {resumeDonneesSujet[parametre]}
                                </td>
                            ))}
                        </tr>
                    )



                }
                )}

            </tbody>
        </table >
    );
}

export { TableauDonnees }