import { useState } from 'react';


const BoutonNormaliser = ({ onChange }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        if (onChange) {
            onChange(checked);
        }
    };
    return (
        <div>
            <input
                type="checkbox"
                id="boutonNormaliser"
                name="Normaliser les données"
                value="Normaliser les données"
                checked={isChecked}
                onChange={handleCheckboxChange}

            >
            </input>
            <label htmlFor="boutonNormalier"> Normaliser les données</label>
        </div>
    )

}

export { BoutonNormaliser }