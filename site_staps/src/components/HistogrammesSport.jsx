import { Bar } from "react-chartjs-2"
import React, { useState, useEffect } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
    PointElement,
} from 'chart.js';

import {
    getListeId,
    colonnesRenommees,
    backgroundColors,
    backgroundDarkerColors,
    unites,
    getListeSports
} from "../TraitementDonnees";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
);


// prend en entrée les données resumées de tous les sujets
// calcule pour un sport donné la moyenne d'un paramètre donné (ex moyenne des puissance_max du rugby)
// renvoie la moyenne ainsi que la liste des valeurs (pour les points sur l'histogramme)
const getMoyenneSport = (resumeDonneesSujets, sport, parametre) => {
    const donneesSport = resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué.toLowerCase() === sport.toLowerCase());
    // resumeDonneesSujets.map((donneesSujet) => console.log(donneesSujet.sport_pratiqué == sport))
    // console.log(resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué === sport));
    return donneesSport;
}


const HistogrammesSport = ({ resumeDonneesSujets, parametres }) => {

    const listeSports = getListeSports(resumeDonneesSujets);
    console.log(listeSports);

    const [selectedParam, setSelectedParam] = useState(parametres[0]);
    const [selectedData, setSelectedData] = useState(resumeDonneesSujets);

    console.log(getMoyenneSport(resumeDonneesSujets, 'rugby', parametres[0]))

    useEffect(() => {
        const donneesSport = resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué.toLowerCase() === sport.toLowerCase());

    }, [selectedParam])

    const data = {
        labels: getListeSports(resumeDonneesSujets),
        datasets: [
            {
                type: 'bar',
                label: colonnesRenommees[selectedParam] ? colonnesRenommees[selectedParam] : selectedParam,
                data: selectedData,
                // backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre]),
                // borderColor: backgroundDarkerColors[parametre],
                // borderWidth: 1,
            }
        ]
    };

    const options = {};
    console.log(selectedParam);
    console.log(selectedData);

    return (
        <div>
            <label>
                Paramètre: &nbsp;
                <select
                    value={selectedParam}
                    onChange={e => setSelectedParam(e.target.value)}
                >
                    {parametres.map(param => (
                        <option key={param} value={param}>
                            {colonnesRenommees[param] ? colonnesRenommees[param] : param}
                        </option>
                    ))}
                </select>
            </label>

            <p>aaaa</p>
            {/* <Bar data={data} options={options}></Bar> */}
        </div>
    )
}

export { HistogrammesSport }