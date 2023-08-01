import regression from 'regression';
import { Line, Scatter } from "react-chartjs-2"


const ProfilForceVitesse = ({ donnees }) => {
    donnees = donnees.filter(donnee => donnee.dans_graphe === 1);
    const data = donnees.map(donnee => ({ x: donnee.vitesse_mean, y: donnee.force_mean_tot }))
    console.log(donnees.map(donnee => donnee.dans_graphe));
    console.log(data);

    // const data = [[0, 1], [32, 67], [12, 79]];
    const data1 = [{ x: 0, y: 1 }, { x: 32, y: 67 }, { x: 12, y: 79 }];
    const result = regression.linear(data);
    const gradient = result.equation[0];
    const yIntercept = result.equation[1];

    const trendlineData = Array.from({ length: 100 }, (_, i) => {
        const x = i / 100;  // Scale i to be between 0 and 1
        return { x, y: gradient * x + yIntercept };
    });

    console.log(trendlineData);

    const chartData = {
        datasets: [
            // {
            //     label: 'Data',
            //     data: [1, 10, 12, 15],
            //     // ...other dataset properties...
            // },
            {
                label: 'Trendline',
                data: data,
                // ...other dataset properties...
            }
        ]
    };
    return (
        <Scatter data={chartData} />
    )

}

export { ProfilForceVitesse }