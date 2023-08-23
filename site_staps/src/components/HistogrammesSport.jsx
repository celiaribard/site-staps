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

    const donneesSport = [];
    listeSports.map((sport) => {
        var currentDonnees = resumeDonneesSujets.filter(donneesSujet => donneesSujet.sport_pratiqué.toLowerCase() === sport.toLowerCase());
        const listeValeurs = currentDonnees.map((donnees) => parseFloat(donnees[parametre].toFixed(2)));
        const moyenne = (listeValeurs.reduce((total, nombre) => total + nombre, 0) / listeValeurs.length).toFixed(2);
        const currentDonneesSport = {};
        currentDonneesSport.sport = sport;
        currentDonneesSport.moyenne = moyenne;
        currentDonneesSport.listeValeurs = listeValeurs;
        donneesSport.push(currentDonneesSport);
    })
    return donneesSport;
}

function generateDatasets(donneesSport) {
    const datasets = [];
    for (let i = 0; i < donneesSport.length; i++) {
        const sportPoints = donneesSport[i].listeValeurs;
        for (let j = 0; j < sportPoints.length; j++) {
            const point = sportPoints[j];
            const dataset = {
                data: Array(donneesSport.length).fill(null),  // Initialise un tableau avec des 'null' pour tous les sports
                type: 'line',
                showLine: false,
                pointRadius: 2,
                pointBackgroundColor: 'black',
                pointBorderColor: 'black',

            };
            dataset.data[i] = point;  // Affectez le point à l'index correspondant au sport
            datasets.push(dataset);
        }
    }

    return datasets;
}

const HistogrammesSport = ({ resumeDonneesSujets, parametres, sports }) => {

    // const donneesSport = getDonneesSports(resumeDonneesSujets, sports, "max_puissance_max");

    // console.log(resumeDonneesSujets);

    const listeSports = getListeSports(resumeDonneesSujets);
    // console.log(listeSports);

    const [selectedParam, setSelectedParam] = useState(parametres[0]);
    const [selectedData, setSelectedData] = useState(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
    const [datasets, setDatasets] = useState(generateDatasets(selectedData));

    useEffect(() => {
        console.log(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
        setSelectedData(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
        setDatasets(generateDatasets(selectedData));
    }, [selectedParam])

    console.log(datasets);

    const data = {
        labels: selectedData.map((data) => capitalize(data.sport)),
        datasets: [

            ...datasets,
            {
                type: 'bar',
                label: colonnesRenommees[selectedParam] ? colonnesRenommees[selectedParam] : selectedParam,
                data: selectedData.map((data) => data.moyenne),
                backgroundColor: backgroundColors[selectedParam],
                borderColor: backgroundColors[selectedParam],
            },
            // {
            //     type: 'line',
            //     data: [1000, 2000, 1500],
            //     showLine: false
            // },
            // {
            //     type: 'line',
            //     data: [500, null, 1900],
            //     showLine: false
            // }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: unites[selectedParam] ? `${colonnesRenommees[selectedParam]} (${unites[selectedParam]})` : colonnesRenommees[selectedParam],
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Sports",
                    font: {
                        size: 16
                    }
                }
            }
        },
        indexAxis: 'y',
        plugins: {
            // title: {
            //     display: true,
            //     text: "Histogramme de comparaison des sports",
            //     position: 'top',
            //     font: {
            //         size: 16
            //     }
            // },
            legend: {
                display: false
            }
        }
    };

    return (
        <div>
            <h2 className="chart-title">
                Histogramme de comparaison des sports
            </h2>
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
            <Bar data={data} options={options}></Bar>
        </div>
    )
}

export { HistogrammesSport }