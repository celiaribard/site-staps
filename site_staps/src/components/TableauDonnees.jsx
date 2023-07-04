import { getDonneesSujet, getResumeDonneesSujet, colonnesRenommees, getListeId, parametresAafficher } from "../Utils";
import React from "react"
import donneesPoussees from '../../donnees_poussees.json'

function TableauDonnees() {
    const listeId = getListeId(donneesPoussees);
    // console.log('donnees a afficher', donneesSujet);
    // console.log('headers', headers);

    // console.log('key', keys);

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
                {listeId && listeId.map((idSujet) => {
                    const donneesSujet = getResumeDonneesSujet(donneesPoussees, idSujet);
                    // console.log('donnees', donneesSujet);
                    const headers = Object.keys(donneesSujet);
                    // console.log('headers', headers)
                    return (
                        <tr>
                            {parametresAafficher.map((parametre) => (
                                // { console.log(parametre) }
                                < td key={parametre} >
                                    {donneesSujet[parametre]}
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