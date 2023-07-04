import { getDonneesSujet, getResumeDonneesSujet, colonnesRenommees, parametresAafficher } from "../Utils";
import React from "react"
import donneesPoussees from '../../donnees_poussees.json'


function Tableau1Sujet({ inputId }) {
    const donneesSujet = getResumeDonneesSujet(donneesPoussees, inputId);
    // const headers = Object.keys(donneesSujet);
    // console.log('donnees a afficher', donneesSujet);
    // console.log('headers', headers);


    return (
        <table>
            <caption> Données du sujet {inputId} </caption>
            <thead>
                <tr>
                    {parametresAafficher.map((parametre) => (
                        <th key={parametre}>{colonnesRenommees[parametre] || parametre}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                <tr>
                    {parametresAafficher.map((parametre) => (
                        // { console.log(parametre) }
                        < td key={parametre} >
                            {donneesSujet[parametre]}
                        </td>
                    ))}

                </tr>

            </tbody>
        </table >
    );
}

export { Tableau1Sujet }