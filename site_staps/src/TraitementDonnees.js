
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

const typesPratiqueRenommes = {
    "A la reprise d'activité sportive sans restriction": "Reprise d'activité sans restriction",
    "A la reprise de la préparation physique + réeducation": "Reprise prépa physique + rééducation",
    "En activité intensive (>8h / semaine)": "Intensive (>8h / semaine)",
    "En activité récréative (<2h / semaine)": "Récréative (<2h / semaine) ",
    "En activité régulière (3h à 8h / semaine)": "Régulière (3h à 8h / semaine)",
    "En activité sédentaire (<1h / semaine)": "Sédentaire (<1h / semaine)",
    "En activité élite (>8h / semaine et compétition internationale)": "Elite (>8h / semaine + compétition internationale)"
}

const typesPratiqueTri = {    
    "A la reprise d'activité sportive sans restriction": 2,
    "A la reprise de la préparation physique + réeducation": 1,
    "En activité intensive (>8h / semaine)": 6,
    "En activité récréative (<2h / semaine)": 4,
    "En activité régulière (3h à 8h / semaine)": 5,
    "En activité sédentaire (<1h / semaine)": 3,
    "En activité élite (>8h / semaine et compétition internationale)": 7
}

const niveauTri = {
    "District": 1,
    "Départemental": 2,
    "Régional": 3,
    "National": 4 
}

// Les paramètres affichés dans le tableau sont modifiables ici
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

// renvoie une liste avec tous les id
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
    
    return ligneSujet; 
}

const getResumesDonneesSujets = (donneesPoussees) => {
    const listeIdUniques = getListeId(donneesPoussees);
    var resumesDonnneesSujets = [];
    var donneesSujet =[]
    listeIdUniques.map((idSujet) => {
        donneesSujet = getResumeDonneesSujet(donneesPoussees, idSujet);
        resumesDonnneesSujets.push(donneesSujet);
    })
    return resumesDonnneesSujets;
}

export { getResumeDonneesSujet, getDonneesSujet, getMax, getMoyenne, getListeId, getResumesDonneesSujets, colonnesRenommees, parametresAafficher, typesPratiqueRenommes, typesPratiqueTri, niveauTri }