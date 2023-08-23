import regression from 'regression';
import { Line, Scatter } from "react-chartjs-2"
import chroma from 'chroma-js';
import { ColorBar } from './ColorBar';

const COLOR1 = 'lightgreen';
const COLOR2 = 'yellow';
const COLOR3 = 'red';

// génère la couleur des points en fonction de la charge poussée (sur un dégradé allant de COLOR1 à COLOR2)
const getBackgroundColor = (charge, chargeMin, chargeMax) => {
    const gradientCouleurs = chroma.scale([COLOR1, COLOR2, COLOR3]);
    return gradientCouleurs((charge - chargeMin) / (chargeMax - chargeMin)).hex();
}

// les données sont celles d'un sujet
const ProfilForceVitesse = ({ donnees }) => {
    // on n'affiche que certaines données
    donnees = donnees.filter(donnee => donnee.dans_graphe === 1);

    const data = donnees.map(donnee => ({ x: donnee.vitesse_mean, y: donnee.force_mean_tot, z: donnee.pourcentage_masse_corporelle }))

    // trucs utiles pour le dégradé de couleur:
    const listeCharges = donnees.map((point) => point.pourcentage_masse_corporelle);
    const chargeMin = Math.min(...listeCharges);
    const chargeMax = Math.max(...listeCharges);
    const listeCouleurs = donnees.map((point) => getBackgroundColor(point.pourcentage_masse_corporelle, chargeMin, chargeMax));

    const regressionData = donnees.map(donnee => [donnee.vitesse_mean, donnee.force_mean_tot]);

    const result = regression.linear(regressionData);
    const pente = result.equation[0];
    const ordonneeOrigine = result.equation[1]; // =F0
    const V0 = (- ordonneeOrigine / pente).toFixed(2);

    const droiteRegression = donnees.map(donnee => {
        const x = donnee.vitesse_mean;
        const y = pente * x + ordonneeOrigine;
        return { x, y };
    });


    const chartData = {
        datasets: [
            {
                type: 'line',
                label: `Régression linéaire:    F0 = ${ordonneeOrigine} N     V0 = ${V0} m/s`,
                data: droiteRegression,
                backgroundColor: 'black',
                borderColor: 'black',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
            },
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
                text: 'Profil force vitesse',
                position: 'top',
                font: {
                    size: 16
                }
            },
            legend: {
                labels: {
                    filter: function (item, chart) {
                        return item.datasetIndex === 0;  // pour n'afficher que la légende de la ligne et pas des points
                    },
                },
                display: true
            }
        }
        ,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Vitesse moyenne (m/s)',
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Force peak tot (N)',
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
                    <ColorBar chargeMin={chargeMin} chargeMax={chargeMax} listeCharges={listeCharges} color1={COLOR1} color2={COLOR2} color3={COLOR3}></ColorBar>
                </div>

            </div>
        </div>
    )

}

export { ProfilForceVitesse }