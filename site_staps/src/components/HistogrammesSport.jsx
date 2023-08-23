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
    capitalize,
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
// pour un paramètre défini (puissance_max par ex), renvoie une liste d'objets sous la forme
// {
//     sport: "Football",
//     moyenne: 90,
//     listeValeurs: [85, 90, 95]
// } 
const getDonneesSports = (resumeDonneesSujets, listeSports, parametre) => {
    // console.log(listeSports, parametre)
    const donneesSport = [];
    // resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué.toLowerCase() === sport.toLowerCase());
    listeSports.map((sport) => {
        var currentDonnees = resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué.toLowerCase() === sport.toLowerCase());
        // console.log(currentDonnees);
        const listeValeurs = currentDonnees.map((donnees) => parseFloat(donnees[parametre].toFixed(2)));
        // console.log(typeof (listeValeurs[0]));
        const moyenne = (listeValeurs.reduce((total, nombre) => total + nombre, 0) / listeValeurs.length).toFixed(2);
        // console.log(moyenne);
        // console.log(sport, listeValeurs, moyenne);
        const currentDonneesSport = {};
        currentDonneesSport.sport = sport;
        currentDonneesSport.moyenne = moyenne;
        currentDonneesSport.listeValeurs = listeValeurs;
        donneesSport.push(currentDonneesSport);
    })
    // resumeDonneesSujets.map((donneesSujet) => console.log(donneesSujet.sport_pratiqué == sport))
    // console.log(resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué === sport));
    return donneesSport;
}

const HistogrammesSport = ({ resumeDonneesSujets, parametres, sports }) => {

    const donneesSport = getDonneesSports(resumeDonneesSujets, sports, "max_puissance_max");

    // console.log(resumeDonneesSujets);

    const listeSports = getListeSports(resumeDonneesSujets);
    // console.log(listeSports);

    const [selectedParam, setSelectedParam] = useState(parametres[0]);
    const [selectedData, setSelectedData] = useState(getDonneesSports(resumeDonneesSujets, sports, selectedParam));

    useEffect(() => {
        console.log(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
        setSelectedData(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
        // const donneesRecherchees = donneesSport.find(item => item.sport === sportRecherche && item.parametre === parametreRecherche);

    }, [selectedParam])
    console.log(getListeSports(resumeDonneesSujets).map((sport) => capitalize(sport)));

    const data = {
        labels: getListeSports(resumeDonneesSujets).map((sport) => capitalize(sport)),
        datasets: [
            {
                type: 'bar',
                label: colonnesRenommees[selectedParam] ? colonnesRenommees[selectedParam] : selectedParam,
                data: selectedData.map((data) => data.moyenne),
                // backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre]),
                // borderColor: backgroundDarkerColors[parametre],
                // borderWidth: 1,
            }
        ]
    };

    const options = {
        // indexAxis: 'y',
        // elements: {
        //     bar: {
        //         borderWidth: 2,
        //     },
        // },
        // responsive: true,
        // plugins: {
        //     legend: {
        //         position: 'right',
        //     },
        //     title: {
        //         display: true,
        //         text: 'Chart.js Horizontal Bar Chart',
        //     },
        // },
    };
    // console.log(selectedParam);
    // console.log(selectedData);

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
            <Bar data={data} options={options}></Bar>
        </div>
    )
}

export { HistogrammesSport }