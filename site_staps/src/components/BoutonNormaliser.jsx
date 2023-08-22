import { useState } from 'react';


const BoutonNormaliser = ({ onChange }) => {

    return (
        <div>
            <input
                type="checkbox"
                id="boutonNormaliser"
                name="Normaliser les données"
                value="Normaliser les données"
                // checked={isChecked}
                onChange={onChange}

            >
            </input>
            <label htmlFor="boutonNormaliser"> &nbsp; Normaliser les données</label>
        </div>
    )

}

export { BoutonNormaliser }