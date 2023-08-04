import regression from 'regression';
import { Line, Scatter } from "react-chartjs-2"
import chroma from 'chroma-js';
import { ColorBar } from './ColorBar';

const getBackgroundColor = (charge, chargeMin, chargeMax) => {
    const gradientCouleurs = chroma.scale(['yellow', 'red']);
    console.log(charge);
    return gradientCouleurs((charge - chargeMin) / (chargeMax - chargeMin)).hex();
}


const ProfilForceVitesse = ({ donnees }) => {
    donnees = donnees.filter(donnee => donnee.dans_graphe === 1);
    const data = donnees.map(donnee => ({ x: donnee.vitesse_mean, y: donnee.force_mean_tot, z: donnee.pourcentage_masse_corporelle }))

    const listeCharges = donnees.map((point) => point.pourcentage_masse_corporelle);
    const chargeMin = Math.min(...listeCharges);
    const chargeMax = Math.max(...listeCharges);
    const listeCouleurs = donnees.map((point) => getBackgroundColor(point.pourcentage_masse_corporelle, chargeMin, chargeMax));
    console.log('l' + Math.min(...listeCharges));
    console.log('maxmin' + chargeMax, chargeMin);

    const data1 = [{ x: 0, y: 1 }, { x: 32, y: 67 }, { x: 12, y: 79 }];
    const result = regression.linear(data);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];

    const trendlineData = Array.from({ length: 100 }, (_, i) => {
        const x = i / 100;  // Scale i to be between 0 and 1
        return { x, y: gradient * x + yIntercept };
    });

    // console.log(trendlineData);

    const chartData = {
        datasets: [
            // {
            //     label: 'Data',
            //     data: [1, 10, 12, 15],
            // },
            {
                label: '',
                data: data,
                radius: 8,
                backgroundColor: listeCouleurs
            }
        ]
    };

    const options = {

        plugins: {
            tooltip: {
                bodyFont: {
                    size: 15,
                },
                callbacks: {
                    label: function (context) {
                        const currentItem = context.raw;
                        return [`Force: ${(currentItem.x).toFixed(2)}`, `Vitesse: ${currentItem.y.toFixed(2)}`, `Charge (% masse corporelle): ${currentItem.z}`];
                    }
                }
            },
            title: {
                display: false,
                text: 'Profil force vitesse',
                position: 'top',
                font: {
                    size: 16
                }
            },
            legend: {
                display: false
            }
        }
        ,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Vitesse moyenne',
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Force peak tot',
                    font: {
                        size: 16
                    }
                }
            }
        }
    };
    return (
        <div className="container-fluid">
            <div className="justify-content-center text-secondary fw-bold medium">
                <p>Profil force vitesse</p>
            </div>
            <div className="row">
                <div className="col-9">
                    <Scatter data={chartData} options={options} />
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                    <ColorBar chargeMin={chargeMin} chargeMax={chargeMax} listeCharges={listeCharges}></ColorBar>
                </div>

            </div>
        </div>
    )

}

export { ProfilForceVitesse }