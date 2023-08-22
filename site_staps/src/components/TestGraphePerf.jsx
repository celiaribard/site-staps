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
    ChartjsPluginSorting
);

const TestGraphePerf = ({ parametre, donnees, inputId, isCheckedNormaliser }) => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Weekly Sales',
            data: [18, 12, 6, 9, 12, 3, 9],
            backgroundColor: [
                'rgba(255, 26, 104, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
                'rgba(255, 26, 104, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(0, 0, 0, 1)'
            ],
            borderWidth: 1
        }]
    };
    const options = {
        // scales: {
        //     y: {
        //         beginAtZero: true
        //     },
        // },
        plugins: {
            sorting: {
                asc: {
                    button: {
                        display: 'false'
                    }
                }
            }
        }
    };

    return (
        <div className="pt-5" >
            {/* <br /> <br /> <br /> */}
            < Bar data={data} options={options} ></Bar>
        </div >

    )
}

export { TestGraphePerf }