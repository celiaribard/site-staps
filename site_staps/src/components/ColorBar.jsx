import React from 'react';

function ColorBar() {
    // Liste de labels et leurs positions en pourcentage
    const labels = [
        { value: '0%', position: '0%' },
        { value: '50%', position: '50%' },
        { value: '100%', position: '100%' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
                width: '20px',
                height: '200px',
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

export default ColorBar;
