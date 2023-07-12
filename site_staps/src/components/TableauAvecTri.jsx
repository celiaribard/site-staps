
import icone_up from "../images/up_arrow1.png";
import icone_down from "../images/down_arrow1.png";
import icone_default from "../images/default1.png";

const TableauAvecTri = (parametresAafficher) => {


    return (
        <table>
            <caption> Toutes les données </caption>
            <thead>
                <tr>
                    {parametresAafficher.map((parametre) => (
                        <th key={parametre} onClick={() => handleTriColonne(parametre)}>
                            {colonnesRenommees[parametre] || parametre}
                            &nbsp;
                            {
                                <img
                                    className="iconeTri"
                                    src={
                                        triColonne === parametre && triOrdre === "asc"
                                            ? icone_up
                                            : triColonne === parametre && triOrdre === "desc"
                                                ? icone_down
                                                : icone_default
                                    }
                                />
                            }
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {donneesTriees.map((resumeDonneesSujet, index) => {
                    return (
                        <tr
                            key={index}
                            className={
                                inputId &&
                                    parseFloat(resumeDonneesSujet.id) === parseFloat(inputId)
                                    ? "ligneGrisee"
                                    : ""
                            }
                        >
                            {parametresAafficher.map((parametre) => {
                                // console.log('aa', typeof (resumeDonneesSujet.id), typeof (inputId));

                                return (
                                    <td key={parametre}>
                                        {parametre === "type_pratique"
                                            ? Capitalize(
                                                typesPratiqueRenommes[resumeDonneesSujet[parametre]]
                                            )
                                            : Capitalize(resumeDonneesSujet[parametre])}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export { TableauAvecTri }