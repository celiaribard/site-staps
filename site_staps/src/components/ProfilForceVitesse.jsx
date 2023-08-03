import regression from 'regression';
import { Line, Scatter } from "react-chartjs-2"
import chroma from 'chroma-js';

const getBackgroundColor = (charge) => {
    const gradientCouleurs = chroma.scale(['yellow', 'red']);
    console.log(charge);
    return gradientCouleurs(charge / 110).hex();
}


const ProfilForceVitesse = ({ donnees }) => {
    donnees = donnees.filter(donnee => donnee.dans_graphe === 1);
    const data = donnees.map(donnee => ({ x: donnee.vitesse_mean, y: donnee.force_mean_tot }))

    console.log(data);

    data.map((point) => {
        console.log(point);
        return (getBackgroundColor(point.pourcentage_masse_corporelle))
    })


    const listeCouleurs = donnees.map((point) => getBackgroundColor(point.pourcentage_masse_corporelle));
    console.log('aa' + listeCouleurs);

    // const data = [[0, 1], [32, 67], [12, 79]];
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
                label: 'Bonne question',
                data: data,
                radius: 8,
                backgroundColor: listeCouleurs
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Profil force vitesse',
                position: 'top',
                font: {
                    size: 16
                }
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
        <Scatter data={chartData} options={options} />
    )

}

export { ProfilForceVitesse }