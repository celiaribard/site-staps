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

// #D45853 #95F257 #F7EA2F #FF7A26 #3874EB

const GraphePerf = ({ parametresAffiches, donnees }) => {
    const data = {
        labels: getListeId(donnees),
        datasets: parametresAffiches.map((parametre) => (
            {
                label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
                data: donnees.map((donneesSujet) => donneesSujet[parametre]),
                backgroundColor: '#2f6aae'
            }
        ))
        //         datasets: [
        //             {
        //                 label: 'Puissance max',
        //                 data: donnees.map((donneesSujet) => donneesSujet['puissance_max']),
        //             backgroundColor: '#2f6aae'
        //     },
        //     {
        //         label: 'Force peak tot',
        //         data: donnees.map((donneesSujet) => donneesSujet['force_peak_tot']),
        //             backgroundColor: '#FFBD27'
        //     },
        // ],
    }

    return (
        <div>
            <Bar data={data} ></Bar>
        </div>

    )
}

export { GraphePerf }