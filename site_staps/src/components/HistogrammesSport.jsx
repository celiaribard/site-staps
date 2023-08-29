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
        const listeValeursId = currentDonnees.map((donnees) => ({
            valeur: parseFloat(donnees[parametre].toFixed(2)),
            id: donnees.id
        }));
        const listeValeurs = listeValeursId.map(obj => obj.valeur);
        const moyenne = (listeValeurs.reduce((total, nombre) => total + nombre, 0) / listeValeurs.length).toFixed(2);
        const currentDonneesSport = {};
        currentDonneesSport.sport = sport;
        currentDonneesSport.moyenne = moyenne;
        currentDonneesSport.listeValeursId = listeValeursId;
        donneesSport.push(currentDonneesSport);
    })
    return donneesSport;
}

// pour générer la liste des points à afficher en plus des barres
function generateDatasets(donneesSport, inputId, selectedParam) {

    const datasets = [];
    for (let i = 0; i < donneesSport.length; i++) {
        const sportPoints = donneesSport[i].listeValeursId;

        for (let j = 0; j < sportPoints.length; j++) {
            const point = sportPoints[j];

            const dataset = {
                data: Array(donneesSport.length).fill(null),
                type: 'line',
                showLine: false,
                // point différent pour l'utilisateur "connecté"
                pointRadius: point.id.toString() === inputId ? 2 : 1.5,
                pointBackgroundColor: point.id.toString() === inputId ? 'black' : '#424242',
                pointBorderColor: point.id.toString() === inputId ? 'black' : '#424242',
                pointStyle: point.id.toString() === inputId ? 'circle' : 'crossRot'
            };
            dataset.data[i] = point.valeur;
            datasets.push(dataset);
        }
    }

    return datasets;
}

const HistogrammesSport = ({ resumeDonneesSujets, parametres, sports, inputId }) => {

    const listeSports = getListeSports(resumeDonneesSujets);

    const [selectedParam, setSelectedParam] = useState(parametres[0]);
    const [selectedData, setSelectedData] = useState(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
    const [datasets, setDatasets] = useState(generateDatasets(selectedData, inputId, selectedParam));

    useEffect(() => {
        setSelectedData(getDonneesSports(resumeDonneesSujets, sports, selectedParam));
    }, [selectedParam]);

    useEffect(() => {
        setDatasets(generateDatasets(selectedData, inputId, selectedParam));
    }, [selectedData, inputId]);

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
        <div id="histogramme-sports">
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