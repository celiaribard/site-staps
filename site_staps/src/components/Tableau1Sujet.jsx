import { getDonneesSujet, getResumeDonneesSujet, colonnesRenommees, parametresAafficher2 } from "../TraitementDonnees";
import React from "react"
import donneesPoussees from '../../donnees_poussees.json'


function Tableau1Sujet({ inputId }) {
    // const donneesSujet = getResumeDonneesSujet(donneesPoussees, inputId);
    const donneesSujet = getDonneesSujet(donneesPoussees, inputId);
    // const headers = Object.keys(donneesSujet);
    // console.log('donnees a afficher', donneesSujet);
    // console.log('headers', headers);

    return (
        <table>
            <caption> Données du sujet {inputId} </caption>
            <thead>
                <tr>
                    {parametresAafficher2.map((parametre) => (
                        <th key={parametre}>{colonnesRenommees[parametre] || parametre}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {donneesSujet.map((donnees1Sujet, index) => {
                    return (
                        <tr>
                            {parametresAafficher2.map((parametre) => (
                                // { console.log(parametre) }
                                < td key={parametre} >
                                    {donnees1Sujet[parametre]}
                                </td>
                            ))}

                        </tr>
                    )
                })}


            </tbody>
        </table >
    );
}

export { Tableau1Sujet }