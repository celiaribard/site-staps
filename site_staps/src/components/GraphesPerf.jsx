import { GraphePerf } from "./GraphePerf";


// permet d'afficher chaque graphique (pour chaque parametre de la liste parametresAffiches, par exemple puissance max et force peak tot)
// l'inputId sert car on affiche toujours les data du sujet connecté (même s'il ne correspond pas aux filtres) pour qu'il puisse se comparer
const GraphesPerf = ({ parametresAffiches, donnees, inputId, isCheckedNormaliser }) => {

    return (
        parametresAffiches.map((parametre, index) => {
            return (
                <GraphePerf
                    isCheckedNormaliser={isCheckedNormaliser}
                    key={index}
                    parametre={parametre}
                    donnees={donnees}
                    inputId={inputId}
                />
            )
        })
    )
}

export { GraphesPerf }