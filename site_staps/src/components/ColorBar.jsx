import React from 'react';

const ColorBar = ({ chargeMin, chargeMax, listeCharges }) => {
    // Liste de labels et leurs positions en pourcentage
    // const labels = [
    //     { value: chargeMin, position: '0%' },
    //     { value: chargeMax / 2, position: '50%' },
    //     { value: chargeMax, position: '100%' },
    // ];

    const labels = [listeCharges.map((charge) => {
        const position = `${(charge - chargeMin) / (chargeMax - chargeMin) * 100}%`;
        return { value: charge, position: position }
        //  `${(charge - chargeMin) / (chargeMax - chargeMin)}%`
    })]
    console.log(labels);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
                width: '20px',
                height: '300px',
                background: 'linear-gradient(to top, yellow, red)',
                border: '1px solid black',
                position: 'relative'  // Pour positionner les labels
            }}>
                {labels.map((label, index) => (
                    <div key={index} style={{
                        position: 'absolute',
                        bottom: label.position,
                        left: '100%',
                        marginLeft: '5px'
                    }}>
                        {label.value}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { ColorBar }
