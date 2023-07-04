
const colonnesRenommees = {
    id: 'ID',
    sexe: 'Sexe',
    sport_pratiqué: 'Sport pratiqué',
    niveau_sportif: 'Niveau',
    type_pratique: 'Type de pratique',
    taille: 'Taille',
    imc: 'IMC',
    max_puissance_max: 'Puissance max',
    max_temps_force_max: 'Temps pour atteindre la force max',
    max_vitesse_mean: 'Vitesse mean',
    max_force_peak_tot: 'Max force peak tot'
};

const parametresAafficher = ['id', 'sexe', 'sport_pratiqué', 'niveau_sportif', 'type_pratique', 'max_puissance_max', 'max_force_peak_tot', 'max_vitesse_mean', 'max_temps_force_max'];


const getDonneesSujet = (donneesPoussees, idSujet) => {
    var result = donneesPoussees.filter(poussee => poussee.id == idSujet);
    return result;
}

// renvoie le max d'une donnée d'un sujet
// par ex donnee = force_peak_tot ou puissance_max 
const getMax = (donneesPoussees, idSujet, donnee) => {
    const donneesSujet = donneesPoussees.filter(poussee => poussee.id == idSujet);
    const liste = donneesSujet.map((sujet => sujet[donnee]))
    const max = Math.max(...liste);
    return max
}

const getListeId = (donneesPoussees) => {
    const listeId = donneesPoussees.map((donnee) => donnee.id);
    const listeIdUniques = [...new Set(listeId)];
    return listeIdUniques;
}

// renvoie la moyenne d'une donnée d'un sujet
// par ex donnee = force_peak_tot ou puissance_max 
const getMoyenne = (donneesPoussees, idSujet, donnee) => {
    const donneesSujet = donneesPoussees.filter(poussee => poussee.id == idSujet);
    const liste = donneesSujet.map((sujet => sujet[donnee]))
    const somme = liste.reduce((total, nombre) => total + nombre, 0);
    const moyenne = somme / liste.length;
    return moyenne;
}

const getResumeDonneesSujet = (donneesPoussees, idSujet) => {
    const donneesSujet = getDonneesSujet(donneesPoussees, idSujet)
    var ligneSujet = donneesSujet[0];
    ligneSujet['max_puissance_max'] = parseFloat(getMax(donneesPoussees, idSujet, 'puissance_max')).toFixed(1);
    ligneSujet['max_force_peak_tot'] = parseFloat(getMax(donneesPoussees, idSujet, 'force_peak_tot')).toFixed(1);
    // max de la vitesse mean ?? pq pas plutot la moyenne?
    ligneSujet['max_vitesse_mean'] = parseFloat(getMax(donneesPoussees, idSujet, 'vitesse_mean')).toFixed(2);
    // plutot prendre le min ici ? Si on reste sur la logique d'afficher juste la meilleure perf
    ligneSujet['max_temps_force_max'] = parseFloat(getMax(donneesPoussees, idSujet, 'temps_pour_atteindre_force_max')).toFixed(2);
    delete ligneSujet['inutile'];
    // delete ligneSujet.id;
    delete ligneSujet.force_peak_droit;
    delete ligneSujet.force_peak_gauche;
    // delete ligneSujet.force_peak_tot;
    // delete ligneSujet.temps_pour_atteindre_force_max;
    delete ligneSujet.ratio_force_efficace_tot;
    delete ligneSujet.temps_poussee;
    // delete ligneSujet.puissance_max;
    delete ligneSujet.masse_additionnelle;
    delete ligneSujet.force_mean_tot;
    // delete ligneSujet.vitesse_mean;
    delete ligneSujet.dans_graphe;
    delete ligneSujet.masse;
    delete ligneSujet.pourcentage_masse_corporelle;
    // console.log('max puiss', ligneSujet.max_puissance_max);
    
    return ligneSujet; 
}

export { getResumeDonneesSujet, getDonneesSujet, getMax, getMoyenne, getListeId, colonnesRenommees, parametresAafficher }