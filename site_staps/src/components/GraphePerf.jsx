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
    colonnesRenommees,
    backgroundColors,
    backgroundDarkerColors
} from "../TraitementDonnees";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



// const backgroundColors = ['red', 'blue', 'green']


const GraphePerf = ({ parametre, donnees, inputId }) => {

    const options = {
        plugins: {
            legend: {
                // fillStyle: 'green',
                // fontColor: 'blue',

                generateLabels: (chart) => {
                    const original = chart.legend._generateLabels; // Sauvegarde de la fonction originale

                    // Modification de la couleur de remplissage pour chaque élément de la légende
                    chart.legend._generateLabels = () => {
                        const labels = original.call(chart);
                        labels.forEach((label) => {
                            label.fillStyle = 'blue';
                        });
                        return labels;
                    };
                    return chart.legend._generateLabels();
                },
            },
        },
    };

    const data = {
        labels: getListeId(donnees),
        datasets: [{
            label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
            data: donnees.map((donneesSujet) => donneesSujet[parametre]),
            backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre])
        }]
    }
    // const data = {
    //     labels: getListeId(donnees),
    //     datasets: parametresAffiches.map((parametre) => {
    //         return {
    //             label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
    //             data: donnees.map((donneesSujet) => donneesSujet[parametre]),
    //             backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? 'black' : backgroundColors[parametre])

    //         }
    //     })
    // }

    return (
        <div>
            <Bar data={data} options={options} ></Bar>
        </div>

    )
}

export { GraphePerf }