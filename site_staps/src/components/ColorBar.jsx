import React from 'react';

const ColorBar = ({ chargeMin, chargeMax, listeCharges, color1, color2, color3 }) => {
    // Liste de labels et leurs positions en pourcentage
    // const labels = [
    //     { value: chargeMin, position: '0%' },
    //     { value: chargeMax / 2, position: '27%' },
    //     { value: chargeMax, position: '27%' },
    // ];

    const labels = [listeCharges.map((charge) => {
        const position = `${(charge - chargeMin) / (chargeMax - chargeMin) * 100}%`;
        return { value: charge, position: position }
    })].flat()

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <h6> Charge (% masse corporelle)</h6>
            <hr />
            <div style={{
                width: '20px',
                height: '300px',
                background: `linear-gradient(to top, ${color1}, ${color2}, ${color3})`,
                border: '1px solid black',
                position: 'relative'
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
        </div >
    );
}

export { ColorBar }
