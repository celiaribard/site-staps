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

    const donneesParam = donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre]))
    const average = donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length;

    const data = {
        labels: getListeId(donnees),
        datasets: [
            {
                type: 'line',
                label: 'Moyenne',
                backgroundColor: 'dark grey',
                borderColor: 'dark grey',
                borderWidth: 2,
                data: donnees.map(() => average),
                pointRadius: 0,
                clip: { left: 0, right: 0, top: false, bottom: false },
            },
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
        scales: {
        },
    }
    const elementId = `tableau-${parametre}`;
    return (
        <div id={elementId} >
            <Bar data={data} options={options}></Bar>
        </div >

    )
}

export { GraphePerf }