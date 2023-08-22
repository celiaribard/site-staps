import { Bar } from "react-chartjs-2"
import { useState, useEffect } from "react";

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
    unites
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
    // ChartjsPluginSorting
);


const GraphePerf = ({ parametre, donnees, inputId, isCheckedNormaliser }) => {

    const [donneesParam, setDonneesParam] = useState(donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre])));
    const [average, setAverage] = useState(donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length);
    // const donneesParam = isCheckedNormaliser ? donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre]) / donneesSujet.masse) : donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre]));// on ne garde que les données correspondant au paramètre à afficher (puissance max par ex)

    // const average = donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length; // pour afficher la ligne de moyenne sur le graphique

    useEffect(() => {
        // console.log("mtn", isCheckedNormaliser);
        setDonneesParam(isCheckedNormaliser ? donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre]) / donneesSujet.masse) : donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre])));
    }, [isCheckedNormaliser])

    useEffect(() => {
        setAverage(donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length);
    }, [donneesParam])

    const [isAscending, setIsAscending] = useState(true);
    const [sortedData, setSortedData] = useState(donneesParam);

    // console.log(donnees, 'a', donneesParam);
    useEffect(() => {
        setSortedData(
            [...donneesParam].sort((a, b) => {
                // console.log(a[parametre], b[parametre])
                if (!isNaN(a) && !isNaN(b)) {
                    a = parseFloat(a);
                    b = parseFloat(b);
                }
                if (a < b) {
                    return isAscending ? -1 : 1;
                }
                if (a > b) {
                    return isAscending ? 1 : -1;
                }
                return 0;
            })
        );
    }, [donneesParam, isAscending]);

    console.log(sortedData);

    // définition des données du graphique:
    const data = {
        labels: getListeId(donnees),
        datasets: [
            // 2 datasets à tracer: 
            // la ligne représentant la moyenne
            {
                type: 'line',
                label: `Moyenne = ${average.toFixed(2)}`,
                backgroundColor: 'dark grey',
                borderColor: 'dark grey',
                borderWidth: 2,
                data: donnees.map(() => average),
                pointRadius: 0,
                clip: { left: 0, right: 0, top: false, bottom: false },
            },

            // et les barres correspondant à chaque sujet
            {
                type: 'bar',
                label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
                data: sortedData,
                backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre]),
                borderColor: backgroundDarkerColors[parametre],
                borderWidth: 1,
            }
        ]
    }


    // tentative pour faire une ligne de moyenne allant de gauche à droite du graph mais marche pas
    // const averageLine = {
    //     id: 'averageLine',
    //     afterDatasetsDraw: (chart, args, pluginOptions) => {
    //         const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.moveTo(left, bottom);
    //         ctx.lineTo(right, top); // y.getPixelForValue(1000)
    //     }
    // }
    const titleY = unites[parametre] ? `${colonnesRenommees[parametre]} (${unites[parametre]})` : colonnesRenommees[parametre];

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'ID sujet',
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: unites[parametre] ? `${colonnesRenommees[parametre]} (${unites[parametre]})` : colonnesRenommees[parametre],
                    font: {
                        size: 16
                    }
                }
            }
        },
        plugins: {
            // plugin: [averageLine],
            title: {
                display: true,
                text: `Graphe: ${colonnesRenommees[parametre]}`,
                position: 'top',
                font: {
                    size: 16
                }
            },
            legend: {
                onClick: (event, legendItem, legend) => {
                    setIsAscending(!isAscending); // Inverse l'ordre de tri à chaque clic
                }
            }
        }
    }

    // const config = {
    //     plugins: [averageLine]
    // }

    const elementId = `tableau-${parametre}`; // il faut un id unique pour chaque div

    return (
        <div id={elementId} className="pt-5">
            {/* <br /> <br /> <br /> */}
            <Bar data={data} options={options} ></Bar>
        </div >

    )
}

export { GraphePerf }