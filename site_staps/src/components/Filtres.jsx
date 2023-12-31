import { capitalize } from "../TraitementDonnees";

const Filtres = ({ filtres, handleChangeFiltre, listeNiveaux, listeSports }) => {
    return (
        <div>
            <label>
                Genre: &nbsp;
                <select
                    name="sexe"
                    value={filtres.sexe}
                    onChange={handleChangeFiltre}
                >
                    <option value="">Tous</option>
                    <option value="F">Féminin</option>
                    <option value="M">Masculin</option>
                </select>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
                Sport pratiqué: &nbsp;
                <select
                    name="sport_pratiqué"
                    value={filtres.sport_pratiqué}
                    onChange={handleChangeFiltre}
                >
                    <option value="">Tous</option>
                    {listeSports.map((sport) => (
                        <option
                            key={sport}
                            value={sport}
                            onChange={handleChangeFiltre}>{capitalize(sport)}
                        </option>
                    ))}
                </select>
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
                Niveau : &nbsp;
                <select
                    name="niveau_sportif"
                    value={filtres.niveau_sportif}
                    onChange={handleChangeFiltre}
                >
                    <option value="">Tous</option>
                    {listeNiveaux.map((niveau) => (
                        <option
                            key={niveau}
                            value={niveau}
                            onChange={handleChangeFiltre}>{capitalize(niveau)}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export { Filtres };