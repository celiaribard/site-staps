import { GraphePerf } from "./GraphePerf";

const GraphesPerf = ({ parametresAffiches, donnees, inputId }) => {

    return (
        parametresAffiches.map((parametre, index) => {
            return (
                <GraphePerf
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