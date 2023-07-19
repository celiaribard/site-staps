import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    BarController,
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
    Legend,
    LineController,
    BarController,
);



// const backgroundColors = ['red', 'blue', 'green']


const GraphePerf = ({ parametre, donnees, inputId }) => {
    const donneesParam = donnees.map((donneesSujet) => parseFloat(donneesSujet[parametre]))
    const average = donneesParam.reduce((sum, donneeParam) => sum + donneeParam, 0) / donneesParam.length;
    const annotation1 = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 5,
        click: function ({ chart, element }) {
            console.log('Line annotation clicked');
        },
        label: {
            backgroundColor: 'red',
            content: 'Test Label',
            enabled: true
        },
        scaleID: 'y',
        value: average
    };
    const annotation = {
        type: 'line',
        borderColor: 'black',
        borderWidth: 3,
        scaleID: 'y',
        value: 50
    };

    const options = {
        plugins: {
            annotation: {
                annotations: {
                    // Ligne pour représenter la moyenne des données
                    // type: 'line',
                    // borderDash: [5, 5], // Style de trait
                    // borderColor: 'red',
                    // borderWidth: 2, // Epaisseur
                    // value: average, // Valeur de la ligne (moyenne des données)
                    // label: {
                    //     display: true,
                    //     content: 'Moyenne',
                    //     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Couleur de fond du label
                    //     font: {
                    //         size: 12, // Taille de police du label
                    //     },
                    // },
                },
                annotation1,
                annotation,
            },
        },
    };

    const data = {
        labels: getListeId(donnees),
        datasets: [{
            type: 'bar',
            label: colonnesRenommees[parametre] ? colonnesRenommees[parametre] : parametre,
            data: donnees.map((donneesSujet) => donneesSujet[parametre]),
            backgroundColor: donnees.map((donneesSujet) => inputId && inputId.toString() === donneesSujet.id.toString() ? backgroundDarkerColors[parametre] : backgroundColors[parametre])
        },
        {
            // type: 'line',
            label: 'aa',
            // borderDash: [5, 5],
            data: donnees.map(() => average),
        }
        ]
    }

    // mettre tous les paramètres sur le même graphe:
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
            <Bar data={data} options={options}></Bar>
        </div >

    )
}

export { GraphePerf }