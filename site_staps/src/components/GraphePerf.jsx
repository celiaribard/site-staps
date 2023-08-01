import { Bar } from "react-chartjs-2"
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
    backgroundDarkerColors
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

const GraphePerf = ({ parametre, donnees, inputId }) => {

    const donneesParam = donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre])) // on ne garde que les données correspondant au paramètre à afficher (puissance max par ex)
    const average = donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length; // pour afficher la ligne de moyenne sur le graphique

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
                data: donnees.map((donneesSujet) => donneesSujet[parametre]),
                backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre]),
                borderColor: backgroundDarkerColors[parametre],
                borderWidth: 1,
            }
        ]
    }

    const options = {
        // responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Graphe: ${colonnesRenommees[parametre]}`,
                position: 'top',
                fontSize: 40,
            }
        }
    }

    const elementId = `tableau-${parametre}`; // il faut un id unique pour chaque div

    return (
        <div id={elementId} className="pt-5">
            {/* <br /> <br /> <br /> */}
            <Bar data={data} options={options}></Bar>
        </div >

    )
}

export { GraphePerf }