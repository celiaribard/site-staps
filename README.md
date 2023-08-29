# Master Poussée

Les données proviennent d'un fichier JSON.
Pour convertir deuis un csv: https://csvjson.com/csv2json et modifier le nom des colonnes dans la fenêtre de gauche avec le texte suivant:
inutile;id;sexe;sport_pratiqué;niveau_sportif;type_pratique;taille;force_peak_tot;force_peak_droit;force_peak_gauche;force_mean_tot;vitesse_mean;ratio_force_efficace_tot;temps_pour_atteindre_force_max;temps_poussee;puissance_max;masse;masse_additionnelle;dans_graphe;pourcentage_masse_corporelle

/!\ manque une donnée sur la poussée 4 -> remplacer par:

4;1166;F;Cyclisme;National;En activité régulière (3h à 8h / semaine);160;1396.48505;703.26624;714.78748;780.7804653156159;0.2444335724579493;0.6284476675112002;0.9;1.504376;1119.6168735634733;52.0;57.0;1.0;110.0

App.jsx: page d'accueil. Les useState servent à stocker et modifier des variables qui sont amenées à être mises à jour (cette màj se fait uniquement avec la fonction set).

CheckBoxNormaliser: pour choisir de normaliser ou non les données des histogrammes verticaux
Filtres: le composant pour sélectionner des filtres pour le tableau avec tous les sujets. J'ai défini 3 filtres de base (sexe, sport, niveau) mais ça peut être modifié dans App

FormIdSujet: le champ dans la navbar pour saisir l'id d'un sujet et afficher ses données personnalisées. Quand un sujet est "connecté" ça ajoute l'affichage du tableau avec le détail de ses données, son profil force/vitesse et ça met en valeur ses données dans les histogrammes (point plus gros et noir dans l'histogramme horizontal, couleur plus foncée dans les verticaux)

GraphePerf: histogramme vertical avec les meilleures perf de chaque sujet (selon les filtres) sur un paramètre donné (puissance par ex).

GraphesPerf: rassemble tous les graphes de la liste de paramètres donnée

HistogrammesSport: l'histogramme de comparaison entre les sports. On peut choisir de comparer la puissance, force peak, vitesse et temps pour atteindre force max (la liste des paramètres est modifiable dans TraitementDonnees.js --> parametresAffichesBar)

ProfilForceVitesse: pas grand chose à détailler. J'ai fait un composant séparé pour la colorbar de la légende. Tu peux changer les couleurs du dégradé en modifiant COLOR1, COLOR2 et COLOR3

TableauAvecTri: sert pour le tableau avec le détail des poussées du sujet connecté et pour le grand tableau avec les résumés de chaque sujet. La liste des colonnes affichées est passée en paramètre de la foction(parametresAffiches)

TraitementDonnees.js: le fichier avec les calculs et les variables utiles pour l'affichage des textes, le tri etc.
