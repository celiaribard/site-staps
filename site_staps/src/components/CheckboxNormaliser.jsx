import { useState } from 'react';


const CheckboxNormaliser = ({ onChange }) => {

    return (
        <div>
            <input
                type="checkbox"
                id="checkboxNormaliser"
                name="Normaliser les données"
                value="Normaliser les données"
                // checked={isChecked}
                onChange={onChange}

            >
            </input>
            <label htmlFor="checkboxNormaliser"> &nbsp; Normaliser les données</label>
        </div>
    )

}

export { CheckboxNormaliser }