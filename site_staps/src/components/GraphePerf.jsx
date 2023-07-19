import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    getListeId,
    colonnesRenommees
} from "../TraitementDonnees";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// https://color.adobe.com/fr/create/color-wheel 
// rouge foncé #D45853   vert clair #95F257   jaune #F7EA2F   orange #FFA126     bleu un peu foncé #3874EB       #2f6aae
const backgroundColors = {
    max_puissance_max: 'red',
    min_temps_force_max: '#95F257',
    max_vitesse_mean: '#FFA126',
    max_force_peak_tot: '#3874EB',
}

// const backgroundColors = ['red', 'blue', 'green']

const GraphePerf = ({ parametresAffiches, donnees, inputId }) => {
    const data = {
        labels: getListeId(donnees),
        datasets: parametresAffiches.map((parametre) => {
            return {
                label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
                data: donnees.map((donneesSujet) => donneesSujet[parametre]),
                backgroundColor: donnees.map((donneesSujet) => inputId.toString() === donneesSujet.id.toString() ? 'black' : backgroundColors[parametre])

            }
        })
    }

    return (
        <div>
            <Bar data={data} ></Bar>
        </div>

    )
}

export { GraphePerf }