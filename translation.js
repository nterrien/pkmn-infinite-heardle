var artist = "Pokémon";
const languages = ["en", "fr"];

// Name of the file used for the flag
const flags = {
  fr: "./flags/fr.png",
  en: "./flags/en.png",
};
// Alt text for accessibility
const flagsAlt = {
  fr: {
    en: "French Flag",
    fr: "Drapeau français",
  },
  en: {
    en: "US Flag",
    fr: "Drapeau État-Unis",
  },
};
// Tags
var tagsT = {
  Battles: {
    en: "Battles",
    fr: "Combats",
  },
  Buildings: {
    en: "Buildings",
    fr: "Bâtiments",
  },
  Characters: {
    en: "Character Themes",
    fr: "Thèmes de personnage",
  },
  Cities: {
    en: "Cities",
    fr: "Villes",
  },
  Encounters: {
    en: "Encounters",
    fr: "Rencontres",
  },
  Menu: {
    en: "Menu",
    fr: "Menu",
  },
  "Mini Games": {
    en: "Minigames",
    fr: "Mini-Jeux",
  },
  "Outdoor Location": {
    en: "Outdoor Location",
    fr: "Lieux extérieurs",
  },
  "Repetable Events": {
    en: "Repetable Events",
    fr: "Évenements répétable",
  },
  "Story Events": {
    en: "Story Events",
    fr: "Évenements d'histoire",
  },
  Victories: {
    en: "Victories",
    fr: "Victoires",
  },
};
//// About popup
const aboutT = { fr: "A propos", en: "About" };
const aboutPopupT = {
  fr:
    '<p class="mb-3">Un clone de <a href="https://www.heardle.app/" title="Heardle">Heardle</a>, et du <a href="https://heardle-kpop.glitch.me/" title="K-Pop Heardle">K-Pop Heardle</a> qui peut être joué à l\'infini et avec les musiques de ' +
    artist +
    '. Basé sur le code de <a href="https://joywave-heardle.glitch.me/" title="Joywave Heardle">Joywave Heardle</a> et sur les musiques du <a href="https://pkmn-heardle.glitch.me/" title="Pokémon Heardle">Pokémon Heardle</a> de <a href="https://bsky.app/profile/sgtangel777.bsky.social" target="_blank">@SgtAngel777</a> et <a href="https://bsky.app/profile/nickwrightdata.ntw.app" target="_blank">@NickWrightData</a>.</p> \n\n<p class="mb-3">Chaque musique est choisie au hasard dans la bande originale du jeu ' +
    artist +
    '.</p><p class="mb-3">Les musiques sont répertoriées avec le nom des jeux dans lesquels elles figurent. Vous pouvez effectuer une recherche par noms de versions appariées, comme "Rouge/Bleu" ou "Rubis/Saphir". Les musiques des remakes sont incluses, comme Rouge Feu et Vert Feuille ou Diamant Étincelant et Perle Scintillante.</p><p class="mb-3">La liste des musiques provient de vgmdb (qui utilise les albums officiels) quand c\'est possible, sinon de datamining (Concerne Ultra Soleil/Ultra Lune et Diamant Étincelant/Perle Scintillante). Les noms français des musiques proviennent des listes officiels sur iTunes pour les jeux GBA et DS et pour Pokémon X/Y. Pour les autres jeux, les traductions sont déduites à partir des jeux déjà traduits ou sont traduites à la main à partir des noms anglais. N\'hésitez pas à me proposer de meilleures traductions pour Pokémon Soleil/Lune, Épée/Bouclier, Légende: Arceus, ou Écarlate/Violet !</p> \n\n\n\n <p class="mb-3">Vous voulez créer votre propre Heardle Infinie ? Consultez le fichier <a href="https://github.com/nterrien/pkmn-infinite-heardle">README</a>.</p>',
  en:
    '<p class="mb-3">A clone of <a href="https://www.heardle.app/" title="Heardle">Heardle</a>, and <a href="https://heardle-kpop.glitch.me/" title="K-Pop Heardle">K-Pop Heardle</a> which can be played infinitely and with ' +
    artist +
    '\'s musics. Based on <a href="https://joywave-heardle.glitch.me/" title="Joywave Heardle">Joywave Heardle</a> code and musics of the original <a href="https://pkmn-heardle.glitch.me/" title="Pokémon Heardle">Pokémon Heardle</a> by <a href="https://bsky.app/profile/sgtangel777.bsky.social" target="_blank">@SgtAngel777</a> and <a href="https://bsky.app/profile/nickwrightdata.ntw.app" target="_blank">@NickWrightData</a>.</p> \n\n<p class="mb-3">Each music is randomly chosen from mainline ' +
    artist +
    '\'s game soundtrack.</p><p class="mb-3">Songs are listed along with the name of the games they are featured in. You can search by paired version names such as "Red/Blue" or "Ruby/Sapphire". Songs from remakes are included, such as FireRed and LeafGreen, and Brilliant Diamond and Shining Pearl. </p><p class="mb-3">The list of music comes from vgmdb (which uses official albums), when possible, otherwise from datamining (Only for Ultra Sun/Ultra Moon and Brilliant Diamond/Shining Pearl)</p> \n\n\n\n <p class="mb-3">Want to make your own Heardle? Check out the <a href="https://github.com/nterrien/pkmn-infinite-heardle">README</a>. </p>',
};
//// Support popup
const supportT = { fr: "Support", en: "Support" };
const supportPopupT = {
  fr: 'Vous avez des questions ou trouvez des bugs ? Contactez Beignet0 sur Reddit, beignetSan sur Twitch, @beignet0.bsky.social sur Bluesky, beignet1139 sur Discord ou créez un ticket sur <a href="https://github.com/nterrien/pkmn-infinite-heardle/issues" target="_blank">Github</a>! <br><br>Vous pouvez également jouer à <a href="https://nterrien.github.io/pkmn-heardle/" title="Pokémon Heardle">Pokémon Heardle</a> tous les jours. Remerciez <a href="https://bsky.app/profile/sgtangel777.bsky.social" target="_blank">@SgtAngel777</a> et <a href="https://bsky.app/profile/nickwrightdata.ntw.app" target="_blank">@NickWrightData</a> les créateurs du Pokémon Heardle original !<br><br>Il existe également une version pour <a href="https://prateau.github.io/pmd-infinite-heardle/">Pokémon Donjon Mystère</a> grâce à Ipfil.',
  en: 'Have questions/run into bugs? DM Beignet0 on Reddit, beignetSan on Twitch, @beignet0.bsky.social on Bluesky, beignet1139 on Discord or create an issue in <a href="https://github.com/nterrien/pkmn-infinite-heardle/issues" target="_blank">Github</a>!<br><br>You can also play <a href="https://nterrien.github.io/pkmn-heardle/" title="Pokémon Heardle">Pokémon Heardle</a> daily. Thank the Pokémon Heardle creators <a href="https://bsky.app/profile/sgtangel777.bsky.social" target="_blank">@SgtAngel777</a> and <a href="https://bsky.app/profile/nickwrightdata.ntw.app" target="_blank">@NickWrightData</a>!<br><br>There\'s also a version for <a href="https://prateau.github.io/pmd-infinite-heardle/">Pokémon Mystery Dungeon</a>, thanks to Ipfil.',
};
//// How to play popup
const howToPlayT = { fr: "Comment jouer", en: "How to play" };
const howToPlayPopup1T = {
  fr:
    "Écoutez l'intro, puis trouvez la bonne musique " +
    artist +
    " dans la liste",
  en:
    "Listen to the intro, then find the correct " +
    artist +
    " song in the list",
};
const howToPlayPopup2T = {
  fr: "Les tentatives passées ou incorrectes débloquent une plus grande partie de l'intro.",
  en: "Skipped or incorrect attempts unlock more of the intro",
};
const howToPlayPopup3T = {
  fr: "Répondez en aussi peu d'essais que possible et partagez votre score !",
  en: "Answer in as few tries as possible and share your score!",
};
const howToPlayPopup4T = {
  fr: "Sélectionez les jeux sur lesquels vous voulez jouer.",
  en: "Select the game you want to play with.",
};
const howToPlayPopup5T = {
  fr: "Vous pouvez voir la liste des musiques en cliquant sur le bouton en haut à droite.",
  en: "You can use the top right button to see the list of tracks.",
};
const playT = { fr: "Jouer", en: "Play" };
const playedT = { fr: "Jouée", en: "Played" };
const playAriaT = { fr: "Lancer/Pauser", en: "Play/Pause" };
const wonT = { fr: "Trouvée", en: "Won" };
const winRateT = { fr: "Taux de réussite", en: "Win rate" };
const currentStreakT = { fr: "Série actuelle", en: "Current Streak" };
const maxStreakT = { fr: "Série maximum", en: "Max Streak" };
//// Stats popup
const statsT = { fr: "Stats", en: "Stats" };
//// Filter popup
const filterT = { fr: "Filtrer", en: "Filter" };
const explainationFilterT = {
  fr: "Les jeux cochés seront sélectionnés. N'oubliez pas de cliquer sur Sauvegarder après avoir fait votre sélection.",
  en: "Games you check will be selected. Don't forget to click Save after making your selection.",
};
const explainationFilterTagsT = {
  fr: "Vous pouvez sélectionner les tags ci-dessous pour filtrer les musiques. (BETA)",
  en: "You can select tags below to filter musics. (BETA)",
};
const warningFilterT = {
  fr: "Attention : modifier la liste de jeux disponible réinitialise votre série.",
  en: "Warning: saving will reset your streak.",
};
const saveT = { fr: "Sauvegarder", en: "Save" };
const saveAriaT = { fr: "Sauvegarder les filtres", en: "Save filters" };
const selectAllT = { fr: "Tout Sélectionner", en: "Select All" };
const unselectAllT = { fr: "Tout Désélectionner", en: "Unselect All" };
const selectAllGamesT = {
  fr: "Sélectionner tous les jeux",
  en: "Select All Games",
};
const unselectAllGamesT = {
  fr: "Désélectionner tous les jeux",
  en: "Unselect All Games",
};
const selectAllTagsT = {
  fr: "Sélectionner tous les tags",
  en: "Select All Tags",
};
const unselectAllTagsT = {
  fr: "Désélectionner tous les tags",
  en: "Unselect All Tags",
};
//// Music List popup
const musicListT = { fr: "Liste des musiques", en: "Music list" };
//// Language popup
const langListT = { fr: "Langues", en: "Languages" };
//// Main frame
const volumeT = {
  fr: "Augmentez le volume et appuyez pour lancer la musique !",
  en: "Turn up the volume and tap to start the track!",
};
const submitT = { fr: "Soumettre", en: "Submit" };
const placeholderT = {
  fr: "Recherchez le titre / le jeu",
  en: "Know it? Search for the artist / title",
};
const nextT = { fr: "Suivant", en: "Next" };
const nextAriaT = { fr: "Musique suivant", en: "Next music" };
const skipT = { fr: "Passer", en: "Skip" };
const skippedT = { fr: "PASSÉE", en: "SKIPPED" };
const goodAnswerT = {
  fr: "Vous avez trouvé cette musique " + artist + " en ",
  en: "You got this " + artist + " music within ",
};
const secondT = { fr: "seconde", en: "second" };
const badAnswerT = {
  fr: "Vous n'avez pas trouvé cette musique " + artist,
  en: "You didn't get this " + artist + " music.",
};
const listenToTranslation = {
  fr: "Ecoutez {title} - {artist} sur SoundCloud",
  en: "Listen to {artist} - {title} on SoundCloud",
};
const errorT = {
  fr: "Une erreur s'est produite lors du chargement de la musique. Veuillez recharger et réessayer.\n Vous pouvez contactez l'administrateur de ce site si le problème persiste.",
  en: "There was an error loading the player. Please reload and try again.\n You can contact the site administrator if the problem persists.",
};
const loadingT = {
  fr: "Chargement ...",
  en: "Loading player",
};