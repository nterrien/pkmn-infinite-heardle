var app = (function () {
  var artist = "Pokémon";
  var currentIndex = 0;

  const languages = ["fr", "en"];
  let language = "en";
  if (navigator.languages && navigator.languages.length > 0) {
    const startLanguage = navigator.languages[0].substring(0, 2);
    const found = languages.find((a) => a == startLanguage);
    if (found) {
      language = found;
    }
  }
  let removeGames = [];
  if (localStorage.getItem("removeGames")) {
    removeGames = JSON.parse(localStorage.getItem("removeGames"));
  }
  // Set to [] if you don't want to use the tag system
  const allTags = [
    "Battles",
    "Buildings",
    "Characters",
    "Cities",
    "Encounters",
    "Menu",
    "Mini Games",
    "Outdoor Location",
    "Repetable Events",
    "Story Events",
    "Victories",
  ];
  let removeTags = [];
  if (localStorage.getItem("removeTags")) {
    removeTags = JSON.parse(localStorage.getItem("removeTags"));
  }

  // You can remove the attributes "tags" if you set allTags to []
  var musicNameList = [
    // TODO I could check Trainers' Eyes Meet for different trainer class ... (Only done for RSE, it's not easy to do) Source if it is completed one day : https://bulbapedia.bulbagarden.net/wiki/List_of_battle_music_themes#Pok.C3.A9mon_Red.2C_Blue.2C_and_Yellow
    // TODO Is there missing Sevii Island musics ? (Routes or cave/forest/tower...)
    //// Red/Blue
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Game_Boy:_Entire_Pok%C3%A9mon_Sounds_Collection_CD
    //    https://vgmdb.net/album/141
    //    https://www.sittingonclouds.com/album/736
    // Source traduction (partiel):
    //    https://music.apple.com/fr/album/pok%C3%A9mon-rouge-feu-et-pok%C3%A9mon-vert-feuille-super-music/880123575
    {
      id: 0,
      en: "Opening Movie - Red/Blue",
      fr: "Séquence d'introduction - Rouge/Bleue",
      tags: ["Menu"],
    },
    {
      id: 1,
      en: "Title Screen - Red/Blue",
      fr: "Écran titre - Rouge/Bleue",
      tags: ["Menu"],
    },
    {
      id: 2,
      en: "Pallet Town Theme - Red/Blue",
      fr: "Bourg Palette - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 3,
      en: "Professor Oak - Red/Blue",
      fr: "Professeur Chen - Rouge/Bleue",
      tags: ["Characters"],
    },
    {
      id: 4,
      en: "Professor Oak's Laboratory - Red/Blue",
      fr: "Labo Pokémon du Prof. Chen - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 5,
      en: "Rival Appears/Blue's Theme - Red/Blue",
      fr: "Le rival apparaît/Thème de Blue - Rouge/Bleue",
      tags: ["Encounters", "Characters"],
    },
    {
      id: 6,
      en: "Route 1/2 (Road to Viridian City: Leaving Pallet Town)/Underground Path - Red/Blue",
      fr: "Route 1/2 (De Bourg Palette à Jadielle)/Souterrain - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 7,
      en: "Battle! (Wild Pokémon) - Red/Blue",
      fr: "Combat! (Pokémon sauvage) - Rouge/Bleue",
      tags: ["Battles"],
    },
    {
      id: 8,
      en: "Victory! (Wild Pokémon) - Red/Blue",
      fr: "Victoire! (Pokémon sauvage) - Rouge/Bleue",
      tags: ["Victories"],
    },
    {
      id: 9,
      en: "Pewter City/Viridian City/Saffron City Theme - Red/Blue",
      fr: "Argenta/Jadielle/Safrania - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 10,
      en: "Pokémon Center - Red/Blue",
      fr: "Centre Pokémon - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 11,
      en: "Viridian Forest/Diglett's Cave/Seafoam Islands - Red/Blue",
      fr: "Forêt de Jade/Cave Taupiqueur/Îles Écume - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 12,
      en: "Guide - Red/Blue",
      fr: "Guide - Rouge/Bleue",
      tags: ["Story Events"],
    },
    {
      id: 13,
      en: "Trainers' Eyes Meet (Girl) - Red/Blue",
      fr: "Rencontre avec un Dresseur (Fille) - Rouge/Bleue",
      tags: ["Encounters"],
    },
    {
      id: 14,
      en: "Battle! (Trainer Battle) - Red/Blue",
      fr: "Combat! (Combat de Dresseur) - Rouge/Bleue",
      tags: ["Battles"],
    },
    {
      id: 15,
      en: "Victory! (Trainer Battle) - Red/Blue",
      fr: "Victoire! (Combat de Dresseur) - Rouge/Bleue",
      tags: ["Victories"],
    },
    {
      id: 16,
      en: "Caves of Mt. Moon/Rock Tunnel/Victory Road - Red/Blue",
      fr: "Mont Sélénite/Grotte/Route Victoire - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 17,
      en: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22 (Road to Cerulean City: Leaving Mt. Moon) - Red/Blue",
      fr: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22 (Du Mont Sélénite à Azuria) - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 18,
      en: "Cerulean City/Fuchsia City Theme - Red/Blue",
      fr: "Azuria/Parmanie - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 19,
      en: "Pokémon Gym - Red/Blue",
      fr: "Arène Pokémon - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 20,
      en: "Route 24/25 (To Bill: Leaving Cerulean City)/Welcome to the World of Pokémon! - Red/Blue",
      fr: "Route 24/25 (D'Azuria à la maison de Léo)/Bienvenue dans le monde des Pokémon ! - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 21,
      en: "Vermilion City Theme - Red/Blue",
      fr: "Carmin sur Mer - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 22,
      en: "The S.S. Anne - Red/Blue",
      fr: "L'Océane - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 23,
      en: "Route 11/12/13/14/15 (Road to Lavender Town: Leaving Vermilion City) - Red/Blue",
      fr: "Route 11/12/13/14/15 (De Carmin sur Mer à Lavanville) - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 24,
      en: "Trainers' Eyes Meet (Boy) - Red/Blue",
      fr: "Rencontre avec un Dresseur (Garçon) - Rouge/Bleue",
      tags: ["Encounters"],
    },
    {
      id: 25,
      en: "Battle! (Gym Leader Battle) - Red/Blue",
      fr: "Combat! (Champion d'Arène) - Rouge/Bleue",
      tags: ["Battles"],
    },
    {
      id: 26,
      en: "Victory! (Gym Leader Battle) - Red/Blue",
      fr: "Victoire! (Champion d'Arène) - Rouge/Bleue",
      tags: ["Victories"],
    },
    {
      id: 27,
      en: "Bicycle - Red/Blue",
      fr: "Bicyclette - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 28,
      en: "Lavender Town Theme - Red/Blue",
      fr: "Lavanville - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 29,
      en: "Pokémon Tower - Red/Blue",
      fr: "Tour Pokémon - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 30,
      en: "Celadon City Theme - Red/Blue",
      fr: "Céladopole - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 31,
      en: "Rocket Game Corner - Red/Blue",
      fr: "Casino Rocket - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 32,
      en: "Trainers' Eyes Meet (Bad Guy (Team Rocket/Gambler/Juggler/Rocker/Scientist)) - Red/Blue",
      fr: "Rencontre avec un Dresseur (Version méchant(Team Rocket/Croupier/Jongleur/Rocker/Scientifique)) - Rouge/Bleue",
      tags: ["Encounters"],
    },
    {
      id: 33,
      en: "Team Rocket Hideout/Abandoned Power Plant/Cerulean Cave - Red/Blue",
      fr: "Repaire Rocket/Centrale/Grotte Inconnue (Caverne Azurée) - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 34,
      en: "Silph Co. - Red/Blue",
      fr: "Sylphe SARL - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 35,
      en: "Surf - Red/Blue",
      fr: "Surf - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 36,
      en: "Cinnabar Island Theme - Red/Blue",
      fr: "Cramois'Île - Rouge/Bleue",
      tags: ["Cities"],
    },
    {
      id: 37,
      en: "Pokémon Mansion - Red/Blue",
      fr: "Manoir Pokémon - Rouge/Bleue",
      tags: ["Buildings"],
    },
    {
      id: 38,
      en: "Evolution/Safari Zone - Red/Blue",
      fr: "Évolution/Parc Safari - Rouge/Bleue",
      tags: ["Outdoor Location", "Repetable Events"],
    },
    {
      id: 39,
      en: "Route 23/Indigo Plateau - Red/Blue",
      fr: "Route 23/Plateau Indigo - Rouge/Bleue",
      tags: ["Outdoor Location"],
    },
    {
      id: 40,
      en: "Final Battle! (Rival Blue/Champion) - Red/Blue",
      fr: "Combat final! (Rival Blue/Maître) - Rouge/Bleue",
      tags: ["Battles"],
    },
    {
      id: 41,
      en: "Hall of Fame - Red/Blue",
      fr: "Panthéon - Rouge/Bleue",
      tags: ["Repetable Events"],
    },
    {
      id: 42,
      en: "Ending Theme - Red/Blue",
      fr: "Générique de fin - Rouge/Bleue",
      tags: ["Repetable Events"],
    },

    //// Yellow
    // Source name and order :
    //      https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Yellow_Version#Soundtrack
    {
      id: 43,
      en: "Opening Movie - Yellow",
      fr: "Séquence d'introduction - Jaune",
      tags: ["Menu"],
    },
    {
      id: 44,
      en: "Theme of Jessie and James - Yellow",
      fr: "Thème de Jessie et James - Jaune",
      tags: ["Characters"],
    },
    {
      id: 45,
      en: "Pikachu's Beach - Yellow",
      fr: "Plage de Pikachu - Jaune",
      tags: ["Mini Games"],
    },

    //// Gold/Silver
    // No official listing of musics : https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Gold_and_Silver_Versions#Music_2
    // Source name and order :
    //      https://downloads.khinsider.com/game-soundtracks/album/pokemon-gold-silver-crystal (Gamerip)
    //      https://downloads.khinsider.com/game-soundtracks/album/pokemon-gold-silver (Gamerip)
    //      HGSS Disc 3 & 4 is an approximation

    // Source traduction (partiel):
    //      https://music.apple.com/fr/album/pok%C3%A9mon-heartgold-et-pok%C3%A9mon-soulsilver-super-music/880662983
    {
      id: 46,
      en: "Opening Movie - Gold/Silver",
      fr: "Séquence d'introduction - Or/Argent",
      tags: ["Menu"],
    },
    {
      id: 47,
      en: "Title Screen (Pokémon Gold & Pokémon Silver) - Gold/Silver",
      fr: "Écran titre (Pokémon Or & Pokémon Argent) - Or/Argent",
      tags: ["Menu"],
    },
    {
      id: 48,
      en: "An Adventure Begins - Gold/Silver",
      fr: "L'aventure commence - Or/Argent",
      tags: ["Story Events"],
    },
    {
      id: 49,
      en: "New Bark Town - Gold/Silver",
      fr: "Bourg Geon - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 50,
      en: "Hurry Along - Gold/Silver",
      fr: "En route! - Or/Argent",
      tags: ["Story Events"],
    },
    {
      id: 51,
      en: "Elm Pokémon Lab - Gold/Silver",
      fr: "Laboratoire du Professeur Orme - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 52,
      en: "Route 29 - Gold/Silver",
      fr: "Route 29 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 53,
      en: "Battle! (Wild Pokémon—Johto Version) (Day) - Gold/Silver",
      fr: "Combat! (Pokémon sauvage—Version Johto) (Jour) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 54,
      en: "Victory! (Wild Pokémon) - Gold/Silver",
      fr: "Victoire! (Pokémon sauvage) - Or/Argent",
      tags: ["Victories"],
    },
    {
      id: 55,
      en: "Cherrygrove City/Mahogany Town - Gold/Silver",
      fr: "Ville Griotte/Acajou - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 56,
      en: "Hurry Along 2 - Gold/Silver",
      fr: "En route! 2 - Or/Argent",
      tags: ["Story Events"],
    },
    {
      id: 57,
      en: "Pokémon Center - Gold/Silver",
      fr: "Centre Pokémon - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 58,
      en: "Trainers' Eyes Meet (Boy 1) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Garçon 1) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 59,
      en: "Battle! (Trainer Battle—Johto Version) - Gold/Silver",
      fr: "Combat! (Combat de Dresseur—Version Johto) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 60,
      en: "Victory! (Trainer Battle) - Gold/Silver",
      fr: "Victoire! (Combat de Dresseur) - Or/Argent",
      tags: ["Victories"],
    },
    {
      id: 61,
      en: "Route 30/31/32/33 - Gold/Silver",
      fr: "Route 30/31/32/33 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 62,
      en: "Violet City/Olivine City - Gold/Silver",
      fr: "Mauville/Oliville - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 63,
      en: "Sprout Tower - Gold/Silver",
      fr: "Tour Chétiflor - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 64,
      en: "Trainers' Eyes Meet (Sage) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Sage) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 65,
      en: "Union Cave/Ilex Forest/Whirl Islands/Mt. Mortar/Tohjo Falls - Gold/Silver",
      fr: "Caves Jumelles/Bois aux Chênes/Tourb'Îles/Mont Creuset/Chutes Tohjo - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 66,
      en: "Ruins of Alph - Gold/Silver",
      fr: "Ruines d'Alpha - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 67,
      en: "Azalea Town/Blackthorn City - Gold/Silver",
      fr: "Écorcia/Ébènelle - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 68,
      en: "Trainers' Eyes Meet (Team Rocket) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Team Rocket) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 69,
      en: "Battle! (Team Rocket) - Gold/Silver",
      fr: "Combat! (Team Rocket) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 70,
      en: "Route 34/35/36/37/40/41/45/46 - Gold/Silver",
      fr: "Route 34/35/36/37/40/41/45/46 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 71,
      en: "A Rival Appears!/Silver's Theme - Gold/Silver",
      fr: "Le rival apparaît!/Thème de Silver - Or/Argent",
      tags: ["Encounters", "Characters"],
    },
    {
      id: 72,
      en: "Battle! (Rival Silver) - Gold/Silver",
      fr: "Combat! (Rival Silver) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 73,
      en: "Evolution - Gold/Silver",
      fr: "Évolution - Or/Argent",
      tags: ["Repetable Events"],
    },
    // {
    //     id: -1,
    //     en: "Caught a Pokémon - Gold/Silver",
    //     fr: "Caught a Pokémon - Or/Argent"
    // },
    {
      id: 74,
      en: "Goldenrod City - Gold/Silver",
      fr: "Doublonville - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 75,
      en: "Pokémon Gym - Gold/Silver",
      fr: "Arène Pokémon - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 76,
      en: "Battle! (Gym Leader—Johto Version) - Gold/Silver",
      fr: "Combat! (Champion d'Arène—Version Johto) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 77,
      en: "Victory! (Gym Leader) - Gold/Silver",
      fr: "Victoire! (Champion d'Arène) - Or/Argent",
      tags: ["Victories"],
    },
    {
      id: 78,
      en: "Goldenrod Game Corner - Gold/Silver",
      fr: "Casino de Doublonville - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 79,
      en: "Bicycle - Gold/Silver",
      fr: "Bicyclette - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 80,
      en: "Trainers' Eyes Meet (Girl 1) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Fille 1) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 81,
      en: "National Park - Gold/Silver",
      fr: "Parc Naturel - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 82,
      en: "The Bug-Catching Contest Begins! - Gold/Silver",
      fr: "Le Concours de Capture d'insecte Commence! - Or/Argent",
      tags: ["Mini Games"],
    },
    {
      id: 83,
      en: "The Bug-Catching Contest - Gold/Silver",
      fr: "Le Concours de Capture d'insecte - Or/Argent",
      tags: ["Mini Games"],
    },
    {
      id: 84,
      en: "Ecruteak City/Cianwood City - Gold/Silver",
      fr: "Rosalia/Irisia - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 85,
      en: "Ecruteak Dance Theater - Gold/Silver",
      fr: "Salle de Danse de Rosalia - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 86,
      en: "Trainers' Eyes Meet (Kimono Girl) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Kimono) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 87,
      en: "Burned Tower - Gold/Silver",
      fr: "Tour Cendrée - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 88,
      en: "Route 38/39 - Gold/Silver",
      fr: "Route 38/39 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 89,
      en: "Battle! (Wild Pokémon—Johto Version) (Night) - Gold/Silver",
      fr: "Combat! (Pokémon sauvage—Version Johto) (Nuit) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 90,
      en: "Olivine Lighthouse/Silver Cave - Gold/Silver",
      fr: "Phare d'Oliville/Mont Argent - Or/Argent",
      tags: ["Outdoor Location", "Buildings"],
    },
    {
      id: 91,
      en: "Surf - Gold/Silver",
      fr: "Surf - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 92,
      en: "Route 42/43/44/Lake of Rage - Gold/Silver",
      fr: "Route 42/43/44/Lac Colère - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 93,
      en: "Team Rocket HQ - Gold/Silver",
      fr: "Repaire Rocket - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 94,
      en: "Trainers' Eyes Meet (Suspicious Person 1) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Personne louche 1) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 95,
      en: "A Rival Appears!/Silver's Theme (Version 2) - Gold/Silver",
      fr: "Le rival apparaît!/Thème de Silver (Version 2) - Or/Argent",
      tags: ["Characters"],
    },
    {
      id: 96,
      en: "Radio Tower Occupied! - Gold/Silver",
      fr: "La Tour Radio est occupée! - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 97,
      en: "Tin Tower - Gold/Silver",
      fr: "Tour Ferraille - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 98,
      en: "Ice Path/Dark Cave/Slowpoke Well - Gold/Silver",
      fr: "Route de Glace/Antre Noire/Puits Ramoloss - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 99,
      en: "Dragon's Den - Gold/Silver",
      fr: "Antre du Dragon - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 100,
      en: "Route 26/27 - Gold/Silver",
      fr: "Route 26/27 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 101,
      en: "S.S. Aqua - Gold/Silver",
      fr: "L'Aquaria - Or/Argent",
      tags: ["Buildings"],
    },
    {
      id: 102,
      en: "Vermilion City - Gold/Silver",
      fr: "Carmin sur Mer - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 103,
      en: "Battle! (Gym Leader—Kanto Version) - Gold/Silver",
      fr: "Combat! (Champion d'Arène—Version Kanto) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 104,
      en: "Lavender Town - Gold/Silver",
      fr: "Lavanville - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 105,
      en: "Rock Tunnel/Diglett's Cave/Underground Path/Mt. Moon - Gold/Silver",
      fr: "Grotte/Cave Taupiqueur/Souterrain/Mont Sélénite - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 106,
      en: "Battle! (Wild Pokémon—Kanto Version) - Gold/Silver",
      fr: "Combat! (Pokémon sauvage—Version Kanto) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 107,
      en: "Celadon City/Fuchsia City - Gold/Silver",
      fr: "Céladopole/Parmanie - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 108,
      en: "Route 11/12/13/14/15 - Gold/Silver",
      fr: "Route 11/12/13/14/15 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 109,
      en: "Route 2 (Viridian Forest) - Gold/Silver",
      fr: "Route 2 (Forêt de Jade) - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 110,
      en: "Trainers' Eyes Meet (Boy 2) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Garçon 2) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 111,
      en: "Pewter City/Viridian City/Saffron City/Cerulean City/Cinnabar Island - Gold/Silver",
      fr: "Argenta/Jadielle/Safrania/Azuria/Cramois'Île - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 112,
      en: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22/24/25 - Gold/Silver",
      fr: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22/24/25 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 113,
      en: "Trainers' Eyes Meet (Suspicious Person 2) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Personne louche 2) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 114,
      en: "Mt. Moon Square/Clefairy Dance - Gold/Silver",
      fr: "Square du Mont Sélénite/Danse des Mélofée - Or/Argent",
      tags: ["Repetable Events"],
    },
    {
      id: 115,
      en: "Route 1 - Gold/Silver",
      fr: "Route 1 - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 116,
      en: "Pallet Town - Gold/Silver",
      fr: "Bourg Palette - Or/Argent",
      tags: ["Cities"],
    },
    {
      id: 117,
      en: "Professor Oak - Gold/Silver",
      fr: "Professeur Chen - Or/Argent",
      tags: ["Characters"],
    },
    {
      id: 118,
      en: "Trainers' Eyes Meet (Girl 2) - Gold/Silver",
      fr: "Rencontre avec un Dresseur (Fille 2) - Or/Argent",
      tags: ["Encounters"],
    },
    {
      id: 119,
      en: "Battle! (Trainer Battle—Kanto Version) - Gold/Silver",
      fr: "Combat! (Combat de Dresseur—Version Kanto) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 120,
      en: 'Pokégear Radio: "Unown" - Gold/Silver',
      fr: 'Radio Pokématos: "Zarbi" - Or/Argent',
      tags: ["Menu"],
    },
    {
      id: 121,
      en: 'Pokégear Radio: "Pokémon March" - Gold/Silver',
      fr: 'Radio Pokématos: "Fanfare Pokémon" - Or/Argent',
      tags: ["Menu"],
    },
    {
      id: 122,
      en: 'Pokégear Radio: "Pokémon Lullaby" - Gold/Silver',
      fr: 'Radio Pokématos: "Berceuse Pokémon" - Or/Argent',
      tags: ["Menu"],
    },
    {
      id: 123,
      en: 'Pokégear Radio: "Pokémon Flute" - Gold/Silver',
      fr: 'Radio Pokématos: "Poké Flûte" - Or/Argent',
      tags: ["Menu"],
    },
    {
      id: 124,
      en: "Pokégear Radio: \"Professor Oak's Pokémon Lecture\"/Professor Oak's Laboratory - Gold/Silver",
      fr: 'Radio Pokématos: "Chronique PKMN Chen"/Labo Pokémon de Chen - Or/Argent',
      tags: ["Buildings", "Menu"],
    },
    {
      id: 125,
      en: "Game Boy Printer (Printer Error) - Gold/Silver",
      fr: "Game Boy Printer - Or/Argent",
      tags: ["Menu"],
    },
    {
      id: 126,
      en: "Victory Road - Gold/Silver",
      fr: "Route Victoire - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 127,
      en: "The Pokémon League/Indigo Plateau/Route 23/Route 28/Mt. Silver - Gold/Silver",
      fr: "Ligue Pokémon/Plateau Indigo/Route 23/Route 28/Grotte Argentée - Or/Argent",
      tags: ["Outdoor Location"],
    },
    {
      id: 128,
      en: "Battle! (Champion Lance) - Gold/Silver",
      fr: "Combat! (Maître Peter) - Or/Argent",
      tags: ["Battles"],
    },
    {
      id: 129,
      en: "The Hall of Fame - Gold/Silver",
      fr: "Panthéon - Or/Argent",
      tags: ["Repetable Events"],
    },
    {
      id: 130,
      en: "Ending Theme - Gold/Silver",
      fr: "Générique de fin - Or/Argent",
      tags: ["Repetable Events"],
    },
    {
      id: 131,
      en: "The End - Gold/Silver",
      fr: "Fin - Or/Argent",
      tags: ["Repetable Events"],
    },

    //// Crystal
    // No official listing of musics : https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Crystal_Version#Music
    // Source name and order :
    //      https://downloads.khinsider.com/game-soundtracks/album/pokemon-crystal-gb (Gamerip)
    {
      id: 132,
      en: "Opening Movie - Crystal",
      fr: "Séquence d'introduction - Cristal",
      tags: ["Menu"],
    },
    {
      id: 133,
      en: "Title Screen - Crystal",
      fr: "Écran titre - Cristal",
      tags: ["Menu"],
    },
    {
      id: 134,
      en: 'Pokégear Radio: "Buena\'s Password" - Crystal',
      fr: 'Radio Pokématos: "Le Mot de Passe de Buena" - Cristal',
      tags: ["Menu"],
    },
    {
      id: 135,
      en: "Eusine - Crystal",
      fr: "Eusine - Cristal",
      tags: ["Characters"],
    },
    {
      id: 136,
      en: "Battle Tower Reception Desk - Crystal",
      fr: "Tour de Combat (Réception) - Cristal",
      tags: ["Buildings"],
    },
    {
      id: 137,
      en: "Battle Tower - Crystal",
      fr: "Tour de Combat - Cristal",
      tags: ["Buildings"],
    },
    {
      id: 138,
      en: "Battle! (Suicune) - Crystal",
      fr: "Combat! (Suicune) - Cristal",
      tags: ["Battles"],
    },
    {
      id: 139,
      en: "Pokémon Communications Center - Crystal",
      fr: "Pokémon Communications Center - Cristal", // Japanese version only, no translation exists
      tags: ["Buildings"],
    },
    {
      id: 140,
      en: "Clair - Crystal",
      fr: "Sandra - Cristal",
      tags: ["Characters"],
    },
    {
      id: 141,
      en: "Pokémon Mobile System Menu - Crystal",
      fr: "Pokémon Mobile System Menu - Cristal",
      tags: ["Menu"],
    },
    {
      id: 142,
      en: "Pokémon Mobile System - Crystal",
      fr: "Pokémon Mobile System - Cristal", // Never implemented outside of Japan, no translation exists
      tags: ["Menu"],
    },

    //// Ruby/Sapphire
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Ruby_%26_Pok%C3%A9mon_Sapphire:_Super_Music_Collection
    //    https://vgmdb.net/album/1024
    //    https://www.sittingonclouds.com/album/1034
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-rubis-et-pok%C3%A9mon-saphir-super-music-collection/880478090
    {
      id: 143,
      en: "Opening Movie: Setting out on a Journey in the Hoenn Region - Ruby/Sapphire",
      fr: "Séquence d'introduction: Une aventure commence à Hoenn - Rubis/Saphir",
      tags: ["Menu"],
    },
    {
      id: 144,
      en: "Title Screen: Main Theme - Ruby/Sapphire",
      fr: "Écran titre: Thème principal - Rubis/Saphir",
      tags: ["Menu"],
    },
    {
      id: 145,
      en: "Introductions/Route 122/Route 123 - Ruby/Sapphire",
      fr: "Présentations/Route 122/Route 123 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 146,
      en: "Littleroot Town - Ruby/Sapphire",
      fr: "Bourg-en-Vol - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 147,
      en: "Birch Pokémon Lab - Ruby/Sapphire",
      fr: "Laboratoire du Professeur Seko - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 148,
      en: "May - Ruby/Sapphire",
      fr: "Flora - Rubis/Saphir",
      tags: ["Characters"],
    },
    {
      id: 149,
      en: "H-Help Me! - Ruby/Sapphire",
      fr: "À l'aide! - Rubis/Saphir",
      tags: ["Story Events"],
    },
    {
      id: 150,
      en: "Battle! (Wild Pokémon) - Ruby/Sapphire",
      fr: "Combat! (Pokémon sauvage) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 151,
      en: "Victory! (Wild Pokémon) - Ruby/Sapphire",
      fr: "Victoire! (Pokémon sauvage) - Rubis/Saphir",
      tags: ["Victories"],
    },
    {
      id: 152,
      en: "Route 101/102/103 - Ruby/Sapphire",
      fr: "Route 101/102/103 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 153,
      en: "Oldale Town/Lavaridge Town - Ruby/Sapphire",
      fr: "Rosyères/Vermilava - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 154,
      en: "Pokémon Center - Ruby/Sapphire",
      fr: "Centre Pokémon - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      // + Bug Catcher/School Kid Male/Sailor/PKMN Breeder Male/Triathlete Male/Bug Catcher/Camper
      id: 155,
      en: "Trainers' Eyes Meet (Youngster) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Gamin) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      // + Lady/Beauty/PKMN Breeder Female/Triathlete Female/Aroma Lady/Parasol Lady
      id: 156,
      en: "Trainers' Eyes Meet (Lass) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Fillette) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 157,
      en: "Battle! (Trainer Battle) - Ruby/Sapphire",
      fr: "Combat! (Combat de Dresseur) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 158,
      en: "Victory! (Trainer Battle) - Ruby/Sapphire",
      fr: "Victoire! (Combat de Dresseur) - Rubis/Saphir",
      tags: ["Victories"],
    },
    {
      id: 159,
      en: "Petalburg City - Ruby/Sapphire",
      fr: "Clémenti-Ville - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 160,
      en: "Hurry Along - Ruby/Sapphire",
      fr: "En route! - Rubis/Saphir",
      tags: ["Story Events"],
    },
    {
      id: 161,
      en: "Route 104/105/106/107/108/109/115/116 - Ruby/Sapphire",
      fr: "Route 104/105/106/107/108/109/115/116 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 162,
      en: "Petalburg Woods/Rusturf Tunnel/Granite Cave/Fiery Path/Jagged Pass - Ruby/Sapphire",
      fr: "Bois Clémenti/Tunnel Mérazon/Grotte Granite/Chemin Ardent/Sentier Sinuroc - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 163,
      en: "Team Magma Appears! - Ruby/Sapphire",
      fr: "La Team Magma Apparaît! - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 164,
      en: "Battle! (Team Aqua/Team Magma) - Ruby/Sapphire",
      fr: "Combat! (Team Aqua/Team Magma) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 165,
      en: "Victory! (Team Aqua/Team Magma) - Ruby/Sapphire",
      fr: "Victoire! (Team Aqua/Team Magma) - Rubis/Saphir",
      tags: ["Victories"],
    },
    {
      id: 166,
      en: "Rustboro City/Mauville City/Mossdeep City - Ruby/Sapphire",
      fr: "Mérouville/Lavandia/Algatia - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 167,
      en: "Trainers' School - Ruby/Sapphire",
      fr: "École de Dresseurs - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 168,
      en: "Crossing the Sea - Ruby/Sapphire",
      fr: "La mer et au-delà - Rubis/Saphir",
      tags: ["Repetable Events"],
    },
    {
      id: 169,
      en: "Dewford Town - Ruby/Sapphire",
      fr: "Village Myokara - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      // + Picnicker/School Kid Female/Young Couple
      id: 170,
      en: "Trainers' Eyes Meet (Tuber) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Flotteur) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 171,
      en: "Slateport City - Ruby/Sapphire",
      fr: "Poivressel - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 172,
      en: "Oceanic Museum - Ruby/Sapphire",
      fr: "Musée Océanographique - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 173,
      en: "Route 110/111/112/114/117/118 (West) - Ruby/Sapphire",
      fr: "Route 110/111/112/114/117/118 (Ouest) - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 174,
      en: "Bicycle - Ruby/Sapphire",
      fr: "Bicyclette - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 175,
      en: "Game Corner - Ruby/Sapphire",
      fr: "Casino - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 176,
      en: "Reel Time - Ruby/Sapphire",
      fr: "Reel Time - Rubis/Saphir",
      tags: ["Mini Games"],
    },
    {
      id: 177,
      en: "Verdanturf Town - Ruby/Sapphire",
      fr: "Vergazon - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 178,
      en: "Route 113 - Ruby/Sapphire",
      fr: "Route 113 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      // + Pokéfan
      id: 179,
      en: "Trainers' Eyes Meet (Twins) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Jumelles) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 180,
      en: "Fallarbor Town - Ruby/Sapphire",
      fr: "Autequia - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 181,
      en: "Mt. Chimney/Seafloor Cavern/Sky Pillar - Ruby/Sapphire",
      fr: "Mont Chimnée/Caverne Fondmer/Pilier Céleste - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      // + Fisherman/Kindler/Ruin Maniac
      id: 182,
      en: "Trainers' Eyes Meet (Hiker) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Montagnard) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 183,
      en: "Route 111 (Desert) - Ruby/Sapphire",
      fr: "Route 111 (Désert) - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 184,
      en: "Pokémon Gym - Ruby/Sapphire",
      fr: "Arène Pokémon - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 185,
      en: "Battle! (Gym Leader) - Ruby/Sapphire",
      fr: "Combat! (Champion d'Arène) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 186,
      en: "Victory! (Gym Leader) - Ruby/Sapphire",
      fr: "Victoire! (Champion d'Arène) - Rubis/Saphir",
      tags: ["Victories"],
    },
    {
      id: 187,
      en: "Surf - Ruby/Sapphire",
      fr: "Surf - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 188,
      en: "Route 119/118 (East)/130/131/132/133/134 - Ruby/Sapphire",
      fr: "Route 119/118 (Est)/130/131/132/133/134 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 189,
      en: "Fortree City - Ruby/Sapphire",
      fr: "Cimetronelle - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 190,
      en: "Route 120/121/124/125/126/127/128 - Ruby/Sapphire",
      fr: "Route 120/121/124/125/126/127/128 - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 191,
      en: "Interviewers - Ruby/Sapphire",
      fr: "Journalistes - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 192,
      en: "Safari Zone - Ruby/Sapphire",
      fr: "Parc Safari - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      // + Rich Boy
      id: 193,
      en: "Trainers' Eyes Meet (Gentleman) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Gentleman) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 194,
      en: "Lilycove City/Pacifidlog City - Ruby/Sapphire",
      fr: "Nénucrique/Pacifiville - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 195,
      en: "Lilycove Art Museum - Ruby/Sapphire",
      fr: "Musée Nénucrique - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 196,
      en: "Brendan - Ruby/Sapphire",
      fr: "Brice - Rubis/Saphir",
      tags: ["Characters"],
    },
    {
      id: 197,
      en: "Battle! (Brendan/May) - Ruby/Sapphire",
      fr: "Combat! (Brice/Flora) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 198,
      en: "Evolution - Ruby/Sapphire",
      fr: "Évolution - Rubis/Saphir",
      tags: ["Repetable Events"],
    },
    {
      id: 199,
      en: "Poké Mart - Ruby/Sapphire",
      fr: "Boutique Pokémon - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 200,
      en: "Mt. Pyre/Shoal Cave/New Mauville - Ruby/Sapphire",
      fr: "Mont Mémoria/Grotte Tréfonds/New Lavandia - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      // + Battle Girl/Black Belt/Guitarist/Dragon Tamer
      id: 201,
      en: "Trainers' Eyes Meet (Psychic) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Kinésiste) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      // + Collector/Bug Maniac/Ninja Boy/PokéManiac
      id: 202,
      en: "Trainers' Eyes Meet (Hex Maniac) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Mystimaniac) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 203,
      en: "Mt. Pyre Exterior - Ruby/Sapphire",
      fr: "Mont Mémoria (extérieur) - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 204,
      en: "Magma & Aqua Hideout - Ruby/Sapphire",
      fr: "Planque Magma & Aqua - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 205,
      en: "Team Aqua Appears! - Ruby/Sapphire",
      fr: "La Team Aqua apparaît! - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 206,
      en: "Battle! (Team Aqua/Team Magma Leaders (Archie/Maxie)) - Ruby/Sapphire",
      fr: "Combat! (Leader Aqua/Magma (Arthur/Max)) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 207,
      en: "The Super-Ancient Pokémon Awaken! - Ruby/Sapphire",
      fr: "Un Pokémon ancestral s'éveille! - Rubis/Saphir",
      tags: ["Story Events"],
    },
    {
      id: 208,
      en: "Drought - Ruby/Sapphire",
      fr: "Sécheresse - Rubis/Saphir",
      tags: ["Story Events"],
    },
    {
      id: 209,
      en: "Heavy Rain - Ruby/Sapphire",
      fr: "Déluge - Rubis/Saphir",
      tags: ["Story Events"],
    },
    {
      id: 210,
      en: "Dive - Ruby/Sapphire",
      fr: "Plongée - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 211,
      en: "Sootopolis City - Ruby/Sapphire",
      fr: "Atalanopolis - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 212,
      en: "Cave Of Origin/Meteor Falls - Ruby/Sapphire",
      fr: "Grotte Origine/Site Météore - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 213,
      en: "Battle! (Super-Ancient Pokémon (Kyogre/Groudon/Rayquaza)) - Ruby/Sapphire",
      fr: "Combat! (Pokémon ancestral (Kyogre/Groudon/Rayquaza)) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 214,
      en: "Trainers' Eyes Meet (Swimmer) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Nageuse/Nageur) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 215,
      en: "Ever Grande City/The Pokémon League - Ruby/Sapphire",
      fr: "Éternara/Ligue Pokémon - Rubis/Saphir",
      tags: ["Cities"],
    },
    {
      id: 216,
      en: "Contest Lobby - Ruby/Sapphire",
      fr: "Salle de Concours - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 217,
      en: "Pokémon Contest! - Ruby/Sapphire",
      fr: "Concours Pokémon - Rubis/Saphir",
      tags: ["Mini Games"],
    },
    {
      id: 218,
      en: "Results Announcement - Ruby/Sapphire",
      fr: "Annonce des résultats - Rubis/Saphir",
      tags: ["Mini Games"],
    },
    {
      id: 219,
      en: "Contest Winner - Ruby/Sapphire",
      fr: "Vainqueur du Concours - Rubis/Saphir",
      tags: ["Mini Games"],
    },
    {
      id: 220,
      en: "Sealed Chamber/Desert Ruins/Island Cave/Ancient Tomb - Ruby/Sapphire",
      fr: "Sanctuaire/Ruines Désert/Grotte Island/Tombeau Antique - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 221,
      en: "Battle! (Regirock/Regice/Registeel) - Ruby/Sapphire",
      fr: "Combat! (Regirock/Regice/Registeel) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 222,
      en: "The Trick House - Ruby/Sapphire",
      fr: "Maison des Pièges - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 223,
      en: "Abandoned Ship/Southern Island/Faraway Island - Ruby/Sapphire",
      fr: "Épave/Île du Sud/Île Lointaine - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      id: 224,
      en: "Battle Tower - Ruby/Sapphire",
      fr: "Tour de Combat - Rubis/Saphir",
      tags: ["Buildings"],
    },
    {
      id: 225,
      en: "Victory Road - Ruby/Sapphire",
      fr: "Route Victoire - Rubis/Saphir",
      tags: ["Outdoor Location"],
    },
    {
      // + Bird Keeper/PKMN Ranger/Expert
      id: 226,
      en: "Trainers' Eyes Meet (Cooltrainer/Ace Trainer) - Ruby/Sapphire",
      fr: "Rencontre avec un Dresseur (Topdresseur) - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 227,
      en: "The Elite Four Appear! - Ruby/Sapphire",
      fr: "Le Conseil 4 apparaît! - Rubis/Saphir",
      tags: ["Encounters"],
    },
    {
      id: 228,
      en: "Battle! (Elite Four) - Ruby/Sapphire",
      fr: "Combat! (Conseil 4) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 229,
      en: "Champion Steven - Ruby/Sapphire",
      fr: "Maître Pierre - Rubis/Saphir",
      tags: ["Characters"],
    },
    {
      id: 230,
      en: "Battle! (Champion Steven) - Ruby/Sapphire",
      fr: "Combat! (Maître Pierre) - Rubis/Saphir",
      tags: ["Battles"],
    },
    {
      id: 231,
      en: "Victory! (Champion Steven) - Ruby/Sapphire",
      fr: "Victoire! (Maître Pierre) - Rubis/Saphir",
      tags: ["Victories"],
    },
    {
      id: 232,
      en: "Room of Glory - Ruby/Sapphire",
      fr: "Instant de gloire - Rubis/Saphir",
      tags: ["Repetable Events"],
    },
    {
      id: 233,
      en: "The Hall of Fame - Ruby/Sapphire",
      fr: "Panthéon - Rubis/Saphir",
      tags: ["Repetable Events"],
    },
    {
      id: 234,
      en: "Ending Theme - Ruby/Sapphire",
      fr: "Générique de fin - Rubis/Saphir",
      tags: ["Repetable Events"],
    },
    {
      id: 235,
      en: "The End - Ruby/Sapphire",
      fr: "Fin - Rubis/Saphir",
      tags: ["Repetable Events"],
    },

    //// FireRed/LeafGreen
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_FireRed_%26_Pok%C3%A9mon_LeafGreen:_Super_Music_Collection
    //    https://vgmdb.net/album/4336
    //    https://www.sittingonclouds.com/album/1007
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-rouge-feu-et-pok%C3%A9mon-vert-feuille-super-music/880123575
    {
      id: 236,
      en: "Opening Movie - FireRed/LeafGreen",
      fr: "Séquence d'introduction - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 237,
      en: "Title Screen - FireRed/LeafGreen",
      fr: "Écran titre - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 238,
      en: "Game Tutorial - FireRed/LeafGreen",
      fr: "Présentation du jeu - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 239,
      en: "Welcome to the World of Pokémon!/Route 24/Route 25 - FireRed/LeafGreen",
      fr: "Bienvenue dans le monde des Pokémon !/Route 24/Route 25 - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 240,
      en: "Pallet Town Theme - FireRed/LeafGreen",
      fr: "Bourg Palette - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 241,
      en: "Professor Oak's Theme - FireRed/LeafGreen",
      fr: "Professeur Chen - Rouge Feu/Vert Feuille",
      tags: ["Characters"],
    },
    {
      id: 242,
      en: "Professor Oak's Laboratory - FireRed/LeafGreen",
      fr: "Labo Pokémon du Prof. Chen - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 243,
      en: "Rival Appears/Blue's Theme - FireRed/LeafGreen",
      fr: "Le rival apparaît/Thème de Blue - Rouge Feu/Vert Feuille",
      tags: ["Encounters", "Characters"],
    },
    {
      id: 244,
      en: "Battle! (Trainer Battle) - FireRed/LeafGreen",
      fr: "Combat! (Combat de Dresseur) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 245,
      en: "Victory! (Trainer Battle) - FireRed/LeafGreen",
      fr: "Victoire! (Combat de Dresseur) - Rouge Feu/Vert Feuille",
      tags: ["Victories"],
    },
    {
      id: 246,
      en: "Route 1/2 (Road to Viridian City: Leaving Pallet Town)/Underground Path - FireRed/LeafGreen",
      fr: "Route 1/2 (De Bourg Palette à Jadielle)/Souterrain - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 247,
      en: "Pewter City/Viridian City/Saffron City Theme - FireRed/LeafGreen",
      fr: "Argenta/Jadielle/Safrania - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 248,
      en: "Teachy TV Menu - FireRed/LeafGreen",
      fr: "TV ABC (Menu) - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 249,
      en: "Viridian Forest/Diglett's Cave/Seafoam Islands - FireRed/LeafGreen",
      fr: "Forêt de Jade/Cave Taupiqueur/Îles Écume - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 250,
      en: "Battle! (Wild Pokémon) - FireRed/LeafGreen",
      fr: "Combat! (Pokémon sauvage) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 251,
      en: "Victory! (Wild Pokémon) - FireRed/LeafGreen",
      fr: "Victoire! (Pokémon sauvage) - Rouge Feu/Vert Feuille",
      tags: ["Victories"],
    },
    {
      id: 252,
      en: "Trainers' Eyes Meet (Boy Version) - FireRed/LeafGreen",
      fr: "Rencontre avec un Dresseur (Version Garçon) - Rouge Feu/Vert Feuille",
      tags: ["Encounters"],
    },
    {
      id: 253,
      en: "Pokémon Center - FireRed/LeafGreen",
      fr: "Centre Pokémon - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 254,
      en: "Guide - FireRed/LeafGreen",
      fr: "Guide - Rouge Feu/Vert Feuille",
      tags: ["Story Events"],
    },
    {
      id: 255,
      en: "Pokémon Gym - FireRed/LeafGreen",
      fr: "Arène Pokémon - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 256,
      en: "Tense Battle! - FireRed/LeafGreen",
      fr: "Combat: la tension monte! - Rouge Feu/Vert Feuille",
      tags: ["Encounters"],
    },
    {
      id: 257,
      en: "Battle! (Gym Leader Battle) - FireRed/LeafGreen",
      fr: "Combat! (Champion d'Arène) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 258,
      en: "Victory! (Gym Leader Battle) - FireRed/LeafGreen",
      fr: "Victoire! (Champion d'Arène) - Rouge Feu/Vert Feuille",
      tags: ["Victories"],
    },
    {
      id: 259,
      en: "Evolution/Safari Zone - FireRed/LeafGreen",
      fr: "Évolution/Parc Safari - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location", "Repetable Events"],
    },
    {
      id: 260,
      en: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22 (Road to Cerulean City: Leaving Mt. Moon) - FireRed/LeafGreen",
      fr: "Route 3/4/5/6/7/8/9/10/16/17/18/19/20/21/22 (Du Mont Sélénite à Azuria) - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 261,
      en: "Trainers' Eyes Meet (Girl Version) - FireRed/LeafGreen",
      fr: "Rencontre avec un Dresseur (Version Fille) - Rouge Feu/Vert Feuille",
      tags: ["Encounters"],
    },
    {
      id: 262,
      en: "Caves of Mt. Moon/Rock Tunnel/Victory Road - FireRed/LeafGreen",
      fr: "Mont Sélénite/Grotte/Route Victoire - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 263,
      en: "Vermilion City Theme - FireRed/LeafGreen",
      fr: "Carmin sur Mer - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 264,
      en: "The S.S. Anne - FireRed/LeafGreen",
      fr: "L'Océane - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 265,
      en: "Bicycle - FireRed/LeafGreen",
      fr: "Bicyclette - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 266,
      en: "Lavender Town Theme - FireRed/LeafGreen",
      fr: "Lavanville - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 267,
      en: "Pokémon Tower - FireRed/LeafGreen",
      fr: "Tour Pokémon - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 268,
      en: "Celadon City Theme - FireRed/LeafGreen",
      fr: "Céladopole - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 269,
      en: "Rocket Game Corner - FireRed/LeafGreen",
      fr: "Casino Rocket - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 270,
      en: "Team Rocket Hideout/Cerulean Cave - FireRed/LeafGreen",
      fr: "Repaire Rocket/Caverne Azurée - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 271,
      en: "Trainers' Eyes Meet (Bad Guy Version (Team Rocket/Burglar/Channeler/PokéManiac/Scientist/Super Nerd)) - FireRed/LeafGreen",
      fr: "Rencontre avec un Dresseur (Version méchant (Team Rocket/Pillard/Exorciste/Pokémaniac/Scientifique/Intello)) - Rouge Feu/Vert Feuille",
      tags: ["Encounters"],
    },
    {
      id: 272,
      en: "Silph Co. - FireRed/LeafGreen",
      fr: "Sylphe SARL - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 273,
      en: "Route 11/12/13/14/15 (Road to Fuchsia City: Leaving Lavender Town) - FireRed/LeafGreen",
      fr: "Route 11/12/13/14/15 (De Lavanville à Parmanie) - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 274,
      en: "Cerulean City/Fuchsia City Theme - FireRed/LeafGreen",
      fr: "Azuria/Parmanie - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 275,
      en: "Surf - FireRed/LeafGreen",
      fr: "Surf - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 276,
      en: "Battle! (Legendary Pokémon) - FireRed/LeafGreen",
      fr: "Combat! (Pokémon légendaire) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 277,
      en: "Cinnabar Island Theme - FireRed/LeafGreen",
      fr: "Cramois'Île - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 278,
      en: "Pokémon Mansion/Abandoned Power Plant - FireRed/LeafGreen",
      fr: "Manoir Pokémon/Centrale - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 279,
      en: "Pokémon Network Center - FireRed/LeafGreen",
      fr: "Centre Réseau Pokémon - Rouge Feu/Vert Feuille",
      tags: ["Buildings"],
    },
    {
      id: 280,
      en: "Sevii Islands: Floe (4) & Chrono (5) Islands - FireRed/LeafGreen",
      fr: "Îles Sevii: Île 4 & Île 5 - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 281,
      en: "Pokémon Jump - FireRed/LeafGreen",
      fr: "Saut Pokémon - Rouge Feu/Vert Feuille",
      tags: ["Mini Games"],
    },
    {
      id: 282,
      en: "Dodrio Berry Picking - FireRed/LeafGreen",
      fr: "Attrape-Baies Dodrio - Rouge Feu/Vert Feuille",
      tags: ["Mini Games"],
    },
    {
      id: 283,
      en: "Sevii Islands: Knot (1) & Boon (2) & Kin (3) Islands - FireRed/LeafGreen",
      fr: "Îles Sevii: Île 1 & Île 2 & Île 3 - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 284,
      en: "Sevii Islands: Fortune (6) & Quest (7) Islands - FireRed/LeafGreen",
      fr: "Îles Sevii: Île 6 & Île 7 - Rouge Feu/Vert Feuille",
      tags: ["Cities"],
    },
    {
      id: 285,
      en: "Union Room - FireRed/LeafGreen",
      fr: "Salle Union - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 286,
      en: "Mystery Gift - FireRed/LeafGreen",
      fr: "Cadeau Mystère - Rouge Feu/Vert Feuille",
      tags: ["Menu"],
    },
    {
      id: 287,
      en: "Battle! (Mewtwo) - FireRed/LeafGreen",
      fr: "Combat! (Mewtwo) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 288,
      en: "Route 23/Indigo Plateau - FireRed/LeafGreen",
      fr: "Route 23/Plateau Indigo - Rouge Feu/Vert Feuille",
      tags: ["Outdoor Location"],
    },
    {
      id: 289,
      en: "Final Battle! (Rival Blue/Champion) - FireRed/LeafGreen",
      fr: "Combat final! (Rival Blue/Maître) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },
    {
      id: 290,
      en: "Epilogue - FireRed/LeafGreen",
      fr: "Épilogue - Rouge Feu/Vert Feuille",
      tags: ["Repetable Events"],
    },
    {
      id: 291,
      en: "Hall of Fame - FireRed/LeafGreen",
      fr: "Panthéon - Rouge Feu/Vert Feuille",
      tags: ["Repetable Events"],
    },
    {
      id: 292,
      en: "Ending Theme - FireRed/LeafGreen",
      fr: "Générique de fin - Rouge Feu/Vert Feuille",
      tags: ["Repetable Events"],
    },
    {
      id: 293,
      en: "Deoxys Appears - FireRed/LeafGreen",
      fr: "Deoxys apparaît - Rouge Feu/Vert Feuille",
      tags: ["Encounters"],
    },
    {
      id: 294,
      en: "Battle! (Deoxys) - FireRed/LeafGreen",
      fr: "Combat! (Deoxys) - Rouge Feu/Vert Feuille",
      tags: ["Battles"],
    },

    //// Emerald
    // Source name and order : Disc 4 of :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_2_%26_Pok%C3%A9mon_White_2:_Super_Music_Collection
    //    https://vgmdb.net/album/33367
    //    https://www.sittingonclouds.com/album/458
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-noir-2-et-pok%C3%A9mon-blanc-2-super-music-collection/880137987
    {
      id: 295,
      en: "Abnormal Weather - Emerald",
      fr: "Météo anormale - Émeraude",
      tags: ["Story Events"],
    },
    {
      id: 296,
      en: "Rayquaza Appears! - Emerald",
      fr: "Rayquaza apparaît! - Émeraude",
      tags: ["Encounters"],
    },
    {
      id: 297,
      en: "Battle Frontier - Emerald",
      fr: "Zone de Combat - Émeraude",
      tags: ["Cities"],
    },
    {
      id: 298,
      en: "Battle Tower - Emerald",
      fr: "Tour de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 299,
      en: "Battle Factory - Emerald",
      fr: "Usine de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 300,
      en: "Battle Arena - Emerald",
      fr: "Dojo de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 301,
      en: "Battle Dome 1 (Reception Hall) - Emerald",
      fr: "Dôme de Combat 1 (Réception) - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 302,
      en: "Battle Dome 2 - Emerald",
      fr: "Dôme de Combat 2 - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 303,
      en: "Battle Pike - Emerald",
      fr: "Reptile de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 304,
      en: "Battle Palace - Emerald",
      fr: "Palace de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 305,
      en: "Battle Pyramid - Emerald",
      fr: "Pyramide de Combat - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 306,
      en: "Battle Pyramid Summit - Emerald",
      fr: "Pyramide de Combat (Sommet) - Émeraude",
      tags: ["Buildings"],
    },
    {
      id: 307,
      en: "Battle! (Frontier Brain) - Emerald",
      fr: "Combat! (Meneur de Zone) - Émeraude",
      tags: ["Battles"],
    },
    {
      id: 308,
      en: "Battle! (Mew) - Emerald",
      fr: "Combat! (Mew) - Émeraude",
      tags: ["Battles"],
    },

    //// Diamond/Pearl
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Diamond_%26_Pok%C3%A9mon_Pearl:_Super_Music_Collection
    //    https://vgmdb.net/album/3945
    //    https://www.sittingonclouds.com/album/799
    // Source traduction:
    //    https://music.apple.com/fr/album/pok%C3%A9mon-diamant-et-pok%C3%A9mon-perle-super-music-collection/880117263
    {
      id: 309,
      en: "Opening Movie - Diamond/Pearl",
      fr: "Séquence d'introduction - Diamant/Perle",
      tags: ["Menu"],
    },
    {
      id: 310,
      en: "Introduction - Diamond/Pearl",
      fr: "Introduction - Diamant/Perle",
      tags: ["Story Events"],
    },
    {
      id: 311,
      en: 'Special Report: "Search for the Red Gyarados!" - Diamond/Pearl',
      fr: "À la recherche du Léviator Rouge - Diamant/Perle",
      tags: ["Story Events"],
    },
    {
      id: 312,
      en: "Twinleaf Town (Day) - Diamond/Pearl",
      fr: "Bonaugure (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 313,
      en: "Rival Barry - Diamond/Pearl",
      fr: "Rival René - Diamant/Perle",
      tags: ["Characters"],
    },
    {
      id: 314,
      en: "Route 201/202/219/Verity Lakefront (Day) - Diamond/Pearl",
      fr: "Route 201/202/219/Rive Lac Vérité (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 315,
      en: "Lake - Diamond/Pearl",
      fr: "Lac - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 316,
      en: "A Surprise at the Lake! - Diamond/Pearl",
      fr: "Surprise au Lac! - Diamant/Perle",
      tags: ["Story Events"],
    },
    {
      id: 317,
      en: "Battle! (Wild Pokémon) - Diamond/Pearl",
      fr: "Combat! (Pokémon sauvage) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 318,
      en: "Victory! (Wild Pokémon) - Diamond/Pearl",
      fr: "Victoire! (Pokémon sauvage) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 319,
      en: "Dawn - Diamond/Pearl",
      fr: "Aurore - Diamant/Perle",
      tags: ["Characters"],
    },
    {
      id: 320,
      en: "Sandgem Town (Day) - Diamond/Pearl",
      fr: "Littorella (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 321,
      en: "The Pokémon Lab - Diamond/Pearl",
      fr: "Laboratoire Pokémon - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 322,
      en: "Hurry Along - Diamond/Pearl",
      fr: "En route! - Diamant/Perle",
      tags: ["Story Events"],
    },
    {
      id: 323,
      en: "Pokémon Center (Day) - Diamond/Pearl",
      fr: "Centre Pokémon (Jour) - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 324,
      en: "Trainers' Eyes Meet (Youngster) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Gamin) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 325,
      en: "Trainers' Eyes Meet (Lass) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Fillette) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 326,
      en: "Battle! (Trainer Battle) - Diamond/Pearl",
      fr: "Combat! (Combat de Dresseur) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 327,
      en: "Victory! (Trainer Battle) - Diamond/Pearl",
      fr: "Victoire! (Combat de Dresseur) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 328,
      en: "Jubilife City (Day) - Diamond/Pearl",
      fr: "Féli-Cité (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 329,
      en: "Poké Mart - Diamond/Pearl",
      fr: "Boutique Pokémon - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 330,
      en: "Route 203/204/218 (Day) - Diamond/Pearl",
      fr: "Route 203/204/218 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 331,
      en: "Battle! (Rival Barry) - Diamond/Pearl",
      fr: "Combat! (Rival René) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 332,
      en: "Oreburgh Gate/Ravaged Path/Wayward Cave - Diamond/Pearl",
      fr: "Entrée Charbourg/Chemin Rocheux/Grotte Revêche - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 333,
      en: "Oreburgh City (Day) - Diamond/Pearl",
      fr: "Charbourg (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 334,
      en: "Oreburgh Mine/Maniac Tunnel/Fuego Ironworks - Diamond/Pearl",
      fr: "Mine Charbourg/Tunnel Ruineman./Forge Fuego - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 335,
      en: "Pokémon Gym - Diamond/Pearl",
      fr: "Arène Pokémon - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 336,
      en: "Battle! (Gym Leader) - Diamond/Pearl",
      fr: "Combat! (Champion d'Arène) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 337,
      en: "Victory! (Gym Leader) - Diamond/Pearl",
      fr: "Victoire! (Champion d'Arène) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 338,
      en: "Trainers' Eyes Meet (Twins) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Jumelles) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 339,
      en: "Floaroma Town/Seabreak Path/Flower Paradise (Day) - Diamond/Pearl",
      fr: "Floraville/Passage Marin/Paradis Fleuri (Jour) - Diamant/Perle",
      tags: ["Cities", "Outdoor Location"],
    },
    // Confusing, West apply to 211 and Day to 205 and 211...
    {
      id: 340,
      en: "Route 205/211 (West) (Day) - Diamond/Pearl",
      fr: "Route 205/211 (Ouest) (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 341,
      en: "Team Galactic Appears! - Diamond/Pearl",
      fr: "La Team Galaxie apparaît! - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 342,
      en: "Battle! (Team Galactic) - Diamond/Pearl",
      fr: "Combat! (Team Galaxie) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 343,
      en: "Eterna Forest/Lost Tower/Solaceon Ruins/Snowpoint Temple/Fullmoon Island - Diamond/Pearl",
      fr: "Forêt Vestigion/Tour Perdue/Ruines Bonville/Temple Frimapic/Île Pleine Lune - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 344,
      en: "Eterna City/Celestic Town (Day) - Diamond/Pearl",
      fr: "Vestigion/Célestia (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 345,
      en: "Galactic Eterna Building - Diamond/Pearl",
      fr: "Bâtiment de Vestigion de la Team Galaxie - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 346,
      en: "Battle! (Team Galactic Commander) - Diamond/Pearl",
      fr: "Combat! (Commandant Team Galaxie) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 347,
      en: "Victory! (Team Galactic) - Diamond/Pearl",
      fr: "Victoire! (Team Galaxie) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 348,
      en: "Evolution - Diamond/Pearl",
      fr: "Évolution - Diamant/Perle",
      tags: ["Repetable Events"],
    },
    {
      id: 349,
      en: "Bicycle - Diamond/Pearl",
      fr: "Bicyclette - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 350,
      en: "Trainers' Eyes Meet (Cyclist) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Cycliste) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 351,
      en: "Route 206/207/208/220/221 (Day) - Diamond/Pearl",
      fr: "Route 206/207/208/220/221 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 352,
      en: "Hearthome City (Day) - Diamond/Pearl",
      fr: "Unionpolis (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 353,
      en: "Route 209/212/222 (Day) - Diamond/Pearl",
      fr: "Route 209/212/222 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 354,
      en: "Trainers' Eyes Meet (Hiker) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Montagnard) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 355,
      en: "Solaceon Town/Pastoria City (Day) - Diamond/Pearl",
      fr: "Bonville/Verchamps (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 356,
      en: "Route 210/211 (East)/214/215/223/224 (Day) - Diamond/Pearl",
      fr: "Route 210/211 (Est)/214/215/223/224 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 357,
      en: "Veilstone City (Day) - Diamond/Pearl",
      fr: "Voilaroc (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 358,
      en: "Valor Lakefront/Route 213/Resort Area (Day) - Diamond/Pearl",
      fr: "Rive Lac Courage/Route 213/Aire de Détente (Jour) - Diamant/Perle",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 359,
      en: "Canalave City (Day) - Diamond/Pearl",
      fr: "Joliberges (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 360,
      en: "Route 216/217/Acuity Lakefront (Day) - Diamond/Pearl",
      fr: "Route 216/217/Rive Lac Savoir (Jour) - Diamant/Perle",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 361,
      en: "Snowpoint City (Day) - Diamond/Pearl",
      fr: "Frimapic (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 362,
      en: "Team Galactic HQ - Diamond/Pearl",
      fr: "QG Team Galaxie - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 363,
      en: "Battle! (Team Galactic Boss Cyrus) - Diamond/Pearl",
      fr: "Combat! (Chef Galaxie Hélio) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 364,
      en: "Deep Within Team Galactic HQ - Diamond/Pearl",
      fr: "Au fond du QG de la Team Galaxie - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 365,
      en: "Mt. Coronet - Diamond/Pearl",
      fr: "Mont Couronné - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 366,
      en: "Spear Pillar - Diamond/Pearl",
      fr: "Colonnes Lances - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 367,
      en: "The Legendary Pokémon Appears! - Diamond/Pearl",
      fr: "Un Pokémon légendaire apparaît! - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 368,
      en: "Catastrophe! - Diamond/Pearl",
      fr: "Catastrophe! - Diamant/Perle",
      tags: ["Story Events"],
    },
    {
      id: 369,
      en: "Battle! (Dialga/Palkia) - Diamond/Pearl",
      fr: "Combat! (Dialga/Palkia) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 370,
      en: "Sunyshore City (Day) - Diamond/Pearl",
      fr: "Rivamar (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 371,
      en: "Victory Road - Diamond/Pearl",
      fr: "Route Victoire - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 372,
      en: "Trainers' Eyes Meet (Ace Trainer) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Topdresseur) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 373,
      en: "Pokémon League (Day) - Diamond/Pearl",
      fr: "Ligue Pokémon (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 374,
      en: "Fight Area/Survival Area (Day) - Diamond/Pearl",
      fr: "Aire de Combat/Aire de Survie (Jour) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 375,
      en: "Route 225/226/227 (Day) - Diamond/Pearl",
      fr: "Route 225/226/227 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 376,
      en: "Route 228/229/230 (Day) - Diamond/Pearl",
      fr: "Route 228/229/230 (Jour) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 377,
      en: "Twinleaf Town (Night) - Diamond/Pearl",
      fr: "Bonaugure (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 378,
      en: "Route 201/202/219/Verity Lakefront (Night) - Diamond/Pearl",
      fr: "Route 201/202/219/Rive Lac Vérité (Nuit) - Diamant/Perle",
      tags: ["Cities", "Outdoor Location"],
    },
    {
      id: 379,
      en: "Pokémon Center (Night) - Diamond/Pearl",
      fr: "Centre Pokémon (Nuit) - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 380,
      en: "Nintendo Wi-Fi Connection - Diamond/Pearl",
      fr: "Connexion Wi-Fi Nintendo - Diamant/Perle",
      tags: ["Menu"],
    },
    {
      id: 381,
      en: "Sandgem Town (Night) - Diamond/Pearl",
      fr: "Littorella (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 382,
      en: "Lucas - Diamond/Pearl",
      fr: "Louka - Diamant/Perle",
      tags: ["Characters"],
    },
    {
      id: 383,
      en: "Jubilife City (Night) - Diamond/Pearl",
      fr: "Féli-Cité (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 384,
      en: "TV Station - Diamond/Pearl",
      fr: "Féli-Télé - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 385,
      en: "GTS - Diamond/Pearl",
      fr: "GTS - Diamant/Perle",
      tags: ["Menu"],
    },
    {
      id: 386,
      en: "Surf - Diamond/Pearl",
      fr: "Surf - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 387,
      en: "Canalave City (Night) - Diamond/Pearl",
      fr: "Joliberges (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 388,
      en: "Route 203/204/218 (Night) - Diamond/Pearl",
      fr: "Route 203/204/218 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 389,
      en: "Trainers' Eyes Meet (Black Belt) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Karatéka) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 390,
      en: "Oreburgh City (Night) - Diamond/Pearl",
      fr: "Charbourg (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    // Confusing, West apply to 211 and Day to 205 and 211...
    {
      id: 391,
      en: "Route 205/211 (West) (Night) - Diamond/Pearl",
      fr: "Route 205/211 (Ouest) (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 392,
      en: "Trainers' Eyes Meet (Sailor) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Marin) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 393,
      en: "Eterna City/Celestic Town (Night) - Diamond/Pearl",
      fr: "Vestigion/Célestia (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 394,
      en: "The Underground - Diamond/Pearl",
      fr: "Le Souterrain - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 395,
      en: "Captured a Flag Underground! - Diamond/Pearl",
      fr: "Drapeau capturé! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 396,
      en: "Trainers' Eyes Meet (Aroma Lady) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Aroma) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 397,
      en: "Floaroma Town/Seabreak Path/Flower Paradise (Night) - Diamond/Pearl",
      fr: "Floraville/Passage Marin/Paradis Fleuri (Nuit) - Diamant/Perle",
      tags: ["Cities", "Outdoor Location"],
    },
    {
      id: 398,
      en: "Old Chateau/Spring Path/Sendoff Spring/Turnback Cave/Newmoon Island - Diamond/Pearl",
      fr: "Vieux Château/Chemin Source/Source Adieu/Grotte Retour/Île Nouvellune - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 399,
      en: "Solaceon Town/Pastoria City (Night) - Diamond/Pearl",
      fr: "Bonville/Verchamps (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 400,
      en: "Great Marsh/Pal Park - Diamond/Pearl",
      fr: "Grand Marais/Parc des Amis - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 401,
      en: "Route 206/207/208/220/221 (Night) - Diamond/Pearl",
      fr: "Route 206/207/208/220/221 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 402,
      en: "Trainers' Eyes Meet (Collector) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Collec) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 403,
      en: "Veilstone City (Night) - Diamond/Pearl",
      fr: "Voilaroc (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 404,
      en: "Game Corner - Diamond/Pearl",
      fr: "Casino - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 405,
      en: "You're a Winner! - Diamond/Pearl",
      fr: "Casino: Gagné! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 406,
      en: "You're a Jackpot Winner! - Diamond/Pearl",
      fr: "Casino: Jackpot! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 407,
      en: "Trainers' Eyes Meet (PI) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Croupier) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 408,
      en: "Route 209/212/222 (Night) - Diamond/Pearl",
      fr: "Route 209/212/222 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 409,
      en: "Snowpoint City (Night) - Diamond/Pearl",
      fr: "Frimapic (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 410,
      en: "Route 216/217/Acuity Lakefront (Night) - Diamond/Pearl",
      fr: "Route 216/217/Rive Lac Savoir (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 411,
      en: "Lake Caverns - Diamond/Pearl",
      fr: "Cavernes lacustres - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 412,
      en: "Battle! (Azelf/Mesprit/Uxie) - Diamond/Pearl",
      fr: "Combat! (Créfadet/Créfollet/Créhelf) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 413,
      en: "Route 210/211 (East)/214/215/223/224 (Night) - Diamond/Pearl",
      fr: "Route 210/211 (Est)/214/215/223/224 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 414,
      en: "A Poké Radar Hit! - Diamond/Pearl",
      fr: "Détection du Poké Radar! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 415,
      en: "Sunyshore City (Night) - Diamond/Pearl",
      fr: "Rivamar (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 416,
      en: "Trainers' Eyes Meet (Artist) - Diamond/Pearl",
      fr: "Rencontre avec un Dresseur (Peintre) - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 417,
      en: "Amity Square - Diamond/Pearl",
      fr: "Square Paisible - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 418,
      en: "Hearthome City (Night) - Diamond/Pearl",
      fr: "Unionpolis (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 419,
      en: "Contest Hall - Diamond/Pearl",
      fr: "Salle de Concours - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 420,
      en: "Poffins - Diamond/Pearl",
      fr: "Poffins - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 421,
      en: "Super Contest! - Diamond/Pearl",
      fr: "Super Concours Pokémon! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 422,
      en: "Contest: Dress Up - Diamond/Pearl",
      fr: "Concours: Habillage - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 423,
      en: "Dance: Easy - Diamond/Pearl",
      fr: "Épreuve de Danse: Facile - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 424,
      en: "Dance: Difficult - Diamond/Pearl",
      fr: "Épreuve de Danse: Difficile - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 425,
      en: "Contest: Results Announcement - Diamond/Pearl",
      fr: "Concours: Annonce des résultats - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 426,
      en: "Contest: Winner - Diamond/Pearl",
      fr: "Concours: Vainqueur! - Diamant/Perle",
      tags: ["Mini Games"],
    },
    {
      id: 427,
      en: "Route 228/229/230 (Night) - Diamond/Pearl",
      fr: "Route 228/229/230 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 428,
      en: "Valor Lakefront/Route 213/Resort Area (Night) - Diamond/Pearl",
      fr: "Rive Lac Courage/Route 213/Aire de Détente (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 429,
      en: "Fight Area/Survival Area (Night) - Diamond/Pearl",
      fr: "Aire de Combat/Aire de Survie (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 430,
      en: "Battle Tower - Diamond/Pearl",
      fr: "Tour de Combat - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 431,
      en: "Route 225/226/227 (Night) - Diamond/Pearl",
      fr: "Route 225/226/227 (Nuit) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 432,
      en: "Stark Mountain - Diamond/Pearl",
      fr: "Mont Abrupt - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    {
      id: 433,
      en: "Battle! (Legendary Pokémon) - Diamond/Pearl",
      fr: "Combat! (Pokémon légendaire) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 434,
      en: "Mystery Gift - Diamond/Pearl",
      fr: "Cadeau Mystère - Diamant/Perle",
      tags: ["Menu"],
    },
    {
      id: 435,
      en: "Pokémon League (Night) - Diamond/Pearl",
      fr: "Ligue Pokémon (Nuit) - Diamant/Perle",
      tags: ["Cities"],
    },
    {
      id: 436,
      en: "Decisive Battle! (Pokémon League) - Diamond/Pearl",
      fr: "Combat décisif! (Pokémon League) - Diamant/Perle",
      tags: ["Buildings"],
    },
    {
      id: 437,
      en: "The Elite Four Appear! - Diamond/Pearl",
      fr: "Le Conseil 4 apparaît! - Diamant/Perle",
      tags: ["Encounters"],
    },
    {
      id: 438,
      en: "Battle! (Elite Four) - Diamond/Pearl",
      fr: "Combat! (Conseil 4) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 439,
      en: "Victory! (Elite Four) - Diamond/Pearl",
      fr: "Victoire! (Conseil 4) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 440,
      en: "Champion Cynthia - Diamond/Pearl",
      fr: "Maître Cynthia - Diamant/Perle",
      tags: ["Characters"],
    },
    {
      id: 441,
      en: "Battle! (Champion Cynthia) - Diamond/Pearl",
      fr: "Combat! (Maître Cynthia) - Diamant/Perle",
      tags: ["Battles"],
    },
    {
      id: 442,
      en: "Victory! (Champion Cynthia) - Diamond/Pearl",
      fr: "Victoire! (Maître Cynthia) - Diamant/Perle",
      tags: ["Victories"],
    },
    {
      id: 443,
      en: "Hall of Fame - Diamond/Pearl",
      fr: "Panthéon - Diamant/Perle",
      tags: ["Repetable Events"],
    },
    {
      id: 444,
      en: "Congratulations on Entering the Hall of Fame! - Diamond/Pearl",
      fr: "Entrée au Panthéon! - Diamant/Perle",
      tags: ["Repetable Events"],
    },
    {
      id: 445,
      en: "Ending Theme - Diamond/Pearl",
      fr: "Générique de fin - Diamant/Perle",
      tags: ["Repetable Events"],
    },
    {
      id: 446,
      en: "Arceus (Hall of Origin) - Diamond/Pearl",
      fr: "Arceus (Salle Originelle) - Diamant/Perle",
      tags: ["Outdoor Location"],
    },
    // { Keeping the HGSS version because the event wasn't available for DPP
    //     id: -2,
    //     en: "Battle! (Arceus) - Diamond/Pearl",
    //     fr: "Combat! (Arceus) - Diamant/Perle",
    // },

    //// Platinum
    // Source name and order : Disc 4 of :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_2_%26_Pok%C3%A9mon_White_2:_Super_Music_Collection
    //    https://vgmdb.net/album/33367
    //    https://www.sittingonclouds.com/album/458
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-noir-2-et-pok%C3%A9mon-blanc-2-super-music-collection/880137987
    {
      id: 447,
      en: "Title Screen - Platinum",
      fr: "Écran titre - Platine",
      tags: ["Menu"],
    },
    {
      id: 448,
      en: "Press Start - Platinum",
      fr: "Appuyez sur Start - Platine",
      tags: ["Menu"],
    },
    {
      id: 449,
      en: 'Special Program: "Let\'s Ask Prof. Rowan!" - Platinum',
      fr: "Programme spécial : Questions au Professeur Sorbier - Platine",
      tags: ["Story Events"],
    },
    {
      id: 450,
      en: "Looker's Theme - Platinum",
      fr: "Thème de Beladonis - Platine",
      tags: ["Characters"],
    },
    {
      id: 451,
      en: "Global Terminal - Platinum",
      fr: "Terminal Mondial  - Platine",
      tags: ["Buildings"],
    },
    {
      id: 452,
      en: "Wi-Fi Plaza - Platinum",
      fr: "Square Wi-Fi - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 453,
      en: "Wi-Fi Plaza: Minigames - Platinum",
      fr: "Jeux du Square Wi-Fi - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 454,
      en: "Wi-Fi Plaza: Parade - Platinum",
      fr: "Square Wi-Fi: Parade - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 455,
      en: "Giratina Appears! - Platinum",
      fr: "Giratina apparaît! - Platine",
      tags: ["Encounters"],
    },
    {
      id: 456,
      en: "Distortion World - Platinum",
      fr: "Monde Distorsion - Platine",
      tags: ["Outdoor Location"],
    },
    {
      id: 457,
      en: "Battle! (Giratina) - Platinum",
      fr: "Combat! (Giratina) - Platine",
      tags: ["Battles"],
    },
    {
      id: 458,
      en: "Spin Trade - Platinum",
      fr: "Œuf Surprise - Platine",
      tags: ["Menu"],
    },
    {
      id: 459,
      en: "Mystery Gift - Platinum",
      fr: "Cadeau Mystère - Platine",
      tags: ["Menu"],
    },
    {
      id: 460,
      en: "Super Contest: Cuteness - Platinum",
      fr: "Super Concours Pokémon: Grâce - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 461,
      en: "Super Contest: Coolness - Platinum",
      fr: "Super Concours Pokémon: Sang-froid - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 462,
      en: "Super Contest: Toughness - Platinum",
      fr: "Super Concours Pokémon: Robustesse - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 463,
      en: "Super Contest: Beauty - Platinum",
      fr: "Super Concours Pokémon: Beauté - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 464,
      en: "Super Contest: Smartness - Platinum",
      fr: "Super Concours Pokémon: Intelligence - Platine",
      tags: ["Mini Games"],
    },
    {
      id: 465,
      en: "Villa Music Box: Twinleaf Tune - Platinum",
      fr: "Boîte Musicale de la Villa: Bonaugure - Platine",
      tags: ["Repetable Events"],
    },
    {
      id: 466,
      en: "Villa Audio System: Bossa Nova Lilycove - Platinum",
      fr: "Chaîne stéréo de la Villa : La Bossa Nova de Nénucrique - Platine",
      tags: ["Repetable Events"],
    },
    {
      id: 467,
      en: "Fight Area/Battle Frontier - Platinum",
      fr: "Aire de Combat/Zone de Combat - Platine",
      tags: ["Cities"],
    },
    {
      id: 468,
      en: "Battle Arcade - Platinum",
      fr: "Arcade de Combat - Platine",
      tags: ["Buildings"],
    },
    {
      id: 469,
      en: "Battle Hall - Platinum",
      fr: "Scène de Combat - Platine",
      tags: ["Buildings"],
    },
    {
      id: 470,
      en: "Battle Factory - Platinum",
      fr: "Usine de Combat - Platine",
      tags: ["Buildings"],
    },
    {
      id: 471,
      en: "Battle Castle - Platinum",
      fr: "Castel de Combat - Platine",
      tags: ["Buildings"],
    },
    {
      id: 472,
      en: "Battle! (Frontier Brain) - Platinum",
      fr: "Combat! (Meneur de Zone) - Platine",
      tags: ["Battles"],
    },
    {
      id: 473,
      en: "Victory! (Frontier Brain) - Platinum",
      fr: "Victoire! (Meneur de Zone) - Platine",
      tags: ["Victories"],
    },
    {
      id: 474,
      en: "Battle! (Regirock/Regice/Registeel) - Platinum",
      fr: "Combat! (Regirock/Regice/Registeel) - Platine",
      tags: ["Battles"],
    },

    //// HeartGold/SoulSilver
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_HeartGold_%26_Pok%C3%A9mon_SoulSilver:_Super_Music_Collection
    //    https://vgmdb.net/album/15237
    //    https://www.sittingonclouds.com/album/817
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-heartgold-et-pok%C3%A9mon-soulsilver-super-music/880662983
    {
      id: 475,
      en: "Opening Movie - HeartGold/SoulSilver",
      fr: "Séquence d'introduction - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 476,
      en: "Title Screen - HeartGold/SoulSilver",
      fr: "Écran titre - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 477,
      en: "An Adventure Begins! - HeartGold/SoulSilver",
      fr: "L'aventure commence! - Or HeartGold/Argent SoulSilver",
      tags: ["Story Events"],
    },
    {
      id: 478,
      en: "New Bark Town - HeartGold/SoulSilver",
      fr: "Bourg Geon - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 479,
      en: "Hurry Along - HeartGold/SoulSilver",
      fr: "En route! - Or HeartGold/Argent SoulSilver",
      tags: ["Story Events"],
    },
    {
      id: 480,
      en: "Lyra - HeartGold/SoulSilver",
      fr: "Célesta - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 481,
      en: "Elm Pokémon Lab - HeartGold/SoulSilver",
      fr: "Laboratoire du Professeur Orme - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 482,
      en: "Route 29 - HeartGold/SoulSilver",
      fr: "Route 29 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 483,
      en: "Battle! (Wild Pokémon—Johto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Pokémon sauvage—Version Johto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 484,
      en: "Victory! (Wild Pokémon) - HeartGold/SoulSilver",
      fr: "Victoire! (Pokémon sauvage) - Or HeartGold/Argent SoulSilver",
      tags: ["Victories"],
    },
    {
      id: 485,
      en: "Cherrygrove City/Mahogany Town - HeartGold/SoulSilver",
      fr: "Ville Griotte/Acajou - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 486,
      en: "Hurry Along 2 - HeartGold/SoulSilver",
      fr: "En route! 2 - Or HeartGold/Argent SoulSilver",
      tags: ["Story Events"],
    },
    {
      id: 487,
      en: "Pokémon Center - HeartGold/SoulSilver",
      fr: "Centre Pokémon - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 488,
      en: "Trainers' Eyes Meet (Boy 1) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Garçon 1) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 489,
      en: "Battle! (Trainer Battle—Johto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Combat de Dresseur—Version Johto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 490,
      en: "Victory! (Trainer Battle) - HeartGold/SoulSilver",
      fr: "Victoire! (Combat de Dresseur) - Or HeartGold/Argent SoulSilver",
      tags: ["Victories"],
    },
    {
      id: 491,
      en: "Route 30/31/32/33 - HeartGold/SoulSilver",
      fr: "Route 30/31/32/33 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 492,
      en: "Violet City/Olivine City - HeartGold/SoulSilver",
      fr: "Mauville/Oliville - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 493,
      en: "Sprout Tower - HeartGold/SoulSilver",
      fr: "Tour Chétiflor - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 494,
      en: "Trainers' Eyes Meet (Sage) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Sage) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 495,
      en: "Poké Mart - HeartGold/SoulSilver",
      fr: "Boutique Pokémon - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    // Listed as a different music as Ecruteak Dance Theater but i don't hear any difference
    //{
    //  id: -3,
    //  en: "Kimono Girl - HeartGold/SoulSilver",
    //  fr: "Kimono - Or HeartGold/Argent SoulSilver",
    //},
    {
      id: 496,
      en: "Union Cave/Slowpoke Well/Ilex Forest/Whirl Islands/Mt. Mortar/Tohjo Falls/Mt. Moon/Embedded Tower - HeartGold/SoulSilver",
      fr: "Caves Jumelles/Puits Ramoloss/Bois aux Chênes/Tourb'Îles/Mont Creuset/Chutes Tohjo/Mont Sélénite/Tour Enfouie - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 497,
      en: "Ruins of Alph - HeartGold/SoulSilver",
      fr: "Ruines d'Alpha - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 498,
      en: "Pokégear Radio: Unown - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Zarbi - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 499,
      en: "Azalea Town/Blackthorn City - HeartGold/SoulSilver",
      fr: "Écorcia/Ébènelle - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 500,
      en: "Trainers' Eyes Meet (Team Rocket) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Team Rocket) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 501,
      en: "Battle! (Team Rocket) - HeartGold/SoulSilver",
      fr: "Combat! (Team Rocket) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 502,
      en: "Route 34/35/36/37/40/41/45/46/Cliff Edge Gate - HeartGold/SoulSilver",
      fr: "Route 34/35/36/37/40/41/45/46/Portail Falaise - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 503,
      en: "A Rival Appears!/Silver's Theme - HeartGold/SoulSilver",
      fr: "Le rival apparaît!/Thème de Silver - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters", "Characters"],
    },
    {
      id: 504,
      en: "Battle! (Rival Silver) - HeartGold/SoulSilver",
      fr: "Combat! (Rival Silver) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 505,
      en: "Evolution - HeartGold/SoulSilver",
      fr: "Évolution - Or HeartGold/Argent SoulSilver",
      tags: ["Repetable Events"],
    },
    {
      id: 506,
      en: "Goldenrod City - HeartGold/SoulSilver",
      fr: "Doublonville - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 507,
      en: "Pokémon Gym - HeartGold/SoulSilver",
      fr: "Arène Pokémon - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 508,
      en: "Battle! (Gym Leader—Johto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Champion d'Arène—Version Johto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 509,
      en: "Victory! (Gym Leader) - HeartGold/SoulSilver",
      fr: "Victoire! (Champion d'Arène) - Or HeartGold/Argent SoulSilver",
      tags: ["Victories"],
    },
    {
      id: 510,
      en: "Pokégear Radio: Buena's Password - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Le Mot de Passe de Buena - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 511,
      en: "Goldenrod Game Corner - HeartGold/SoulSilver",
      fr: "Casino de Doublonville - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 512,
      en: "You're a Winner! - HeartGold/SoulSilver",
      fr: "Gagné aux jeux! - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 513,
      en: "Global Terminal - HeartGold/SoulSilver",
      fr: "Terminal Mondial  - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 514,
      en: "GTS - HeartGold/SoulSilver",
      fr: "GTS - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 515,
      en: "Bicycle/Route 17 (Cycling Road) - HeartGold/SoulSilver",
      fr: "Bicyclette/Route 17 (Piste cyclable) - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 516,
      en: "Trainers' Eyes Meet (Girl 1) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Fille 1) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 517,
      en: "National Park - HeartGold/SoulSilver",
      fr: "Parc Naturel - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 518,
      en: "Ecruteak City - HeartGold/SoulSilver",
      fr: "Rosalia - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    // Listed as a different music as Kimono Girl but i don't hear any difference
    {
      id: 519,
      en: "Ecruteak Dance Theater/Kimono Girl - HeartGold/SoulSilver",
      fr: "Salle de Danse de Rosalia/Kimono - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 520,
      en: "Burned Tower - HeartGold/SoulSilver",
      fr: "Tour Cendrée - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 521,
      en: "Eusine - HeartGold/SoulSilver",
      fr: "Eusine - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 522,
      en: "Pokégear Radio: Professor Oak's Pokémon Talk - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Chronique du Professeur Chen - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 523,
      en: "Route 38/39 - HeartGold/SoulSilver",
      fr: "Route 38/39 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 524,
      en: "Pokégear Radio: Pokémon March - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Fanfare Pokémon - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 525,
      en: "Battle! (Raikou) - HeartGold/SoulSilver",
      fr: "Combat! (Raikou) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 526,
      en: "Olivine's Lighthouse/Mt. Silver Cave - HeartGold/SoulSilver",
      fr: "Phare d'Oliville/Grotte Argentée - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 527,
      en: "Surf - HeartGold/SoulSilver",
      fr: "Surf - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 528,
      en: "Cianwood City - HeartGold/SoulSilver",
      fr: "Irisia - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 529,
      en: "Route 42/43/44/Lake of Rage - HeartGold/SoulSilver",
      fr: "Route 42/43/44/Lac Colère - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 530,
      en: "Team Rocket HQ - HeartGold/SoulSilver",
      fr: "Repaire Rocket - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 531,
      en: "Trainers' Eyes Meet (Suspicious Person 1) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Personne louche 1) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 532,
      en: "A Rival Appears!/Silver's Theme (Version 2) - HeartGold/SoulSilver",
      fr: "Le rival apparaît!/Thème de Silver (Version 2) - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 533,
      en: "Radio Tower Occupied! - HeartGold/SoulSilver",
      fr: "La Tour Radio est occupée! - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 534,
      en: "Ice Path/Dark Cave/Seafoam Islands - HeartGold/SoulSilver",
      fr: "Route de Glace/Antre Noir/Îles Écume - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 535,
      en: "Dragon's Den - HeartGold/SoulSilver",
      fr: "Antre du Dragon - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 536,
      en: "Clair - HeartGold/SoulSilver",
      fr: "Sandra - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 537,
      en: "Battle! (Entei) - HeartGold/SoulSilver",
      fr: "Combat! (Entei) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 538,
      en: "Bell Tower - HeartGold/SoulSilver",
      fr: "Tour Carillon - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 539,
      en: "The Dance of Ecruteak - HeartGold/SoulSilver",
      fr: "La Danse de Rosalia - Or HeartGold/Argent SoulSilver",
      tags: ["Story Events"],
    },
    {
      id: 540,
      en: "Ho-Oh Appears! - HeartGold/SoulSilver",
      fr: "Ho-Oh apparaît! - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 541,
      en: "Battle! (Ho-Oh) - HeartGold/SoulSilver",
      fr: "Combat! (Ho-Oh) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 542,
      en: "Route 26/27 - HeartGold/SoulSilver",
      fr: "Route 26/27 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 543,
      en: "S.S. Aqua - HeartGold/SoulSilver",
      fr: "L'Aquaria - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 544,
      en: "Vermilion City - HeartGold/SoulSilver",
      fr: "Carmin sur Mer - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 545,
      en: "Battle! (Gym Leader—Kanto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Champion d'Arène—Version Kanto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 546,
      en: "Lavender Town - HeartGold/SoulSilver",
      fr: "Lavanville - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 547,
      en: "Rock Tunnel/Diglett's Cave/Underground Path/Cerulean Cave - HeartGold/SoulSilver",
      fr: "Grotte/Cave Taupiqueur/Souterrain/Caverne Azurée - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 548,
      en: "Battle! (Wild Pokémon—Kanto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Pokémon sauvage—Version Kanto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 549,
      en: "Cerulean City/Fuchsia City - HeartGold/SoulSilver",
      fr: "Azuria/Parmanie - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 550,
      en: "Route 24/25 - HeartGold/SoulSilver",
      fr: "Route 24/25 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 551,
      en: "Pokégear Radio: Pokémon Lullaby - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Berceuse Pokémon - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 552,
      en: "Battle! (Suicune) - HeartGold/SoulSilver",
      fr: "Combat! (Suicune) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 553,
      en: "Celadon City - HeartGold/SoulSilver",
      fr: "Céladopole - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 554,
      en: "Ethan - HeartGold/SoulSilver",
      fr: "Luth - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 555,
      en: "Route 11/12/13/14/15 - HeartGold/SoulSilver",
      fr: "Route 11/12/13/14/15 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 556,
      en: "Pokégear Radio: Poké Flute - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Pokéflûte - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 557,
      en: "Viridian Forest - HeartGold/SoulSilver",
      fr: "Forêt de Jade - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 558,
      en: "Trainers' Eyes Meet (Boy 2) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Garçon 2) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 559,
      en: "Pewter City/Viridian City/Saffron City - HeartGold/SoulSilver",
      fr: "Argenta/Jadielle/Safrania - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 560,
      en: "Route 2/3/4/5/6/7/8/9/10/16/18/19/20/21/22 - HeartGold/SoulSilver",
      fr: "Route 2/3/4/5/6/7/8/9/10/16/18/19/20/21/22 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 561,
      en: "Trainers' Eyes Meet (Suspicious Person 2) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Personne louche 2) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 562,
      en: "Clefairy Dance in Mt. Moon - HeartGold/SoulSilver",
      fr: "Danse des Mélofée au Mont Sélénite - Or HeartGold/Argent SoulSilver",
      tags: ["Repetable Events"],
    },
    {
      id: 563,
      en: "Route 1 - HeartGold/SoulSilver",
      fr: "Route 1 - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 564,
      en: "Pallet Town - HeartGold/SoulSilver",
      fr: "Bourg Palette - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 565,
      en: "Professor Oak - HeartGold/SoulSilver",
      fr: "Professeur Chen - Or HeartGold/Argent SoulSilver",
      tags: ["Characters"],
    },
    {
      id: 566,
      en: "Trainers' Eyes Meet (Girl 2) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Fille 2) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 567,
      en: "Battle! (Trainer Battle—Kanto Version) - HeartGold/SoulSilver",
      fr: "Combat! (Combat de Dresseur—Version Kanto) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 568,
      en: "Cinnabar Island - HeartGold/SoulSilver",
      fr: "Cramois'Île - Or HeartGold/Argent SoulSilver",
      tags: ["Cities"],
    },
    {
      id: 569,
      en: "Route 47/48/Cliff Cave - HeartGold/SoulSilver",
      fr: "Route 47/48/Grotte Falaise - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 570,
      en: "Safari Zone Gate - HeartGold/SoulSilver",
      fr: "Portail Safari - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 571,
      en: "Safari Zone/Pal Park - HeartGold/SoulSilver",
      fr: "Parc Safari/Parc des Amis - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 572,
      en: "Pokégear Radio: Variety Channel - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Chaîne Variété - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 573,
      en: "The Bug-Catching Contest Begins! - HeartGold/SoulSilver",
      fr: "Le Concours de Capture d'insecte Commence! - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 574,
      en: "The Bug-Catching Contest - HeartGold/SoulSilver",
      fr: "Concours de Capture d'insecte - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 575,
      en: "Pokéathlon: In the Pokéathlon Dome - HeartGold/SoulSilver",
      fr: "Pokéathlon: Dans le Dôme Pokéathlon - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 576,
      en: "Pokéathlon: Opening Ceremony - HeartGold/SoulSilver",
      fr: "Pokéathlon: Cérémonie d'Ouverture - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 577,
      en: "Pokéathlon: An Event Begins! - HeartGold/SoulSilver",
      fr: "Pokéathlon: Ouverture d'une épreuve - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 578,
      en: "Pokéathlon: Event Time! - HeartGold/SoulSilver",
      fr: "Pokéathlon: Épreuve en cours - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 579,
      en: "Pokéathlon: Finals! - HeartGold/SoulSilver",
      fr: "Pokéathlon: Finale - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 580,
      en: "Pokéathlon: Results Announcement - HeartGold/SoulSilver",
      fr: "Pokéathlon: Annonce des résultats - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 581,
      en: "Pokéathlon: Medal Ceremony - HeartGold/SoulSilver",
      fr: "Pokéathlon: Remise des médailles - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 582,
      en: "Pokéathlon Winner! - HeartGold/SoulSilver",
      fr: "Vainqueur au Pokéathlon - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 583,
      en: "Battle Tower Reception Desk - HeartGold/SoulSilver",
      fr: "Tour de Combat (Réception) - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 584,
      en: "Battle Tower (Johto)/Frontier Access/Battle Frontier - HeartGold/SoulSilver",
      fr: "Tour de Combat (Johto)/Atrium Combat/Zone de Combat - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 585,
      en: "Battle Factory - HeartGold/SoulSilver",
      fr: "Usine de Combat - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 586,
      en: "Battle Hall - HeartGold/SoulSilver",
      fr: "Scène de Combat - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 587,
      en: "Battle Arcade - HeartGold/SoulSilver",
      fr: "Arcade de Combat - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 588,
      en: "Battle Castle - HeartGold/SoulSilver",
      fr: "Castel de Combat - Or HeartGold/Argent SoulSilver",
      tags: ["Buildings"],
    },
    {
      id: 589,
      en: "Battle! (Frontier Brain) - HeartGold/SoulSilver",
      fr: "Combat! (Meneur de Zone) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 590,
      en: "Victory! (Frontier Brain) - HeartGold/SoulSilver",
      fr: "Victoire! (Meneur de Zone) - Or HeartGold/Argent SoulSilver",
      tags: ["Victories"],
    },
    {
      id: 591,
      en: "Pokégear Radio: Trainer Channel - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Portrait de Dresseur - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 592,
      en: "Nintendo Wi-Fi Connection - HeartGold/SoulSilver",
      fr: "Connexion Wi-Fi Nintendo - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 593,
      en: "Wi-Fi Plaza - HeartGold/SoulSilver",
      fr: "Square Wi-Fi - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 594,
      en: "Wi-Fi Plaza: Plaza Games - HeartGold/SoulSilver",
      fr: "Jeux du Square Wi-Fi - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 595,
      en: "Wi-Fi Plaza: Parade - HeartGold/SoulSilver",
      fr: "Square Wi-Fi: Parade - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 596,
      en: "Pokégear Radio: Route 101 - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Route 101 - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 597,
      en: "Pokégear Radio: Route 201 - HeartGold/SoulSilver",
      fr: "Radio Pokématos: Route 201 - Or HeartGold/Argent SoulSilver",
      tags: ["Menu"],
    },
    {
      id: 598,
      en: "Pokéwalker - HeartGold/SoulSilver",
      fr: "Pokéwalker - Or HeartGold/Argent SoulSilver",
      tags: ["Mini Games"],
    },
    {
      id: 599,
      en: "Spiky-Eared Pichu Appears! - HeartGold/SoulSilver",
      fr: "Pichu Troizépi apparaît! - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 600,
      en: "Trainers' Eyes Meet (Kimono Girl) - HeartGold/SoulSilver",
      fr: "Rencontre avec un Dresseur (Kimono) - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 601,
      en: "Lugia Appears! - HeartGold/SoulSilver",
      fr: "Lugia apparaît! - Or HeartGold/Argent SoulSilver",
      tags: ["Encounters"],
    },
    {
      id: 602,
      en: "Battle! (Lugia) - HeartGold/SoulSilver",
      fr: "Combat! (Lugia) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 603,
      en: "Victory Road - HeartGold/SoulSilver",
      fr: "Route Victoire - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 604,
      en: "The Pokémon League/Indigo Plateau/Route 28/Mt. Silver - HeartGold/SoulSilver",
      fr: "Ligue Pokémon/Plateau Indigo/Route 28/Mont Argenté - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 605,
      en: "Battle! (Champion Lance) - HeartGold/SoulSilver",
      fr: "Combat! (Maître Peter) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 606,
      en: "The Hall of Fame - HeartGold/SoulSilver",
      fr: "Panthéon - Or HeartGold/Argent SoulSilver",
      tags: ["Repetable Events"],
    },
    {
      id: 607,
      en: "Ending Theme - HeartGold/SoulSilver",
      fr: "Générique de fin - Or HeartGold/Argent SoulSilver",
      tags: ["Repetable Events"],
    },
    {
      id: 608,
      en: "The End - HeartGold/SoulSilver",
      fr: "Fin - Or HeartGold/Argent SoulSilver",
      tags: ["Repetable Events"],
    },
    {
      id: 609,
      en: "Battle! (Super-Ancient Pokémon (Kyogre/Groudon/Rayquaza)) - HeartGold/SoulSilver",
      fr: "Combat! (Pokémon ancestral (Kyogre/Groudon/Rayquaza)) - Or HeartGold/Argent SoulSilver",
      tags: ["Battles"],
    },
    {
      id: 610,
      en: "Sinjoh Ruins - HeartGold/SoulSilver",
      fr: "Ruines Sinjoh - Or HeartGold/Argent SoulSilver",
      tags: ["Outdoor Location"],
    },
    {
      id: 611,
      en: "Arceus - HeartGold/SoulSilver",
      fr: "Arceus - Or HeartGold/Argent SoulSilver",
      tags: ["Story Events"],
    },

    //// Black/White
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_%26_Pok%C3%A9mon_White:_Super_Music_Collection
    //    https://vgmdb.net/album/20831
    //    https://www.sittingonclouds.com/album/332
    // Source seasons :
    //    https://www.youtube.com/watch?v=QqK1G2NFHq8
    //    https://www.youtube.com/watch?v=8Xvn_swOoe8
    // Source traduction:
    //    https://music.apple.com/fr/album/pok%C3%A9mon-noir-et-pok%C3%A9mon-blanc-super-music-collection/880131315
    {
      id: 612,
      en: "Coronation Day - Black/White",
      fr: "Couronnement - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 613,
      en: "Title Screen - Black/White",
      fr: "Écran titre - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 614,
      en: "Onward to Adventure! - Black/White",
      fr: "En route pour l'aventure! - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 615,
      en: "A Day of Beginnings - Black/White",
      fr: "Premier jour - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 616,
      en: "Nuvema Town - Black/White",
      fr: "Renouet - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 617,
      en: "Battle! (Cheren/Bianca) - Black/White",
      fr: "Combat! (Tcheren/Bianca) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 618,
      en: "Hurry Along 1 - Black/White",
      fr: "En route! 1 - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 619,
      en: "Professor Juniper - Black/White",
      fr: "Professeure Keteleeria - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 620,
      en: "Juniper Pokémon Lab - Black/White",
      fr: "Laboratoire du Professeur Keteleeria - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 621,
      en: "Let's Go Together! - Black/White",
      fr: "Ensemble! - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 622,
      en: "Route 1 - Black/White",
      fr: "Route 1 - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 623,
      en: "Battle! (Wild Pokémon) - Black/White",
      fr: "Combat! (Pokémon sauvage) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 624,
      en: "Victory! (Wild Pokémon) - Black/White",
      fr: "Victoire! (Pokémon sauvage) - Noir/Blanc",
      tags: ["Victories"],
    },
    {
      id: 625,
      en: "Accumula Town - Black/White",
      fr: "Arabelle - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 626,
      en: "Hurry Along 2 - Black/White",
      fr: "En route! 2 - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 627,
      en: "Pokémon Center - Black/White",
      fr: "Centre Pokémon - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 628,
      en: "Team Plasma Plots - Black/White",
      fr: "La Team Plasma complote - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 629,
      en: "Route 2/3 (Summer) - Black/White",
      fr: "Route 2/3 (Été) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 630,
      en: "Route 2/3 (Spring) - Black/White",
      fr: "Route 2/3 (Printemps) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 631,
      en: "Trainers' Eyes Meet (Youngster) - Black/White",
      fr: "Rencontre avec un Dresseur (Gamin) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 632,
      en: "Battle! (Trainer Battle) - Black/White",
      fr: "Combat! (Combat de Dresseur) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 633,
      en: "Victory! (Trainer Battle) - Black/White",
      fr: "Victoire! (Combat de Dresseur) - Noir/Blanc",
      tags: ["Victories"],
    },
    {
      id: 634,
      en: "Trainers' Eyes Meet (Lass) - Black/White",
      fr: "Rencontre avec un Dresseur (Fillette) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 635,
      en: "Striaton City - Black/White",
      fr: "Ogoesse - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 636,
      en: "The Dreamyard/Pinwheel Forest/Moor of Icirrus - Black/White",
      fr: "Vestiges du Rêve/Forêt d'Empoigne/Tourbière Flocombe - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 637,
      en: "Team Plasma Appears! - Black/White",
      fr: "La Team Plasma apparaît! - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 638,
      en: "Battle! (Team Plasma) - Black/White",
      fr: "Combat! (Team Plasma) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 639,
      en: "Victory! (Team Plasma) - Black/White",
      fr: "Victoire! (Team Plasma) - Noir/Blanc",
      tags: ["Victories"],
    },
    {
      id: 640,
      en: "Evolution - Black/White",
      fr: "Évolution - Noir/Blanc",
      tags: ["Repetable Events"],
    },
    {
      id: 641,
      en: "Trainers' Eyes Meet (Twins) - Black/White",
      fr: "Rencontre avec un Dresseur (Jumelles) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 642,
      en: "Cheren's Theme - Black/White",
      fr: "Thème de Tcheren - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 643,
      en: "There's Trouble! - Black/White",
      fr: "Troubles à Unys! - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 644,
      en: "Nacrene City - Black/White",
      fr: "Maillard - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 645,
      en: "Pokémon Gym - Black/White",
      fr: "Arène Pokémon - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 646,
      en: "Battle! (Gym Leader) - Black/White",
      fr: "Combat! (Champion d'Arène) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 647,
      en: "Victory Lies Before You! - Black/White",
      fr: "La victoire t'attend! - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 648,
      en: "Victory! (Gym Leader) - Black/White",
      fr: "Victoire! (Champion d'Arène) - Noir/Blanc",
      tags: ["Victories"],
    },
    {
      id: 649,
      en: "Gate - Black/White",
      fr: "Porte - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 650,
      en: "Skyarrow Bridge - Black/White",
      fr: "Pont Sagiciel - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 651,
      en: "Castelia City - Black/White",
      fr: "Volucité - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 652,
      en: "Trainers' Eyes Meet (Clerk Male) - Black/White",
      fr: "Rencontre avec un Dresseur (Employé) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 653,
      en: "Route 4/5/16 (Spring) - Black/White",
      fr: "Route 4/5/16 (Printemps) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 654,
      en: "Trainers' Eyes Meet (Backpacker) - Black/White",
      fr: "Rencontre avec un Dresseur (Randonneur/Randonneuse) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 655,
      en: "Nimbasa City - Black/White",
      fr: "Méanville - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 656,
      en: "Bianca's Theme - Black/White",
      fr: "Thème de Bianca - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 657,
      en: "An Unwavering Heart - Black/White",
      fr: "Constance - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 658,
      en: "Prisoner to a Formula - Black/White",
      fr: "Prisonier de ses équations - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 659,
      en: "Battle! (N) - Black/White",
      fr: "Combat! (N) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 660,
      en: "A Tight Spot During Battle! - Black/White",
      fr: "Combat: moment critique! - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 661,
      en: "Bicycle - Black/White",
      fr: "Bicyclette - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 662,
      en: "Champion Alder - Black/White",
      fr: "Maître Goyah  - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 663,
      en: "Driftveil Drawbridge - Black/White",
      fr: "Pont Yoneuve - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 664,
      en: "Driftveil City - Black/White",
      fr: "Port Yoneuve - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 665,
      en: "Cold Storage/Twist Mountain/Clay Tunnel - Black/White",
      fr: "Hangar Frigorifique/Mont Foré/Route Bardane - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 666,
      en: "Route 6/7/8/9/17/18 (Spring) - Black/White",
      fr: "Route 6/7/8/9/17/18 (Printemps) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 667,
      en: "Route 6/7/8/9/17/18 (Summer) - Black/White",
      fr: "Route 6/7/8/9/17/18 (Été) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 668,
      en: "Trainers' Eyes Meet (Parasol Lady) - Black/White",
      fr: "Rencontre avec un Dresseur (Sœur Parasol) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 669,
      en: "Trainers' Eyes Meet (Scientist) - Black/White",
      fr: "Rencontre avec un Dresseur (Scientifique) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 670,
      en: "Chargestone Cave/Wellspring Cave/Mistralton Cave/Challenger's Cave/Relic Passage - Black/White", // + Seaside Cave only in Black 2/White 2
      fr: "Grotte Électrolithe/Veine Souterraine/Grotte Parsemille/Antre d'Entraînement/Chemin Enfoui - Noir/Blanc", // + Grotte Littorale Uniquement dans Noir 2/Blanc 2
      tags: ["Outdoor Location"],
    },
    {
      id: 671,
      en: "Mistralton City - Black/White",
      fr: "Parsemille - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 672,
      en: "Cedric Juniper - Black/White",
      fr: "Spruce Keteleeria - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 673,
      en: "Trainers' Eyes Meet (Psychic) - Black/White",
      fr: "Rencontre avec un Dresseur (Kinésiste) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 674,
      en: "Icirrus City - Black/White",
      fr: "Flocombe - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 675,
      en: "Dragonspiral Tower/Celestial Tower/Giant Chasm - Black/White",
      fr: "Tour Dragospire/Tour des Cieux/Grotte Cyclopéenne - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 676,
      en: "Trainers' Eyes Meet (Team Plasma) - Black/White",
      fr: "Rencontre avec un Dresseur (Team Plasma) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 677,
      en: "Dragonspiral Tower Top Floor - Black/White",
      fr: "Tour Dragospire: Sommet - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 678,
      en: "Route 4/5/16 (Summer) - Black/White",
      fr: "Route 4/5/16 (Été) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 679,
      en: "Relic Castle - Black/White",
      fr: "Château Enfoui - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 680,
      en: "Tubeline Bridge - Black/White",
      fr: "Pont Ferroviaire - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 681,
      en: "Shopping Mall Nine - Black/White",
      fr: "Centre Commercial R9 - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 682,
      en: "Trainers' Eyes Meet (Roughneck) - Black/White",
      fr: "Rencontre avec un Dresseur (Loubard) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 683,
      en: "Opelucid City (Pokémon Black) - Black/White",
      fr: "Janusia (Pokémon Noir) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 684,
      en: "Opelucid City (Pokémon White) - Black/White",
      fr: "Janusia (Pokémon Blanc) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 685,
      en: "Route 10 - Black/White",
      fr: "Route 10 - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 686,
      en: "Victory Road - Black/White",
      fr: "Route Victoire - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 687,
      en: "Trainers' Eyes Meet (Ace Trainer) - Black/White",
      fr: "Rencontre avec un Dresseur (Topdresseur) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 688,
      en: "The Pokémon League - Black/White",
      fr: "Ligue Pokémon - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 689,
      en: "Battle! (Elite Four) - Black/White",
      fr: "Combat! (Conseil 4) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 690,
      en: "The Pokémon League Besieged! - Black/White",
      fr: "La Ligue Pokémon est assiégée! - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 691,
      en: "Embracing One's Duty - Black/White",
      fr: "Accepter son Destin - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 692,
      en: "N's Castle - Black/White",
      fr: "Palais de N - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 693,
      en: "The Pokémon Child, N - Black/White",
      fr: "N, l'enfant-Pokémon - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 694,
      en: "N's Dragon (Zekrom) - Black/White",
      fr: "Le Dragon de N (Zekrom) - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 695,
      en: "N's Dragon (Reshiram) - Black/White",
      fr: "Le Dragon de N (Reshiram) - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 696,
      en: "The Dragon Awakes (Zekrom) - Black/White",
      fr: "Le Dragon s'éveille (Zekrom) - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 697,
      en: "The Dragon Awakes (Reshiram) - Black/White",
      fr: "Le Dragon s'éveille (Reshiram) - Noir/Blanc",
      tags: ["Story Events"],
    },
    // In fact this is Zekrom's Theme but the 16 first seconds are the same as Reshiram's
    {
      id: 698,
      en: "Battle! (Zekrom/Reshiram/Kyurem) - Black/White",
      fr: "Combat! (Zekrom/Reshiram/Kyurem) - Noir/Blanc",
      tags: ["Battles"],
    },
    // {
    //     id: -4,
    //     en: "Battle! (Reshiram) - Black/White",
    //     fr: "Combat! (Reshiram) - Noir/Blanc",
    // },
    {
      id: 699,
      en: "Decisive Battle! (N) - Black/White",
      fr: "Combat décisif! (N) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 700,
      en: "Ghetsis's Ambitions - Black/White",
      fr: "Les ambitions de Ghetis - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 701,
      en: "Battle! (Ghetsis) - Black/White",
      fr: "Combat! (Ghetis) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 702,
      en: "Farewell - Black/White",
      fr: "Adieu - Noir/Blanc",
      tags: ["Story Events"],
    },
    {
      id: 703,
      en: 'Ending "Onward to Our Own Futures" - Black/White',
      fr: 'Générique de Fin: "Chacun son chemin" - Noir/Blanc',
      tags: ["Repetable Events"],
    },
    {
      id: 704,
      en: "Looker's Theme - Black/White",
      fr: "Thème de Beladonis - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 705,
      en: "Route 2/3 (Autumn) - Black/White",
      fr: "Route 2/3 (Automne) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 706,
      en: "Route 2/3 (Winter) - Black/White",
      fr: "Route 2/3 (Hiver) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 707,
      en: "The Royal Unova - Black/White",
      fr: "L'Étoile d'Unys - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 708,
      en: "Nintendo Wi-Fi Connection - Black/White",
      fr: "Connexion Wi-Fi Nintendo - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 709,
      en: "Global Terminal - Black/White",
      fr: "Terminal Mondial  - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 710,
      en: "GTS - Black/White",
      fr: "GTS - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 711,
      en: "Spin Trade - Black/White",
      fr: "Œuf Surprise - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 712,
      en: "Route 4/5/16 (Autumn) - Black/White",
      fr: "Route 4/5/16 (Automne) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 713,
      en: "Gear Station - Black/White",
      fr: "Engrenage du Métro - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 714,
      en: "The Battle Subway - Black/White",
      fr: "Métro de Combat - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 715,
      en: "Battle! (Battle Subway Trainer) - Black/White",
      fr: "Combat! (Dresseur du Métro de Combat) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 716,
      en: "Musical Theater - Black/White",
      fr: "Music-Hall - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 717,
      en: "Dress Up with Props - Black/White",
      fr: "Déguisement - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 718,
      en: "The Curtain for the Musical Rises! - Black/White",
      fr: "Music-Hall: Que le spectacle commence ! - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 719,
      en: "Musical 'Stardom' - Black/White",
      fr: "Music-Hall: Un monde de stars - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 720,
      en: "Musical 'Forest Stroll' - Black/White",
      fr: "Music-Hall: Promenons-nous dans les Bois - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 721,
      en: "Musical 'A Sweet Soirée' - Black/White",
      fr: "Music-Hall: Le Grand Bal - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 722,
      en: "Musical 'Exciting Nimbasa' - Black/White",
      fr: "Music-Hall: Dans la Chaleur de Méanville - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 723,
      en: "A Ferris Wheel Ride Together - Black/White",
      fr: "Sur la grande roue - Noir/Blanc",
      tags: ["Repetable Events"],
    },
    {
      id: 724,
      en: "Route 6/7/8/9/17/18 (Autumn) - Black/White",
      fr: "Route 6/7/8/9/17/18 (Automne) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 725,
      en: "Route 6/7/8/9/17/18 (Winter) - Black/White",
      fr: "Route 6/7/8/9/17/18 (Hiver) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 726,
      en: "Battle! (Legendary Pokémon) - Black/White",
      fr: "Combat! (Pokémon légendaire) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 727,
      en: "Anville Town - Black/White",
      fr: "Rotombourg - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 728,
      en: "Marvelous Bridge - Black/White",
      fr: "Pont de l'Inconnu - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 729,
      en: "Route 11/12/13/14/15/Undella Bay (Spring) - Black/White",
      fr: "Route 11/12/13/14/15/Baie Vaguelone (Printemps) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 730,
      en: "Route 11/12/13/14/15/Undella Bay (Summer) - Black/White",
      fr: "Route 11/12/13/14/15/Baie Vaguelone (Été) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 731,
      en: "Trainers' Eyes Meet (Cyclist) - Black/White",
      fr: "Rencontre avec un Dresseur (Cycliste) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 732,
      en: "Poké Transfer Lab - Black/White",
      fr: "Laboratoire Fret - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 733,
      en: "Poké Transfer: Choose Your Pokémon! - Black/White",
      fr: "Poké Fret: Choisis Un Pokémon! - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 734,
      en: "Poké Transfer: Catch Your Pokémon! - Black/White",
      fr: "Poké Fret: Attrape un Pokémon! - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 735,
      en: "Trainers' Eyes Meet (Pokéfan) - Black/White",
      fr: "Rencontre avec un Dresseur (Pokéfan) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 736,
      en: "Black City - Black/White",
      fr: "Ville Noire - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 737,
      en: "White Forest - Black/White",
      fr: "Forêt Blanche - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 738,
      en: "Game Sync - Black/White",
      fr: "Synchro-Jeu - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 739,
      en: "Entralink - Black/White",
      fr: "Heylink - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 740,
      en: "Someone's Entralink - Black/White",
      fr: "Un autre Heylink - Noir/Blanc",
      tags: ["Mini Games"],
    },
    {
      id: 741,
      en: "Trainers' Eyes Meet (Gentleman) - Black/White",
      fr: "Rencontre avec un Dresseur (Gentleman) - Noir/Blanc",
      tags: ["Encounters"],
    },
    {
      id: 742,
      en: "Undella Town (Winter) - Black/White",
      fr: "Vaguelone (Hiver) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 743,
      en: "Undella Town (Spring) - Black/White",
      fr: "Vaguelone (Printemps) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 744,
      en: "Undella Town (Autumn) - Black/White",
      fr: "Vaguelone (Automne) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 745,
      en: "Undella Town (Summer) - Black/White",
      fr: "Vaguelone (Été) - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 746,
      en: "Cynthia's Theme - Black/White",
      fr: "Thème de Cynthia - Noir/Blanc",
      tags: ["Characters"],
    },
    {
      id: 747,
      en: "Battle! (Cynthia) - Black/White",
      fr: "Combat! (Cynthia) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 748,
      en: "Lostlorn Forest/Abundant Shrine - Black/White",
      fr: "Bois des Illusions/Autel Abondance - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 749,
      en: "Battle! (Strong Wild Pokémon) - Black/White",
      fr: "Combat! (Pokémon sauvage puissant) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 750,
      en: "Surf - Black/White",
      fr: "Surf - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 751,
      en: "Abyssal Ruins - Black/White",
      fr: "Ruines des Abysses - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 752,
      en: "Route 11/12/13/14/15/Undella Bay (Winter) - Black/White",
      fr: "Route 11/12/13/14/15/Baie Vaguelone (Hiver) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 753,
      en: "Route 11/12/13/14/15/Undella Bay (Autumn) - Black/White",
      fr: "Route 11/12/13/14/15/Baie Vaguelone (Automne) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 754,
      en: "Lacunosa Town - Black/White",
      fr: "Entrelasque - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 755,
      en: "Village Bridge - Black/White",
      fr: "Pont du Hameau - Noir/Blanc",
      tags: ["Cities"],
    },
    {
      id: 756,
      en: "Mystery Gift - Black/White",
      fr: "Cadeau Mystère - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 757,
      en: "Route 4/5/16 (Winter) - Black/White",
      fr: "Route 4/5/16 (Hiver) - Noir/Blanc",
      tags: ["Outdoor Location"],
    },
    {
      id: 758,
      en: "Challenging a Battle Competition - Black/White",
      fr: "Participation à une Compétition - Noir/Blanc",
      tags: ["Menu"],
    },
    {
      id: 759,
      en: "Team Rocket!? - Black/White",
      fr: "La Team Rocket!? - Noir/Blanc",
      tags: ["Repetable Events"],
    },
    // Same as Zekrom's Battle without sound effects
    //{
    //  id: -5,
    //  en: "Battle! (Kyurem) - Black/White",
    //  fr: "Combat! (Kyurem) - Noir/Blanc",
    //},
    {
      id: 760,
      en: "Battle! (Champion Alder) - Black/White",
      fr: "Combat! (Maître Goyah) - Noir/Blanc",
      tags: ["Battles"],
    },
    {
      id: 761,
      en: "Victory! (Champion Alder) - Black/White",
      fr: "Victoire! (Maître Goyah) - Noir/Blanc",
      tags: ["Victories"],
    },
    {
      id: 762,
      en: "Congratulations on Entering the Hall of Fame! - Black/White",
      fr: "Entrée au Panthéon! - Noir/Blanc",
      tags: ["Repetable Events"],
    },
    // They are not in the album
    {
      id: 763,
      en: "Unity Tower - Black/White",
      fr: "Tour Union - Noir/Blanc",
      tags: ["Buildings"],
    },
    {
      id: 764,
      en: "Pokémon World Championships Final/Battle! (WCS Champion) - Black/White",
      fr: "Finale du Championnats du monde Pokémon/Combat! (WCS Champion) - Noir/Blanc",
      tags: ["Battles"],
    },

    //// Black 2/White 2
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Black_2_%26_Pok%C3%A9mon_White_2:_Super_Music_Collection
    //    https://vgmdb.net/album/33367
    //    https://www.sittingonclouds.com/album/458
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-noir-2-et-pok%C3%A9mon-blanc-2-super-music-collection/880137987
    {
      id: 765,
      en: "Opening - Black 2/White 2",
      fr: "Introduction - Noir 2/Blanc 2",
      tags: ["Menu"],
    },
    {
      id: 766,
      en: "Title Screen - Black 2/White 2",
      fr: "Écran titre - Noir 2/Blanc 2",
      tags: ["Menu"],
    },
    {
      id: 767,
      en: "An Adventure is Beginning - Black 2/White 2",
      fr: "Une aventure commence - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 768,
      en: "Aspertia City - Black 2/White 2",
      fr: "Pavonnay - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 769,
      en: "Bianca's Theme - Black 2/White 2",
      fr: "Thème de Bianca - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 770,
      en: "Route 19/20 (Spring) - Black 2/White 2",
      fr: "Route 19/20 (Printemps) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 771,
      en: "Route 19/20 (Summer) - Black 2/White 2",
      fr: "Route 19/20 (Été) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 772,
      en: "Battle! (Wild Pokémon) - Black 2/White 2",
      fr: "Combat! (Pokémon sauvage) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 773,
      en: "Floccesy Town - Black 2/White 2",
      fr: "Amaillide - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 774,
      en: "Floccesy Ranch - Black 2/White 2",
      fr: "Ranch d'Amaillide - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 775,
      en: "Rival Hugh's Theme - Black 2/White 2",
      fr: "Thème du Rival Matis - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 776,
      en: "Battle! (Rival Hugh) - Black 2/White 2",
      fr: "Combat! (Rival Matis) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 777,
      en: "Virbank City - Black 2/White 2",
      fr: "Ondes-sur-Mer - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 778,
      en: "Virbank City Gym ~ Roxie's Gym (Performed by Koffing and the Toxics) - Black 2/White 2",
      fr: "Arène d'Ondes-sur-Mer ~ Arène de Strykna (Interprété par Smogo et les Toxiques) - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 779,
      en: "Team Plasma Returns - Black 2/White 2",
      fr: "Le retour de la Team Plasma - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 780,
      en: "Pokéstar Studios - Black 2/White 2",
      fr: "Pokéwood - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 781,
      en: "Filming Underway at Pokéstar Studios! - Black 2/White 2",
      fr: "Pokéwood: Tournage en cours - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 782,
      en: "Pokéstar Studios: Battle - Black 2/White 2",
      fr: "Pokéwood: Combat - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 783,
      en: "Pokéstar Studios: Glory - Black 2/White 2",
      fr: "Pokéwood: Gloire - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 784,
      en: "Pokéstar Studios: Defeat - Black 2/White 2",
      fr: "Pokéwood: Défaite - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 785,
      en: "Pokéstar Studios: Invasion - Black 2/White 2",
      fr: "Pokéwood: Invasion - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 786,
      en: "Pokéstar Studios: Success - Black 2/White 2",
      fr: "Pokéwood: Réussite - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 787,
      en: "Pokéstar Studios: Retreat - Black 2/White 2",
      fr: "Pokéwood: Abandon - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 788,
      en: "Pokéstar Studios: Weird - Black 2/White 2",
      fr: "Pokéwood: Étrange - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 789,
      en: "Pokéstar Studios: Love - Black 2/White 2",
      fr: "Pokéwood: Amour - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 790,
      en: "Pokéstar Studios: Sorrow - Black 2/White 2",
      fr: "Pokéwood: Tristesse - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 791,
      en: "Pokéstar Studios: Horror - Black 2/White 2",
      fr: "Pokéwood: Horreur - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 792,
      en: "Pokéstar Studios: Purified - Black 2/White 2",
      fr: "Pokéwood: Pureté - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 793,
      en: "Pokéstar Studios: Fear - Black 2/White 2",
      fr: "Pokéwood: Terreur - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 794,
      en: "Pokéstar Studios: Humor - Black 2/White 2",
      fr: "Pokéwood: Humour - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 795,
      en: "Pokéstar Studios: Despair - Black 2/White 2",
      fr: "Pokéwood: Désespoir - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 796,
      en: "Pokéstar Studios: Shock - Black 2/White 2",
      fr: "Pokéwood: Choc - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 797,
      en: "Castelia Sewers/Virbank Complex - Black 2/White 2",
      fr: "Égouts de Volucité/Z.I. d'Ondes-sur-Mer - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 798,
      en: "Castelia City Gym - Black 2/White 2",
      fr: "Arène de Volucité - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 799,
      en: "Trainers' Eyes Meet (Harlequin) - Black 2/White 2",
      fr: "Rencontre avec un Dresseur (Arlequin) - Noir 2/Blanc 2",
      tags: ["Encounters"],
    },
    {
      id: 800,
      en: "Funfest Mission Start! - Black 2/White 2",
      fr: "Mission Fiesta Ouverte! - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 801,
      en: "Colress's Theme - Black 2/White 2",
      fr: "Thème de Nikolaï - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 802,
      en: "Battle! (Trainer Battle) - Black 2/White 2",
      fr: "Combat! (Combat de Dresseur) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 803,
      en: "Join Avenue - Black 2/White 2",
      fr: "Galerie Concorde - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 804,
      en: "Join Avenue Meet and Greet! - Black 2/White 2",
      fr: "Galerie Concorde: Félicitations - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 805,
      en: "Nimbasa City Gym: Runway - Black 2/White 2",
      fr: "Arène de Méanville: Circuit - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 806,
      en: "Trainers' Eyes Meet (Beauty) - Black 2/White 2",
      fr: "Rencontre avec un Dresseur (Canon) - Noir 2/Blanc 2",
      tags: ["Encounters"],
    },
    {
      id: 807,
      en: "Nimbasa City Gym: Stage - Black 2/White 2",
      fr: "Arène de Méanville: Plate-forme - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 808,
      en: "Battle! (Gym Leader) - Black 2/White 2",
      fr: "Combat! (Champion d'Arène) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 809,
      en: "Victory Lies Before You! - Black 2/White 2",
      fr: "La victoire t'attend! - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 810,
      en: "Driftveil City Gym - Black 2/White 2",
      fr: "Arène de Port Yoneuve - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 811,
      en: "Pokémon World Tournament (PWT) - Black 2/White 2",
      fr: "Pokémon World Tournament (PWT) - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 812,
      en: "The PWT - Black 2/White 2",
      fr: "Au PWT - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 813,
      en: "Battle! (Gym Leader—Kanto Version) - Black 2/White 2",
      fr: "Combat! (Champion d'Arène—Version Kanto) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 814,
      en: "Battle! (Champion—Kanto Version) - Black 2/White 2",
      fr: "Combat! (Maître—Version Kanto) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 815,
      en: "Battle! (Gym Leader—Johto Version) - Black 2/White 2",
      fr: "Combat! (Champion d'Arène—Version Johto) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 816,
      en: "Battle! (Champion—Johto Version) - Black 2/White 2",
      fr: "Combat! (Maître—Version Johto) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 817,
      en: "Battle! (Gym Leader—Hoenn Version) - Black 2/White 2",
      fr: "Combat! (Champion d'Arène—Hoenn Version) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 818,
      en: "Battle! (Champion—Hoenn Version) - Black 2/White 2",
      fr: "Combat! (Maître—Hoenn Version) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 819,
      en: "Battle! (Gym Leader—Sinnoh Version) - Black 2/White 2",
      fr: "Combat! (Champion d'Arène—Sinnoh Version) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 820,
      en: "Battle! (Champion—Sinnoh Version) - Black 2/White 2",
      fr: "Combat! (Maître—Sinnoh Version) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 821,
      en: "PWT Final Round! - Black 2/White 2",
      fr: "PWT: Finale - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 822,
      en: "Winning in the PWT! - Black 2/White 2",
      fr: "PWT: Victoire - Noir 2/Blanc 2",
      tags: ["Victories"],
    },
    {
      id: 823,
      en: "PWT Victory! - Black 2/White 2",
      fr: "PWT: Victoire finale - Noir 2/Blanc 2",
      tags: ["Victories"],
    },
    {
      id: 824,
      en: "Underground Ruins - Black 2/White 2",
      fr: "Ruines Enfouies - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 825,
      en: "Battle! (Regirock/Regice/Registeel) - Black 2/White 2",
      fr: "Combat! (Regirock/Regice/Registeel) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 826,
      en: "Aboard the Plasma Frigate - Black 2/White 2",
      fr: "Sur la Frégate Plasma - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 827,
      en: "Zinzolin's Theme - Black 2/White 2",
      fr: "Thème de Lilien - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 828,
      en: "Cheren's Theme - Black 2/White 2",
      fr: "Thème de Tcheren - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 829,
      en: "Mistralton City Gym - Black 2/White 2",
      fr: "Arène de Parsemille - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 830,
      en: "Lentimas Town - Black 2/White 2",
      fr: "Arpentières - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 831,
      en: "The Road to Reversal Mountain - Black 2/White 2",
      fr: "La route du Mont Renenvers - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 832,
      en: "Reversal Mountain (Pokémon Black) - Black 2/White 2",
      fr: "Mont Renenvers (Pokémon Noir) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 833,
      en: "Reversal Mountain (Pokémon White) - Black 2/White 2",
      fr: "Mont Renenvers (Pokémon Blanc) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 834,
      en: "Strange House - Black 2/White 2",
      fr: "Manoir de l'Étrange - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    // "Battle! (Legendary Pokémon—Sinnoh Version) - Black 2/White 2", = Battle! (Legendary Pokémon) - Diamond/Pearl
    {
      id: 835,
      en: "Opelucid City Gym - Black 2/White 2",
      fr: "Arène de Janusia - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 836,
      en: "Opelucid City Attacked! - Black 2/White 2",
      fr: "Janusia est attaquée! - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 837,
      en: "The Frozen City - Black 2/White 2",
      fr: "La Ville au manteau d'argent - Noir 2/Blanc 2",
      tags: ["Cities", "Story Events"],
    },
    {
      id: 838,
      en: "Trainers' Eyes Meet (Team Plasma) - Black 2/White 2",
      fr: "Rencontre avec un Dresseur (Team Plasma) - Noir 2/Blanc 2",
      tags: ["Encounters"],
    },
    {
      id: 839,
      en: "Battle! (Team Plasma) - Black 2/White 2",
      fr: "Combat! (Team Plasma) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 840,
      en: "Shadow Triad's Theme - Black 2/White 2",
      fr: "Thème du Trio des Ombres - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 841,
      en: "Marine Tube - Black 2/White 2",
      fr: "Aquatube - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 842,
      en: "Humilau City - Black 2/White 2",
      fr: "Papeloa - Noir 2/Blanc 2",
      tags: ["Cities"],
    },
    {
      id: 843,
      en: "Humilau City Gym - Black 2/White 2",
      fr: "Arène de Papeloa - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 844,
      en: "Route 21/22 (Spring) - Black 2/White 2",
      fr: "Route 21/22 (Printemps) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 845,
      en: "Route 21/22 (Summer) - Black 2/White 2",
      fr: "Route 21/22 (Été) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 846,
      en: "Plasma Frigate Sortie - Black 2/White 2",
      fr: "La Frégate Plasma est lancée! - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 847,
      en: "Infiltrating the Plasma Frigate! - Black 2/White 2",
      fr: "Infiltration de la Frégate Plasma - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 848,
      en: "Battle! (Colress) - Black 2/White 2",
      fr: "Combat! (Nikolaï) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 849,
      en: "Confrontation - Black 2/White 2",
      fr: "Confrontation - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 850,
      en: "Absorption - Black 2/White 2",
      fr: "Absorption - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 851,
      en: "Fusion - Black 2/White 2",
      fr: "Fusion - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 852,
      en: "Battle! (Black Kyurem/White Kyurem) - Black 2/White 2",
      fr: "Combat! (Kyurem Noir/Kyurem Blanc) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 853,
      en: "Battle! (Ghetsis) - Black 2/White 2",
      fr: "Combat! (Ghetis) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 854,
      en: "Route 23 - Black 2/White 2",
      fr: "Route 23 - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 855,
      en: "N's Castle - Black 2/White 2",
      fr: "Palais de N - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 856,
      en: "N's Room - Black 2/White 2",
      fr: "Chambre de N - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 857,
      en: "N's Theme - Black 2/White 2",
      fr: "Thème de N - Noir 2/Blanc 2",
      tags: ["Characters"],
    },
    {
      id: 858,
      en: "Battle! (N) - Black 2/White 2",
      fr: "Combat! (N) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 859,
      en: "Unova Link - Black 2/White 2",
      fr: "Lien Unys - Noir 2/Blanc 2",
      tags: ["Menu"],
    },
    {
      id: 860,
      en: "Xtransceiver Minigames - Black 2/White 2",
      fr: "Vokit: Mini-jeux - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 861,
      en: "Route 19/20 (Autumn) - Black 2/White 2",
      fr: "Route 19/20 (Automne) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 862,
      en: "Route 19/20 (Winter) - Black 2/White 2",
      fr: "Route 19/20 (Hiver) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 863,
      en: "Cave of Being - Black 2/White 2",
      fr: "Caverne des Esprits - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 864,
      en: "Black Tower: Entrance - Black 2/White 2",
      fr: "Gratte-Ciel Noir: Entrée - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 865,
      en: "Black Tower - Black 2/White 2",
      fr: "Gratte-Ciel Noir - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 866,
      en: "White Treehollow: Entrance - Black 2/White 2",
      fr: "Arbre Creux Blanc: Entrée - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 867,
      en: "White Treehollow - Black 2/White 2",
      fr: "Arbre Creux Blanc - Noir 2/Blanc 2",
      tags: ["Buildings"],
    },
    {
      id: 868,
      en: "Route 21/22 (Autumn) - Black 2/White 2",
      fr: "Route 21/22 (Automne) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 869,
      en: "Route 21/22 (Winter) - Black 2/White 2",
      fr: "Route 21/22 (Hiver) - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },
    {
      id: 870,
      en: "Battle! (Champion Iris) - Black 2/White 2",
      fr: "Combat! (Maître Iris) - Noir 2/Blanc 2",
      tags: ["Battles"],
    },
    {
      id: 871,
      en: "Staff Credits/Ending Theme - Black 2/White 2",
      fr: "Générique de fin - Noir 2/Blanc 2",
      tags: ["Repetable Events"],
    },
    {
      id: 872,
      en: "The End - Black 2/White 2",
      fr: "Fin - Noir 2/Blanc 2",
      tags: ["Repetable Events"],
    },
    {
      id: 873,
      en: "Musical: Charming Munna - Black 2/White 2",
      fr: "Music-Hall: Le Munna Amoureux - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 874,
      en: "Musical: Pokémon Party! - Black 2/White 2",
      fr: "Music-Hall: Pokémon Party! - Noir 2/Blanc 2", // Jamais sorti en France c'est pas évident de traduire
      tags: ["Mini Games"],
    },
    {
      id: 875,
      en: "Musical: Carnival Pokémon - Black 2/White 2",
      fr: "Music-Hall: Carnaval Pokémon - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 876,
      en: "Musical: Meloettaaa!!! - Black 2/White 2",
      fr: "Music-Hall: MELOETTA!!! - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    {
      id: 877,
      en: "Musical: Carnival Ludicolo - Black 2/White 2",
      fr: "Music-Hall: Carnaval Ludicolo - Noir 2/Blanc 2",
      tags: ["Mini Games"],
    },
    // "Pokémon World Championships Final - Black 2/White 2", // The music appear for the first time in BW, despite being listed only in the BW2 album
    {
      id: 878,
      en: "Relic Song - Black 2/White 2",
      fr: "Chant Antique - Noir 2/Blanc 2",
      tags: ["Story Events"],
    },
    {
      id: 879,
      en: "Hidden Grotto - Black 2/White 2",
      fr: "Trouée Cachée - Noir 2/Blanc 2",
      tags: ["Outdoor Location"],
    },

    //// X/Y
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_X_%26_Pok%C3%A9mon_Y:_Super_Music_Collection
    //    https://vgmdb.net/album/41066
    //    https://www.sittingonclouds.com/album/420
    // Source traduction :
    //    https://music.apple.com/fr/album/pok%C3%A9mon-x-et-pok%C3%A9mon-y-super-music-collection/880148373
    {
      id: 880,
      en: "Title Screen - X/Y",
      fr: "Écran titre - X/Y",
      tags: ["Menu"],
    },
    {
      id: 881,
      en: "Kalos Region Theme - X/Y",
      fr: "Thème de la région de Kalos - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 882,
      en: "An Adventure Is Beginning - X/Y",
      fr: "L'aventure commence - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 883,
      en: "Vaniville Town - X/Y",
      fr: "Bourg Croquis - X/Y",
      tags: ["Cities"],
    },
    {
      id: 884,
      en: "Route 1 ~ Vaniville Pathway - X/Y",
      fr: "Route 1 ~ Sentier Croquis - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 885,
      en: "Aquacorde Town/Ambrette Town - X/Y",
      fr: "Quarellis/Roche-sur-Gliffe - X/Y",
      tags: ["Cities"],
    },
    {
      id: 886,
      en: 'Friends Theme "A New Meeting" - X/Y',
      fr: "Musique des amis: Rencontre! - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 887,
      en: "It's a Pokémon Battle! - X/Y",
      fr: "Combat de Pokémon! - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 888,
      en: "Battle! (Friend) - X/Y",
      fr: "Combat! (Amis) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 889,
      en: "Hurry Along 1 - X/Y",
      fr: "En route! 1 - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 890,
      en: "Route 2/3 ~ Avance Trail/Ouvert Way - X/Y",
      fr: "Route 2/3 ~ Chemin Progrès/Chemin Ouvert - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 891,
      en: "Santalune Forest/Reflection Cave/Frost Cavern/Route 20 (Winding Woods) - X/Y",
      fr: "Forêt de Neuvartault/Grotte Miroitante/Caverne Gelée/Route 20 (Bois du Dédale) - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 892,
      en: "Battle! (Wild Pokémon) - X/Y",
      fr: "Combat! (Pokémon sauvage) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 893,
      en: "Victory! (Wild Pokémon) - X/Y",
      fr: "Victoire! (Pokémon sauvage) - X/Y",
      tags: ["Victories"],
    },
    {
      id: 894,
      en: "Trainers' Eyes Meet (Youngster) - X/Y",
      fr: "Rencontre avec un Dresseur (Gamin) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 895,
      en: "Trainers' Eyes Meet (Lass) - X/Y",
      fr: "Rencontre avec un Dresseur (Fillette) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 896,
      en: "Battle! (Trainer Battle) - X/Y",
      fr: "Combat! (Combat de Dresseur) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 897,
      en: "Victory! (Trainer Battle) - X/Y",
      fr: "Victoire! (Combat de Dresseur) - X/Y",
      tags: ["Victories"],
    },
    {
      id: 898,
      en: "Santalune City - X/Y",
      fr: "Neuvartault - X/Y",
      tags: ["Cities"],
    },
    {
      id: 899,
      en: "Pokémon Center - X/Y",
      fr: "Centre Pokémon - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 900,
      en: "Pokémon Gym - X/Y",
      fr: "Arène Pokémon - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 901,
      en: "Battle! (Gym Leader) - X/Y",
      fr: "Combat! (Champion d'Arène) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 902,
      en: "Victory! (Gym Leader) - X/Y",
      fr: "Victoire! (Champion d'Arène) - X/Y",
      tags: ["Victories"],
    },
    {
      id: 903,
      en: "Route 4/5/6/7/22 ~ Parterre Way/Versant Road/Palais Lane/Rivière Walk/Détourner Way - X/Y",
      fr: "Route 4/5/6/7/22 ~ Route Fleurie/Chemin du Versant/Allée du Palais/Chemin des Berges/Chemin Détour - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 904,
      en: "Trainers' Eyes Meet (Poké Fan) - X/Y",
      fr: "Rencontre avec un Dresseur (Pokéfan) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 905,
      en: "Sina and Dexio - X/Y",
      fr: "Sina et Dexio - X/Y",
      tags: ["Characters"],
    },
    {
      id: 906,
      en: "Gate - X/Y",
      fr: "Porte - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 907,
      en: "Lumiose City - X/Y",
      fr: "Illumis - X/Y",
      tags: ["Cities"],
    },
    {
      id: 908,
      en: "The Sycamore Pokémon Lab - X/Y",
      fr: "Laboratoire du Professeur Platane - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 909,
      en: "Professor Sycamore's Theme - X/Y",
      fr: "Thème du Professeur Platane - X/Y",
      tags: ["Characters"],
    },
    {
      id: 910,
      en: "Dark Skies - X/Y",
      fr: "Sombre horizon - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 911,
      en: "Trainers' Eyes Meet (Twins) - X/Y",
      fr: "Rencontre avec un Dresseur (Jumelles) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 912,
      en: "Camphrier Town/Couriway Town - X/Y",
      fr: "Fort-Vanitas/Mozheim - X/Y",
      tags: ["Cities"],
    },
    {
      id: 913,
      en: "Trainers' Eyes Meet (Tourist) - X/Y",
      fr: "Rencontre avec un Dresseur (Touriste) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 914,
      en: "Parfum Palace - X/Y",
      fr: "Palais Chaydeuvre - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 915,
      en: "Together with Shauna - X/Y",
      fr: "Avec Sannah - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 916,
      en: "Hurry Along 2 - X/Y",
      fr: "En route! 2 - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 917,
      en: "Trainers' Eyes Meet (Butler) - X/Y",
      fr: "Rencontre avec un Dresseur (Majordome) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 918,
      en: "Trainers' Eyes Meet (Maid) - X/Y",
      fr: "Rencontre avec un Dresseur (Gouvernante) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 919,
      en: "Route 8/9/10/11/12/13 ~ Muraille Coast/Spikes Passage/Menhir Trail/Miroir Way/Fourrage Road/Lumiose Badlands - X/Y",
      fr: "Route 8/9/10/11/12/13 ~ Falaise Muraille/Piste Piquante/Route Menhir/Chemin Miroir/Chemin Fourrage/Steppe d'Illumis - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 920,
      en: "Glittering Cave/Connecting Cave (Zubat Roost)/Route 14 (Laverre Nature Trail)/Lost Hotel/Terminus Cave - X/Y",
      fr: "Grotte Étincelante/Cave Connecterre (Antre Nosferapti)/Route 14 (Laie Romant-sous-Bois)/Hôtel Désolation/Grotte Coda - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 921,
      en: "Team Flare Appears! - X/Y",
      fr: "La Team Flare apparaît! - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 922,
      en: "Evolution - X/Y",
      fr: "Évolution - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 923,
      en: "Trainers' Eyes Meet (Swimmer Female) - X/Y",
      fr: "Rencontre avec un Dresseur (Nageuse) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 924,
      en: "Cyllage City - X/Y",
      fr: "Relifac-le-Haut - X/Y",
      tags: ["Cities"],
    },
    {
      id: 925,
      en: "Bicycle - X/Y",
      fr: "Bicyclette - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 926,
      en: "Trainers' Eyes Meet (Hiker) - X/Y",
      fr: "Rencontre avec un Dresseur (Montagnard) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 927,
      en: "Geosenge Town - X/Y",
      fr: "Cromlac'h - X/Y",
      tags: ["Cities"],
    },
    {
      id: 928,
      en: "Trainers' Eyes Meet (Honeymooners) - X/Y",
      fr: "Rencontre avec un Dresseur (Jeunes Tourtereaux) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 929,
      en: "Trainers' Eyes Meet (Black Belt) - X/Y",
      fr: "Rencontre avec un Dresseur (Karatéka) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 930,
      en: "Shalour City - X/Y",
      fr: "Yantreizh - X/Y",
      tags: ["Cities"],
    },
    {
      id: 931,
      en: "Tower of Mastery - X/Y",
      fr: "Tour Maîtrise - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 932,
      en: "Trainers' Eyes Meet (Roller Skater) - X/Y",
      fr: "Rencontre avec un Dresseur (Roller Skateur) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 933,
      en: "Battle! (Successor Korrina) - X/Y",
      fr: "Combat! (Cornélia l'Héritière) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 934,
      en: "Surf - X/Y",
      fr: "Surf - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 935,
      en: "Trainers' Eyes Meet (Swimmer Male) - X/Y",
      fr: "Rencontre avec un Dresseur (Nageur) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 936,
      en: "Riding Skiddo - X/Y",
      fr: "À dos de Cabriolaine - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 937,
      en: "Coumarine City - X/Y",
      fr: "Port Tempères - X/Y",
      tags: ["Cities"],
    },
    {
      id: 938,
      en: 'How About a Song? "An Unwavering Heart" - X/Y',
      fr: 'Veux-tu écouter "Constance" ? - X/Y',
      tags: ["Repetable Events"],
    },
    {
      id: 939,
      en: "The Kalos Power Plant/Poké Ball Factory - X/Y",
      fr: "Centrale de Kalos/Usine de Poké Balls - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 940,
      en: "Trainers' Eyes Meet (Team Flare) - X/Y",
      fr: "Rencontre avec un Dresseur (Team Flare) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 941,
      en: "Battle! (Team Flare) - X/Y",
      fr: "Combat! (Team Flare) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 942,
      en: "A Mysterious Figure - X/Y",
      fr: "Individu mystérieux - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 943,
      en: 'Friends Theme "Reunited" - X/Y',
      fr: "Musique des amis: Réunis - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 944,
      en: "Scary House - X/Y",
      fr: "Miason Hantée - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 945,
      en: "Laverre City - X/Y",
      fr: "Romant-sous-Bois - X/Y",
      tags: ["Cities"],
    },
    {
      id: 946,
      en: "Trainers' Eyes Meet (Furisode Girl) - X/Y",
      fr: "Rencontre avec un Dresseur (Fille en Kimono) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 947,
      en: "Route 15/16/17 ~ Brun Way/Mélancolie Path/Mamoswine Road - X/Y",
      fr: "Route 15/16/17 ~ Chemin Brun/Chemin Tristesse/Route Mammochon - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 948,
      en: "Dendemille Town - X/Y",
      fr: "La Frescale - X/Y",
      tags: ["Cities"],
    },
    {
      id: 949,
      en: "Anistar City - X/Y",
      fr: "Flusselles - X/Y",
      tags: ["Cities"],
    },
    {
      id: 950,
      en: "Trainers' Eyes Meet (Psychic) - X/Y",
      fr: "Rencontre avec un Dresseur (Kinésiste) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 951,
      en: "Lysandre Labs - X/Y",
      fr: "Labos Lysandre - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 952,
      en: "An Eternal Prison - X/Y",
      fr: "Prison éternelle - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 953,
      en: "The Ultimate Weapon Deployed - X/Y",
      fr: "L'arme suprême est déployée - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 954,
      en: "Team Flare Secret HQ - X/Y",
      fr: "Repaire de la Team Flare - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 955,
      en: "The Legendary Pokémon Awoken - X/Y",
      fr: "Un Pokémon légendaire s'éveille - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 956,
      en: "Battle! (Xerneas/Yveltal/Zygarde) - X/Y",
      fr: "Combat! (Xerneas/Yveltal/Zygarde) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 957,
      en: "Battle! (Lysandre) - X/Y",
      fr: "Combat! (Lysandre) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 958,
      en: "Victory! (Team Flare) - X/Y",
      fr: "Victoire! (Team Flare) - X/Y",
      tags: ["Victories"],
    },
    {
      id: 959,
      en: "Firing the Ultimate Weapon (Pokémon X) - X/Y",
      fr: "Activation de l'arme suprême (Pokémon X) - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 960,
      en: "Firing the Ultimate Weapon (Pokémon Y) - X/Y",
      fr: "Activation de l'arme suprême (Pokémon Y) - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 961,
      en: "AZ - X/Y",
      fr: "A.Z. - X/Y",
      tags: ["Characters"],
    },
    {
      id: 962,
      en: "Route 18/19/21 ~ Vallée Etroite Way/Grande Vallée Way/Dernière Way - X/Y",
      fr: "Route 18/19/21 ~ Chemin des Gorges/Chemin du Val/Chemin Final - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 963,
      en: 'Friends Theme "Friends Forever" - X/Y',
      fr: "Musique des amis: Pour toujours - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 964,
      en: "Snowbelle City - X/Y",
      fr: "Auffrac-les-Congères - X/Y",
      tags: ["Cities"],
    },
    {
      id: 965,
      en: 'How About a Song? "Jubilife City" - X/Y',
      fr: 'Veux-tu écouter "Féli-Cité" ? - X/Y',
      tags: ["Repetable Events"],
    },
    {
      id: 966,
      en: "Pokémon Village - X/Y",
      fr: "Village Pokémon - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 967,
      en: "Victory Road - X/Y",
      fr: "Route Victoire - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 968,
      en: "Trainers' Eyes Meet (Ace Trainer) - X/Y",
      fr: "Rencontre avec un Dresseur (Topdresseur) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 969,
      en: "The Pokémon League - X/Y",
      fr: "Ligue Pokémon - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 970,
      en: "Battle! (Elite Four) - X/Y",
      fr: "Combat! (Conseil 4) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 971,
      en: "Battle! (Champion Diantha) - X/Y",
      fr: "Combat! (Dianthéa le Maître) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 972,
      en: "Victory! (Champion Diantha) - X/Y",
      fr: "Victoire! (Dianthéa le Maître) - X/Y",
      tags: ["Victories"],
    },
    {
      id: 973,
      en: "Congratulations on Entering the Hall of Fame! - X/Y",
      fr: "Entrée au Panthéon! - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 974,
      en: "The Sun Shines Down - X/Y",
      fr: "Sous le soleil - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 975,
      en: "I'll Go With You/Ending Theme (Part 1) - X/Y",
      fr: "Nous irons ensemble/Générique de fin (Partie 1) - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 976,
      en: "KISEKI/Ending Theme (Part 2) - X/Y",
      fr: "KISEKI/Générique de fin (Partie 2) - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 977,
      en: "FIN/The End - X/Y",
      fr: "FIN - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 978,
      en: "Kiloude City - X/Y",
      fr: "Batisques - X/Y",
      tags: ["Cities"],
    },
    {
      id: 979,
      en: "Battle Maison/Battle Chateau - X/Y",
      fr: "Maison de Combat/Château de Combat - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 980,
      en: "Friend Safari - X/Y",
      fr: "Safari des Amis - X/Y",
      tags: ["Outdoor Location"],
    },
    {
      id: 981,
      en: "Gogoat Shuttle - X/Y",
      fr: "Navette Chevroum - X/Y",
      tags: ["Repetable Events"],
    },
    {
      id: 982,
      en: "Shopping - X/Y",
      fr: "Shopping - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 983,
      en: "Sushi High Roller - X/Y",
      fr: "Sushi Sans Chichis - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 984,
      en: "Boutique - X/Y",
      fr: "Boutique de Vêtements - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 985,
      en: "Coiffure Clips - X/Y",
      fr: "Détente et Beauté - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 986,
      en: "PR Video Studio - X/Y",
      fr: "Studio de Vidéos Dresseur - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 987,
      en: "Looker's Theme - X/Y",
      fr: "Thème de Beladonis - X/Y",
      tags: ["Characters"],
    },
    {
      id: 988,
      en: "Trainers' Eyes Meet (Punk Guy) - X/Y",
      fr: "Rencontre avec un Dresseur (Vaurien) - X/Y",
      tags: ["Encounters"],
    },
    {
      id: 989,
      en: "Hotel Richissime - X/Y",
      fr: "Grand Hôtel Le Crésus - X/Y",
      tags: ["Buildings"],
    },
    {
      id: 990,
      en: "Looker's in Trouble! - X/Y",
      fr: "Beladonis en Danger! - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 991,
      en: "Emma's Theme - X/Y",
      fr: "Thème de Millie - X/Y",
      tags: ["Characters"],
    },
    {
      id: 992,
      en: "Looker's Sorrowful Theme - X/Y",
      fr: "Lamento de Beladonis - X/Y",
      tags: ["Story Events"],
    },
    {
      id: 993,
      en: "Berry Picker - X/Y",
      fr: "Cueille-Baies - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 994,
      en: "Head It - X/Y",
      fr: "Jongle-Tête - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 995,
      en: "Tile Puzzle - X/Y",
      fr: "Puzzle-Blocs - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 996,
      en: "Let's Super Train! - X/Y",
      fr: "Utilisons le SPV! - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 997,
      en: "Super Training! - X/Y",
      fr: "Système de Perfectionnement Virtuel - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 998,
      en: "Super Training: Success! - X/Y",
      fr: "Système de Perfectionnement Virtuel: Challenge réussi! - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 999,
      en: "Super Training: Try Again... - X/Y",
      fr: "Système de Perfectionnement Virtuel: Réessayez - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 1000,
      en: "Secret Super Training! - X/Y",
      fr: "Système de Perfectionnement Virtuel: SPV Secret - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 1001,
      en: "A Poké Radar Hit! - X/Y",
      fr: "Détection du Poké Radar! - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 1002,
      en: "Poké Radar Chain! - X/Y",
      fr: "Le Poké Radar s'emballe! - X/Y",
      tags: ["Mini Games"],
    },
    {
      id: 1003,
      en: "Battle Spot - X/Y",
      fr: "Coin Combats - X/Y",
      tags: ["Menu"],
    },
    {
      id: 1004,
      en: "Wonder Trade - X/Y",
      fr: "Échange miracle - X/Y",
      tags: ["Menu"],
    },
    {
      id: 1005,
      en: "GTS - X/Y",
      fr: "GTS - X/Y",
      tags: ["Menu"],
    },
    {
      id: 1006,
      en: "Game Sync - X/Y",
      fr: "Synchro-Jeu - X/Y",
      tags: ["Menu"],
    },
    {
      id: 1007,
      en: "Mystery Gift - X/Y",
      fr: "Cadeau Mystère - X/Y",
      tags: ["Menu"],
    },
    {
      id: 1008,
      en: "Battle! (Mewtwo) - X/Y",
      fr: "Combat! (Mewtwo) - X/Y",
      tags: ["Battles"],
    },
    {
      id: 1009,
      en: "Happy Birthday from the Pokémon Center! - X/Y",
      fr: "Joyeux anniversaire de la part du Centre Pokémon! - X/Y",
      tags: ["Repetable Events"],
    },

    //// Omega Ruby/Alpha Sapphire
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Omega_Ruby_%26_Pok%C3%A9mon_Alpha_Sapphire:_Super_Music_Collection
    //    https://vgmdb.net/album/48057
    //    https://www.sittingonclouds.com/album/1021
    // Source traduction (partiel):
    //    https://music.apple.com/fr/album/pok%C3%A9mon-rubis-et-pok%C3%A9mon-saphir-super-music-collection/880478090
    {
      id: 1010,
      en: "Opening Movie: Setting out on a Journey in the Hoenn Region - Omega Ruby/Alpha Sapphire",
      fr: "Séquence d'introduction: Une aventure commence à Hoenn - Rubis Oméga/Saphir Alpha",
      tags: ["Menu"],
    },
    {
      id: 1011,
      en: "Opening Movie 2 - Omega Ruby/Alpha Sapphire",
      fr: "Séquence d'introduction 2 - Rubis Oméga/Saphir Alpha",
      tags: ["Menu"],
    },
    {
      id: 1012,
      en: "Title Screen: Main Theme - Omega Ruby/Alpha Sapphire",
      fr: "Écran titre: Thème principal - Rubis Oméga/Saphir Alpha",
      tags: ["Menu"],
    },
    {
      id: 1013,
      en: "Introductions/Route 122/Route 123 - Omega Ruby/Alpha Sapphire",
      fr: "Présentations/Route 122/Route 123 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1014,
      en: "Littleroot Town - Omega Ruby/Alpha Sapphire",
      fr: "Bourg-en-Vol - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1015,
      en: "Birch Pokémon Lab - Omega Ruby/Alpha Sapphire",
      fr: "Laboratoire du Professeur Seko - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1016,
      en: "May - Omega Ruby/Alpha Sapphire",
      fr: "Flora - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1017,
      en: "H-Help Me! - Omega Ruby/Alpha Sapphire",
      fr: "À l'aide! - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1018,
      en: "Battle! (Wild Pokémon) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Pokémon sauvage) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1019,
      en: "Victory! (Wild Pokémon) - Omega Ruby/Alpha Sapphire",
      fr: "Victoire! (Pokémon sauvage) - Rubis Oméga/Saphir Alpha",
      tags: ["Victories"],
    },
    {
      id: 1020,
      en: "Route 101/102/103 - Omega Ruby/Alpha Sapphire",
      fr: "Route 101/102/103 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1021,
      en: "Oldale Town/Lavaridge Town - Omega Ruby/Alpha Sapphire",
      fr: "Rosyères/Vermilava - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1022,
      en: "Hurry Along - Omega Ruby/Alpha Sapphire",
      fr: "En route! - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1023,
      en: "Pokémon Center - Omega Ruby/Alpha Sapphire",
      fr: "Centre Pokémon - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1024,
      en: "Trainers' Eyes Meet (Youngster) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Gamin) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1025,
      en: "Trainers' Eyes Meet (Lass) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Fillette) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1026,
      en: "Battle! (Trainer Battle) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Combat de Dresseur) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1027,
      en: "Victory! (Trainer Battle) - Omega Ruby/Alpha Sapphire",
      fr: "Victoire! (Combat de Dresseur) - Rubis Oméga/Saphir Alpha",
      tags: ["Victories"],
    },
    {
      id: 1028,
      en: "Petalburg City - Omega Ruby/Alpha Sapphire",
      fr: "Clémenti-Ville - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1029,
      en: "Wally's Theme - Omega Ruby/Alpha Sapphire",
      fr: "Thème de Timmy - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1030,
      en: "Route 104/105/106/107/108/109/115/116 - Omega Ruby/Alpha Sapphire",
      fr: "Route 104/105/106/107/108/109/115/116 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1031,
      en: "Petalburg Woods/Rusturf Tunnel/Granite Cave/Fiery Path/Jagged Pass - Omega Ruby/Alpha Sapphire",
      fr: "Bois Clémenti/Tunnel Mérazon/Grotte Granite/Chemin Ardent/Sentier Sinuroc - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1032,
      en: "Team Magma Appears! - Omega Ruby/Alpha Sapphire",
      fr: "La Team Magma Apparaît! - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1033,
      en: "Battle! (Team Aqua/Team Magma) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Team Aqua/Team Magma) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1034,
      en: "Victory! (Team Aqua/Team Magma) - Omega Ruby/Alpha Sapphire",
      fr: "Victoire! (Team Aqua/Team Magma) - Rubis Oméga/Saphir Alpha",
      tags: ["Victories"],
    },
    {
      id: 1035,
      en: "Rustboro City/Mauville City/Mossdeep City - Omega Ruby/Alpha Sapphire",
      fr: "Mérouville/Lavandia/Algatia - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1036,
      en: "Trainers' School - Omega Ruby/Alpha Sapphire",
      fr: "École de Dresseurs - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1037,
      en: "Crossing the Sea - Omega Ruby/Alpha Sapphire",
      fr: "La mer et au-delà - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1038,
      en: "Dewford Town - Omega Ruby/Alpha Sapphire",
      fr: "Myokara - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1039,
      en: "Trainers' Eyes Meet (Tuber) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Garçon/Fille à la Bouée) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1040,
      en: "Slateport City - Omega Ruby/Alpha Sapphire",
      fr: "Poivressel - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1041,
      en: "Oceanic Museum - Omega Ruby/Alpha Sapphire",
      fr: "Musée Océanographique - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1042,
      en: "Leader's Theme (Team Aqua/Team Magma) (Archie/Maxie) - Omega Ruby/Alpha Sapphire",
      fr: "Thème des Leaders (Team Aqua/Team Magma) (Arthur/Max) - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1043,
      en: "Route 110/111/112/114/117/118 (West) - Omega Ruby/Alpha Sapphire",
      fr: "Route 110/111/112/114/117/118 (Ouest) - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1044,
      en: "Bicycle - Omega Ruby/Alpha Sapphire",
      fr: "Bicyclette - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1045,
      en: "Trainers' Eyes Meet (Triathlete) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Triathlète) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1046,
      en: "Verdanturf Town - Omega Ruby/Alpha Sapphire",
      fr: "Vergazon - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1047,
      en: "Route 113 - Omega Ruby/Alpha Sapphire",
      fr: "Route 113 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1048,
      en: "Trainers' Eyes Meet (Twins) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Jumelles) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1049,
      en: "Fallarbor Town - Omega Ruby/Alpha Sapphire",
      fr: "Autéquia - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1050,
      en: "Mt. Chimney/Seafloor Cavern/Sky Pillar (Cave) - Omega Ruby/Alpha Sapphire",
      fr: "Mont Chimnée/Caverne Fondmer/Pilier Céleste (Intérieur) - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1051,
      en: "Trainers' Eyes Meet (Hiker) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Montagnard) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1052,
      en: "Route 111 (Desert) - Omega Ruby/Alpha Sapphire",
      fr: "Route 111 (Désert) - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1053,
      en: "Pokémon Gym - Omega Ruby/Alpha Sapphire",
      fr: "Arène Pokémon - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1054,
      en: "Battle! (Gym Leader) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Champion d'Arène) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1055,
      en: "Victory! (Gym Leader/Elite Four) - Omega Ruby/Alpha Sapphire",
      fr: "Victoire! (Champion d'Arène/Conseil 4) - Rubis Oméga/Saphir Alpha",
      tags: ["Victories"],
    },
    {
      id: 1056,
      en: "A Path We All Must Walk - Omega Ruby/Alpha Sapphire",
      fr: "Un chemin que nous devons tous emprunter - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1057,
      en: "Surf - Omega Ruby/Alpha Sapphire",
      fr: "Surf - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1058,
      en: "Southern Island - Omega Ruby/Alpha Sapphire",
      fr: "Île du Sud - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1059,
      en: "Route 119/118 (East)/129/130/131/132/133/134 - Omega Ruby/Alpha Sapphire",
      fr: "Route 119/118 (Est)/129/130/131/132/133/134 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1060,
      en: "Explosive Encounters! Red and Blue - Omega Ruby/Alpha Sapphire",
      fr: "Rencontres explosives ! Rouge et Bleu (Attaque de la Team Magma/Aqua) - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1061,
      en: "Fortree City - Omega Ruby/Alpha Sapphire",
      fr: "Cimetronelle - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1062,
      en: "Route 120/121/124/125/126/127/128 - Omega Ruby/Alpha Sapphire",
      fr: "Route 120/121/124/125/126/127/128 - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1063,
      en: "Interviewers - Omega Ruby/Alpha Sapphire",
      fr: "Journalistes - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1064,
      en: "Safari Zone - Omega Ruby/Alpha Sapphire",
      fr: "Parc Safari - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1065,
      en: "Trainers' Eyes Meet (Gentleman) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Gentleman) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1066,
      en: "Lilycove City/Pacifidlog City - Omega Ruby/Alpha Sapphire",
      fr: "Nénucrique/Pacifiville - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1067,
      en: "Lilycove Art Museum - Omega Ruby/Alpha Sapphire",
      fr: "Musée de Nénucrique - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1068,
      en: "Brendan - Omega Ruby/Alpha Sapphire",
      fr: "Brice - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1069,
      en: "Battle! (Brendan/May) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Brice/Flora) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1070,
      en: "Evolution - Omega Ruby/Alpha Sapphire",
      fr: "Évolution - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1071,
      en: "Poké Mart - Omega Ruby/Alpha Sapphire",
      fr: "Boutique Pokémon - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1072,
      en: "Mt. Pyre/Shoal Cave/New Mauville - Omega Ruby/Alpha Sapphire",
      fr: "Mont Mémoria/Grotte Tréfonds/New Lavandia - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1073,
      en: "Trainers' Eyes Meet (Psychic) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Kinésiste) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1074,
      en: "Trainers' Eyes Meet (Hex Maniac) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Mystimaniac) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1075,
      en: "Mt. Pyre Exterior - Omega Ruby/Alpha Sapphire",
      fr: "Extérieur du Mont Mémoria - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1076,
      en: "The Slitherers - Omega Ruby/Alpha Sapphire",
      fr: "Conspiration - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1077,
      en: "Hideout - Omega Ruby/Alpha Sapphire",
      fr: "Planque - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1078,
      en: "Five Furious Strikes! - Omega Ruby/Alpha Sapphire",
      fr: "Les quintuplés Magma/Aqua - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1079,
      en: "Countdown to Destruction - Omega Ruby/Alpha Sapphire",
      fr: "Compte à rebours avant destruction - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1080,
      en: "Dive - Omega Ruby/Alpha Sapphire",
      fr: "Plongée - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1081,
      en: "Trainers' Eyes Meet (Scuba Diver) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Plongeur) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1082,
      en: "Team Aqua Appears! - Omega Ruby/Alpha Sapphire",
      fr: "La Team Aqua apparaît! - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1083,
      en: "Battle! (Team Aqua/Team Magma Leaders) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Leader Aqua/Magma (Arthur/Max)) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1084,
      en: "Drought - Omega Ruby/Alpha Sapphire",
      fr: "Sécheresse - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1085,
      en: "Heavy Rain - Omega Ruby/Alpha Sapphire",
      fr: "Déluge - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1086,
      en: "Sootopolis City - Omega Ruby/Alpha Sapphire",
      fr: "Atalanopolis - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1087,
      en: "Cave of Origin/Meteor Falls - Omega Ruby/Alpha Sapphire",
      fr: "Grotte Origine/Site Météore - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1088,
      en: "Battle! (Primal Reversion (Primal Kyogre/Primal Groudon)) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Primo-Résurgence (Primo-Kyogre/Primo-Groudon)) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1089,
      en: "Coexistence - Omega Ruby/Alpha Sapphire",
      fr: "Coexistence - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1090,
      en: "Soaring Dreams/Soaring in the sky (Day) - Omega Ruby/Alpha Sapphire",
      fr: "Grand Envol (Jour) - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1091,
      en: "Soaring Illusions/Soaring in the sky (Night) - Omega Ruby/Alpha Sapphire",
      fr: "Grand Envol (Nuit) - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1092,
      en: "Trainers' Eyes Meet (Swimmer) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Nageuse/Nageur) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1093,
      en: "Ever Grande City/The Pokémon League - Omega Ruby/Alpha Sapphire",
      fr: "Éternara/Ligue Pokémon - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1094,
      en: "Victory Road - Omega Ruby/Alpha Sapphire",
      fr: "Route Victoire - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1095,
      en: "Trainers' Eyes Meet (Ace Trainer) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Topdresseur) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1096,
      en: "Battle! (Wally) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Timmy) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1097,
      en: "The Elite Four Appear! - Omega Ruby/Alpha Sapphire",
      fr: "Le Conseil 4 apparaît! - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1098,
      en: "Battle! (Elite Four) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Conseil 4) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1099,
      en: "Champion Steven - Omega Ruby/Alpha Sapphire",
      fr: "Maître Pierre - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1100,
      en: "Battle! (Champion Steven) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Pierre le Maître) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1101,
      en: "Victory! (Champion Steven) - Omega Ruby/Alpha Sapphire",
      fr: "Victoire! (Pierre le Maître) - Rubis Oméga/Saphir Alpha",
      tags: ["Victories"],
    },
    {
      id: 1102,
      en: "Room of Glory - Omega Ruby/Alpha Sapphire",
      fr: "Instant de gloire - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1103,
      en: "The Hall of Fame - Omega Ruby/Alpha Sapphire",
      fr: "Panthéon - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1104,
      en: "Let's Go Home - Omega Ruby/Alpha Sapphire",
      fr: "Retour à la maison - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1105,
      en: "Ending Theme - Omega Ruby/Alpha Sapphire",
      fr: "Générique de fin - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1106,
      en: "The End - Omega Ruby/Alpha Sapphire",
      fr: "Fin - Rubis Oméga/Saphir Alpha",
      tags: ["Repetable Events"],
    },
    {
      id: 1107,
      en: "The Heirs to Eternity/Zinnia's Theme - Omega Ruby/Alpha Sapphire",
      fr: "Les Héritiers de l'Eternité/Thème de Amaryllis - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1108,
      en: "Azoth - Omega Ruby/Alpha Sapphire",
      fr: "Azoth - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1109,
      en: "Sky Pillar - Omega Ruby/Alpha Sapphire",
      fr: "Pilier Céleste - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1110,
      en: "The Lament of Falling Stars - Omega Ruby/Alpha Sapphire",
      fr: "La lamentation des étoiles filantes - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1111,
      en: "Battle! (Super-Ancient Pokémon (Rayquaza)) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Pokémon ancestral (Rayquaza)) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1112,
      en: "Battle! (Lorekeeper Zinnia) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Amaryllis la Gardienne du Savoir) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1113,
      en: "Per Aspera Ad Astra - Omega Ruby/Alpha Sapphire",
      fr: "Per Aspera Ad Astra - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1114,
      en: "Battle! (Deoxys) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Deoxys) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1115,
      en: "Strains of a New Beginning -Theme of ~Ωrαs~ - Omega Ruby/Alpha Sapphire",
      fr: "Signes d'un nouveau départ -Thème de ~Ωrαs~ - Rubis Oméga/Saphir Alpha",
      tags: ["Story Events"],
    },
    {
      id: 1116,
      en: "Contest Lobby - Omega Ruby/Alpha Sapphire",
      fr: "Salle de Concours - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1117,
      en: "Lisia's Theme - Omega Ruby/Alpha Sapphire",
      fr: "Thème d'Atalante - Rubis Oméga/Saphir Alpha",
      tags: ["Characters"],
    },
    {
      id: 1118,
      en: "Pokémon Contest Spectacular: Introductions! - Omega Ruby/Alpha Sapphire",
      fr: "Concours Pokémon Live: Exhibitions! - Rubis Oméga/Saphir Alpha",
      tags: ["Mini Games"],
    },
    {
      id: 1119,
      en: "Pokémon Contest Spectacular: Appeals! - Omega Ruby/Alpha Sapphire",
      fr: "Concours Pokémon Live: Démonstrations! - Rubis Oméga/Saphir Alpha",
      tags: ["Mini Games"],
    },
    {
      id: 1120,
      en: "Contest Results Announcement - Omega Ruby/Alpha Sapphire",
      fr: "Concours: Annonce des résultats - Rubis Oméga/Saphir Alpha",
      tags: ["Mini Games"],
    },
    {
      id: 1121,
      en: "Contest Winner - Omega Ruby/Alpha Sapphire",
      fr: "Vainqueur du Concours - Rubis Oméga/Saphir Alpha",
      tags: ["Mini Games"],
    },
    {
      id: 1122,
      en: "The Trick House - Omega Ruby/Alpha Sapphire",
      fr: "Maison des Pièges - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1123,
      en: "Super-Secret Bases - Omega Ruby/Alpha Sapphire",
      fr: "Super Base Secrète - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1124,
      en: "Trainers' Eyes Meet (Poké Fan) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Pokéfan) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1125,
      en: "Trainers' Eyes Meet (Street Thug) - Omega Ruby/Alpha Sapphire",
      fr: "Rencontre avec un Dresseur (Terreur) - Rubis Oméga/Saphir Alpha",
      tags: ["Encounters"],
    },
    {
      id: 1126,
      en: "Sea Mauville (Abandoned Ship)/Mirage Caves/Mirage Forests/Mirage Islands/Mirage Mountains - Omega Ruby/Alpha Sapphire",
      fr: "Sea Mauville (Épave)/Grottes Mirage/Forêts Mirage/Ȋles Mirage/Monts Mirage - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1127,
      en: "Sealed Chamber/Desert Ruins/Island Cave/Ancient Tomb - Omega Ruby/Alpha Sapphire",
      fr: "Sanctuaire/Ruines Désert/Grotte de l'Îlot/Tombeau Antique - Rubis Oméga/Saphir Alpha",
      tags: ["Outdoor Location"],
    },
    {
      id: 1128,
      en: "Battle! (Regirock/Regice/Registeel/Regigigas) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Regirock/Regice/Registeel/Regigigas) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1129,
      en: "Pokémon Link - Omega Ruby/Alpha Sapphire",
      fr: "Poké Lien - Rubis Oméga/Saphir Alpha",
      tags: ["Menu"],
    },
    {
      id: 1130,
      en: "Battle Resort - Omega Ruby/Alpha Sapphire",
      fr: "Atoll de Combat - Rubis Oméga/Saphir Alpha",
      tags: ["Cities"],
    },
    {
      id: 1131,
      en: "Battle Maison - Omega Ruby/Alpha Sapphire",
      fr: "Maison de Combat - Rubis Oméga/Saphir Alpha",
      tags: ["Buildings"],
    },
    {
      id: 1132,
      en: "Battle! (Battle Chatelaine) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Châtelaine Combat) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },
    {
      id: 1133,
      en: "Battle! (World Championships) - Omega Ruby/Alpha Sapphire",
      fr: "Combat! (Championnats du monde) - Rubis Oméga/Saphir Alpha",
      tags: ["Battles"],
    },

    //// Sun/Moon
    // Source name and order :
    //    https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sun_%26_Pok%C3%A9mon_Moon:_Super_Music_Collection
    //    https://vgmdb.net/album/61193
    //    https://www.sittingonclouds.net/album/14
    // Source traduction:
    //    https://www.youtube.com/playlist?list=PLqSYV7fIfmTQc23LfVQh0ebybOsd80cc1 (Pour certaines musiques)
    {
      id: 1134,
      en: "Title Screen - Sun/Moon",
      fr: "Écran titre - Soleil/Lune",
      tags: ["Menu"],
    },
    {
      id: 1135,
      en: "An Adventure Is Beginning - Sun/Moon",
      fr: "L'aventure commence - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1136,
      en: "Alola Region Theme - Sun/Moon",
      fr: "Thème de la région d'Alola - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1137,
      en: "Escape! - Sun/Moon",
      fr: "Fuite! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1138,
      en: "My Home - Sun/Moon",
      fr: "Maison du joueur - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1139,
      en: "Professor Kukui's Theme - Sun/Moon",
      fr: "Thème de Professeur Euphorbe - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1140,
      en: "Route 1 on Melemele Island/Hau'oli Cemetery - Sun/Moon",
      fr: "Route 1 de Mele-Mele/Cimetière d'Ekaeka - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1141,
      en: "Iki Town (Day) - Sun/Moon",
      fr: "Lili'i (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1142,
      en: "Iki Town (Night) - Sun/Moon",
      fr: "Lili'i (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1143,
      en: "Mahalo Trail/Melemele Meadow/Diglett's Tunnel/Wela Volcano Park - Sun/Moon",
      fr: "Sentier de Mahalo/Jardin de Mele-Mele/Tunnel Taupiqueur/Parc Volcanique - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1144,
      en: "A Tapu Appears! - Sun/Moon",
      fr: "Un Toko apparaît! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1145,
      en: "Lillie's Theme - Sun/Moon",
      fr: "Thème de Lilie - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1146,
      en: "Hau's Theme - Sun/Moon",
      fr: "Thème de Tili - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1147,
      en: "Battle! (Hau) - Sun/Moon",
      fr: "Combat! (Tili) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1148,
      en: "Battle! (Wild Pokémon) - Sun/Moon",
      fr: "Combat! (Pokémon sauvage) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1149,
      en: "Victory! (Wild Pokémon) - Sun/Moon",
      fr: "Victoire! (Pokémon sauvage) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1150,
      en: "The Festival in Iki Town - Sun/Moon",
      fr: "Festival de Lili'i - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1151,
      en: "Trainers' Eyes Meet (Trainer) - Sun/Moon",
      fr: "Rencontre avec un Dresseur (Dresseur) - Soleil/Lune",
      tags: ["Encounters"],
    },
    {
      id: 1152,
      en: "Battle! (Trainer) - Sun/Moon",
      fr: "Combat! (Dresseur) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1153,
      en: "Victory! (Trainer) - Sun/Moon",
      fr: "Victoire! (Dresseur) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1154,
      en: "The Pokémon Research Lab - Sun/Moon",
      fr: "Laboratoire Pokémon - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1155,
      en: "The Pokémon Center - Sun/Moon",
      fr: "Centre Pokémon - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1156,
      en: "Have a Break at the Café - Sun/Moon",
      fr: "Café - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1157,
      en: "Festival Plaza (Day) - Sun/Moon",
      fr: "Place Festival (Jour) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1158,
      en: "Festival Plaza (Night) - Sun/Moon",
      fr: "Place Festival (Nuit) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1159,
      en: "Trade - Sun/Moon",
      fr: "Échange - Soleil/Lune",
      tags: ["Menu"],
    },
    {
      id: 1160,
      en: "A Mission at Festival Plaza - Sun/Moon",
      fr: "Place Festival: Mini-quête - Soleil/Lune",
      tags: ["Mini Games"],
    },
    {
      id: 1161,
      en: "Festival Plaza Mission Results - Sun/Moon",
      fr: "Place Festival: Résultats de la Mini-quête - Soleil/Lune",
      tags: ["Mini Games"],
    },
    {
      id: 1162,
      en: "Trainers' School - Sun/Moon",
      fr: "École de Dresseurs - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1163,
      en: "Hau'oli City (Day) - Sun/Moon",
      fr: "Ekaeka (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1164,
      en: "Hau'oli City (Night) - Sun/Moon",
      fr: "Ekaeka (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1165,
      en: "Hurry Along - Sun/Moon",
      fr: "En route! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1166,
      en: "Salon - Sun/Moon",
      fr: "Salon Salle à Mèches - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1167,
      en: "Apparel Shop - Sun/Moon",
      fr: "Boutique de Vêtements Alola Mode - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1168,
      en: "Malasada Shop - Sun/Moon",
      fr: "Malasa'Délices - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1169,
      en: "Evolution - Sun/Moon",
      fr: "Évolution - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1170,
      en: "Evolution (Alola) - Sun/Moon",
      fr: "Évolution (Alola) - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1171,
      en: "Ferry Terminal - Sun/Moon",
      fr: "Embarcadère - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1172,
      en: "Route 2/3 on Melemele Island/Kala'e Bay - Sun/Moon",
      fr: "Route 2/3 de Mele-Mele/Baie de Kala'e - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1173,
      en: "Team Skull Appears! - Sun/Moon",
      fr: "La Team Skull apparaît! - Soleil/Lune",
      tags: ["Encounters"],
    },
    {
      id: 1174,
      en: "Trainers' Eyes Meet (Team Skull) - Sun/Moon",
      fr: "Rencontre avec un Dresseur (Team Skull) - Soleil/Lune",
      tags: ["Encounters"],
    },
    {
      id: 1175,
      en: "Battle! (Team Skull) - Sun/Moon",
      fr: "Combat! (Team Skull) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1176,
      en: "Victory! (Team Skull) - Sun/Moon",
      fr: "Victoire! (Team Skull) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1177,
      en: "Verdant Cavern/Lush Jungle ~A Trial Site~ - Sun/Moon",
      fr: "Grotte Verdoyante/Jungle Sombrefeuille ~Une Zone d'Épreuve~ - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1178,
      en: "A Captain's Trial Begins! - Sun/Moon",
      fr: "L'Épreuve commence! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1179,
      en: "A Totem Pokémon Appears! - Sun/Moon",
      fr: "Un Pokémon Dominant apparaît! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1180,
      en: "Battle! (Totem Pokémon) - Sun/Moon",
      fr: "Combat! (Pokémon Dominant) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1181,
      en: "Victory! (Totem Pokémon) - Sun/Moon",
      fr: "Victoire! (Pokémon Dominant) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1182,
      en: "Seaward Cave - Sun/Moon",
      fr: "Grotte Verlamer - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1183,
      en: "Island Kahuna's Theme - Sun/Moon",
      fr: "Thème des Doyens - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1184,
      en: "Battle! (Island Kahuna) - Sun/Moon",
      fr: "Combat! (Doyen) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1185,
      en: "Victory! (Island Kahuna) - Sun/Moon",
      fr: "Victoire! (Doyen) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1186,
      en: "Ride Pokémon (Land) - Sun/Moon",
      fr: "Poké Monture (Terre) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1187,
      en: "Ten Carat Hill/Resolution Cave - Sun/Moon",
      fr: "Colline Dicarat/Caverne Coda - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1188,
      en: "On the Ship - Sun/Moon",
      fr: "A bord du bateau - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1189,
      en: "Heahea City (Day) - Sun/Moon",
      fr: "Ho'ohale (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1190,
      en: "Heahea City (Night) - Sun/Moon",
      fr: "Ho'ohale (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1191,
      en: "Route 4/5/6/7/8/9 on Akala Island/Brooklet Hill/Memorial Hill/Akala Outskirts - Sun/Moon",
      fr: "Route 4/5/6/7/8/9 d'Akala/Colline Clapotis/Colline Memento/Côte Reculée d'Akala - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1192,
      en: "Paniola Town (Day) - Sun/Moon",
      fr: "Ohana (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1193,
      en: "Paniola Town (Night) - Sun/Moon",
      fr: "Ohana (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1194,
      en: "Paniola Ranch - Sun/Moon",
      fr: "Ranch Ohana - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1195,
      en: "Gladion's Theme - Sun/Moon",
      fr: "Thème de Gladio - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1196,
      en: "Battle! (Gladion) - Sun/Moon",
      fr: "Combat! (Gladio) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1197,
      en: "Ride Pokémon (Aquatic) - Sun/Moon",
      fr: "Poké Monture (Mer) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1198,
      en: "Royal Avenue - Sun/Moon",
      fr: "Rue du Dôme Royal - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1199,
      en: "Thrifty Megamart - Sun/Moon",
      fr: "Bradley Prix - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1200,
      en: "Battle Royal Dome - Sun/Moon",
      fr: "Dôme Royal - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1201,
      en: "Battle! (Battle Royal) - Sun/Moon",
      fr: "Combat! (Bataille Royale) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1202,
      en: "Battle Royal Results - Sun/Moon",
      fr: "Bataille Royale: Résultats - Soleil/Lune",
      tags: ["Mini Games"],
    },
    {
      id: 1203,
      en: "Mallow's Trial - Sun/Moon",
      fr: "Épreuve de Barbara - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1204,
      en: "Poké Pelago (Day) - Sun/Moon",
      fr: "Poké Loisir (Jour) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1205,
      en: "Poké Pelago (Night) - Sun/Moon",
      fr: "Poké Loisir (Nuit) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1206,
      en: "Burnet's Lab/Hokulani Observatory - Sun/Moon",
      fr: "Centre de Recherche Interdimensionnelle (Labo de la Professeure Pimprenelle)/Observatoire - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1207,
      en: "Konikoni City (Day) - Sun/Moon",
      fr: "Konikoni (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1208,
      en: "Konikoni City (Night) - Sun/Moon",
      fr: "Konikoni (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1209,
      en: "Battle! (Team Skull Admin Plumeria) - Sun/Moon",
      fr: "Combat! (Apocyne l'Admin Team Skull) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1210,
      en: "Aether Paradise - Sun/Moon",
      fr: "Paradis Aether - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Outdoor Location"],
    },
    {
      id: 1211,
      en: "An Encounter - Sun/Moon",
      fr: "Une rencontre  - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1212,
      en: "Lusamine's Theme - Sun/Moon",
      fr: "Thème d'Elsa-Mina - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1213,
      en: "The Entrance to Another World - Sun/Moon",
      fr: "L'accès à un autre monde - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1214,
      en: "Ultra Beasts...? - Sun/Moon",
      fr: "Ultra-Chimères...? - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1215,
      en: "Battle! (Ultra Beast) - Sun/Moon",
      fr: "Combat! (Ultra-Chimère) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1216,
      en: "Malie City (Day) - Sun/Moon",
      fr: "Malié (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1217,
      en: "Malie City (Night) - Sun/Moon",
      fr: "Malié (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1218,
      en: "Route 10/11/12/13/14/15/16/17 on Ula'ula Island/Tapu Village/Mount Hokulani/Ula'ula Meadow - Sun/Moon",
      fr: "Route 10/11/12/13/14/15/16/17 de Ula-Ula/Village Toko/Mont Hokulani/Jardin d'Ula-Ula - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1219,
      en: "Guzma's Theme - Sun/Moon",
      fr: "Thème de Guzma - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1220,
      en: "Battle! (Team Skull Boss Guzma) - Sun/Moon",
      fr: "Combat! (Guzma le Boss de la Team Skull) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1221,
      en: "Aether House - Sun/Moon",
      fr: "Foyer Aether - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Buildings"],
    },
    {
      id: 1222,
      en: "Acerola's Trial - Sun/Moon",
      fr: "Épreuve de Margie - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1223,
      en: "Haina Desert - Sun/Moon",
      fr: "Désert Haina - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1224,
      en: "Po Town - Sun/Moon",
      fr: "Kokohio - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1225,
      en: "Nanu's Theme - Sun/Moon",
      fr: "Thème de Danh - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1226,
      en: "Infiltration - Sun/Moon",
      fr: "Infiltration - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1227,
      en: "The Secret Side of Aether Paradise (Faba's Theme) - Sun/Moon",
      fr: "La face cachée du Paradis Aether (Thème de Saubohne) - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Characters"],
    },
    {
      id: 1228,
      en: "Trainers' Eyes Meet (Aether Foundation) - Sun/Moon",
      fr: "Rencontre avec un Dresseur (Fondation Aether) - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Encounters"],
    },
    {
      id: 1229,
      en: "Battle! (Aether Foundation) - Sun/Moon",
      fr: "Combat! (Fondation Aether) - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Battles"],
    },
    {
      id: 1230,
      en: "Aether Paradise Labs - Sun/Moon",
      fr: "Laboratoires du Paradis Aether - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Buildings"],
    },
    {
      id: 1231,
      en: "Unsettling Atmosphere - Sun/Moon",
      fr: "Ambiance inquiétante - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1232,
      en: "There's Trouble! - Sun/Moon",
      fr: "Il y a des problèmes! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1233,
      en: "A Crisis in Alola - Sun/Moon",
      fr: "Une crise à Alola - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1234,
      en: "Battle! (Lusamine) - Sun/Moon",
      fr: "Combat! (Elsa-Mina) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1235,
      en: "Lively Lillie! - Sun/Moon",
      fr: "Lilie Joyeuse! - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1236,
      en: "Seafolk Village (Day) - Sun/Moon",
      fr: "Village Flottant (Jour) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1237,
      en: "Seafolk Village (Night) - Sun/Moon",
      fr: "Village Flottant (Nuit) - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1238,
      en: "Ancient Poni Path/Poni Wilds/Poni Breaker Coast/Exeggutor Island/Poni Grove/Poni Plains/Poni Meadow/Poni Coast/Poni Gauntlet - Sun/Moon",
      fr: "Vieille Route/Prairie de Poni/Récif de Poni/Île Noadkoko/Forêt de Poni/Plaine de Poni/Jardin de Poni/Côte de Poni/Chemin du Défi - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1239,
      en: "The Protector of the Island (Tapu Ruins) - Sun/Moon",
      fr: "Divinités gardiennes d'Alola (Ruines Toko) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1240,
      en: "Vast Poni Canyon - Sun/Moon",
      fr: "Grand Canyon de Poni - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1241,
      en: "To the Altar... (Lake/Altar of the Sunne/Moone) - Sun/Moon",
      fr: "Vers l'autel... (Lac du Halo Solaire/Lunaire & Autel du Soleil/de la Lune) - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1242,
      en: "Solgaleo/Lunala Appears! - Sun/Moon",
      fr: "Solgaleo/Lunala apparaît! - Soleil/Lune",
      tags: ["Encounters"],
    },
    {
      id: 1243,
      en: "Ultra Space - Sun/Moon",
      fr: "Ultra-Dimension - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1244,
      en: "Lusamine's Madness - Sun/Moon",
      fr: "La folie d'Elsa-Mina - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1245,
      en: "Steely Lillie! - Sun/Moon",
      fr: "Steely Lilie ! - Soleil/Lune", // Je suis incapable de traduire Steely
      tags: ["Story Events"],
    },
    {
      id: 1246,
      en: "Showdown! (Lusamine) - Sun/Moon",
      fr: "Combat! (Elsa-Mina fusionnée avec Zéroïd) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1247,
      en: "Victory! (Aether Foundation) - Sun/Moon",
      fr: "Victoire! (Fondation Aether) - Soleil/Lune", // Devrait être orthographié Æther mais cela est impossible à rechercher
      tags: ["Victories"],
    },
    {
      id: 1248,
      en: "A World Falls Apart - Sun/Moon",
      fr: "Un monde s'écroule - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1249,
      en: "Mother and Daughter - Sun/Moon",
      fr: "Mère et fille - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1250,
      en: "Battle! (Solgaleo/Lunala) - Sun/Moon",
      fr: "Combat! (Solgaleo/Lunala) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1251,
      en: "Lonely Lillie - Sun/Moon",
      fr: "Lilie est seule - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1252,
      en: "The Battle Tree - Sun/Moon",
      fr: "L'Arbre de Combat - Soleil/Lune",
      tags: ["Buildings"],
    },
    {
      id: 1253,
      en: "Blue's Theme - Sun/Moon",
      fr: "Thème de Blue - Soleil/Lune",
      tags: ["Characters"],
    },
    {
      id: 1254,
      en: "Battle! (Battle Tree Boss) - Sun/Moon",
      fr: "Combat! (Dresseurs de Légende) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1255,
      en: "The Path to the League/Mount Lanakila - Sun/Moon",
      fr: "Le chemin vers la Ligue/Mont Lanakila - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1256,
      en: "The Summit of Mount Lanakila - Sun/Moon",
      fr: "Sommet du Mont Lanakila - Soleil/Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1257,
      en: "The Pokémon League - Sun/Moon",
      fr: "Ligue Pokémon - Soleil/Lune",
      tags: ["Cities"],
    },
    {
      id: 1258,
      en: "Battle! (Elite Four) - Sun/Moon",
      fr: "Combat! (Conseil 4) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1259,
      en: "The Battle at the Summit!/Battle! (Champion) - Sun/Moon",
      fr: "La combat au sommet!/Combat! (Maître) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1260,
      en: "A Champion Is Born!/Victory! (Champion) - Sun/Moon",
      fr: "Un Maître de la Ligue est né !/Victoire! (Maître) - Soleil/Lune",
      tags: ["Victories"],
    },
    {
      id: 1261,
      en: "Hall of Fame - Sun/Moon",
      fr: "Panthéon - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1262,
      en: "Battle! (Tapu) - Sun/Moon",
      fr: "Combat! (Toko) - Soleil/Lune",
      tags: ["Battles"],
    },
    {
      id: 1263,
      en: "Someday... - Sun/Moon",
      fr: "Un jour... - Soleil/Lune",
      tags: ["Story Events"],
    },
    {
      id: 1264,
      en: "Welcome Back/Ending Theme (Part 1) - Sun/Moon",
      fr: "Bon retour/Générique de fin (Part 1) - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1265,
      en: "Staff Credits/Ending Theme (Part 2) - Sun/Moon",
      fr: "Générique de fin (Part 2) - Soleil/Lune",
      tags: ["Repetable Events"],
    },
    {
      id: 1266,
      en: "The End - Sun/Moon",
      fr: "Fin - Soleil/Lune",
      tags: ["Repetable Events"],
    },

    //// Ultra Sun/Ultra Moon
    // Source name and order :
    //    https://www.sittingonclouds.com/album/13

    // Source traduction: Aucune
    {
      id: 1267,
      en: "Alola Region Theme - Ultra Sun/Ultra Moon",
      fr: "Thème de la région d'Alola - Ultra-Soleil/Ultra-Lune",
      tags: ["Story Events"],
    },
    {
      id: 1268,
      en: "Battle! (Wild Pokémon) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Pokémon sauvage) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1269,
      en: "Battle! (Trainer) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Dresseur) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1270,
      en: "Trainers' Eyes Meet! (Ultra Recon Squad) - Ultra Sun/Ultra Moon",
      fr: "Rencontre avec un Dresseur (Ultra-Commando) - Ultra-Soleil/Ultra-Lune",
      tags: ["Encounters"],
    },
    {
      id: 1271,
      en: "Beach Spot - Ultra Sun/Ultra Moon",
      fr: "Spot de la plage - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1272,
      en: "Mantine Surf - Ultra Sun/Ultra Moon",
      fr: "Surf Démanta - Ultra-Soleil/Ultra-Lune",
      tags: ["Mini Games"],
    },
    {
      id: 1273,
      en: "Alola Photoclub - Ultra Sun/Ultra Moon",
      fr: "Studio Photo d'Alola - Ultra-Soleil/Ultra-Lune",
      tags: ["Mini Games"],
    },
    {
      id: 1274,
      en: "Battle! (Ultra Recon Squad) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Ultra-Commando) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1275,
      en: "Battle Agency - Ultra Sun/Ultra Moon",
      fr: "Agence de Combat - Ultra-Soleil/Ultra-Lune",
      tags: ["Buildings"],
    },
    {
      id: 1276,
      en: "Pikachu Valley - Ultra Sun/Ultra Moon",
      fr: "Plaine des Pikachu - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1277,
      en: "Battle! (Dusk Mane/Dawn Wings Necrozma) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Necrozma Crinière du Couchant/Ailes de l'Aurore) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1278,
      en: "Ultra Wormhole - Ultra Sun/Ultra Moon",
      fr: "Ultra-Brèche - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1279,
      en: "Unsettling Ambience - Ultra Sun/Ultra Moon",
      fr: "Les sept mystères de l'École de Dresseurs - Ultra-Soleil/Ultra-Lune",
      tags: ["Story Events"],
    },
    {
      id: 1280,
      en: "Ultra Megalopolis - Ultra Sun/Ultra Moon",
      fr: "Ultra-Mégalopole - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1281,
      en: "Battle! (Ultra Necrozma) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Ultra-Necrozma) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1282,
      en: "Ultra Space Wilds - Ultra Sun/Ultra Moon",
      fr: "Ultra-Dimension Zéro - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1283,
      en: "Ultra Plant Theme (Xurkitree) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Centrale (Câblifère) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1284,
      en: "Ultra Crater Theme (Celesteela) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Vallée (Bamboiselle) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1285,
      en: "Ultra Desert Theme (Pheromosa) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Désert (Cancrelove) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1286,
      en: "Ultra Forest Theme (Kartana) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Forêt (Katagami) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1287,
      en: "Ultra Jungle Theme (Buzzwole) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Jungle (Mouscoto) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1288,
      en: "Ultra Ruin Theme (Guzzlord) - Ultra Sun/Ultra Moon",
      fr: "Ultra-Gratte-Ciel (Engloutyran) - Ultra-Soleil/Ultra-Lune",
      tags: ["Outdoor Location"],
    },
    {
      id: 1289,
      en: "Battle! (Champion Hau) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Maître Tili) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1290,
      en: "Kantonian Gym - Ultra Sun/Ultra Moon",
      fr: "Arène de Kanto - Ultra-Soleil/Ultra-Lune",
      tags: ["Buildings"],
    },
    {
      id: 1291,
      en: "Team Rocket's Castle - Ultra Sun/Ultra Moon",
      fr: "Château Rocket - Ultra-Soleil/Ultra-Lune",
      tags: ["Buildings"],
    },
    {
      id: 1292,
      en: "Trainers' Eyes Meet! (Team Rainbow Rocket) - Ultra Sun/Ultra Moon",
      fr: "Rencontre avec un Dresseur (Team Rainbow Rocket) - Ultra-Soleil/Ultra-Lune",
      tags: ["Encounters"],
    },
    {
      id: 1293,
      en: "Battle! (Team Rainbow Rocket) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Team Rainbow Rocket) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1294,
      en: "Battle! (Team Magma/Aqua Boss Maxie & Archie) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Max/Arthur de la Team Magma/Aqua) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1295,
      en: "Battle! (Team Galactic Boss Cyrus) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Hélio de la Team Galaxie) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1296,
      en: "Battle! (Team Plasma Boss Ghetsis) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Ghetis de la Team Plasma) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1297,
      en: "Battle! (Team Flare Boss Lysandre) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Lysandre de la Team Flare) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1298,
      en: "Trainers' Eyes Meet! (Giovanni) - Ultra Sun/Ultra Moon",
      fr: "Rencontre avec un Dresseur (Giovanni) - Ultra-Soleil/Ultra-Lune",
      tags: ["Encounters"],
    },
    {
      id: 1299,
      en: "Battle! (Team Rocket Boss Giovanni) - Ultra Sun/Ultra Moon",
      fr: "Combat! (Giovanni de la Team Rainbow Rocket) - Ultra-Soleil/Ultra-Lune",
      tags: ["Battles"],
    },
    {
      id: 1300,
      en: "Ending Theme - Ultra Sun/Ultra Moon",
      fr: "Générique de fin - Ultra-Soleil/Ultra-Lune",
      tags: ["Repetable Events"],
    },

    //// Let's Go Pikachu/Eevee
    // Source name and order :
    //      https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon:_Let%27s_Go,_Pikachu!_%26_Pok%C3%A9mon:_Let%27s_Go,_Eevee!_Super_Music_Collection
    //      https://vgmdb.net/album/80458
    //      https://www.sittingonclouds.com/album/1172
    // Source traduction (partiel):
    //    https://music.apple.com/fr/album/pok%C3%A9mon-rouge-feu-et-pok%C3%A9mon-vert-feuille-super-music/880123575
    {
      id: 1301,
      en: "Into The Game - Let's Go, Pikachu/Eevee!",
      fr: "Séquence d'introduction - Let's Go, Pikachu/Évoli",
      tags: ["Menu"],
    },
    {
      id: 1302,
      en: "Choose Your Language - Let's Go, Pikachu/Eevee!",
      fr: "Choisissez la langue de votre jeu - Let's Go, Pikachu/Évoli",
      tags: ["Menu"],
    },
    {
      id: 1303,
      en: "Title Screen - Let's Go, Pikachu/Eevee!",
      fr: "Écran titre - Let's Go, Pikachu/Évoli",
      tags: ["Menu"],
    },
    {
      id: 1304,
      en: "Pallet Town Theme - Let's Go, Pikachu/Eevee!",
      fr: "Bourg Palette - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1305,
      en: "Professor Oak - Let's Go, Pikachu/Eevee!",
      fr: "Professeur Chen - Let's Go, Pikachu/Évoli",
      tags: ["Characters"],
    },
    {
      id: 1306,
      en: "Guide - Let's Go, Pikachu/Eevee!",
      fr: "Guide - Let's Go, Pikachu/Évoli",
      tags: ["Story Events"],
    },
    {
      id: 1307,
      en: "Professor Oak's Laboratory - Let's Go, Pikachu/Eevee!",
      fr: "Laboratoire Pokémon du Professeur Chen - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1308,
      en: "Route 1/2 (Road to Viridian City: Leaving Pallet Town)/Underground Path - Let's Go, Pikachu/Eevee!",
      fr: "Route 1/2 (De Bourg Palette à Jadielle)/Souterrain - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1309,
      en: "Pokémon Center - Let's Go, Pikachu/Eevee!",
      fr: "Centre Pokémon - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1310,
      en: "Trainers' Eyes Meet! (Boy) - Let's Go, Pikachu/Eevee!",
      fr: "Rencontre avec un Dresseur (Garçon) - Let's Go, Pikachu/Évoli",
      tags: ["Encounters"],
    },
    {
      id: 1311,
      en: "Battle! (Trainer) - Let's Go, Pikachu/Eevee!",
      fr: "Combat! (Dresseur) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1312,
      en: "Victory! (Trainer) - Let's Go, Pikachu/Eevee!",
      fr: "Victoire! (Dresseur) - Let's Go, Pikachu/Évoli",
      tags: ["Victories"],
    },
    {
      id: 1313,
      en: "Viridian Forest/Diglett's Cave/Seafoam Islands - Let's Go, Pikachu/Eevee!",
      fr: "Forêt de Jade/Grotte Taupiqueur/Îles Écume - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1314,
      en: "Battle/Catch! (Wild Pokémon) - Let's Go, Pikachu/Eevee!",
      fr: "Combat/Capture! (Pokémon sauvage) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1315,
      en: "Victory/Successful Catch! (Wild Pokémon) - Let's Go, Pikachu/Eevee!",
      fr: "Victoire/Capture réussie! (Pokémon sauvage) - Let's Go, Pikachu/Évoli",
      tags: ["Victories"],
    },
    {
      id: 1316,
      en: "Trainers' Eyes Meet! (Girl) - Let's Go, Pikachu/Eevee!",
      fr: "Rencontre avec un Dresseur (Fille) - Let's Go, Pikachu/Évoli",
      tags: ["Encounters"],
    },
    {
      id: 1317,
      en: "Pewter City/Viridian City/Saffron City Theme - Let's Go, Pikachu/Eevee!",
      fr: "Argenta/Jadielle/Safrania - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1318,
      en: "Pokémon Gym - Let's Go, Pikachu/Eevee!",
      fr: "Arène Pokémon - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1319,
      en: "Battle! (Gym Leader) - Let's Go, Pikachu/Eevee!",
      fr: "Combat! (Champion d'Arène) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1320,
      en: "Victory! (Gym Leader) - Let's Go, Pikachu/Eevee!",
      fr: "Victoire! (Champion d'Arène) - Let's Go, Pikachu/Évoli",
      tags: ["Victories"],
    },
    {
      id: 1321,
      en: "Blue’s Theme - Let's Go, Pikachu/Eevee!",
      fr: "Thème de Blue - Let's Go, Pikachu/Évoli",
      tags: ["Characters"],
    },
    {
      id: 1322,
      en: "Route 3/4/5/6/7/8/9/10/16 (East)/18 (East)/19/20/21/22 (Road to Cerulean City: Leaving Mt. Moon) - Let's Go, Pikachu/Eevee!",
      fr: "Route 3/4/5/6/7/8/9/10/16 (Est)/18 (Est)/19/20/21/22 (Du Mont Sélénite à Azuria) - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1323,
      en: "Caves of Mt. Moon/Rock Tunnel/Cerulean Cave/Victory Road - Let's Go, Pikachu/Eevee!",
      fr: "Mont Sélénite/Grotte Sombre/Caverne Azurée/Route Victoire - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1324,
      en: "Trainers' Eyes Meet! (Team Rocket) - Let's Go, Pikachu/Eevee!",
      fr: "Rencontre avec un Dresseur (Team Rocket) - Let's Go, Pikachu/Évoli",
      tags: ["Encounters"],
    },
    {
      id: 1325,
      en: "Jessie & James - Let's Go, Pikachu/Eevee!",
      fr: "Jessie & James - Let's Go, Pikachu/Évoli",
      tags: ["Characters"],
    },
    {
      id: 1326,
      en: "Evolution - Let's Go, Pikachu/Eevee!",
      fr: "Évolution - Let's Go, Pikachu/Évoli",
      tags: ["Repetable Events"],
    },
    {
      id: 1327,
      en: "Cerulean City/Fuchsia City Theme - Let's Go, Pikachu/Eevee!",
      fr: "Azuria/Parmanie - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1328,
      en: "Route 24/25 (To Bill: Leaving Cerulean City) - Let's Go, Pikachu/Eevee!",
      fr: "Route 24/25 (D'Azuria à la maison de Léo) - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1329,
      en: "Vermilion City Theme - Let's Go, Pikachu/Eevee!",
      fr: "Carmin sur Mer - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1330,
      en: "The S.S. Anne - Let's Go, Pikachu/Eevee!",
      fr: "L'Océane - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1331,
      en: "Route 11/12/13/14/15 (Road to Lavender Town: Leaving Vermilion City) - Let's Go, Pikachu/Eevee!",
      fr: "Route 11/12/13/14/15 (De Carmin sur Mer à Lavanville) - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1332,
      en: "Lavender Town Theme - Let's Go, Pikachu/Eevee!",
      fr: "Lavanville - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1333,
      en: "Pokémon Tower - Let's Go, Pikachu/Eevee!",
      fr: "Tour Pokémon - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1334,
      en: "Celadon City Theme - Let's Go, Pikachu/Eevee!",
      fr: "Céladopole - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1335,
      en: "Team Rocket Hideout - Let's Go, Pikachu/Eevee!",
      fr: "Repaire Rocket - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1336,
      en: "Battle! (Legendary) - Let's Go, Pikachu/Eevee!",
      fr: "Combat! (Pokémon légendaire) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1337,
      en: "Pokémon Road (Route 17/16 (West)/18 (West))/Bicycle Theme - Let's Go, Pikachu/Eevee!",
      fr: "Piste Pokémon (Route 17/16 (Ouest)/18 (Ouest))/Bicyclette - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1338,
      en: "GO Park - Let's Go, Pikachu/Eevee!",
      fr: "GO Park - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1339,
      en: "Catch! (GO Park) - Let's Go, Pikachu/Eevee!",
      fr: "Capture! (GO Park) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1340,
      en: "Silph Co./Abandoned Power Plant - Let's Go, Pikachu/Eevee!",
      fr: "Sylphe SARL/Centrale abandonnée - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1341,
      en: "Surf - Let's Go, Pikachu/Eevee!",
      fr: "Surf - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1342,
      en: "Cinnabar Island Theme - Let's Go, Pikachu/Eevee!",
      fr: "Cramois'Île - Let's Go, Pikachu/Évoli",
      tags: ["Cities"],
    },
    {
      id: 1343,
      en: "Pokémon Mansion - Let's Go, Pikachu/Eevee!",
      fr: "Manoir Pokémon - Let's Go, Pikachu/Évoli",
      tags: ["Buildings"],
    },
    {
      id: 1344,
      en: "Route 23/Indigo Plateau - Let's Go, Pikachu/Eevee!",
      fr: "Route 23/Plateau Indigo - Let's Go, Pikachu/Évoli",
      tags: ["Outdoor Location"],
    },
    {
      id: 1345,
      en: "Battle! (Champion/Rival Trace) - Let's Go, Pikachu/Eevee!",
      fr: "Combat! (Maître/Rival Trace) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },
    {
      id: 1346,
      en: "Hall Of Fame - Let's Go, Pikachu/Eevee!",
      fr: "Panthéon - Let's Go, Pikachu/Évoli",
      tags: ["Repetable Events"],
    },
    {
      id: 1347,
      en: "Congratulations! - Let's Go, Pikachu/Eevee!",
      fr: "Félicitations! - Let's Go, Pikachu/Évoli",
      tags: ["Repetable Events"],
    },
    {
      id: 1348,
      en: "Ending Theme - Let's Go, Pikachu/Eevee!",
      fr: "Générique de fin - Let's Go, Pikachu/Évoli",
      tags: ["Repetable Events"],
    },
    {
      id: 1349,
      en: "We're Back - Let's Go, Pikachu/Eevee!",
      fr: "Nous sommes de retour - Let's Go, Pikachu/Évoli",
      tags: ["Story Events"],
    },
    {
      id: 1350,
      en: "Pokéball Plus/Connection - Let's Go, Pikachu/Eevee!",
      fr: "Poké Ball Plus/Connexion - Let's Go, Pikachu/Évoli",
      tags: ["Menu"],
    },
    {
      id: 1351,
      en: "Mystery Gift Theme - Let's Go, Pikachu/Eevee!",
      fr: "Cadeau Mystère - Let's Go, Pikachu/Évoli",
      tags: ["Menu"],
    },
    {
      id: 1352,
      en: "Battle! (Master Trainer) - Let's Go, Pikachu/Eevee!",
      fr: "Combat! (Expert Pokémon) - Let's Go, Pikachu/Évoli",
      tags: ["Battles"],
    },

    //// Sword/Shield
    // Source name and order : https://vgmdb.net/album/134815 & https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sword_-_Shield_%2B_Expansion_Pass_Super_Music_Collection
    // Source traduction: Aucune
    {
      id: 1353,
      en: "Title Screen - Sword/Shield",
      fr: "Écran titre - Épée/Bouclier",
      tags: ["Menu"],
    },
    {
      id: 1354,
      //en: "Welcome to the World of Pokémon! (Galar Region Theme) - Sword/Shield",
      //fr: "Bienvenue dans le monde des Pokémon ! (Thème de la région de Galar) - Épée/Bouclier",
      en: "Exhibition Match - Sword/Shield",
      fr: "Match de démonstration - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1355,
      en: "Postwick - Sword/Shield",
      fr: "Paddoxton - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1356,
      en: "Hop's Theme - Sword/Shield",
      fr: "Thème de Nabil - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1357,
      en: "Route 1/2 - Sword/Shield",
      fr: "Route 1/2 - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1358,
      en: "Wedgehurst - Sword/Shield",
      fr: "Brasswick - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1359,
      en: "Let's Have a Champion Time!/Champion Leon's Theme - Sword/Shield",
      fr: "C'est l'heure du Maître !/Thème du Maître Tarak - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1360,
      en: "Battle! (Hop) - Sword/Shield",
      fr: "Combat! (Nabil) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1361,
      en: "Slumbering Weald - Sword/Shield",
      fr: "Forêt de Sleepwood - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1362,
      en: "In the Fog/Battle! (Zacian/Zamazenta) (First Encounter) - Sword/Shield",
      fr: "Dans le brouillard/Combat! (Zacian/Zamazenta) (Première rencontre) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1363,
      en: "Professor Magnolia's Laboratory - Sword/Shield",
      fr: "Laboratoire du Professeur Magnolia - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1364,
      en: "Sonia's Theme - Sword/Shield",
      fr: "Thème de Sonya - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1365,
      en: "Pokémon Center - Sword/Shield",
      fr: "Centre Pokémon - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1366,
      en: "Battle! (Wild Pokémon) - Sword/Shield",
      fr: "Combat! (Pokémon sauvage) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1367,
      en: "Victory! (Wild Pokémon) - Sword/Shield",
      fr: "Victoire! (Pokémon sauvage) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1368,
      en: "Lead the Way - Sword/Shield",
      fr: "En route! - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1369,
      en: "Wild Area Station - Sword/Shield",
      fr: "Gare des Terres Sauvages - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1370,
      en: "Wild Area (South) - Sword/Shield",
      fr: "Terres Sauvages (Sud) - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1371,
      en: "Battle! (Max Raid) - Sword/Shield",
      fr: "Combat! (Raid Dynamax) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1372,
      en: "Victory! (Max Raid) - Sword/Shield",
      fr: "Victoire! (Raid Dynamax) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1373,
      en: "Let's Make Curry! - Sword/Shield",
      fr: "Préparons du Curry ! - Épée/Bouclier",
      tags: ["Mini Games"],
    },
    {
      id: 1374,
      en: "Motostoke - Sword/Shield",
      fr: "Motorby - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1375,
      en: "Boutique - Sword/Shield",
      fr: "Magasin de vêtements - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1376,
      en: "Stadium - Sword/Shield",
      fr: "Stade - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1377,
      en: "Budew Drop Inn - Sword/Shield",
      fr: "Hôtel Rozbouton d'Or - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1378,
      en: "Legends of History - Sword/Shield",
      fr: "Légendes de l'histoire - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1379,
      en: "Team Yell Appears! - Sword/Shield",
      fr: "La Team Yell apparaît! - Épée/Bouclier",
      tags: ["Encounters"],
    },
    {
      id: 1380,
      en: "Marnie's Theme - Sword/Shield",
      fr: "Thème de Rosemary - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1381,
      en: "Gym Challenge Opening Ceremony - Sword/Shield",
      fr: "Cérémonie d'ouverture du Défi des Arènes - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1382,
      en: "Chairman Rose's Theme - Sword/Shield",
      fr: "Thème du Président Shehroz - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1383,
      en: "Route 3/4/5/Motostoke Outskirts - Sword/Shield",
      fr: "Route 3/4/5/Abords de Motorby - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1384,
      en: "Trainers' Eyes Meet! (Trainer) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Dresseur) - Épée/Bouclier", // Pour + de classe de drésseur : https://www.youtube.com/watch?v=fdFM6dm5dYA&list=PLqSYV7fIfmTR-ReD3Zv1Go3t2AjoAixm0&index=23
      tags: ["Encounters"],
    },
    {
      id: 1385,
      en: "Battle! (Trainer) - Sword/Shield",
      fr: "Combat! (Dresseur) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1386,
      en: "Victory! (Trainer) - Sword/Shield",
      fr: "Victoire! (Dresseur) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1387,
      en: "Trainers' Eyes Meet! (Lass) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Fillette) - Épée/Bouclier", // Pour + de classe de drésseur : https://www.youtube.com/watch?v=NMErXm-yLps&list=PLqSYV7fIfmTR-ReD3Zv1Go3t2AjoAixm0&index=24
      tags: ["Encounters"],
    },
    {
      id: 1388,
      en: "Evolution - Sword/Shield",
      fr: "Évolution - Épée/Bouclier",
      tags: ["Repetable Events"],
    },
    {
      id: 1389,
      en: "Evolution (Galar) - Sword/Shield",
      fr: "Évolution (Galar) - Épée/Bouclier",
      tags: ["Repetable Events"],
    },
    {
      id: 1390,
      en: "Galar Mines - Sword/Shield",
      fr: "Mines de Galar - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1391,
      en: "Trainers' Eyes Meet! (Worker) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Ouvrier) - Épée/Bouclier", // Pour + de classe de drésseur : https://www.youtube.com/watch?v=wHw7XbyoSpY&list=PLqSYV7fIfmTR-ReD3Zv1Go3t2AjoAixm0&index=26
      tags: ["Encounters"],
    },
    {
      id: 1392,
      en: "Bede's Theme - Sword/Shield",
      fr: "Thème de Travis - Épée/Bouclier",
      tags: ["Characters"],
    },
    {
      id: 1393,
      en: "Battle! (Bede) - Sword/Shield",
      fr: "Combat! (Travis) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1394,
      en: "Trainers' Eyes Meet! (Pokémon Breeder) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Éleveur/Éleveuse) - Épée/Bouclier", // Pour + de classe de drésseur : https://www.youtube.com/watch?v=qSI2mzIGWXo&list=PLqSYV7fIfmTR-ReD3Zv1Go3t2AjoAixm0&index=27
      tags: ["Encounters"],
    },
    {
      id: 1395,
      en: "Turffield - Sword/Shield",
      fr: "Greenbury - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1396,
      en: "Gym Mission! - Sword/Shield",
      fr: "Mission d'Arène! - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1397,
      en: "Trainers' Eyes Meet! (Gym Trainer) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Dresseur d'Arène) - Épée/Bouclier",
      tags: ["Encounters"],
    },
    {
      id: 1398,
      en: "Victory! (Gym Trainer) - Sword/Shield",
      fr: "Victoire! (Dresseur d'Arène) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1399,
      en: "Battle! (Gym Leader) - Sword/Shield",
      fr: "Combat! (Champion d'Arène) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1400,
      en: "Victory! (Gym Leader) - Sword/Shield",
      fr: "Victoire! (Champion d'Arène) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1401,
      en: "Hulbury - Sword/Shield",
      fr: "Skifford - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1402,
      en: "Poké Jobs - Sword/Shield",
      fr: "Poké Service - Épée/Bouclier",
      tags: ["Menu"],
    },
    {
      id: 1403,
      en: "Battle! (Marnie) - Sword/Shield",
      fr: "Combat! (Rosemary) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1404,
      en: "Wild Area (North) - Sword/Shield",
      fr: "Terres Sauvages (Nord) - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1405,
      en: "Rotom Rally - Sword/Shield",
      fr: "Moti-Rallye - Épée/Bouclier",
      tags: ["Mini Games"],
    },
    {
      id: 1406,
      en: "Hammerlocke - Sword/Shield",
      fr: "Kickenham - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1407,
      en: "Salon - Sword/Shield",
      fr: "Salon Salle à Mèches - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1408,
      en: "Route 6/7/8/9 - Sword/Shield",
      fr: "Route 6/7/8/9 - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1409,
      en: "Trainers' Eyes Meet! (Artist) - Sword/Shield",
      fr: "Rencontre avec un Dresseur (Artiste) - Épée/Bouclier", // Pour + de classe de drésseur : https://www.youtube.com/watch?v=xOkjOMUXy7Y&list=PLqSYV7fIfmTR-ReD3Zv1Go3t2AjoAixm0&index=25
      tags: ["Encounters"],
    },
    {
      id: 1410,
      en: "Stow-On-Side - Sword/Shield",
      fr: "Old Chister - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1411,
      en: "Crumbling Ruins - Sword/Shield",
      fr: "Ruines croulantes - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1412,
      //en: "The Secret Of Stow-On-Side's Mural (Galar Legends) - Sword/Shield",
      //fr: "Le secret de la fresque d'Old Chister (Légendes de Galar) - Épée/Bouclier",
      en: "Truth of the Ruins (Galar Legends) - Sword/Shield",
      fr: "La vérité sur les ruines (Légendes de Galar) - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1413,
      en: "Glimwood Tangle - Sword/Shield",
      fr: "Forêt de Lumirinth - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1414,
      en: "Ballonlea - Sword/Shield",
      fr: "Corrifey - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1415,
      en: "Circhester - Sword/Shield",
      fr: "Ludester - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1416,
      en: "Spikemuth - Sword/Shield",
      fr: "Smashings - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1417,
      en: "Battle! (Team Yell) - Sword/Shield",
      fr: "Combat! (Team Yell) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1418,
      en: "Battle! (Gym Leader Piers) - Sword/Shield",
      fr: "Combat! (Peterson le Champion d'Arène) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1419,
      en: "Route 10 - Sword/Shield",
      fr: "Route 10 - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1420,
      en: "Wyndon - Sword/Shield",
      fr: "Winscor - Épée/Bouclier",
      tags: ["Cities"],
    },
    {
      id: 1421,
      en: "Wyndon Stadium - Sword/Shield",
      fr: "Stade de Winscor (Siège de la Ligue) - Épée/Bouclier",
      tags: ["Buildings"],
    },
    // {
    //   id: -6,
    //   en: "Wyndon Stadium (Locker Room) - Sword/Shield",
    //   fr: "Stade de Winscor (Siège de la Ligue) (Vestiaires) - Épée/Bouclier",
    // },
    {
      id: 1422,
      en: "Decisive Battle! (Marnie) - Sword/Shield",
      fr: "Combat décisif! (Rosemary) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1423,
      en: "Decisive Battle! (Hop) - Sword/Shield",
      fr: "Combat décisif! (Nabil) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1424,
      en: "Rose Tower - Sword/Shield",
      fr: "Shehroz Tower - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1425,
      en: "Arrival at the Top - Sword/Shield",
      fr: "Arrivée au sommet de la Shehroz Tower - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1426,
      en: "Battle! (Oleana) - Sword/Shield",
      fr: "Combat! (Liv) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1427,
      en: "Final Tournament Begin! - Sword/Shield",
      fr: "Le tournoi final commence ! - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1428,
      en: "Battle! (Pokémon League Tournament) - Sword/Shield",
      fr: "Combat! (Poké Masters) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1429,
      en: "Victory! (Pokémon League Tournament) - Sword/Shield",
      fr: "Victoire! (Poké Masters) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1430,
      en: "Darkest Day - Sword/Shield",
      fr: "La Nuit Noire - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1431,
      en: "Slumbering Weald Shrine/Deep in the Forest - Sword/Shield",
      fr: "Autel de la Forêt de Sleepwood - Épée/Bouclier",
      tags: ["Outdoor Location"],
    },
    {
      id: 1432,
      en: "Abnormal Situation - Sword/Shield",
      fr: "Situation anormale - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1433,
      en: "Energy Plant - Sword/Shield",
      fr: "Salle du réacteur - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1434,
      en: "Battle! (Chairman Rose) - Sword/Shield",
      fr: "Combat! (Président Shehroz de Macro Cosmos) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1435,
      en: "Leon and Eternatus - Sword/Shield",
      fr: "Tarak et Éthernatos - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1436,
      en: "Battle! (Eternatus) - Sword/Shield",
      fr: "Combat! (Éthernatos) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1437,
      en: "Infinite Power (Eternamax Eternatus) - Sword/Shield",
      fr: "Pouvoir infini (Éthernatos Infinimax) - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1438,
      en: "Decisive Battle! (Eternatus) - Sword/Shield",
      fr: "Combat décisif! (Éthernatos) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1439,
      en: "Caught an Eternatus - Sword/Shield",
      fr: "Éthernatos attrapé - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1440,
      en: "Decisive Battle! (Champion Leon) - Sword/Shield",
      fr: "Combat décisif! (Tarak le Maître) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1441,
      en: "Victory! (Champion Leon) - Sword/Shield",
      fr: "Victoire! (Tarak le Maître) - Épée/Bouclier",
      tags: ["Victories"],
    },
    {
      id: 1442,
      en: "To Create a Bright Future - Sword/Shield",
      fr: "Créer un avenir meilleur - Épée/Bouclier",
      tags: ["Story Events"],
    },
    {
      id: 1443,
      en: "Battle Tower - Sword/Shield",
      fr: "Tour de Combat - Épée/Bouclier",
      tags: ["Buildings"],
    },
    {
      id: 1444,
      en: "Battle! (Battle Tower) - Sword/Shield",
      fr: "Combat! (Tour de Combat) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1445,
      en: "Battle! (Zacian/Zamazenta) - Sword/Shield",
      fr: "Combat! (Zacian/Zamazenta) - Épée/Bouclier",
      tags: ["Battles"],
    },
    {
      id: 1446,
      en: "Staff Roll - Sword/Shield",
      fr: "Générique de fin - Épée/Bouclier",
      tags: ["Story Events"],
    },
    // = Battle! (Zacian/Zamazenta) (First Encounter) (They do not seem to be different despite being listed in my old source)
    // {
    //     id: -7,
    //     en: "Zacian/Zamazenta Encounter - Sword/Shield",
    //     fr: "Rencontre avec Zacian/Zamazenta - Épée/Bouclier"
    // },

    //// Sword/Shield (The Isle of Armor)
    // Source name and order : https://vgmdb.net/album/134815 & https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sword_-_Shield_%2B_Expansion_Pass_Super_Music_Collection Disc 4
    {
      id: 1447,
      en: "The Isle Of Armor - Sword/Shield (The Isle of Armor)",
      fr: "Isolarmure - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Story Events"],
    },
    {
      id: 1448,
      en: "Klara's Theme - Sword/Shield (The Isle of Armor)",
      fr: "Thème de Sophora - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Characters"],
    },
    {
      id: 1449,
      en: "Battle! (Klara) - Sword/Shield (The Isle of Armor)",
      fr: "Combat! (Sophora) - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Battles"],
    },
    {
      id: 1450,
      en: "Avery's Theme - Sword/Shield (The Isle of Armor)",
      fr: "Thème de Saturnin - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Characters"],
    },
    {
      id: 1451,
      en: "Battle! (Avery) - Sword/Shield (The Isle of Armor)",
      fr: "Combat! (Saturnin) - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Battles"],
    },
    {
      id: 1452,
      en: "Master Dojo - Sword/Shield (The Isle of Armor)",
      fr: "Dojo de la Maîtrise - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Buildings"],
    },
    {
      id: 1453,
      en: "Mustard's Theme - Sword/Shield (The Isle of Armor)",
      fr: "Thème de Mustar - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Characters"],
    },
    {
      id: 1454,
      en: "Battle! (Mustard) - Sword/Shield (The Isle of Armor)",
      fr: "Combat! (Mustar) - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Battles"],
    },
    {
      id: 1455,
      en: "Secret Armor/Kubfu's Introduction - Sword/Shield (The Isle of Armor)",
      fr: "Armure Secrète/Présentation de Wushours - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Story Events"],
    },
    {
      id: 1456,
      en: "Tower Of Waters - Sword/Shield (The Isle of Armor)",
      fr: "Tour de l'Eau - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Buildings"],
    },
    // Tower Of Waters and Tower Of Darkness are very similar
    {
      id: 1457,
      en: "Tower Of Darkness - Sword/Shield (The Isle of Armor)",
      fr: "Tour des Ténèbres - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Buildings"],
    },
    {
      id: 1458,
      en: "Battle! (Serious Mustard) - Sword/Shield (The Isle of Armor)",
      fr: "Combat! (Mustar serieux) - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Battles"],
    },
    {
      id: 1459,
      en: "Victory! (Mustard) - Sword/Shield (The Isle of Armor)",
      fr: "Victoire! (Mustar) - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Victories"],
    },
    {
      id: 1460,
      en: "Kubfu and Victory/Kubfu's Training Complete! - Sword/Shield (The Isle of Armor)",
      fr: "Wushours et la victoire/L'entraînement de Wushours est terminé! - Épée/Bouclier (L'île solitaire de l'Armure)",
      tags: ["Story Events"],
    },

    //// Sword/Shield (The Crown Tundra)
    // Source name and order : https://vgmdb.net/album/134815 & https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Sword_-_Shield_%2B_Expansion_Pass_Super_Music_Collection Disc 4
    {
      id: 1461,
      en: "The Crown Tundra - Sword/Shield (The Crown Tundra)",
      fr: "Couronneige - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Story Events"],
    },
    {
      id: 1462,
      en: "Peony's Theme - Sword/Shield (The Crown Tundra)",
      fr: "Thème de Dhilan - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Characters"],
    },
    {
      id: 1463,
      en: "Battle! (Peony) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Dhilan) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1464,
      en: "Max Lair - Sword/Shield (The Crown Tundra)",
      fr: "Grand Antre Dynamax - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1465,
      en: "Dynamax Adventure - Sword/Shield (The Crown Tundra)",
      fr: "Expédition Dynamax - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1466,
      en: "Battle! (Legendary Max Raid) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Raid Dynamax de Pokémon légendaire) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1467,
      en: "Freezington - Sword/Shield (The Crown Tundra)",
      fr: "Hameau Gelé - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Cities"],
    },
    {
      id: 1468,
      en: "Calyrex's Theme/King of Bountiful Harvests - Sword/Shield (The Crown Tundra)",
      fr: "Thème de Sylveroy/Le Seigneur des récoltes - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Characters"],
    },
    {
      id: 1469,
      en: "Battle! (Calyrex) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Sylveroy) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1470,
      en: "Battle! (Glastrier/Spectrier) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Blizzeval/Spectreval) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1471,
      en: "Crown Shrine - Sword/Shield (The Crown Tundra)",
      fr: "Temple Couronne - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Outdoor Location"],
    },
    // Unity of Rider and Horse starts like Crown Shrine
    {
      id: 1472,
      en: "Battle! (Mounted Calyrex) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Sylveroy Cavalier) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1473,
      en: "Battle! (Regirock/Regice/Registeel/Regieleki/Regidrago) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Regirock/Regice/Registeel/Regieleki/Regidrago) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },
    {
      id: 1474,
      en: "Gather at the Dyna Tree (The Legendary Birds Appear) - Sword/Shield (The Crown Tundra)",
      fr: "Rassemblement au Dynarbre (Les Oiseaux légendaires apparaissent) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Story Events"],
    },
    {
      id: 1475,
      en: "Battle! (Galarian Legendary Birds) - Sword/Shield (The Crown Tundra)",
      fr: "Combat! (Oiseaux légendaires de Galar) - Épée/Bouclier (Les terres enneigées de la Couronne)",
      tags: ["Battles"],
    },

    //// Brilliant Diamond/Shining Pearl
    // Source name and order : https://www.sittingonclouds.com/album/2020
    // Source traduction (partiel):
    //    https://music.apple.com/fr/album/pok%C3%A9mon-diamant-et-pok%C3%A9mon-perle-super-music-collection/880117263
    {
      id: 1476,
      en: "Opening Movie - Brilliant Diamond/Shining Pearl",
      fr: "Séquence d'introduction - Diamant Étincelant/Perle Scintillante",
      tags: ["Menu"],
    },
    {
      id: 1477,
      en: "Introduction - Brilliant Diamond/Shining Pearl",
      fr: "Introduction - Diamant Étincelant/Perle Scintillante",
      tags: ["Story Events"],
    },
    {
      id: 1478,
      en: 'Special Report: "Search For The Red Gyarados!" - Brilliant Diamond/Shining Pearl',
      fr: "À la recherche du Léviator Rouge - Diamant Étincelant/Perle Scintillante",
      tags: ["Story Events"],
    },
    {
      id: 1479,
      en: "Twinleaf Town (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Bonaugure (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1480,
      en: "Rival Barry - Brilliant Diamond/Shining Pearl",
      fr: "Rival René - Diamant Étincelant/Perle Scintillante",
      tags: ["Characters"],
    },
    {
      id: 1481,
      en: "Route 201/202/219/Verity Lakefront (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 201/202/219/Rive du Lac Vérité (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1482,
      en: "Lake - Brilliant Diamond/Shining Pearl",
      fr: "Lac - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1483,
      en: "A Surprise At The Lake! - Brilliant Diamond/Shining Pearl",
      fr: "Surprise au Lac! - Diamant Étincelant/Perle Scintillante",
      tags: ["Story Events"],
    },
    {
      id: 1484,
      en: "Battle! (Wild Pokémon) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Pokémon sauvage) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1485,
      en: "Victory! (Wild Pokémon) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Pokémon sauvage) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1486,
      en: "Dawn - Brilliant Diamond/Shining Pearl",
      fr: "Aurore - Diamant Étincelant/Perle Scintillante",
      tags: ["Characters"],
    },
    {
      id: 1487,
      en: "Sandgem Town (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Littorella (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1488,
      en: "The Pokémon Lab - Brilliant Diamond/Shining Pearl",
      fr: "Laboratoire Pokémon - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1489,
      en: "Hurry Along - Brilliant Diamond/Shining Pearl",
      fr: "En route! - Diamant Étincelant/Perle Scintillante",
      tags: ["Story Events"],
    },
    {
      id: 1490,
      en: "Pokémon Center (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Centre Pokémon (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1491,
      en: "Trainers' Eyes Meet (Youngster) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Gamin) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1492,
      en: "Trainers' Eyes Meet (Lass) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Fillette) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1493,
      en: "Battle! (Trainer) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Combat de Dresseur) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1494,
      en: "Victory! (Trainer) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Combat de Dresseur) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1495,
      en: "Jubilife City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Féli-Cité (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1496,
      en: "Poké Mart - Brilliant Diamond/Shining Pearl",
      fr: "Boutique Pokémon - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1497,
      en: "Route 203/204/218 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 203/204/218 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1498,
      en: "Battle! (Rival Barry) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Rival René) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1499,
      en: "Oreburgh Gate/Ravaged Path/Wayward Cave - Brilliant Diamond/Shining Pearl",
      fr: "Entrée de Charbourg/Chemin Rocheux/Grotte des Égarés - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1500,
      en: "Oreburgh City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Charbourg (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1501,
      en: "Oreburgh Mine/Maniac Tunnel/Fuego Ironworks - Brilliant Diamond/Shining Pearl",
      fr: "Mine de Charbourg/Tunnel Ruineman./Forge Fuego - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1502,
      en: "Pokémon Gym - Brilliant Diamond/Shining Pearl",
      fr: "Arène Pokémon - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1503,
      en: "Battle! (Gym Leader) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Champion d'Arène) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1504,
      en: "Victory! (Gym Leader) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Champion d'Arène) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1505,
      en: "Trainers' Eyes Meet (Twins) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Jumelles) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1506,
      en: "Floaroma Town/Seabreak Path/Flower Paradise (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Floraville/Passage Marin/Paradis Fleuri (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities", "Outdoor Location"],
    },
    {
      id: 1507,
      en: "Route 205 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 205 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1508,
      en: "Team Galactic Appears! - Brilliant Diamond/Shining Pearl",
      fr: "La Team Galaxie apparaît! - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1509,
      en: "Battle! (Team Galactic) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Team Galaxie) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1510,
      en: "Eterna Forest/Lost Tower/Solaceon Ruins/Snowpoint Temple/Fullmoon Island - Brilliant Diamond/Shining Pearl",
      fr: "Forêt de Vestigion/Tour Perdue/Ruines de Bonville/Temple de Frimapic/Île Pleine Lune - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1511,
      en: "Eterna City/Celestic Town (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Vestigion/Célestia (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1512,
      en: "Galactic Eterna Building - Brilliant Diamond/Shining Pearl",
      fr: "Centre Galaxie de Vestigion - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1513,
      en: "Battle! (Team Galactic Commander) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Admin Team Galaxie) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1514,
      en: "Victory! (Team Galactic) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Team Galaxie) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1515,
      en: "Evolution - Brilliant Diamond/Shining Pearl",
      fr: "Évolution - Diamant Étincelant/Perle Scintillante",
      tags: ["Repetable Events"],
    },
    {
      id: 1516,
      en: "Bicycle - Brilliant Diamond/Shining Pearl",
      fr: "Bicyclette - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1517,
      en: "Trainers' Eyes Meet (Cyclist) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Cycliste) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1518,
      en: "Route 206/207/208/220/221 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 206/207/208/220/221 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1519,
      en: "Hearthome City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Unionpolis (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1520,
      en: "Route 209/212/222 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 209/212/222 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1521,
      en: "Trainers' Eyes Meet (Hiker) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Montagnard) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1522,
      en: "Solaceon Town/Pastoria City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Bonville/Verchamps (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1523,
      en: "Route 210/211/214/215/223/224 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 210/211/214/215/223/224 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1524,
      en: "Veilstone City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Voilaroc (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1525,
      en: "Valor Lakefront/Route 213/Resort Area (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Rive du Lac Courage/Route 213/Aire de Détente (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 1526,
      en: "Canalave City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Joliberges (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1527,
      en: "Route 216/217/Acuity Lakefront (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 216/217/Rive du Lac Savoir (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1528,
      en: "Snowpoint City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Frimapic (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1529,
      en: "Team Galactic HQ - Brilliant Diamond/Shining Pearl",
      fr: "QG de la Team Galaxie - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1530,
      en: "Battle! (Team Galactic Boss Cyrus) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Hélio le Boss Team Galaxie) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1531,
      en: "Deep Within Team Galactic HQ - Brilliant Diamond/Shining Pearl",
      fr: "Au fond du QG de la Team Galaxie - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1532,
      en: "Mount Coronet - Brilliant Diamond/Shining Pearl",
      fr: "Mont Couronné - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1533,
      en: "Spear Pillar - Brilliant Diamond/Shining Pearl",
      fr: "Colonnes Lances - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1534,
      en: "The Legendary Pokémon Appears! - Brilliant Diamond/Shining Pearl",
      fr: "Un Pokémon légendaire apparaît! - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1535,
      en: "Catastrophe! - Brilliant Diamond/Shining Pearl",
      fr: "Catastrophe! - Diamant Étincelant/Perle Scintillante",
      tags: ["Story Events"],
    },
    {
      id: 1536,
      en: "Battle! (Dialga/Palkia) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Dialga/Palkia) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1537,
      en: "Sunyshore City (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Rivamar (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1538,
      en: "Victory Road - Brilliant Diamond/Shining Pearl",
      fr: "Route Victoire - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1539,
      en: "Trainers' Eyes Meet (Ace Trainer) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Topdresseur) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1540,
      en: "Pokémon League (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Ligue Pokémon (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1541,
      en: "Fight Area/Survival Area (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Aire de Combat/Aire de Survie (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1542,
      en: "Route 225/226/227 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 225/226/227 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1543,
      en: "Route 228/229/230 (Day) - Brilliant Diamond/Shining Pearl",
      fr: "Route 228/229/230 (Jour) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1544,
      en: "Twinleaf Town (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Bonaugure (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1545,
      en: "Route 201/202/219/Verity Lakefront (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 201/202/219/Rive du Lac Vérité (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1546,
      en: "Pokémon Center (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Centre Pokémon (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1547,
      en: "Sandgem Town (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Littorella (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1548,
      en: "Lucas - Brilliant Diamond/Shining Pearl",
      fr: "Louka - Diamant Étincelant/Perle Scintillante",
      tags: ["Characters"],
    },
    {
      id: 1549,
      en: "Jubilife City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Féli-Cité (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1550,
      en: "TV Station - Brilliant Diamond/Shining Pearl",
      fr: "Féli-Télé - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1551,
      en: "GTS - Brilliant Diamond/Shining Pearl",
      fr: "GTS - Diamant Étincelant/Perle Scintillante",
      tags: ["Menu"],
    },
    {
      id: 1552,
      en: "Surf - Brilliant Diamond/Shining Pearl",
      fr: "Surf - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1553,
      en: "Canalave City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Joliberges (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1554,
      en: "Route 203/204/218 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 203/204/218 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1555,
      en: "Trainers' Eyes Meet (Black Belt) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Karatéka) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1556,
      en: "Oreburgh City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Charbourg (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1557,
      en: "Route 205 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 205 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1558,
      en: "Trainers' Eyes Meet (Sailor) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Marin) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1559,
      en: "Eterna City/Celestic Town (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Vestigion/Célestia (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1560,
      en: "The Grand Underground - Brilliant Diamond/Shining Pearl",
      fr: "Les Grands Souterrains - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1561,
      en: "Trainers' Eyes Meet (Aroma Lady) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Aromathérapeute) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1562,
      en: "Floaroma Town/Seabreak Path/Flower Paradise (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Floraville/Passage Marin/Paradis Fleuri (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities", "Outdoor Location"],
    },
    {
      id: 1563,
      en: "Old Chateau/Spring Path/Sendoff Spring/Turnback Cave/Newmoon Island - Brilliant Diamond/Shining Pearl",
      fr: "Vieux Château/Chemin de la Source/Source des Adieux/Grotte du Retour/Île Nouvellune - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1564,
      en: "Solaceon Town/Pastoria City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Bonville/Verchamps (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1565,
      en: "Great Marsh/Ramanas Park - Brilliant Diamond/Shining Pearl",
      fr: "Grand Marais/Parc Rosa Rugosa - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1566,
      en: "Route 206/207/208/220/221 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 206/207/208/220/221 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1567,
      en: "Trainers' Eyes Meet (Collector) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Collectionneur) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1568,
      en: "Veilstone City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Voilaroc (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1569,
      en: "Metronome Style Shop (Game Corner) - Brilliant Diamond/Shining Pearl",
      fr: "Coin Mode Métronome (Casino) - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1570,
      en: "Trainers' Eyes Meet (PI) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Joueur) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1571,
      en: "Route 209/212/222 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 209/212/222 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1572,
      en: "Snowpoint City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Frimapic (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1573,
      en: "Route 216/217/Acuity Lakefront (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 216/217/Rive du Lac Savoir (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1574,
      en: "Lake Caverns - Brilliant Diamond/Shining Pearl",
      fr: "Cavernes lacustres - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1575,
      en: "Battle! (Azelf/Mesprit/Uxie) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Créfadet/Créfollet/Créhelf) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1576,
      en: "Route 210/211/214/215/223/224 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 210/211/214/215/223/224 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1577,
      en: "A Poké Radar Hit! - Brilliant Diamond/Shining Pearl",
      fr: "Détection du Poké Radar! - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1578,
      en: "Sunyshore City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Rivamar (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1579,
      en: "Trainers' Eyes Meet (Artist) - Brilliant Diamond/Shining Pearl",
      fr: "Rencontre avec un Dresseur (Artiste) - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1580,
      en: "Amity Square - Brilliant Diamond/Shining Pearl",
      fr: "Square Paisible - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1581,
      en: "Hearthome City (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Unionpolis (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1582,
      en: "Contest Hall - Brilliant Diamond/Shining Pearl",
      fr: "Salle de Concours - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1583,
      en: "Poffins - Brilliant Diamond/Shining Pearl",
      fr: "Poffins - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1586,
      en: "Super Contest Show: Beauty - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Beauté - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1587,
      en: "Super Contest Show: Cleverness - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Intelligence - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1588,
      en: "Super Contest Show: Coolness - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Sang-froid - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1589,
      en: "Super Contest Show: Cuteness - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Grâce - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1590,
      en: "Super Contest Show: Toughness - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Robustesse - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1584,
      en: "Super Contest Show: Brilliant (Diamond) - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Étincelant (Diamant) - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1585,
      en: "Super Contest Show: Shining (Pearl) - Brilliant Diamond/Shining Pearl",
      fr: "Super Show Concours: Scintillant (Perle) - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1591,
      en: "Contest ~ Results Announcement - Brilliant Diamond/Shining Pearl",
      fr: "Concours ~ Annonce des résultats - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1592,
      en: "Contest ~ Winner - Brilliant Diamond/Shining Pearl",
      fr: "Concours ~ Vainqueur! - Diamant Étincelant/Perle Scintillante",
      tags: ["Mini Games"],
    },
    {
      id: 1593,
      en: "Route 228/229/230 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 228/229/230 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1594,
      en: "Valor Lakefront/Route 213/Resort Area (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Rive du Lac Courage/Route 213/Aire de Détente (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location", "Cities"],
    },
    {
      id: 1595,
      en: "Fight Area/Survival Area (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Aire de Combat/Aire de Survie (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1596,
      en: "Battle Tower - Brilliant Diamond/Shining Pearl",
      fr: "Tour de Combat - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1597,
      en: "Route 225/226/227 (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Route 225/226/227 (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1598,
      en: "Stark Mountain - Brilliant Diamond/Shining Pearl",
      fr: "Mont Abrupt - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1599,
      en: "Battle! (Legendary Pokémon) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Pokémon légendaire) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1600,
      en: "Mystery Gift - Brilliant Diamond/Shining Pearl",
      fr: "Cadeau Mystère - Diamant Étincelant/Perle Scintillante",
      tags: ["Menu"],
    },
    {
      id: 1601,
      en: "Pokémon League (Night) - Brilliant Diamond/Shining Pearl",
      fr: "Ligue Pokémon (Nuit) - Diamant Étincelant/Perle Scintillante",
      tags: ["Cities"],
    },
    {
      id: 1602,
      en: "Decisive Battle! (Pokémon League) - Brilliant Diamond/Shining Pearl",
      fr: "Combat décisif! (Ligue Pokémon) - Diamant Étincelant/Perle Scintillante",
      tags: ["Buildings"],
    },
    {
      id: 1603,
      en: "The Elite Four Appear! - Brilliant Diamond/Shining Pearl",
      fr: "Le Conseil 4 apparaît! - Diamant Étincelant/Perle Scintillante",
      tags: ["Encounters"],
    },
    {
      id: 1604,
      en: "Battle! (Elite Four) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Conseil 4) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1605,
      en: "Victory! (Elite Four) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Conseil 4) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1606,
      en: "Champion Cynthia - Brilliant Diamond/Shining Pearl",
      fr: "Cynthia le Maître - Diamant Étincelant/Perle Scintillante",
      tags: ["Characters"],
    },
    {
      id: 1607,
      en: "Battle! (Champion Cynthia) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Cynthia le Maître) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1608,
      en: "Victory! (Champion Cynthia) - Brilliant Diamond/Shining Pearl",
      fr: "Victoire! (Cynthia le Maître) - Diamant Étincelant/Perle Scintillante",
      tags: ["Victories"],
    },
    {
      id: 1609,
      en: "Hall of Fame - Brilliant Diamond/Shining Pearl",
      fr: "Panthéon - Diamant Étincelant/Perle Scintillante",
      tags: ["Repetable Events"],
    },
    {
      id: 1610,
      en: "Congratulations on Entering the Hall of Fame! - Brilliant Diamond/Shining Pearl",
      fr: "Entrée au Panthéon! - Diamant Étincelant/Perle Scintillante",
      tags: ["Repetable Events"],
    },
    {
      id: 1611,
      en: "Ending Theme - Brilliant Diamond/Shining Pearl",
      fr: "Générique de fin - Diamant Étincelant/Perle Scintillante",
      tags: ["Repetable Events"],
    },
    {
      id: 1612,
      en: "Battle! (Giratina) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Giratina) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1613,
      en: "Hall of Origin - Brilliant Diamond/Shining Pearl",
      fr: "Salle Originelle - Diamant Étincelant/Perle Scintillante",
      tags: ["Outdoor Location"],
    },
    {
      id: 1614,
      en: "Battle! (Arceus) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Arceus) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    // "Ramanas Park? - Brilliant Diamond/Shining Pearl", // I don't know what is is, it's not the Ramanas Park
    {
      id: 1615,
      en: "Battle! (Minor Legendary Ramanas Park) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Pokémon légendaire mineur du Parc Rosa Rugosa) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },
    {
      id: 1616,
      en: "Battle! (Major Legendary Ramanas Park) - Brilliant Diamond/Shining Pearl",
      fr: "Combat! (Pokémon légendaire majeur du Parc Rosa Rugosa) - Diamant Étincelant/Perle Scintillante",
      tags: ["Battles"],
    },

    //// Legends Arceus
    // Source name and order : https://vgmdb.net/album/134817
    // Source traduction:
    //    https://www.youtube.com/playlist?list=PLqSYV7fIfmTQKccfXe66zspGWEztpCLeZ (Pour certaines musiques)
    {
      id: 1617,
      en: "Transition - Legends: Arceus",
      fr: "Transition - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1618,
      en: "Professor Laventon - Legends: Arceus",
      fr: "Professeur Lavande - Légendes: Arceus",
      tags: ["Characters"],
    },
    {
      id: 1619,
      // en: "A Chat with the Professor - Legends: Arceus",
      // fr: "Une conversation avec le Professeur - Légendes: Arceus",
      en: "Encounter in Hisui - Legends: Arceus",
      fr: "Rencontre à Hisui - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1620,
      en: "Jubilife Village - Legends: Arceus",
      fr: "Rusti-Cité - Légendes: Arceus",
      tags: ["Cities"],
    },
    {
      id: 1621,
      en: "Galaxy Hall - Legends: Arceus",
      fr: "Siège Groupe Galaxie - Légendes: Arceus",
      tags: ["Buildings"],
    },
    {
      id: 1622,
      en: "Battle! (Person of Hisui) - Legends: Arceus",
      fr: "Combat! (Personne de Hisui) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1623,
      en: "Obsidian Fieldlands (1) - Legends: Arceus",
      fr: "Plaines Obsidiennes (1) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1624,
      en: "Omen of a Battle/Spotted: 1 - Legends: Arceus",
      fr: "Menace d'un combat/Repéré: 1 - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1625,
      en: "Omen of a Battle/Spotted: 2 - Legends: Arceus",
      fr: "Menace d'un combat/Repéré: 2 - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1626,
      en: "Omen of a Battle/Spotted: 3 - Legends: Arceus",
      fr: "Menace d'un combat/Repéré: 3 - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1627,
      en: "Battle! (Wild Pokémon) - Legends: Arceus",
      fr: "Combat! (Pokémon sauvage) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1628,
      en: "Survey Report (Day) - Legends: Arceus",
      fr: "Rapport de recherches (Jour) - Légendes: Arceus",
      tags: ["Menu"],
    },
    {
      id: 1629,
      en: "Obsidian Fieldlands (2) - Legends: Arceus",
      fr: "Plaines Obsidiennes (2) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1630,
      en: "Omen of a Battle/Spotted: Alpha Pokémon - Legends: Arceus",
      fr: "Menace d'un combat/Repéré: Pokémon Baron - Légendes: Arceus",
      tags: ["Buildings"],
    },
    {
      id: 1631,
      en: "Battle! (Alpha Pokémon) - Legends: Arceus",
      fr: "Combat! (Pokémon Baron) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1632,
      en: "Discussion - Legends: Arceus",
      fr: "Discussion - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1633,
      en: "A Dangerous Situation! (Miss Fortunes) - Legends: Arceus",
      fr: "Les Détroussœurs - Légendes: Arceus",
      tags: ["Characters"],
    },
    {
      id: 1634,
      en: "The Heartwood (Eterna Forest) - Legends: Arceus",
      fr: "La Forêt Lointaine (Forêt de Vestigion) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1635,
      en: "Evolution - Legends: Arceus",
      fr: "Évolution - Légendes: Arceus",
      tags: ["Repetable Events"],
    },
    {
      id: 1636,
      en: "Noble Pokémon's Arena - Legends: Arceus",
      fr: "Arène d'un Pokémon Monarque - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1637,
      en: "Battle! (Noble Pokémon) - Legends: Arceus",
      fr: "Combat! (Pokémon monarque) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1638,
      en: "The Matter Is Settled - Legends: Arceus",
      fr: "L'affaire est résolue - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1639,
      en: "Target Practice - Legends: Arceus",
      fr: "Vise-et-Tire - Légendes: Arceus",
      tags: ["Mini Games"],
    },
    {
      id: 1640,
      en: "Crimson Mirelands (1) - Legends: Arceus",
      fr: "Marais Carmin (1) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1641,
      en: "Space-Time Distortion - Legends: Arceus",
      fr: "Distorsion Spatio-Temporelle - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1642,
      en: "Diamond and Pearl Clan Settlement - Legends: Arceus",
      fr: "Hameau Diamant et Hameau Perle - Légendes: Arceus",
      tags: ["Cities"],
    },
    {
      id: 1643,
      en: "Crimson Mirelands (2) - Legends: Arceus",
      fr: "Marais Carmin (2) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1644,
      en: "Cobalt Coastlands (1) - Legends: Arceus",
      fr: "Côte Lazuli (1) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1645,
      en: "The Sound of the Irida's Flute - Legends: Arceus",
      fr: "Le son de la flûte de Nacchara - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1646,
      en: "Thought/Irida's Theme - Legends: Arceus",
      fr: "Réflexion/Thème de Nacchara - Légendes: Arceus",
      tags: ["Characters"],
    },
    {
      id: 1647,
      en: "Nighttime - Legends: Arceus",
      fr: "Nuit - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1648,
      en: "Survey Results (Night) - Legends: Arceus",
      fr: "Rapport de recherches (Nuit) - Légendes: Arceus",
      tags: ["Menu"],
    },
    {
      id: 1649,
      en: "Cobalt Coastlands (2) - Legends: Arceus",
      fr: "Côte Lazuli (2) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1650,
      en: "Firespit Island - Legends: Arceus",
      fr: "Île Crache-Feu - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1651,
      en: "Courage/Palina's Theme - Legends: Arceus",
      fr: "Courage/Thème de Garana - Légendes: Arceus",
      tags: ["Characters"],
    },
    {
      id: 1652,
      en: "Strength - Legends: Arceus",
      fr: "Force - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1653,
      en: "Coronet Highlands - Legends: Arceus",
      fr: "Contrefort Couronné - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1654,
      en: "Wayward Cave - Legends: Arceus",
      fr: "Grotte des Égarés - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1655,
      en: "Battle! (Clan Warden) - Legends: Arceus",
      fr: "Combat! (Gardien) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1656,
      en: "Alabaster Icelands (1) - Legends: Arceus",
      fr: "Terres Immaculées (1) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1657,
      en: "Late Night - Legends: Arceus",
      fr: "Minuit - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1658,
      en: "Dawn - Legends: Arceus",
      fr: "Aube - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1659,
      en: "Alabaster Icelands (2) - Legends: Arceus",
      fr: "Terres Immaculées (2) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1660,
      en: "Snowpoint Temple - Legends: Arceus",
      fr: "Temple de Frimapic - Légendes: Arceus",
      tags: ["Buildings"],
    },
    {
      id: 1661,
      en: "Suspicion - Legends: Arceus",
      fr: "Soupçon - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1662,
      en: "Expulsion of Jubilife Village - Legends: Arceus",
      fr: "Expulsion de Rusti-Cité - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1663,
      en: "Anomaly - Legends: Arceus",
      fr: "Anomalie - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1664,
      en: "Anomaly: Omen/Spotted - Legends: Arceus",
      fr: "Anomalie: Menace/Repéré - Légendes: Arceus",
      tags: ["Battles", "Story Events"],
    },
    {
      id: 1665,
      en: "Anomaly: Omen/Spotted (Alpha) - Legends: Arceus",
      fr: "Anomalie: Menace/Repéré (Baron) - Légendes: Arceus",
      tags: ["Battles", "Story Events"],
    },
    {
      id: 1666,
      en: "Anomaly: Battle! - Legends: Arceus",
      fr: "Anomalie: Combat! - Légendes: Arceus",
      tags: ["Battles", "Story Events"],
    },
    {
      id: 1667,
      en: "Ancient Retreat (Cogita's Retreat) - Legends: Arceus",
      fr: "Hameau Oublié (Hameau de Penséa) - Légendes: Arceus",
      tags: ["Cities"],
    },
    {
      id: 1668,
      en: "Lake Cavern - Legends: Arceus",
      fr: "Caverne lacustre - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1669,
      en: "Stone Portal - Legends: Arceus",
      fr: "Porte de Pierre - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1670,
      en: "Temple of Sinnoh (Spear Pillar) - Legends: Arceus",
      fr: "Temple de Sinnoh (Colonnes Lances) - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1671,
      en: "Dialga/Palkia Appears - Legends: Arceus",
      fr: "Dialga/Palkia apparaît - Légendes: Arceus",
      tags: ["Encounters"],
    },
    {
      id: 1672,
      en: "Battle! (Dialga/Palkia) - Legends: Arceus",
      fr: "Combat! (Dialga/Palkia) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1673,
      en: "Another Lord Sinnoh - Legends: Arceus",
      fr: "L'autre Grand Sinnoh - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1674,
      en: "Temporary Retreat - Legends: Arceus",
      fr: "Retraite temporaire - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1675,
      en: "Origin - Legends: Arceus",
      fr: "Origine - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1676,
      en: "Battle! (Dialga/Palkia Origin Forme) - Legends: Arceus",
      fr: "Combat! (Dialga/Palkia Forme Originelle) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1677,
      en: "Ending Theme - Legends: Arceus",
      fr: "Générique de fin - Légendes: Arceus",
      tags: ["Repetable Events"],
    },
    {
      id: 1678,
      en: "Mystery Gift - Legends: Arceus",
      fr: "Cadeau Mystère - Légendes: Arceus",
      tags: ["Menu"],
    },
    {
      id: 1679,
      en: "Clefairy's Dance at the Fabled Spring (Mt. Moon Dance) - Legends: Arceus",
      fr: "Danse des Mélofée à la Source Féérique (Danse au Mont Sélénite) - Légendes: Arceus",
      tags: ["Repetable Events"],
    },
    {
      id: 1680,
      en: "Lake - Legends: Arceus",
      fr: "Lac - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1681,
      en: "Battle! (Lake Guardians ~ Uxie, Mesprit & Azelf) - Legends: Arceus",
      fr: "Combat! (Gardiens des Lacs ~ Créhelf, Créfollet & Créfadet) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1682,
      en: "Omen of a Battle/Spotted: Legendary Pokémon - Legends: Arceus",
      fr: "Menace d'un combat/Repéré: Pokémon légendaire - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1683,
      en: "Battle! (Legendary Pokémon) - Legends: Arceus",
      fr: "Combat! (Pokémon légendaire) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1684,
      en: "Volo's Purpose - Legends: Arceus",
      fr: "L'objectif de Percupio - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1685,
      en: "Battle! (Pokémon Wielder Volo) - Legends: Arceus",
      fr: "Combat! (Percupio l'Expert en Pokémon) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1686,
      en: "Giratina Appears - Legends: Arceus",
      fr: "Giratina apparaît - Légendes: Arceus",
      tags: ["Encounters"],
    },
    {
      id: 1687,
      en: "Battle! (Volo & Giratina) - Legends: Arceus",
      fr: "Combat! (Percupio & Giratina) - Légendes: Arceus",
      tags: ["Battles"],
    },
    // {
    //   id: -8,
    //   en: "Battle! (Giratina) - Legends: Arceus",
    //   fr: "Combat! (Giratina) - Légendes: Arceus",
    // },
    {
      id: 1688,
      en: "The Azure Flute - Legends: Arceus",
      fr: "La Flûte Azur - Légendes: Arceus",
      tags: ["Story Events"],
    },
    {
      id: 1689,
      en: "Hall of Origin - Legends: Arceus",
      fr: "Salle Originelle - Légendes: Arceus",
      tags: ["Outdoor Location"],
    },
    {
      id: 1690,
      en: "Battle! (Arceus) - Legends: Arceus",
      fr: "Combat! (Arceus) - Légendes: Arceus",
      tags: ["Battles"],
    },
    {
      id: 1691,
      en: "Title Screen - Legends: Arceus",
      fr: "Écran titre - Légendes: Arceus",
      tags: ["Menu"],
    },

    //// Scarlet/Violet
    // Source name and order : https://vgmdb.net/album/134816
    //  https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Scarlet_-_Violet_%2B_The_Hidden_Treasure_of_Area_Zero_Super_Music_Collection
    //  https://serebii.net/scarletviolet/musiccustomisation.shtml (Battle)
    // Source traduction:
    //  https://www.pokebip.com/page/jeuxvideo/pokemon-ecarlate-violet/changement-musiques (Combat)
    //  https://www.youtube.com/playlist?list=PLqSYV7fIfmTTSeoBewm0HtF0jUZq9L5tH (Certaines musiques)
    // {
    //   id: -9,
    //   en: "Getting Ready - Scarlet/Violet",
    //   fr: "Création du personnage - Écarlate/Violet",
    // },
    {
      id: 1692,
      en: "Welcome to the World of Pokémon - Scarlet/Violet",
      fr: "Bienvenue dans le monde des Pokémon ! - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1693,
      en: "Soar Through the Paldea Skies - Scarlet/Violet",
      fr: "Envolée dans le ciel de Paldea - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1694,
      en: "Home - Scarlet/Violet",
      fr: "Maison - Écarlate/Violet",
      tags: ["Buildings"],
    },
    {
      id: 1695,
      en: "Cabo Poco - Scarlet/Violet",
      fr: "Cuchalaga - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1696,
      en: "Meetings Starter Pokémon - Scarlet/Violet",
      fr: "Rencontres avec les Pokémons de départ - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1697,
      en: "Nemona's Theme/Let's Try to Get Stronger! - Scarlet/Violet",
      fr: "Thème de Menzi/Essayons d'être plus forts ! - Écarlate/Violet",
      tags: ["Characters"],
    },
    {
      id: 1698,
      en: "Battle! (Nemona) - Scarlet/Violet",
      fr: "Combat! (Menzi) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1699,
      en: "Poco Path - Scarlet/Violet",
      fr: "Route de Cuchalaga  - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      // It's played only outside of Provinces (Top of Crater or Poco Path)
      id: 1700,
      en: "Battle! (Wild Pokémon ~ Poco Path) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage ~ Route de Cuchalaga) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1701,
      // en: "The Legendary Pokémon's Strength - Scarlet/Violet",
      // fr: "La puissance du Pokémon légendaire - Écarlate/Violet",
      en: "On the Beach - Scarlet/Violet",
      fr: "Sur la plage - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1702,
      en: "Inlet Grotto - Scarlet/Violet",
      fr: "Caverne de la Crique - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1703,
      en: "Battle! (Wild Pokémon ~ Inlet Grotto) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage ~ Caverne de la Crique) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1704,
      en: "Escape from the Cave!/Houndoom Attacks! - Scarlet/Violet",
      fr: "Échapper de la Caverne !/Attaque du Démolosse - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1705,
      en: "Arven's Theme/It's a Test of Strength! - Scarlet/Violet",
      fr: "Thème de Pepper/C'est un test de force ! - Écarlate/Violet",
      tags: ["Characters"],
    },
    {
      id: 1706,
      en: "Battle! (Arven) - Scarlet/Violet",
      fr: "Combat! (Pepper) - Écarlate/Violet",
      tags: ["Battles"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1707,
      en: "South Province (Riding) - Scarlet/Violet",
      fr: "Zone Sud (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1708,
      en: "Battle! (Southern Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage des régions du Sud) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1709,
      en: "Pokémon Center - Scarlet/Violet",
      fr: "Centre Pokémon - Écarlate/Violet",
      tags: ["Buildings"],
    },
    {
      id: 1710,
      en: "Los Platos/Cortondo - Scarlet/Violet",
      fr: "Plato Real/Sevaro - Écarlate/Violet",
      tags: ["Cities"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1711,
      en: "South Province (Walking) - Scarlet/Violet",
      fr: "Zone Sud (À pied) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1712,
      en: "Mesagoza (Walking) - Scarlet/Violet",
      fr: "Mesaledo (À pied) - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1713,
      en: "Mesagoza (Guitarist)/One Song in Mesagoza, If You Please - Scarlet/Violet",
      fr: "Mesaledo (Guitariste) - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1714,
      en: "Team Star Appears - Scarlet/Violet",
      fr: "La Team Star apparaît! - Écarlate/Violet",
      tags: ["Encounters"],
    },
    {
      id: 1715,
      en: "Battle! (Team Star) - Scarlet/Violet",
      fr: "Combat! (Team Star) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1716,
      en: "Naranja/Uva Academy & Mesagoza (Riding) - Scarlet/Violet",
      fr: "Académie Orange/Raisin & Mesaledo (Monture) - Écarlate/Violet",
      tags: ["Buildings", "Cities"],
    },
    {
      id: 1717,
      en: "Cassiopeia's Theme - Scarlet/Violet",
      fr: "Thème de Cassiopée - Écarlate/Violet",
      tags: ["Characters"],
    },
    {
      id: 1718,
      en: "Professor Sada/Professor Turo - Scarlet/Violet",
      fr: "Professeure Olim/Professeur Turum - Écarlate/Violet",
      tags: ["Characters"],
    },
    {
      id: 1719,
      en: "Naranja/Uva Academy ~ Dorm Room/Director's Office/Staff Room/Nurse's Office - Scarlet/Violet",
      fr: "Académie Orange/Raisin ~ Chambres/Bureau du proviseur/Salle des professeurs/Infirmerie - Écarlate/Violet",
      tags: ["Buildings"],
    },
    {
      id: 1720,
      en: "Trainers' Eyes Meet - Scarlet/Violet",
      fr: "Rencontre avec un Dresseur - Écarlate/Violet",
      tags: ["Encounters"],
    },
    {
      id: 1721,
      en: "Battle! (Trainer) - Scarlet/Violet",
      fr: "Combat! (Dresseurs et Dresseuses) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1722,
      en: "Victory! (Trainer) - Scarlet/Violet",
      fr: "Victoire! (Dresseurs et Dresseuses) - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1723,
      en: "Let's Make a Sandwich - Scarlet/Violet",
      fr: "Préparation d'un Sandwich - Écarlate/Violet",
      tags: ["Mini Games"],
    },
    {
      id: 1724,
      en: "Let's Eat! - Scarlet/Violet",
      fr: "Dégustation d'un plat - Écarlate/Violet",
      tags: ["Mini Games"],
    },
    {
      id: 1725,
      en: "Evolution - Scarlet/Violet",
      fr: "Évolution - Écarlate/Violet",
      tags: ["Repetable Events"],
    },
    {
      id: 1726,
      en: "Gym Lobby - Scarlet/Violet",
      fr: "Arène Pokémon - Écarlate/Violet",
      tags: ["Buildings"],
    },
    {
      id: 1727,
      en: "Gym Test - Scarlet/Violet",
      fr: "Examen d'Arène - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1728,
      en: "A Gym Leader Appears! - Scarlet/Violet",
      fr: "Un·e Champion·ne d'Arène apparaît! - Écarlate/Violet",
      tags: ["Encounters"],
    },
    {
      id: 1729,
      en: "Battle! (Gym Leader) - Scarlet/Violet",
      fr: "Combat! (Champions et Championnes d'Arène) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1730,
      en: "Victory! (Gym Leader) - Scarlet/Violet",
      fr: "Victoire! (Champions et Championnes d'Arène) - Écarlate/Violet",
      tags: ["Victories"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1731,
      en: "West Province (Riding) - Scarlet/Violet",
      fr: "Zone Ouest (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1732,
      en: "Battle! (Western Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage des régions de l'Ouest) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1733,
      en: "Asado Desert (Riding) - Scarlet/Violet",
      fr: "Désert Rôtissable (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1734,
      en: "Battle! (Tera Raid) - Scarlet/Violet",
      fr: "Combat! (Raid Téracristal) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1735,
      en: "Victory! (Tera Raid) - Scarlet/Violet",
      fr: "Victoire! (Raid Téracristal) - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1736,
      en: "Asado Desert (Walking) - Scarlet/Violet",
      fr: "Désert Rôtissable (À pied) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1737,
      en: "Cascarrafa - Scarlet/Violet",
      fr: "Jarramanca - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1738,
      en: "The Gym Test's Not Over!/Porto Marinada Auctions - Scarlet/Violet",
      fr: "Enchères de Porto Marinada - Écarlate/Violet",
      tags: ["Mini Games"],
    },
    {
      id: 1739,
      en: "Battle! (Titan Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon Dominant) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1740,
      en: "Confront the Titan Pokémon Again - Scarlet/Violet",
      fr: "Affronter à nouveau le Pokémon Dominant - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1741,
      en: "Just a Moment/In the Cave with Arven - Scarlet/Violet",
      fr: "Un instant/Dans la cave avec Pepper - Écarlate/Violet",
      tags: ["Story Events"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1742,
      en: "West Province (Walking) - Scarlet/Violet",
      fr: "Zone Ouest (À pied) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1743,
      en: "Medali/Porto Marinada - Scarlet/Violet",
      fr: "Mezclamora/Porto Marinada - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1744,
      en: "Heartwarming Time - Scarlet/Violet",
      fr: "Rencontre amicale - Écarlate/Violet",
      tags: ["Story Events"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1745,
      en: "East Province (Riding) - Scarlet/Violet",
      fr: "Zone Est (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1746,
      en: "Battle! (Eastern Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage des régions de l'Est) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1747,
      en: "Artazon/Zapapico - Scarlet/Violet",
      fr: "Cuencia/Pinchoria - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1748,
      en: "Levincia - Scarlet/Violet",
      fr: "Levalendura - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1749,
      en: "'Ello, 'ello, hola! Ciao and bonjour!/Iono Zone - Scarlet/Violet",
      fr: "Hello, Buenos, Salut!/Les Machins de Mashynn - Écarlate/Violet",
      tags: ["Characters"],
    },
    // Same Intro as East Province => I removed the Intro
    {
      id: 1750,
      en: "East Province (Area Three Riding) - Scarlet/Violet",
      fr: "Zone Est nº 3 (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    // Same Intro for Walking and Riding => I removed the Intro
    {
      id: 1751,
      en: "East Province (Walking) - Scarlet/Violet",
      fr: "Zone Est (À pied) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    // Same Intro as East Province => I removed the Intro
    {
      id: 1752,
      en: "Tagtree Thicket - Scarlet/Violet",
      fr: "Bosquet Tagué - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1753,
      en: "Clive's Theme - Scarlet/Violet",
      fr: "Thème de Clove - Écarlate/Violet",
      tags: ["Characters"],
    },
    {
      id: 1754,
      en: "C'mon, Let's Raid the Place!/Preparing for the Star Barrage - Scarlet/Violet",
      fr: "Repaire de la Team Star - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1755,
      en: "Star Barrage! - Scarlet/Violet",
      fr: "Star-Assaut! - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1756,
      en: "A Team Star Boss Appears! - Scarlet/Violet",
      fr: "Un Boss de la Team Star apparaît! - Écarlate/Violet",
      tags: ["Encounters"],
    },
    {
      id: 1757,
      en: "Battle! (Team Star Boss) - Scarlet/Violet",
      fr: "Combat! (Boss de la Team Star) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1758,
      en: "Victory! (Team Star Boss) - Scarlet/Violet",
      fr: "Victoire! (Boss de la Team Star) - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1759,
      en: "Treasure of the Stars (Team Star Flashback) - Scarlet/Violet",
      fr: "Trésor de la team Star (Flashback de la Team Star) - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1760,
      en: "North Province (Riding) - Scarlet/Violet",
      fr: "Zone Nord (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1761,
      en: "Battle! (Northern Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon sauvage des régions du Nord) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1762,
      en: "Montenevera - Scarlet/Violet",
      fr: "Frigao - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1763,
      // en: "Music Fest at Montenevera (Montenevera Gym Test) - Scarlet/Violet",
      // fr: "Chauffez le public pour le concert de Laïm ! (Examen d'Arène de Frigao) - Écarlate/Violet",
      en: "Opening Act! - Scarlet/Violet",
      fr: "Première partie ! (Examen d'Arène de Frigao) - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1764,
      // en: "Throw Down with Ryme! ~ Rap Battle - Scarlet/Violet",
      // fr: "Rap Battle - Écarlate/Violet",
      en: "Soulful Beat!/Rap Battle - Scarlet/Violet",
      fr: "Rap Battle - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1765,
      en: "North Province (Walking) - Scarlet/Violet",
      fr: "Zone Nord (À pied) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1766,
      en: "Casseroya Lake - Scarlet/Violet",
      fr: "Lac Asrol - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    // { // Same as Walking?
    //   id: -10,
    //   en: "Casseroya Lake (Riding) - Scarlet/Violet",
    //   fr: "Lac Asrol (Monture) - Écarlate/Violet",
    // },
    {
      id: 1767,
      en: "Snow Slope Run (Glaseado Gym Test) - Scarlet/Violet",
      fr: "La course de glisse (Examen d'Arène du Mont Nappé) - Écarlate/Violet",
      tags: ["Mini Games"],
    },
    {
      id: 1768,
      en: "North Province (Area Two Riding) - Scarlet/Violet",
      fr: "Zone Nord nº 2 (Monture) - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1769,
      en: "Alfornada - Scarlet/Violet",
      fr: "Alforneira - Écarlate/Violet",
      tags: ["Cities"],
    },
    {
      id: 1770,
      en: "Emotional Spectrum Practice (Alfornada Gym Test) - Scarlet/Violet",
      fr: "Fitness Émotion (Examen d'Arène d'Alforneira) - Écarlate/Violet",
      tags: ["Mini Games"],
    },
    {
      id: 1771,
      en: "Pokémon League ~ Interview Phase - Scarlet/Violet",
      fr: "Ligue Pokémon ~ Examen de maîtrise - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1772,
      en: "Pokémon League - Scarlet/Violet",
      fr: "Ligue Pokémon - Écarlate/Violet",
      tags: ["Buildings"],
    },
    {
      id: 1773,
      en: "Battle! (Elite Four) - Scarlet/Violet",
      fr: "Combat! (Conseil 4) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1774,
      en: "Battle! (Top Champion Geeta) - Scarlet/Violet",
      fr: "Combat! (Alisma la Maîtresse en Chef) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1775,
      en: "Victory! (Top Champion Geeta) - Scarlet/Violet",
      fr: "Victoire! (Alisma la Maîtresse en Chef) - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1776,
      en: "With Nemona - Scarlet/Violet",
      fr: "Avec Menzi - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1777,
      en: "Final Battle! (Champion Nemona) - Scarlet/Violet",
      fr: "Combat Final! (Menzi la Maîtresse) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1778,
      en: "Victory! (Champion Nemona)/The Only Rival - Scarlet/Violet",
      fr: "Victoire! (Menzi la Maîtresse)/Le seul rival - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1779,
      en: "Battle! (Director Clavell) - Scarlet/Violet",
      fr: "Combat! (Clavel le Proviseur) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1780,
      en: "Clive's True Identity - Scarlet/Violet",
      fr: "La véritable identité de Clove - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1781,
      en: "Battle! (Cassiopeia) - Scarlet/Violet",
      fr: "Combat! (Cassiopée) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1782,
      // en: "Team Star's Reunion - Scarlet/Violet",
      // fr: "Les boss de la Team Star rencontrent Pania - Écarlate/Violet",
      en: "Hasta la vistar - Scarlet/Violet",
      fr: "Hasta la vistar - Écarlate/Violet",
      tags: ["Story Events"],
    },
    // {
    //   // Merged with Team Star's Reunion in the Super Collection
    //   id: -11,
    //   en: "Team Star's Decision - Scarlet/Violet",
    //   fr: "La décision de la team star - Écarlate/Violet",
    // },
    {
      id: 1783,
      // en: "Cassiopeia's Resolve - Scarlet/Violet",
      // fr: "La décision de Cassiopée - Écarlate/Violet",
      en: "Heart - Scarlet/Violet",
      fr: "Cœur - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1784,
      en: "Arven's Treasure/Mabosstiff is recovered - Scarlet/Violet",
      fr: "Le trésor de Pepper/Le Dogrino de Pepper est guéri - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1785,
      en: "To the Great Crater of Paldea! - Scarlet/Violet",
      fr: "Envol dans la Zone Zéro - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1786,
      en: "Area Zero - Scarlet/Violet",
      fr: "Zone Zéro - Écarlate/Violet",
      tags: ["Outdoor Location"],
    },
    {
      id: 1787,
      en: "Battle! (Area Zero Pokémon) - Scarlet/Violet",
      fr: "Combat! (Pokémon de la Zone Zéro) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1788,
      en: "The Gate is Open (Reunion of the two Koraidons/Miraidons) - Scarlet/Violet",
      fr: "La porte du laboratoire est ouverte (Réunion des deux Koraidons/Miraidons) - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1789,
      en: "Battle! (Area Zero Pokémon 2) - Scarlet/Violet",
      fr: "Combat! (Pokémon de la Zone Zéro 2) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1790,
      en: "Activating Offensive Protocols - Scarlet/Violet",
      fr: "Lancement du programme de combat - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1791,
      en: "Battle! (AI Professor) - Scarlet/Violet",
      fr: "Combat! (Intelligence Artificielle) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1792,
      en: "Victory! (AI Professor) - Scarlet/Violet",
      fr: "Victoire! (Intelligence Artificielle) - Écarlate/Violet",
      tags: ["Victories"],
    },
    {
      id: 1793,
      en: "Reunion of Arven and Sada/Turo - Scarlet/Violet",
      fr: "Retrouvailles de Pepper et Olim/Turum - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1794,
      en: "Paradise Protection Protocol - Scarlet/Violet",
      fr: 'Programme "Défense Paradis" - Écarlate/Violet',
      tags: ["Story Events"],
    },
    {
      id: 1795,
      en: "Koraidon/Miraidon Battle Form - Scarlet/Violet",
      fr: "Forme Combat de Koraidon/Miraidon - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1796,
      en: "Battle! (Paradise Protection Protocol) - Scarlet/Violet",
      fr: 'Combat! (Programme "Défense Paradis") - Écarlate/Violet',
      tags: ["Battles"],
    },
    {
      id: 1797,
      en: "Earnest Feelings - Scarlet/Violet",
      fr: "Des sentiments sincères - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1798,
      en: "I bid you Adieu! - Scarlet/Violet",
      fr: "... Adieu ! - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1799,
      en: "The Way Home - Scarlet/Violet",
      fr: "Retour aux sources - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1800,
      en: "Let's Take the Long Route Home - Scarlet/Violet",
      fr: "Fin de l'aventure - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1801,
      en: "Celestial (Ed Sheeran)/Ending Theme - Scarlet/Violet",
      fr: "Celestial (Ed Sheeran)/Générique de fin - Écarlate/Violet",
      tags: ["Story Events"],
    },
    {
      id: 1802,
      en: "Battle! (Academy Ace Tournament) - Scarlet/Violet",
      fr: "Combat! (Grand Tournoi de l'Académie) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1803,
      en: "Mystery Gift - Scarlet/Violet",
      fr: "Cadeau Mystère - Écarlate/Violet",
      tags: ["Menu"],
    },
    {
      id: 1804,
      en: "Battle Stadium - Scarlet/Violet",
      fr: "Stade de Combat - Écarlate/Violet",
      tags: ["Menu"],
    },
    {
      id: 1805,
      en: "Battle! (Legendary Pokémon: Treasures of ruin) - Scarlet/Violet",
      fr: "Combat! (Pokémon légendaire: Trésors du fléau) - Écarlate/Violet",
      tags: ["Battles"],
    },
    {
      id: 1806,
      en: "Title Screen: Main Theme - Scarlet/Violet",
      fr: "Écran titre: Thème principal - Écarlate/Violet",
      tags: ["Menu"],
    },

    //// Scarlet/Violet (The Teal Mask)
    // Source name and order : https://vgmdb.net/album/134816 (Disc 5)
    //  https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Scarlet_-_Violet_%2B_The_Hidden_Treasure_of_Area_Zero_Super_Music_Collection (Disc 5)
    //  https://serebii.net/scarletviolet/musiccustomisation.shtml (Battle)
    // Source traduction:
    //  https://www.pokebip.com/page/jeuxvideo/pokemon-ecarlate-violet/changement-musiques (Combat)
    {
      id: 1807,
      en: "Carmine's Theme/Ex-c-c-change - Scarlet/Violet (The Teal Mask)",
      fr: "Thème de Roseille/E-c-c-change - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Characters"],
    },
    {
      id: 1808,
      en: "Battle! (Carmine) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat! (Roseille) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      id: 1809,
      en: "Mossui Town - Scarlet/Violet (The Teal Mask)",
      fr: "Jaderaude - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Cities"],
    },
    {
      id: 1810,
      en: "Battle! (Kieran) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat! (Kassis) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      id: 1811,
      en: "Kitakami - Scarlet/Violet (The Teal Mask)",
      fr: "Septentria - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Cities"],
    },
    {
      id: 1812,
      en: "Battle! (Kitakami Pokémon) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat! (Pokémon de Septentria) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      // The DLC is not required to have these three musics but they were added in the same update
      id: 1813,
      en: "Photography (Pokémon March) - Scarlet/Violet (The Teal Mask)",
      fr: "Appareil photo (Fanfare Pokémon) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Menu"],
    },
    {
      id: 1814,
      en: "Photography (Wild Pokémon—Johto) - Scarlet/Violet (The Teal Mask)",
      fr: "Appareil photo (Pokémon sauvage—Johto) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Menu"],
    },
    {
      id: 1815,
      en: "Photography (Pokémon Lullaby) - Scarlet/Violet (The Teal Mask)",
      fr: "Appareil photo (Berceuse Pokémon) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Menu"],
    },
    {
      id: 1816,
      en: "Perrin's Theme - Scarlet/Violet (The Teal Mask)",
      fr: "Thème de Lithia - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Characters"],
    },
    {
      id: 1817,
      en: "History of the Signboard - Scarlet/Violet (The Teal Mask)",
      fr: "L'histoire du Monstre - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1818,
      en: "Kieran's Theme - Scarlet/Violet (The Teal Mask)",
      fr: "Thème de Kassis - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Characters"],
    },
    {
      id: 1819,
      en: "Festival of Masks/Kitakami Hall - Scarlet/Violet (The Teal Mask)",
      fr: "Fête des Visages/Septemplion - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Cities"],
    },
    {
      id: 1820,
      en: "Ogre Oustin' - Scarlet/Violet (The Teal Mask)",
      fr: "Chasse aux monstres - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Mini Games"],
    },
    {
      id: 1821,
      en: "You Completed the Ogre Oustin'! - Scarlet/Violet (The Teal Mask)",
      fr: "Vous avez terminé la Chasse aux monstres - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Mini Games"],
    },
    {
      id: 1822,
      en: "The Real History - Scarlet/Violet (The Teal Mask)",
      fr: "La véritable histoire du Monstre - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1823,
      en: "Crystal Pool - Scarlet/Violet (The Teal Mask)",
      fr: "Lac Cristallin - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1824,
      en: "Distortion/Kieran's Anger - Scarlet/Violet (The Teal Mask)",
      fr: "Distortion/La colère de Kassis - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1825,
      en: "The Loyal Three Come Back to Life - Scarlet/Violet (The Teal Mask)",
      fr: "Les Adoramis reviennent à la vie - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1826,
      en: "The Loyal Three's Theme - Scarlet/Violet (The Teal Mask)",
      fr: "Thème des Adoramis - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Characters"],
    },
    {
      id: 1827,
      en: "Battle! (The Loyal Three) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat! (Adoramis) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      id: 1828,
      en: "Decisive Battle! (Kieran) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat décisif! (Kassis) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      id: 1829,
      en: "Battle! (Ogerpon) - Scarlet/Violet (The Teal Mask)",
      fr: "Combat! (Ogerpon) - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Battles"],
    },
    {
      id: 1830,
      en: "Caught an Ogerpon - Scarlet/Violet (The Teal Mask)",
      fr: "Ogerpon attrapée - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Victories"],
    },
    {
      id: 1831,
      en: "They're Relaxed Now - Scarlet/Violet (The Teal Mask)",
      fr: "Ils sont détendus maintenant - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1832,
      en: "I Have to Become Stronger - Scarlet/Violet (The Teal Mask)",
      fr: "Je dois devenir plus fort... - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Story Events"],
    },
    {
      id: 1833,
      en: "Briar's Theme - Scarlet/Violet (The Teal Mask)",
      fr: "Thème de Bria - Écarlate/Violet (Le Masque Turquoise)",
      tags: ["Characters"],
    },

    //// Scarlet/Violet (The Indigo Disk)
    // Source name and order : https://vgmdb.net/album/134816 (Disc 5)
    //  https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Scarlet_-_Violet_%2B_The_Hidden_Treasure_of_Area_Zero_Super_Music_Collection (Disc 5)
    //  https://serebii.net/scarletviolet/musiccustomisation.shtml (Battle)
    // Source traduction:
    //  https://www.pokebip.com/page/jeuxvideo/pokemon-ecarlate-violet/changement-musiques (Combat)
    {
      id: 1834,
      en: "Blueberry Academy - Scarlet/Violet (The Indigo Disk)",
      fr: "Institut Myrtille - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Cities"],
    },
    {
      id: 1835,
      // When in the tunnel to the Terarium for the first time
      en: "To the Dome - Scarlet/Violet (The Indigo Disk)",
      fr: "Vers le Terra-Dôme - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1836,
      // Upon exiting the tunnel for the first time
      en: "This Is the Terarium Dome! - Scarlet/Violet (The Indigo Disk)",
      fr: "Voici le Terra-Dôme - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1837,
      en: "Terarium (Savanna Biome) - Scarlet/Violet (The Indigo Disk)",
      fr: "Terra-Dôme (Zone Savane) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1838,
      en: "Battle! (Pokémon in the Terarium) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Pokémon du dôme) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1839,
      en: "Terarium (Coastal Biome) - Scarlet/Violet (The Indigo Disk)",
      fr: "Terra-Dôme (Zone Côtière) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1840,
      en: "Battle! (Academy Trainer) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Dresseur de l'Institut Myrtille) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1841,
      en: "Terarium (Central Plaza) - Scarlet/Violet (The Indigo Disk)",
      fr: "Terra-Dôme (Poste Central) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1842,
      en: "Unsettling Atmosphere - Scarlet/Violet (The Indigo Disk)",
      fr: "Ambiance inquiétante - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1843,
      // In cutscenes with the BB Elite Four
      en: "Daily Life at the Academy - Scarlet/Violet (The Indigo Disk)",
      fr: "Vie quotidienne à l'Institut - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1844,
      en: "Blueberry Academy ~ Your Room - Scarlet/Violet (The Indigo Disk)",
      fr: "Institut Myrtille ~ Chambres - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Buildings"],
    },
    {
      id: 1845,
      en: "Terarium (Canyon Biome) - Scarlet/Violet (The Indigo Disk)",
      fr: "Terra-Dôme (Zone Canyon) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1846,
      en: "Battle! (Tera Pokémon in the Terarium) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Pokémon téracristallisé du dôme) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1847,
      en: "Flying Time Trial! - Scarlet/Violet (The Indigo Disk)",
      fr: "Course aerienne conre la montre - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Mini Games"],
    },
    {
      id: 1848,
      en: "You Completed the Elite Trial! - Scarlet/Violet (The Indigo Disk)",
      fr: "Vous avez terminé le Defi du Conseil 4 - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1849,
      en: "Terarium (Polar Biome) - Scarlet/Violet (The Indigo Disk)",
      fr: "Terra-Dôme (Zone Polaire) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Outdoor Location"],
    },
    {
      id: 1850,
      en: "Battle! (BB League Elite Four) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Conseil 4 de la Ligue Myrtille) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1851,
      en: "Victory! (BB League Elite Four) - Scarlet/Violet (The Indigo Disk)",
      fr: "Victoire! (Conseil 4 de la Ligue Myrtille) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Victories"],
    },
    {
      id: 1852,
      en: "True Intentions - Scarlet/Violet (The Indigo Disk)",
      fr: "Vraies intentions - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1853,
      en: "The Battle Begins - Scarlet/Violet (The Indigo Disk)",
      fr: "Le combat contre Kassis commence - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1854,
      en: "Battle! (Champion Kieran) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Kassis le Maître) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1855,
      en: "The Defeated Kieran - Scarlet/Violet (The Indigo Disk)",
      fr: "Defaite de Kassis - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1856,
      en: "Area Zero Underdepths - Scarlet/Violet (The Indigo Disk)",
      fr: "Abîme Zéro - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Buildings"],
    },
    {
      id: 1857,
      en: "Terapagos Comes Back to Life - Scarlet/Violet (The Indigo Disk)",
      fr: "Terapagos s'éveille - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1858,
      en: "Battle! (Terapagos & Kieran) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Terapagos & Kassis) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1859,
      en: "Conditions of the Hidden Treasure - Scarlet/Violet (The Indigo Disk)",
      fr: "Les conditions du trésor enfoui - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1860,
      en: "Terapagos Goes Rampage - Scarlet/Violet (The Indigo Disk)",
      fr: "Terapagos se déchaîne - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1861,
      en: "Battle! (Terapagos ~ The Hidden Treasure of Area Zero (Stellar Form)) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Terapagos ~ le trésor enfoui de la Zone Zéro (Forme Stellaire)) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1862,
      en: "Caught Terapagos! - Scarlet/Violet (The Indigo Disk)",
      fr: "Terapagos attrapé! - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Victories"],
    },
    {
      id: 1863,
      en: "Once Again, Starting from Zero - Scarlet/Violet (The Indigo Disk)",
      fr: "Une fois de plus, on repart de zéro - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1864,
      // Not in the collection
      en: "Celestial (remix by Toby Fox)/Ending Theme 2 - Scarlet/Violet (The Indigo Disk)",
      fr: "Celestial (remix par Toby Fox)/Générique de fin 2 - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1865,
      en: "Star Training Centers! Team Star - Scarlet/Violet (The Indigo Disk)",
      fr: "Centres d'Entraînement Star! Team Star - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1866,
      en: "Relic Song - Scarlet/Violet (The Indigo Disk)",
      fr: "Chant Antique - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Repetable Events"],
    },
    {
      id: 1867,
      en: "A Village Curse...? - Scarlet/Violet (The Indigo Disk)",
      fr: "La malédiction du village...? - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1868,
      en: "Mochi Mayhem - Scarlet/Violet (The Indigo Disk)",
      fr: "La Nuit des Kibi - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1869,
      en: "A Drone? A Pokémon? It's a Binding Mochi! - Scarlet/Violet (The Indigo Disk)",
      fr: "Pêchaminus apparaît - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Story Events"],
    },
    {
      id: 1870,
      en: "Battle! (Pecharunt) - Scarlet/Violet (The Indigo Disk)",
      fr: "Combat! (Pêchaminus) - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Battles"],
    },
    {
      id: 1871,
      en: "Title Screen 2 - Scarlet/Violet (The Indigo Disk)",
      fr: "Écran titre 2 - Écarlate/Violet (Le Disque Indigo)",
      tags: ["Menu"],
    },
  ];
  let filteredMusicNameList = [];

  // Bug : Sometimes musics stops appearing in suggestions, it seems that musics dissapears at the end of the array
  // Adding empty string makes them unfindable and prevent this bug
  musicNameList = musicNameList.concat(
    new Array(musicNameList.length).fill({
      id: -1,
      en: "",
      fr: "",
      tags: allTags,
    })
  );

  var musicListWithLinks = [
    {
      url: "https://soundcloud.com/8-bit-generation/pok-mon-red-blue-opening",
      answer: 0,
    },
    {
      url: "https://soundcloud.com/user-672647307/title-screen-red-and-blue",
      answer: 1,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/palette-town-theme",
      answer: 2,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/professor-oak",
      answer: 3,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/oak-research-lab",
      answer: 4,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/rival-appears",
      answer: 5,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/the-road-to-viridian-city-fr",
      answer: 6,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/07-wild-pokemon-battle-pokemon",
      answer: 7,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/08-victory-fanfare-vs-wild",
      answer: 8,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pewter-citys-theme",
      answer: 9,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pokemon-center-1",
      answer: 10,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/viridian-forest-1",
      answer: 11,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/13-guidepost-pokemon",
      answer: 12,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/14-female-trainer-appears",
      answer: 13,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/battle-vs-trainer",
      answer: 14,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/16-victory-fanfare-vs-trainer",
      answer: 15,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/mt-moon-cave",
      answer: 16,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/the-road-to-cerulean-from-mt",
      answer: 17,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/cerulean-citys-theme",
      answer: 18,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pokemon-gym-1",
      answer: 19,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/to-bills-origin-from-cerule",
      answer: 20,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/23-vermillion-city-theme",
      answer: 21,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/codename-st-anne",
      answer: 22,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/the-road-to-lavender-town-fr",
      answer: 23,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/27-male-trainer-appears",
      answer: 24,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/gym-leader-elite-four-battle",
      answer: 25,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/29-victory-fanfare-vs-gym",
      answer: 26,
    },
    {
      url: "https://soundcloud.com/user-672647307/cycling/",
      answer: 27,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/lavender-towns-theme",
      answer: 28,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pokemon-tower",
      answer: 29,
    },
    {
      url: "https://soundcloud.com/user-672647307/celadon-city",
      answer: 30,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/casino",
      answer: 31,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/35-rocket-trainer-appears",
      answer: 32,
    },
    {
      url: "https://soundcloud.com/user-672647307/rocket-hideout/",
      answer: 33,
    },
    {
      url: "https://soundcloud.com/user-672647307/sylph-co",
      answer: 34,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/138-ocean",
      answer: 35,
    },
    {
      url: "https://soundcloud.com/user-672647307/cinnabar-island",
      answer: 36,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokemon-mansion",
      answer: 37,
    },
    {
      url: "https://soundcloud.com/karurosu-844572453/41-evolution-theme-pokemon",
      answer: 38,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/the-final-road",
      answer: 39,
    },
    {
      url: "https://soundcloud.com/user-672647307/final-battle-rival",
      answer: 40,
    },
    {
      url: "https://soundcloud.com/user-672647307/hall-of-fame",
      answer: 41,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/ending",
      answer: 42,
    },
    {
      url: "https://soundcloud.com/1239876197497124/yellow-opening",
      answer: 43,
    },
    {
      url: "https://soundcloud.com/1239876197497124/yellow-musashi-and-kojiro",
      answer: 44,
    },
    {
      url: "https://soundcloud.com/1239876197497124/yellow-pikachus-beach",
      answer: 45,
    },
    {
      url: "https://soundcloud.com/user-672647307/opening-demo-1-gold-and-silver",
      answer: 46,
    },
    {
      url: "https://soundcloud.com/user-672647307/title-gold-and-silver",
      answer: 47,
    },
    {
      url: "https://soundcloud.com/user-672647307/an-adventure-begins-gold-and",
      answer: 48,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/new-bark-town",
      answer: 49,
    },
    {
      url: "https://soundcloud.com/user-672647307/hurry-along-gold-and-silver",
      answer: 50,
    },
    {
      url: "https://soundcloud.com/user-672647307/elm-pokemon-lab-gold-and",
      answer: 51,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/route-29",
      answer: 52,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-wild-pokemon-johto-day",
      answer: 53,
    },
    {
      url: "https://soundcloud.com/user-672647307/victory-wild-pokemon-gold-and",
      answer: 54,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/cherrygrove-city-mahogany-town",
      answer: 55,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/hurry-along-2-pokemon-gold",
      answer: 56,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pokemon-center",
      answer: 57,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-boy-1",
      answer: 58,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-trainer-johto",
      answer: 59,
    },
    {
      url: "https://soundcloud.com/user-672647307/victory-trainer-gold-and",
      answer: 60,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/routes-30-33",
      answer: 61,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/violet-city-olivine-city",
      answer: 62,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/sprout-tower",
      answer: 63,
    },
    {
      url: "https://soundcloud.com/user-672647307/trainers-eyes-meet-sage-gold",
      answer: 64,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/union-cave-ruins-of-alph",
      answer: 65,
    },
    {
      url: "https://soundcloud.com/user-672647307/ruins-of-alph-gold-and-silver",
      answer: 66,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/azalea-town-blackthorn-city",
      answer: 67,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/encounter-team-rocket",
      answer: 68,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-team-rocket-gold-and",
      answer: 69,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/route-34",
      answer: 70,
    },
    {
      url: "https://soundcloud.com/user-672647307/a-rival-appears-gold-and",
      answer: 71,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-rival-gold-and-silver",
      answer: 72,
    },
    {
      url: "https://soundcloud.com/user-672647307/evolution-gold-and-silver",
      answer: 73,
    },
    // {
    //  url: "https://soundcloud.com/diamondpearl-886539488/caught-a-pokemon-pokemon-gold",
    //  answer: -1
    // },
    {
      url: "https://soundcloud.com/gscsoundtrack/goldenrod-city",
      answer: 74,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pokemon-gym",
      answer: 75,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-gym-leader-johto-gold",
      answer: 76,
    },
    {
      url: "https://soundcloud.com/user-672647307/victory-gym-leader-gold-and",
      answer: 77,
    },
    {
      url: "https://soundcloud.com/user-672647307/goldenrod-game-corner-gold-and",
      answer: 78,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/bicycle-theme",
      answer: 79,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-girl-1",
      answer: 80,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/national-park",
      answer: 81,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-bug-catching-contest",
      answer: 82,
    },
    {
      url: "https://soundcloud.com/user-672647307/the-bug-catching-contest-gold",
      answer: 83,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/ecruteak-city-cianwood-city",
      answer: 84,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/dance-theater",
      answer: 85,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-kimono-girl",
      answer: 86,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/burned-tower",
      answer: 87,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/routes-38-39",
      answer: 88,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-wild-pokemon-johto",
      answer: 89,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/olivine-lighthouse",
      answer: 90,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/surf",
      answer: 91,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/routes-42-43-44-gyarados-lake",
      answer: 92,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/team-rocket-hideout",
      answer: 93,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-suspicious",
      answer: 94,
    },
    {
      url: "https://soundcloud.com/user-672647307/a-rival-appears-version-2-gold",
      answer: 95,
    },
    {
      url: "https://soundcloud.com/user-672647307/radio-tower-occupied-gold-and",
      answer: 96,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/tin-tower",
      answer: 97,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/ice-path-dark-cave-slowpoke",
      answer: 98,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/dragons-den",
      answer: 99,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/routes-27-26",
      answer: 100,
    },
    {
      url: "https://soundcloud.com/user-672647307/s-s-aqua",
      answer: 101,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/vermilion-city",
      answer: 102,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-gym-leader-kanto",
      answer: 103,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/lavender-town",
      answer: 104,
    },
    {
      url: "https://soundcloud.com/user-672647307/rock-tunnel-gold-and-silver",
      answer: 105,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-wild-pokemon-kanto-gold",
      answer: 106,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/celadon-city-fuchsia-city",
      answer: 107,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/routes-11-12-13",
      answer: 108,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/viridian-forest",
      answer: 109,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-boy-2",
      answer: 110,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/cerulean-saffron-pewter",
      answer: 111,
    },
    {
      url: "https://soundcloud.com/user-672647307/route-3-gold-and-silver",
      answer: 112,
    },
    {
      url: "https://soundcloud.com/user-672647307/trainers-eyes-meet-suspicious",
      answer: 113,
    },
    {
      url: "https://soundcloud.com/user-672647307/mt-moon-gold-and-silver",
      answer: 114,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/route-1",
      answer: 115,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/pallet-town",
      answer: 116,
    },
    {
      url: "https://soundcloud.com/user-672647307/professor-oak-gold-and-silver",
      answer: 117,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-girl-2",
      answer: 118,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-trainer-kanto-gold-and",
      answer: 119,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/voices-of-the-unown-pokemon",
      answer: 120,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokegear-radio-pokemon-march",
      answer: 121,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokegear-radio-pokemon-lullaby",
      answer: 122,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokegear-radio-poke-flute-gold",
      answer: 123,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokegear-radio-professor-oaks",
      answer: 124,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/printer-error-pokemon-gold",
      answer: 125,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/mt-silver-victory-road",
      answer: 126,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokemon-league-gold-and-silver",
      answer: 127,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-champion-gold-and",
      answer: 128,
    },
    {
      url: "https://soundcloud.com/user-672647307/the-hall-of-fame-gold-and",
      answer: 129,
    },
    {
      url: "https://soundcloud.com/gscsoundtrack/staff-roll-ending",
      answer: 130,
    },
    {
      url: "https://soundcloud.com/user-672647307/the-end-gold-and-silver",
      answer: 131,
    },
    {
      url: "https://soundcloud.com/rse-548363113/opening-movie-pokemon-crystal",
      answer: 132,
    },
    {
      url: "https://soundcloud.com/rse-548363113/title-screen-pokemon-crystal",
      answer: 133,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokegear-radio-buenas-password",
      answer: 134,
    },
    {
      url: "https://soundcloud.com/rse-548363113/eusine-pokemon-crystal",
      answer: 135,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-tower-reception-desk",
      answer: 136,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-tower-gold-and-silver",
      answer: 137,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-suicune-pokemon-crystal",
      answer: 138,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokemon-communications-center",
      answer: 139,
    },
    {
      url: "https://soundcloud.com/rse-548363113/clair-pokemon-crystal",
      answer: 140,
    },
    {
      url: "https://soundcloud.com/quack-vgm/pokemon-mobile-system-menu",
      answer: 141,
    },
    {
      url: "https://soundcloud.com/rse-548363113/pokemon-mobile-system-pokemon",
      answer: 142,
    },
    {
      url: "https://soundcloud.com/rse-548363113/opening-movie-setting-out-on-a",
      answer: 143,
    },
    {
      url: "https://soundcloud.com/nachohjk/pokemon-rubysapphireesmerald-title-screen",
      answer: 144,
    },
    {
      url: "https://soundcloud.com/rse-548363113/introductions-pokemon-ruby",
      answer: 145,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/005-littleroot-town-1",
      answer: 146,
    },
    {
      url: "https://soundcloud.com/rse-548363113/birch-pokemon-lab-pokemon-ruby",
      answer: 147,
    },
    {
      url: "https://soundcloud.com/rse-548363113/may-pokemon-ruby-sapphire",
      answer: 148,
    },
    {
      url: "https://soundcloud.com/rse-548363113/h-help-me-pokemon-ruby",
      answer: 149,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-wild-pokemon-pokemon",
      answer: 150,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-wild-pokemon-pokemon",
      answer: 151,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/013-route-101-1",
      answer: 152,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/014-oldale-town-1",
      answer: 153,
    },
    {
      url: "https://soundcloud.com/rse-548363113/pokemon-center-pokemon-ruby",
      answer: 154,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-youngster",
      answer: 155,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-lass",
      answer: 156,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/020-trainer-battle-1",
      answer: 157,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-trainer-battle-pokemon",
      answer: 158,
    },
    {
      url: "https://soundcloud.com/rse-548363113/petalburg-city-pokemon-ruby",
      answer: 159,
    },
    {
      url: "https://soundcloud.com/rse-548363113/hurry-along-pokemon-ruby",
      answer: 160,
    },
    {
      url: "https://soundcloud.com/user-672647307/route-104-ruby-and-sapphire",
      answer: 161,
    },
    {
      url: "https://soundcloud.com/rse-548363113/petalburg-woods-pokemon-ruby",
      answer: 162,
    },
    {
      url: "https://soundcloud.com/rse-548363113/team-magma-appears-pokemon",
      answer: 163,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/aqua-magma-team-battle-1",
      answer: 164,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-team-aqua-team-magma",
      answer: 165,
    },
    {
      url: "https://soundcloud.com/rse-548363113/rustboro-mauville-mossdeep",
      answer: 166,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-school-pokemon-ruby",
      answer: 167,
    },
    {
      url: "https://soundcloud.com/rse-548363113/crossing-the-sea-pokemon-ruby",
      answer: 168,
    },
    {
      url: "https://soundcloud.com/rse-548363113/dewford-town-pokemon-ruby",
      answer: 169,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-tuber-pok",
      answer: 170,
    },
    {
      url: "https://soundcloud.com/rse-548363113/slateport-city-pokemon-ruby",
      answer: 171,
    },
    {
      url: "https://soundcloud.com/rse-548363113/oceanic-museum-pokemon-ruby",
      answer: 172,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-110-111-112-114-117-118",
      answer: 173,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/038-cycling-1",
      answer: 174,
    },
    {
      url: "https://soundcloud.com/rse-548363113/game-corner-pokemon-ruby",
      answer: 175,
    },
    {
      url: "https://soundcloud.com/rse-548363113/reel-time-pokemon-ruby",
      answer: 176,
    },
    {
      url: "https://soundcloud.com/rse-548363113/verdanturf-town-pokemon-ruby",
      answer: 177,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-113-pokemon-ruby",
      answer: 178,
    },
    {
      url: "https://soundcloud.com/rse-548363113/twins-pokemon-ruby-sapphire",
      answer: 179,
    },
    {
      url: "https://soundcloud.com/rse-548363113/fallarbor-town-pokemon-ruby",
      answer: 180,
    },
    {
      url: "https://soundcloud.com/rse-548363113/mt-chimney-seafloor-cavern-sky",
      answer: 181,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-hiker",
      answer: 182,
    },
    {
      url: "https://soundcloud.com/derkros/route-111-desert-pokemon-rubysapphireemerald",
      answer: 183,
    },
    {
      url: "https://soundcloud.com/rse-548363113/pokemon-gym-pokemon-ruby",
      answer: 184,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-gym-leader-pokemon-ruby",
      answer: 185,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-gym-leader-pokemon",
      answer: 186,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/057-surfing-1",
      answer: 187,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-119-118-east-pokemon",
      answer: 188,
    },
    {
      url: "https://soundcloud.com/rse-548363113/fortree-city-pokemon-ruby",
      answer: 189,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-120-121-124-125-126-127",
      answer: 190,
    },
    {
      url: "https://soundcloud.com/rse-548363113/interviewers-pokemon-ruby",
      answer: 191,
    },
    {
      url: "https://soundcloud.com/rse-548363113/safari-zone-pokemon-ruby",
      answer: 192,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-gentleman",
      answer: 193,
    },
    {
      url: "https://soundcloud.com/rse-548363113/lilycove-pacifidlog-city",
      answer: 194,
    },
    {
      url: "https://soundcloud.com/rse-548363113/museum-pokemon-ruby-sapphire",
      answer: 195,
    },
    {
      url: "https://soundcloud.com/rse-548363113/brendan-pokemon-ruby-sapphire",
      answer: 196,
    },
    {
      url: "https://soundcloud.com/user-umbreonerick/battle-maybrendan-pokemon-rubysapphireemerald-extended",
      answer: 197,
    },
    {
      url: "https://soundcloud.com/rse-548363113/evolution-pokemon-ruby",
      answer: 198,
    },
    {
      url: "https://soundcloud.com/rse-548363113/poke-mart-pokemon-ruby",
      answer: 199,
    },
    {
      url: "https://soundcloud.com/rse-548363113/mt-pyre-pokemon-ruby-sapphire",
      answer: 200,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-psychic",
      answer: 201,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-hex-maniac",
      answer: 202,
    },
    {
      url: "https://soundcloud.com/user-672647307/mt-pyre-exterior",
      answer: 203,
    },
    {
      url: "https://soundcloud.com/rse-548363113/hideout-pokemon-ruby-sapphire",
      answer: 204,
    },
    {
      url: "https://soundcloud.com/rse-548363113/team-aqua-appears-pokemon-ruby",
      answer: 205,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-team-aquateam-magma-leaders-pokemon-rubysapphire",
      answer: 206,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-super-ancient-pokemon",
      answer: 207,
    },
    {
      url: "https://soundcloud.com/bobby-cloud/pokemon-ruby-sapphire-the-drought",
      answer: 208,
    },
    {
      url: "https://soundcloud.com/rse-548363113/heavy-rain-pokemon-ruby",
      answer: 209,
    },
    {
      url: "https://soundcloud.com/rse-548363113/dive-pokemon-ruby-sapphire",
      answer: 210,
    },
    {
      url: "https://soundcloud.com/user-672647307/rune-city",
      answer: 211,
    },
    {
      url: "https://soundcloud.com/rse-548363113/cave-of-origin-pokemon-ruby",
      answer: 212,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-super-ancient-pokemon",
      answer: 213,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-swimmer-pok",
      answer: 214,
    },
    {
      url: "https://soundcloud.com/rse-548363113/ever-grande-city-pokemon-ruby",
      answer: 215,
    },
    {
      url: "https://soundcloud.com/rse-548363113/contest-lobby-pokemon-ruby",
      answer: 216,
    },
    {
      url: "https://soundcloud.com/user-672647307/contest",
      answer: 217,
    },
    {
      url: "https://soundcloud.com/rse-548363113/results-announcement-pokemon",
      answer: 218,
    },
    {
      url: "https://soundcloud.com/rse-548363113/contest-winner-pokemon-ruby",
      answer: 219,
    },
    {
      url: "https://soundcloud.com/rse-548363113/sealed-chamber-pokemon-ruby",
      answer: 220,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-regirock-regice",
      answer: 221,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-trick-house-pokemon-ruby",
      answer: 222,
    },
    {
      url: "https://soundcloud.com/user-672647307/abandoned-ship",
      answer: 223,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-tower-pokemon-ruby",
      answer: 224,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-road-pokemon-ruby",
      answer: 225,
    },
    {
      url: "https://soundcloud.com/rse-548363113/trainers-eyes-meet-cooltrainer",
      answer: 226,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-elite-four-appear-pokemon",
      answer: 227,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-elite-four-pokemon-ruby",
      answer: 228,
    },
    {
      url: "https://soundcloud.com/rse-548363113/champion-steven-pokemon-ruby",
      answer: 229,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/109-decisive-battle-vs",
      answer: 230,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-steven-pokemon-rubysapphire",
      answer: 231,
    },
    {
      url: "https://soundcloud.com/rse-548363113/room-of-glory-pokemon-rubysapphire",
      answer: 232,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-hall-of-fame-pokemon-rubysapphire-1",
      answer: 233,
    },
    {
      url: "https://soundcloud.com/rse-548363113/ending-theme-pokemon-rubysapphire",
      answer: 234,
    },
    {
      url: "https://soundcloud.com/user-937373904/the-end-pokemon-ruby-sapphire",
      answer: 235,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/opening-movie-pokemon-firered",
      answer: 236,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/title-screen-pokemon-firered",
      answer: 237,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/game-tutorial-pokemon-firered",
      answer: 238,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/welcome-to-the-world-of",
      answer: 239,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/pallet-town-pokemon-firered",
      answer: 240,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/professor-oaks-theme-pokemon",
      answer: 241,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/professor-oaks-lab-pokemon",
      answer: 242,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/encounter-rival-pokemon",
      answer: 243,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/battle-vs-trainer-pokemon",
      answer: 244,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/victory-vs-trainer-pokemon",
      answer: 245,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/kanto-route-1-pokemon-firered",
      answer: 246,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/pewter-city-theme-pokemon-firered-leafgreen",
      answer: 247,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/teachy-tv-menu-pokemon-firered",
      answer: 248,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/viridian-forest-pokemon",
      answer: 249,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/battle-vs-wild-pokemon-pokemon",
      answer: 250,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/victory-vs-wild-pokemon",
      answer: 251,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-trainer-appears-boy-version",
      answer: 252,
    },
    {
      url: "https://soundcloud.com/zim-ra/21-pok-mon-center",
      answer: 253,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/guide-pokemon-firered",
      answer: 254,
    },
    {
      url: "https://soundcloud.com/zim-ra/25-pok-mon-gym",
      answer: 255,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/tense-battle-pokemon-firered",
      answer: 256,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/battle-vs-gym-leader-pokemon",
      answer: 257,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/victory-vs-gym-leader-pokemon",
      answer: 258,
    },
    {
      url: "https://soundcloud.com/zim-ra/30-evolution",
      answer: 259,
    },
    {
      url: "https://soundcloud.com/zim-ra/32-road-to-cerulean-city",
      answer: 260,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-trainer-appears-girl-version",
      answer: 261,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/mt-moon-pokemon-firered",
      answer: 262,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/vermilion-city-pokemon-firered",
      answer: 263,
    },
    {
      url: "https://soundcloud.com/zim-ra/36-the-s-s-anne",
      answer: 264,
    },
    {
      url: "https://soundcloud.com/zim-ra/37-cycling",
      answer: 265,
    },
    {
      url: "https://soundcloud.com/zim-ra/38-lavender-town-theme",
      answer: 266,
    },
    {
      url: "https://soundcloud.com/zim-ra/39-pok-mon-tower",
      answer: 267,
    },
    {
      url: "https://soundcloud.com/zim-ra/40-celadon-city-theme",
      answer: 268,
    },
    {
      url: "https://soundcloud.com/rebel-frend-380155347/rocket-game-corner-pokemon",
      answer: 269,
    },
    {
      url: "https://soundcloud.com/zim-ra/45-rocket-hideout",
      answer: 270,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-trainer-appears-bad-guy",
      answer: 271,
    },
    {
      url: "https://soundcloud.com/zim-ra/47-silph-co",
      answer: 272,
    },
    {
      url: "https://soundcloud.com/zim-ra/48-road-to-fuchsia-city",
      answer: 273,
    },
    {
      url: "https://soundcloud.com/zim-ra/50-fuchsia-city-theme",
      answer: 274,
    },
    {
      url: "https://soundcloud.com/zim-ra/52-the-sea",
      answer: 275,
    },
    {
      url: "https://soundcloud.com/zim-ra/53-battle-legendary-pok-mon",
      answer: 276,
    },
    {
      url: "https://soundcloud.com/zim-ra/55-cinnabar-island-theme",
      answer: 277,
    },
    {
      url: "https://soundcloud.com/zim-ra/56-pok-mon-mansion",
      answer: 278,
    },
    {
      url: "https://soundcloud.com/zim-ra/57-pok-mon-net-center",
      answer: 279,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/sevii-islands-four-five",
      answer: 280,
    },
    {
      url: "https://soundcloud.com/zim-ra/60-pok-mon-jump",
      answer: 281,
    },
    {
      url: "https://soundcloud.com/zim-ra/61-dodrio-berry-picking",
      answer: 282,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/sevii-islands-pokemon-firered",
      answer: 283,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/sevii-islands-six-seven",
      answer: 284,
    },
    {
      url: "https://soundcloud.com/zim-ra/65-the-union-room",
      answer: 285,
    },
    {
      url: "https://soundcloud.com/zim-ra/66-mystery-gift",
      answer: 286,
    },
    {
      url: "https://soundcloud.com/zim-ra/68-battle-mewtwo",
      answer: 287,
    },
    {
      url: "https://soundcloud.com/zim-ra/69-the-final-road",
      answer: 288,
    },
    {
      url: "https://soundcloud.com/zim-ra/70-final-battle-rival",
      answer: 289,
    },
    {
      url: "https://soundcloud.com/zim-ra/71-epilogue",
      answer: 290,
    },
    {
      url: "https://soundcloud.com/zim-ra/72-hall-of-fame",
      answer: 291,
    },
    {
      url: "https://soundcloud.com/zim-ra/73-ending-theme",
      answer: 292,
    },
    {
      url: "https://soundcloud.com/zim-ra/74-deoxys-appears",
      answer: 293,
    },
    {
      url: "https://soundcloud.com/zim-ra/75-battle-deoxys",
      answer: 294,
    },
    {
      url: "https://soundcloud.com/rse-548363113/abnormal-weather-pokemon",
      answer: 295,
    },
    {
      url: "https://soundcloud.com/rse-548363113/rayquaza-appears-pokemon",
      answer: 296,
    },
    {
      url: "https://soundcloud.com/user-344694651/pokemon-platinum-battle-frontier",
      answer: 297,
    },
    {
      url: "https://soundcloud.com/jordi-moreno-sanchez/pokemon-emerald-battle-tower",
      answer: 298,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/battle-factory-pokemon-emerald-soundtrack-hq",
      answer: 299,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-arena-pokemon-emerald",
      answer: 300,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-dome-1-pokemon-emerald",
      answer: 301,
    },
    {
      url: "https://soundcloud.com/user-344694651/pokemon-platinum-battle-dome",
      answer: 302,
    },
    {
      url: "https://soundcloud.com/thegreatnepyrus/pokemon-emerald-ost-battle-pike",
      answer: 303,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-palace-pokemon-emerald",
      answer: 304,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-pyramid-pokemon-emerald",
      answer: 305,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-pyramid-summit-pokemon",
      answer: 306,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-frontier-brain-hoenn",
      answer: 307,
    },
    {
      url: "https://soundcloud.com/sullysmithdsdsdsd/pokemon-emerald-battle-mew-music-hq",
      answer: 308,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/opening-demo-1",
      answer: 309,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/introduction-pokemon-diamond",
      answer: 310,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/special-report-search-for-the",
      answer: 311,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/futaba-town-night",
      answer: 312,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/rival-pokemon-diamond-pearl",
      answer: 313,
    },
    {
      url: "https://soundcloud.com/macskar/pokemon-diamond-pearl-route-201-day",
      answer: 314,
    },
    {
      url: "https://soundcloud.com/dawnidarko/pokemon-diamondpearlplatinum-lake-theme",
      answer: 315,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-surprise-at-the-lake-pokemon",
      answer: 316,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/battle-wild-pok-mon-1",
      answer: 317,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-wild-pokemon-pokemon",
      answer: 318,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/dawn-pokemon-diamond-pearl",
      answer: 319,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/zui-town-midday",
      answer: 320,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-pokemon-lab-pokemon",
      answer: 321,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/hurry-along-pokemon-diamond",
      answer: 322,
    },
    {
      url: "https://soundcloud.com/terman80r-558374390/pokemon-center-day-pokemon-diamondpearlplatinum",
      answer: 323,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-youngster",
      answer: 324,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-lass",
      answer: 325,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/battle-trainer",
      answer: 326,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-trainer-battle-pokemon",
      answer: 327,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/kotobuki-city-midday",
      answer: 328,
    },
    {
      url: "https://soundcloud.com/user-536602017/poke-mart-poke-mon-diamond",
      answer: 329,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-203-day-pokemon-diamond",
      answer: 330,
    },
    {
      url: "https://soundcloud.com/videogamemusicguy/pokemon-diamond-and-pearl-battle-rival-original",
      answer: 331,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/oreburgh-gate-pokemon-diamond",
      answer: 332,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/kurogane-city-night",
      answer: 333,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/oreburgh-mine-pokemon-diamond",
      answer: 334,
    },
    {
      url: "https://soundcloud.com/lucas-m-872286882/pokemon-diamond-pearl-pokemon-gym",
      answer: 335,
    },
    {
      url: "https://soundcloud.com/user-672647307/battle-gym-leader",
      answer: 336,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-gym-leader-pokemon",
      answer: 337,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-twins",
      answer: 338,
    },
    {
      url: "https://soundcloud.com/pmofv-scjiohvjkf/floaroma-town-day-pokemon-diamondpearlplatinum",
      answer: 339,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-205-day-pokemon-diamond",
      answer: 340,
    },
    {
      url: "https://soundcloud.com/oswaldo-lira-425393178/encounter-team-galactic",
      answer: 341,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/battle-team-galactic",
      answer: 342,
    },
    {
      url: "https://soundcloud.com/user-672647307/eterna-forest",
      answer: 343,
    },
    {
      url: "https://soundcloud.com/thecookinggaming/eterna-city-day-pokemon",
      answer: 344,
    },
    {
      url: "https://soundcloud.com/blazing-kurama/team-galactic-building-pokemon-diamondpearlplatinum",
      answer: 345,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-diamond-and-pearl-battle-team-galactic-commander-music",
      answer: 346,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-team-galactic-pokemon",
      answer: 347,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/evolution-pokemon-diamond",
      answer: 348,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-diamond-and-pearl-bicycle",
      answer: 349,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-cyclist",
      answer: 350,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-206-day-pokemon-diamond",
      answer: 351,
    },
    {
      url: "https://soundcloud.com/iipurple-man/pokemon-diamond-pearl-platinum-hearthome-city-day",
      answer: 352,
    },
    {
      url: "https://soundcloud.com/robdog-5/pokemon-diamond-amp-pearl-route-209-day",
      answer: 353,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-hiker",
      answer: 354,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/solaceon-town-day-pokemon",
      answer: 355,
    },
    {
      url: "https://soundcloud.com/xouman/high-quality-pokemon-diamond-pearl-route-210-day",
      answer: 356,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/veilstone-city-day-pokemon",
      answer: 357,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/valor-lakefront-day-pokemon",
      answer: 358,
    },
    {
      url: "https://soundcloud.com/liipinoy408/pok-mon-diamond-pearl-canalave",
      answer: 359,
    },
    {
      url: "https://soundcloud.com/mega-diglett/route-216-day-pokemon-diamond",
      answer: 360,
    },
    {
      url: "https://soundcloud.com/user-170484526/snowpoint-city-day",
      answer: 361,
    },
    {
      url: "https://soundcloud.com/user-828245020/pokemon-diamond-pearl-team-galactic-hq",
      answer: 362,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-diamond-pearl-platinum",
      answer: 363,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/deep-within-team-galactic-hq",
      answer: 364,
    },
    {
      url: "https://soundcloud.com/n1n10d0h/pokemon-diamond-pearl-mt-coronet",
      answer: 365,
    },
    {
      url: "https://soundcloud.com/user-672647307/spear-pillar",
      answer: 366,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-legendary-pokemon-appears",
      answer: 367,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/catastrophe-pokemon-diamond",
      answer: 368,
    },
    {
      url: "https://soundcloud.com/user-829882792/battle-dialga-palkia",
      answer: 369,
    },
    {
      url: "https://soundcloud.com/user-672647307/sunyshore-city-day-diamond-and-pearl",
      answer: 370,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-road-pokemon-diamond",
      answer: 371,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-ace-trainer",
      answer: 372,
    },
    {
      url: "https://soundcloud.com/user-672647307/pokemon-league-day",
      answer: 373,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/fight-area-day-pokemon-diamond",
      answer: 374,
    },
    {
      url: "https://soundcloud.com/ricky-smith-413376265/route-225-day-pokemon-diamondpearlplatinum",
      answer: 375,
    },
    {
      url: "https://soundcloud.com/user-640695995/route-228-day-poke-mon",
      answer: 376,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/twinleaf-town-night-pokemon",
      answer: 377,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-201-night-pokemon",
      answer: 378,
    },
    {
      url: "https://soundcloud.com/oswaldo-veliz-846444522/pokemon-center-night-diamond",
      answer: 379,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/nintendo-wi-fi-connection",
      answer: 380,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/sandgem-town-night-pokemon",
      answer: 381,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/lucas-pokemon-diamond-pearl",
      answer: 382,
    },
    {
      url: "https://soundcloud.com/robdividinchi/jubilife-city-extended-mix-night-pokemon-diamond-pearl",
      answer: 383,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/tv-station-pokemon-diamond",
      answer: 384,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/gts-pokemon-diamond-pearl",
      answer: 385,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/surf-pokemon-diamond-pearl",
      answer: 386,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/canalave-city-night-pokemon",
      answer: 387,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-203-night-pokemon",
      answer: 388,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-black-belt",
      answer: 389,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/oreburgh-city-night-pokemon",
      answer: 390,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-205-night-pokemon",
      answer: 391,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-sailor",
      answer: 392,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/eterna-city-night-pokemon",
      answer: 393,
    },
    {
      url: "https://soundcloud.com/kiri-schwedler/underground-passage-poke-mon",
      answer: 394,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/captured-a-flag-underground",
      answer: 395,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-aroma-lady",
      answer: 396,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/floaroma-town-night-pokemon",
      answer: 397,
    },
    {
      url: "https://soundcloud.com/user-593700205/old-chateau-pokemon-diamond-pearl",
      answer: 398,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/solaceon-town-night-pokemon",
      answer: 399,
    },
    {
      url: "https://soundcloud.com/blazing-kurama/great-marsh-pokemon-diamondpearlplatinum",
      answer: 400,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-206-night-pokemon",
      answer: 401,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-collector",
      answer: 402,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/veilstone-city-night-pokemon",
      answer: 403,
    },
    {
      url: "https://soundcloud.com/nilson-540030578/pokemon-diamond-pearl-game-corner",
      answer: 404,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/youre-a-winner-pokemon-diamond",
      answer: 405,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/youre-a-jackpot-winner-pokemon",
      answer: 406,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-pi-pokemon",
      answer: 407,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-209-night-pokemon",
      answer: 408,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/snowpoint-city-night-pokemon-diamond-and-pearl",
      answer: 409,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-216-night-pokemon",
      answer: 410,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/lake-caverns-pokemon-diamond-pearl",
      answer: 411,
    },
    {
      url: "https://soundcloud.com/cheerleadermaye/battle-uxie-mesprit-azelf-pokemon-diamondpearlplatinum-music-extended",
      answer: 412,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-210-night-pokemon",
      answer: 413,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-poke-radar-hit-pokemon",
      answer: 414,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/sunyshore-city-night-pokemon",
      answer: 415,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-artist",
      answer: 416,
    },
    {
      url: "https://soundcloud.com/takablestream50/poke-mon-diamond-pearl-ost",
      answer: 417,
    },
    {
      url: "https://soundcloud.com/iipurple-man/pokemon-diamond-pearl-platinum-hearthome-city-night",
      answer: 418,
    },
    {
      url: "https://soundcloud.com/terman80r-558374390/contest-hall-pokemon-diamondpearlplatinum",
      answer: 419,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/poffins-pokemon-diamond-pearl",
      answer: 420,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/super-contest-pokemon-diamond",
      answer: 421,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/contest-dress-up-pokemon",
      answer: 422,
    },
    {
      url: "https://soundcloud.com/blazing-kurama/super-contest-easy-dance-pokemon-diamondpearlplatinum",
      answer: 423,
    },
    {
      url: "https://soundcloud.com/blazing-kurama/super-contest-hard-dance-pokemon-diamondpearlplatinum",
      answer: 424,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/contest-results-announcement",
      answer: 425,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/contest-winner-pokemon-diamond",
      answer: 426,
    },
    {
      url: "https://soundcloud.com/waffleboyy/route-228-night-pokemon-diamond-pokemon-pearl-platinum",
      answer: 427,
    },
    {
      url: "https://soundcloud.com/zane-maserati/valor-lakefront-night-pokemon",
      answer: 428,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/fight-area-night-pokemon",
      answer: 429,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/battle-tower-pokemon-diamond",
      answer: 430,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-225-night-pokemon",
      answer: 431,
    },
    {
      url: "https://soundcloud.com/xouman/high-quality-pokemon-diamond-pearl-stark-mountain",
      answer: 432,
    },
    {
      url: "https://soundcloud.com/joremaster/legendary-pokemon-battle-pokemon-diamondpearlplatinum",
      answer: 433,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/mystery-gift-pokemon-diamond",
      answer: 434,
    },
    {
      url: "https://soundcloud.com/hey-pikachu/pokemon-diamond-pearl-pokemon-league-night",
      answer: 435,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/decisive-battle-pokemon-league",
      answer: 436,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-elite-four-appear-pokemon",
      answer: 437,
    },
    {
      url: "https://soundcloud.com/mashiboi/pokemon-diamondpearlplatinum-battle-elite-four",
      answer: 438,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-elite-four-pokemon",
      answer: 439,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/champion-cynthia-pokemon",
      answer: 440,
    },
    {
      url: "https://soundcloud.com/user601819048/pokemon-diamond-pearl-platinum-battle-champion-cynthia-music-hq",
      answer: 441,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-champion-cynthia",
      answer: 442,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/hall-of-fame-pokemon-diamond",
      answer: 443,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/congratulations-on-entering",
      answer: 444,
    },
    {
      url: "https://soundcloud.com/sippie40/ending-pokemon-diamond-pearl-platinum",
      answer: 445,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/beginning-dimension-arceus",
      answer: 446,
    },
    // {
    //  url: "https://soundcloud.com/user-593700205/battle-arceus-pokemon-diamond-pearl",
    //  answer: -2,
    // },
    {
      url: "https://soundcloud.com/user-545759109/opening-title-screen-poke-mon",
      answer: 447,
    },
    {
      url: "https://soundcloud.com/giratina-405005217/pokemon-platinum-press-start-used",
      answer: 448,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/special-program-lets-ask-prof",
      answer: 449,
    },
    {
      url: "https://soundcloud.com/user-545759109/lookers-theme-poke-mon",
      answer: 450,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/global-terminal-pokemon",
      answer: 451,
    },
    {
      url: "https://soundcloud.com/rse-548363113/wi-fi-plaza",
      answer: 452,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/wi-fi-plaza-mini-games-pokemon",
      answer: 453,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/wi-fi-plaza-parade-pokemon",
      answer: 454,
    },
    {
      url: "https://soundcloud.com/user-545759109/giratina-appears-part-1-poke",
      answer: 455,
    },
    {
      url: "https://soundcloud.com/giratina-405005217/pokemon-platinum-the-distortion-world",
      answer: 456,
    },
    {
      url: "https://soundcloud.com/jalyn894/pokemon-platinum-giratina-battle-music",
      answer: 457,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/spin-trade-pokemon-platinum",
      answer: 458,
    },
    {
      url: "https://soundcloud.com/tower-hero-gamer-lol/mystery-gift-pokemon-platinum",
      answer: 459,
    },
    {
      url: "https://soundcloud.com/user-545759109/super-contest-cute-division",
      answer: 460,
    },
    {
      url: "https://soundcloud.com/user-545759109/super-contest-cool-division",
      answer: 461,
    },
    {
      url: "https://soundcloud.com/user-545759109/super-contest-tough-division",
      answer: 462,
    },
    {
      url: "https://soundcloud.com/user-545759109/super-contest-beauty-division",
      answer: 463,
    },
    {
      url: "https://soundcloud.com/user-545759109/super-contest-smart-division",
      answer: 464,
    },
    {
      url: "https://soundcloud.com/user-545759109/villa-twinleaf-town-music-box",
      answer: 465,
    },
    {
      url: "https://soundcloud.com/user-545759109/villa-lilycove-city-bossa-nova",
      answer: 466,
    },
    {
      url: "https://soundcloud.com/user-545759109/fight-area-battle-frontier",
      answer: 467,
    },
    {
      url: "https://soundcloud.com/user-545759109/battle-arcade-poke-mon",
      answer: 468,
    },
    {
      url: "https://soundcloud.com/user-545759109/battle-hall-poke-mon-platinum",
      answer: 469,
    },
    {
      url: "https://soundcloud.com/user-545759109/battle-factory-poke-mon",
      answer: 470,
    },
    {
      url: "https://soundcloud.com/user-545759109/battle-castle-poke-mon",
      answer: 471,
    },
    {
      url: "https://soundcloud.com/apersonwhoexists1212/pokemon-platinum-battle-frontier-brain-music-hq",
      answer: 472,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-frontier-brain-sinnoh",
      answer: 473,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/battle-regirock-regice",
      answer: 474,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/opening-movie-pokemon",
      answer: 475,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/title-screen-pokemon-heartgold",
      answer: 476,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/an-adventure-begins-pokemon",
      answer: 477,
    },
    {
      url: "https://soundcloud.com/alveus_x/new-bark-town",
      answer: 478,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/hurry-along-pokemon-heartgold",
      answer: 479,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/lyra-pokemon-heartgold",
      answer: 480,
    },
    {
      url: "https://soundcloud.com/alveus_x/professor-elms-lab",
      answer: 481,
    },
    {
      url: "https://soundcloud.com/alveus_x/route-29",
      answer: 482,
    },
    {
      url: "https://soundcloud.com/alveus_x/vs-wild-johto-pokemon",
      answer: 483,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/victory-wild-pokemon-pokemon",
      answer: 484,
    },
    {
      url: "https://soundcloud.com/rse-548363113/cherrygrove-city",
      answer: 485,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/hurry-along-2-pokemon",
      answer: 486,
    },
    {
      url: "https://soundcloud.com/alveus_x/pokemon-center",
      answer: 487,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-boy-1",
      answer: 488,
    },
    {
      url: "https://soundcloud.com/alveus_x/vs-johto-trainer",
      answer: 489,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/victory-trainer-battle-pokemon",
      answer: 490,
    },
    {
      url: "https://soundcloud.com/xouman/high-quality-pokemon-heartgold-soulsilver-route-30",
      answer: 491,
    },
    {
      url: "https://soundcloud.com/alveus_x/violet-olivine-city",
      answer: 492,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/sprout-tower-pokemon-heartgold",
      answer: 493,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-sage",
      answer: 494,
    },
    {
      url: "https://soundcloud.com/alveus_x/friendly-shop",
      answer: 495,
    },
    // {
    //  url: "https://soundcloud.com/bw2-187523711/kimono-girl-pokemon-heartgold",
    //  answer: -3,
    // },
    {
      url: "https://soundcloud.com/alveus_x/ruins-of-alph-union-cave",
      answer: 496,
    },
    {
      url: "https://soundcloud.com/managrimm/pokemon-heartgold-soulsilver-ruins-of-alph",
      answer: 497,
    },
    {
      url: "https://soundcloud.com/curevgm/pokegear-radio-unown",
      answer: 498,
    },
    {
      url: "https://soundcloud.com/alveus_x/azalea-town-blackthorn-city",
      answer: 499,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-team-rocket",
      answer: 500,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/battle-team-rocket-pokemon",
      answer: 501,
    },
    {
      url: "https://soundcloud.com/alveus_x/routes-32-34-37-46",
      answer: 502,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/a-rival-appears-pokemon",
      answer: 503,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/battle-rival-pokemon-heartgold",
      answer: 504,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/evolution-pokemon-heartgold",
      answer: 505,
    },
    {
      url: "https://soundcloud.com/alveus_x/goldenrod-city",
      answer: 506,
    },
    {
      url: "https://soundcloud.com/alveus_x/pokemon-gym",
      answer: 507,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-gym-leader-johto",
      answer: 508,
    },
    {
      url: "https://soundcloud.com/user-519096026/victory-against-gym-leader",
      answer: 509,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-buenas-password",
      answer: 510,
    },
    {
      url: "https://soundcloud.com/user-519096026/goldenrod-game-corner",
      answer: 511,
    },
    {
      url: "https://soundcloud.com/user-519096026/youre-a-winner",
      answer: 512,
    },
    {
      url: "https://soundcloud.com/user-519096026/global-terminal",
      answer: 513,
    },
    {
      url: "https://soundcloud.com/user-519096026/gts",
      answer: 514,
    },
    {
      url: "https://soundcloud.com/user-519096026/bicycle",
      answer: 515,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-girl-1",
      answer: 516,
    },
    {
      url: "https://soundcloud.com/user-519096026/national-park",
      answer: 517,
    },
    {
      url: "https://soundcloud.com/user-519096026/ecruteak-city",
      answer: 518,
    },
    {
      url: "https://soundcloud.com/user-519096026/ecruteak-dance-theater",
      answer: 519,
    },
    {
      url: "https://soundcloud.com/user-519096026/burned-tower",
      answer: 520,
    },
    {
      url: "https://soundcloud.com/user-519096026/eusine",
      answer: 521,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-professor-oaks",
      answer: 522,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-38",
      answer: 523,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-pokemon-march",
      answer: 524,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-raikou",
      answer: 525,
    },
    {
      url: "https://soundcloud.com/user-519096026/olivine-lighthouse",
      answer: 526,
    },
    {
      url: "https://soundcloud.com/user-519096026/surf",
      answer: 527,
    },
    {
      url: "https://soundcloud.com/user-519096026/cianwood-city",
      answer: 528,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-42",
      answer: 529,
    },
    {
      url: "https://soundcloud.com/user-519096026/team-rocket-hq",
      answer: 530,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-suspicious-figure-1",
      answer: 531,
    },
    {
      url: "https://soundcloud.com/user-519096026/a-rival-appears-version-2",
      answer: 532,
    },
    {
      url: "https://soundcloud.com/user-519096026/radio-tower-occupied",
      answer: 533,
    },
    {
      url: "https://soundcloud.com/user-519096026/ice-path",
      answer: 534,
    },
    {
      url: "https://soundcloud.com/user-519096026/dragons-den",
      answer: 535,
    },
    {
      url: "https://soundcloud.com/user-519096026/clair",
      answer: 536,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-entei",
      answer: 537,
    },
    {
      url: "https://soundcloud.com/user-519096026/bell-tower",
      answer: 538,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-dance-of-ecruteak",
      answer: 539,
    },
    {
      url: "https://soundcloud.com/user-519096026/ho-oh-appears",
      answer: 540,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-ho-oh",
      answer: 541,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-26",
      answer: 542,
    },
    {
      url: "https://soundcloud.com/user-519096026/s-s-aqua",
      answer: 543,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-adventure-continues",
      answer: 544,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-gym-leader-kanto",
      answer: 545,
    },
    {
      url: "https://soundcloud.com/user-519096026/lavender-town",
      answer: 546,
    },
    {
      url: "https://soundcloud.com/user-519096026/rock-tunnel",
      answer: 547,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-wild-pokemon-kanto",
      answer: 548,
    },
    {
      url: "https://soundcloud.com/user-519096026/cerulean-city",
      answer: 549,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-24",
      answer: 550,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-pokemon-lullaby",
      answer: 551,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-suicune",
      answer: 552,
    },
    {
      url: "https://soundcloud.com/user-519096026/celadon-city",
      answer: 553,
    },
    {
      url: "https://soundcloud.com/user-519096026/ethan",
      answer: 554,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-11",
      answer: 555,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-poke-flute",
      answer: 556,
    },
    {
      url: "https://soundcloud.com/user-519096026/viridian-forest",
      answer: 557,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-boy-2",
      answer: 558,
    },
    {
      url: "https://soundcloud.com/user-519096026/pewter-city",
      answer: 559,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-3",
      answer: 560,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-suspicious-figure-2",
      answer: 561,
    },
    {
      url: "https://soundcloud.com/user-519096026/mt-moon",
      answer: 562,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-1",
      answer: 563,
    },
    {
      url: "https://soundcloud.com/user-519096026/pallet-town",
      answer: 564,
    },
    {
      url: "https://soundcloud.com/user-519096026/professor-oak",
      answer: 565,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-girl-2",
      answer: 566,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-trainer-kanto",
      answer: 567,
    },
    {
      url: "https://soundcloud.com/user-519096026/cinnabar-island",
      answer: 568,
    },
    {
      url: "https://soundcloud.com/user-519096026/route-47",
      answer: 569,
    },
    {
      url: "https://soundcloud.com/user-519096026/safari-zone-gate",
      answer: 570,
    },
    {
      url: "https://soundcloud.com/user-519096026/safari-zone",
      answer: 571,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-variety-channel",
      answer: 572,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-bug-catching-contest-1",
      answer: 573,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-bug-catching-contest",
      answer: 574,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-in-the-pokeathlon",
      answer: 575,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-opening-ceremony",
      answer: 576,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-an-event-begins",
      answer: 577,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-event-time",
      answer: 578,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-finals",
      answer: 579,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-results",
      answer: 580,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-medal-ceremony",
      answer: 581,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokeathlon-winner",
      answer: 582,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-tower-reception-desk",
      answer: 583,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-tower-johto",
      answer: 584,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-factory",
      answer: 585,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-hall",
      answer: 586,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-arcade",
      answer: 587,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-castle",
      answer: 588,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-frontier-brain",
      answer: 589,
    },
    {
      url: "https://soundcloud.com/user-519096026/victory-against-frontier-brain",
      answer: 590,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-trainer-channel",
      answer: 591,
    },
    {
      url: "https://soundcloud.com/user-519096026/nintendo-wi-fi-connection",
      answer: 592,
    },
    {
      url: "https://soundcloud.com/user-519096026/wi-fi-plaza",
      answer: 593,
    },
    {
      url: "https://soundcloud.com/user-519096026/wi-fi-plaza-plaza-games",
      answer: 594,
    },
    {
      url: "https://soundcloud.com/user-519096026/wi-fi-plaza-parade",
      answer: 595,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-route-101",
      answer: 596,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokegear-radio-route-201",
      answer: 597,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokewalker",
      answer: 598,
    },
    {
      url: "https://soundcloud.com/user-519096026/spiky-eared-pichu-appears",
      answer: 599,
    },
    {
      url: "https://soundcloud.com/user-519096026/encounter-kimono-girl",
      answer: 600,
    },
    {
      url: "https://soundcloud.com/user-519096026/lugia-appears",
      answer: 601,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-lugia",
      answer: 602,
    },
    {
      url: "https://soundcloud.com/user-519096026/victory-road",
      answer: 603,
    },
    {
      url: "https://soundcloud.com/user-519096026/pokemon-league",
      answer: 604,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-champion",
      answer: 605,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-hall-of-fame",
      answer: 606,
    },
    {
      url: "https://soundcloud.com/user-519096026/ending-theme",
      answer: 607,
    },
    {
      url: "https://soundcloud.com/user-519096026/the-end",
      answer: 608,
    },
    {
      url: "https://soundcloud.com/user-519096026/battle-super-ancient-pokemon",
      answer: 609,
    },
    {
      url: "https://soundcloud.com/user-519096026/sinjoh-ruins",
      answer: 610,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/arceus-pokemon-heartgold",
      answer: 611,
    },
    {
      url: "https://soundcloud.com/soniccrafter-26/pokemon-black-white-coronation-day",
      answer: 612,
    },
    {
      url: "https://soundcloud.com/soniccrafter-26/pokemon-black-white-title-theme",
      answer: 613,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/onward-to-adventure-pokemon",
      answer: 614,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-day-of-beginnings-pokemon",
      answer: 615,
    },
    {
      url: "https://soundcloud.com/xouman/high-quality-pokemon-black-white-nuvema-town",
      answer: 616,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/battle-cheren-bianca-pokemon",
      answer: 617,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/hurry-along-1-pokemon-black",
      answer: 618,
    },
    {
      url: "https://soundcloud.com/alexplayspokemon/pokemon-black-and-white",
      answer: 619,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/juniper-pokemon-lab-pokemon",
      answer: 620,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/lets-go-together-pokemon-black",
      answer: 621,
    },
    {
      url: "https://soundcloud.com/mike-dreamurr/pokemon-black-and-white-route-1",
      answer: 622,
    },
    {
      url: "https://soundcloud.com/ohs-ma-gawd/pokemon-black-white-ost-14-198-battle-wild-pokemon",
      answer: 623,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-wild-pokemon-pokemon-1",
      answer: 624,
    },
    {
      url: "https://soundcloud.com/luisleite11/accumula-town",
      answer: 625,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/hurry-along-2-pokemon-black",
      answer: 626,
    },
    {
      url: "https://soundcloud.com/death-music-dog/pokemon-black-white-pokemon-center",
      answer: 627,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/team-plasma-plots-pokemon",
      answer: 628,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-2-summer-pokemon-black",
      answer: 629,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/route-2-spring-summer-pokemon",
      answer: 630,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-youngster-1",
      answer: 631,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-blackwhite-battle-trainer-music-hq",
      answer: 632,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-trainer-battle-1",
      answer: 633,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-lass-1",
      answer: 634,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/striaton-city-pokemon-black",
      answer: 635,
    },
    {
      url: "https://soundcloud.com/the-redinkling/the-dreamyard-pokemon-black",
      answer: 636,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/team-plasma-appears-pokemon",
      answer: 637,
    },
    {
      url: "https://soundcloud.com/mystery-room/pokemon-black-and-white-team-plasma-battle-theme",
      answer: 638,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-team-plasma-pokemon",
      answer: 639,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/evolution-pokemon-black-white",
      answer: 640,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trainers-eyes-meet-twins-1",
      answer: 641,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/cherens-theme-pokemon-black",
      answer: 642,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/theres-trouble-pokemon-black",
      answer: 643,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/nacrene-city-pokemon-black",
      answer: 644,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/pokemon-gym-pokemon-black",
      answer: 645,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-black-and-white-battle-gym-leader",
      answer: 646,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/victory-is-right-before-your",
      answer: 647,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/victory-against-gym-leader",
      answer: 648,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/gate-pokemon-black-and-white",
      answer: 649,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/sky-arrow-bridge-pokemon-black",
      answer: 650,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/hiun-city-pokemon-black-and",
      answer: 651,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/spotted-businessman-pokemon",
      answer: 652,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/route-4-spring-pokemon-black",
      answer: 653,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/spotted-backpacker-pokemon",
      answer: 654,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/raimon-city-pokemon-black-and",
      answer: 655,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/belles-theme-pokemon-black-and",
      answer: 656,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/unwavering-emotions-pokemon",
      answer: 657,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/the-equated-captives-pokemon",
      answer: 658,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/battle-n-pokemon-black-and",
      answer: 659,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/battle-trouble-pokemon-black",
      answer: 660,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/bicycle-pokemon-black-and",
      answer: 661,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/champion-adeku-pokemon-black",
      answer: 662,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/driftveil-drawbridge-pokemon",
      answer: 663,
    },
    {
      url: "https://soundcloud.com/revimpx/pokemon-black-white-driftveil-city",
      answer: 664,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/freezer-containers-pokemon",
      answer: 665,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/route-6-springsummer-pokemon",
      answer: 666,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-6-7-8-9-17-18-summer-pokemon-black-white",
      answer: 667,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/spotted-parasol-lady-pokemon",
      answer: 668,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/spotted-scientist-pokemon",
      answer: 669,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/electric-rock-cave-pokemon",
      answer: 670,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/fukiyose-city-pokemon-black",
      answer: 671,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/araragis-father-pokemon-black",
      answer: 672,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/spotted-psychic-pokemon-black",
      answer: 673,
    },
    {
      url: "https://soundcloud.com/user-367734782/icirrus-city",
      answer: 674,
    },
    {
      url: "https://soundcloud.com/user-367734782/dragonspiral-tower",
      answer: 675,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-team-plasma",
      answer: 676,
    },
    {
      url: "https://soundcloud.com/user-367734782/dragonspiral-tower-top-floor",
      answer: 677,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-4-summer",
      answer: 678,
    },
    {
      url: "https://soundcloud.com/user-367734782/relic-castle",
      answer: 679,
    },
    {
      url: "https://soundcloud.com/user-367734782/tubeline-bridge",
      answer: 680,
    },
    {
      url: "https://soundcloud.com/user-367734782/shopping-mall-nine",
      answer: 681,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-roughneck",
      answer: 682,
    },
    {
      url: "https://soundcloud.com/user-367734782/opelucid-city-black",
      answer: 683,
    },
    {
      url: "https://soundcloud.com/user-367734782/opelucid-city-white",
      answer: 684,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-10",
      answer: 685,
    },
    {
      url: "https://soundcloud.com/user-367734782/victory-road",
      answer: 686,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-ace-trainer",
      answer: 687,
    },
    {
      url: "https://soundcloud.com/user-367734782/pokemon-league",
      answer: 688,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-elite-four",
      answer: 689,
    },
    {
      url: "https://soundcloud.com/user-367734782/pokemon-league-besieged",
      answer: 690,
    },
    {
      url: "https://soundcloud.com/user-367734782/embracing-the-mission",
      answer: 691,
    },
    {
      url: "https://soundcloud.com/user-367734782/ns-castle",
      answer: 692,
    },
    {
      url: "https://soundcloud.com/user-367734782/the-pokemon-child-n",
      answer: 693,
    },
    {
      url: "https://soundcloud.com/user-367734782/ns-dragon-zekrom",
      answer: 694,
    },
    {
      url: "https://soundcloud.com/user-367734782/ns-dragon-reshiram",
      answer: 695,
    },
    {
      url: "https://soundcloud.com/user-367734782/the-dragon-awakes-zekrom",
      answer: 696,
    },
    {
      url: "https://soundcloud.com/user-367734782/the-dragon-awakes-reshiram",
      answer: 697,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-zekrom",
      answer: 698,
    },
    // { // Same first 16 seconds as Zekrom's Battle
    //  url: "https://soundcloud.com/user-367734782/battle-reshiram",
    //  answer: -4,
    // },
    {
      url: "ttps://soundcloud.com/user-367734782/decisive-battle-n",
      answer: 699,
    },
    {
      url: "https://soundcloud.com/user-367734782/ghetsiss-ambition",
      answer: 700,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-ghetsis",
      answer: 701,
    },
    {
      url: "https://soundcloud.com/user-367734782/goodbye",
      answer: 702,
    },
    {
      url: "https://soundcloud.com/user-367734782/ending-to-their-respective",
      answer: 703,
    },
    {
      url: "https://soundcloud.com/user-367734782/lookers-theme",
      answer: 704,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-2-autumn",
      answer: 705,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-2-winter",
      answer: 706,
    },
    {
      url: "https://soundcloud.com/user-367734782/pleasure-cruise-royal-unova",
      answer: 707,
    },
    {
      url: "https://soundcloud.com/user-367734782/wi-fi-connection",
      answer: 708,
    },
    {
      url: "https://soundcloud.com/user-367734782/global-terminal",
      answer: 709,
    },
    {
      url: "https://soundcloud.com/user-367734782/gts",
      answer: 710,
    },
    {
      url: "https://soundcloud.com/user-367734782/spin-trade",
      answer: 711,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-4-autumn",
      answer: 712,
    },
    {
      url: "https://soundcloud.com/user-367734782/gear-station",
      answer: 713,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-subway",
      answer: 714,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-subway-trainer",
      answer: 715,
    },
    {
      url: "https://soundcloud.com/user-367734782/musical-hall",
      answer: 716,
    },
    {
      url: "https://soundcloud.com/user-367734782/prop-dress-up",
      answer: 717,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/the-curtain-rises-on-the",
      answer: 718,
    },
    {
      url: "https://soundcloud.com/user-367734782/musical-stardom",
      answer: 719,
    },
    {
      url: "https://soundcloud.com/user-367734782/musical-forest-stroll",
      answer: 720,
    },
    {
      url: "https://soundcloud.com/user-367734782/musical-a-sweet-soiree",
      answer: 721,
    },
    {
      url: "https://soundcloud.com/user-367734782/musical-exciting-nimbasa",
      answer: 722,
    },
    {
      url: "https://soundcloud.com/user-367734782/a-pair-on-the-ferris-wheel",
      answer: 723,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-6-autumn",
      answer: 724,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-6-winter",
      answer: 725,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-legendary-pokemon",
      answer: 726,
    },
    {
      url: "https://soundcloud.com/user-367734782/anville-town",
      answer: 727,
    },
    {
      url: "https://soundcloud.com/user-367734782/marvelous-bridge",
      answer: 728,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-12-spring",
      answer: 729,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-12-summer",
      answer: 730,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-cyclist",
      answer: 731,
    },
    {
      url: "https://soundcloud.com/user-367734782/poke-transfer-lab",
      answer: 732,
    },
    {
      url: "https://soundcloud.com/user-367734782/poke-transfer-select-pokemon",
      answer: 733,
    },
    {
      url: "https://soundcloud.com/user-367734782/poke-transfer-catch-pokemon",
      answer: 734,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-pokefan",
      answer: 735,
    },
    {
      url: "https://soundcloud.com/user-367734782/black-city",
      answer: 736,
    },
    {
      url: "https://soundcloud.com/user-367734782/white-forest",
      answer: 737,
    },
    {
      url: "https://soundcloud.com/user-367734782/game-sync",
      answer: 738,
    },
    {
      url: "https://soundcloud.com/user-367734782/entralink",
      answer: 739,
    },
    {
      url: "https://soundcloud.com/user-367734782/someones-entralink",
      answer: 740,
    },
    {
      url: "https://soundcloud.com/user-367734782/encounter-gentleman",
      answer: 741,
    },
    {
      url: "https://soundcloud.com/user-367734782/undella-town-winter",
      answer: 742,
    },
    {
      url: "https://soundcloud.com/user-367734782/undella-town-spring",
      answer: 743,
    },
    {
      url: "https://soundcloud.com/user-367734782/undella-town-autumn",
      answer: 744,
    },
    {
      url: "https://soundcloud.com/user-367734782/undella-town-summer",
      answer: 745,
    },
    {
      url: "https://soundcloud.com/user-367734782/cynthias-theme",
      answer: 746,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-cynthia",
      answer: 747,
    },
    {
      url: "https://soundcloud.com/user-367734782/lostlorn-forest",
      answer: 748,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-strong-wild-pokemon",
      answer: 749,
    },
    {
      url: "https://soundcloud.com/user-367734782/surfing",
      answer: 750,
    },
    {
      url: "https://soundcloud.com/user-367734782/abyssal-ruins",
      answer: 751,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-12-winter",
      answer: 752,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-12-autumn",
      answer: 753,
    },
    {
      url: "https://soundcloud.com/user-367734782/lacunosa-town",
      answer: 754,
    },
    {
      url: "https://soundcloud.com/user-367734782/village-bridge",
      answer: 755,
    },
    {
      url: "https://soundcloud.com/user-367734782/mystery-gift",
      answer: 756,
    },
    {
      url: "https://soundcloud.com/user-367734782/route-4-winter",
      answer: 757,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-competition-challenge",
      answer: 758,
    },
    {
      url: "https://soundcloud.com/user-367734782/team-rocket",
      answer: 759,
    },
    //{  // Same as Zekrom's Battle without sound effects
    //  url: "https://soundcloud.com/user-367734782/battle-kyurem",
    //  answer: -5,
    //},
    {
      url: "https://soundcloud.com/user-367734782/battle-champion",
      answer: 760,
    },
    {
      url: "https://soundcloud.com/user-367734782/victory-against-champion",
      answer: 761,
    },
    {
      url: "https://soundcloud.com/pkmn-black-and-white/congratulations-on-entering",
      answer: 762,
    },
    {
      url: "https://soundcloud.com/user-367734782/unity-tower",
      answer: 763,
    },
    {
      url: "https://soundcloud.com/user-367734782/battle-wcs-champion",
      answer: 764,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/opening-pokemon-black-2-white",
      answer: 765,
    },
    {
      url: "https://soundcloud.com/noah-gibson-833702180/pokemon-black-2-white-2-title",
      answer: 766,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/an-adventure-is-beginning",
      answer: 767,
    },
    {
      url: "https://soundcloud.com/criticalelement/pokemon-black-white-2-ost",
      answer: 768,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/biancas-theme-pokemon-black-2",
      answer: 769,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/route-19-spring-summer-pokemon",
      answer: 770,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-19-20-summer-pkmn-black-2-white-2",
      answer: 771,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-wild",
      answer: 772,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/floccesy-town-pokemon-black-2",
      answer: 773,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/floccesy-ranch-pokemon-black-2",
      answer: 774,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/rivals-theme-pokemon-black-2",
      answer: 775,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-black-2-and-white-2-ost-battle-rival-1",
      answer: 776,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/virbank-city-pokemon-black-2",
      answer: 777,
    },
    {
      url: "https://soundcloud.com/tonlindo/pokemon-black-white-2-ost-gym-roxie-english",
      answer: 778,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/team-plasma-returns-pokemon",
      answer: 779,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-pokemon-black",
      answer: 780,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/filming-underway-at-pokestar",
      answer: 781,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-black-2-and-white-2-pokestar-studios-battle",
      answer: 782,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-glory-pokemon",
      answer: 783,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-defeat",
      answer: 784,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-invasion",
      answer: 785,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-success",
      answer: 786,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-retreat",
      answer: 787,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-weird-pokemon",
      answer: 788,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-love-pokemon",
      answer: 789,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-sorrow",
      answer: 790,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-horror",
      answer: 791,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-purified",
      answer: 792,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-fear-pokemon",
      answer: 793,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-humor-pokemon",
      answer: 794,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-despair",
      answer: 795,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokestar-studios-shock-pokemon",
      answer: 796,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/castelia-sewers-pokemon-black",
      answer: 797,
    },
    {
      url: "https://soundcloud.com/youngc1997/castelia-gym-pokemon-black-2white-2",
      answer: 798,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-harlequin",
      answer: 799,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/funfest-mission-start-pokemon",
      answer: 800,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/colresss-theme-pokemon-black-2",
      answer: 801,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-black-2-and-white-2-trainer-battle",
      answer: 802,
    },
    {
      url: "https://soundcloud.com/boltrava/pokemon-black-2-and-white-2-join-avenue",
      answer: 803,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/join-avenue-meet-and-greet",
      answer: 804,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/nimbasa-city-gym-runway",
      answer: 805,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-beauty",
      answer: 806,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/nimbasa-city-gym-stage-pokemon",
      answer: 807,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-black-2-and-white-2-ost-battle-gym-leader",
      answer: 808,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-black-2-and-white-2-ost-victory-lies-before-you",
      answer: 809,
    },
    {
      url: "https://soundcloud.com/yohaamon/driftveil-city-gym",
      answer: 810,
    },
    {
      url: "https://soundcloud.com/user-545759109/poke-mon-world-tournament-1",
      answer: 811,
    },
    {
      url: "https://soundcloud.com/docvgm/the-pwt-pokemon",
      answer: 812,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-7",
      answer: 813,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-6",
      answer: 814,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-5",
      answer: 815,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-4",
      answer: 816,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-3",
      answer: 817,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-2",
      answer: 818,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-9",
      answer: 819,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-8",
      answer: 820,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-black-2-and-white-2-ost-pwt-final-round",
      answer: 821,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/winning-in-the-pwt-pokemon",
      answer: 822,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pwt-victory-pokemon-black-2",
      answer: 823,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/underground-ruins-pokemon",
      answer: 824,
    },
    {
      url: "https://soundcloud.com/joremaster/pokemon-black-2-and-white-2-battle-regirockregiceregisteel",
      answer: 825,
    },
    {
      url: "https://soundcloud.com/mystin-669240564/plasma-frigate-deck-pokmon-black-2-white-2-music-extended-hd",
      answer: 826,
    },
    {
      url: "https://soundcloud.com/mimikyugacha-877/zinzolins-theme-pokemon-black",
      answer: 827,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/cherens-theme-pokemon-black-2",
      answer: 828,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/mistralton-city-gym-pokemon",
      answer: 829,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/lentimas-town-pokemon-black-2",
      answer: 830,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/the-road-to-reversal-mountain",
      answer: 831,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/reversal-mountain-pokemon-1",
      answer: 832,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/reversal-mountain-pokemon",
      answer: 833,
    },
    {
      url: "https://soundcloud.com/user-476807752-552018078/pokemon-black-2-and-white-2-strange-house",
      answer: 834,
    },
    //{ // = Battle! (Legendary Pokémon) - Diamond/Pearl
    //  url: "https://soundcloud.com/bw2-187523711/battle-legendary-pok-mon",
    //  answer: "Battle! (Legendary Pokémon—Sinnoh Version) - Black 2/White 2",
    //},
    {
      url: "https://soundcloud.com/bw2-187523711/opelucid-city-gym-pokemon",
      answer: 835,
    },
    {
      url: "https://soundcloud.com/docvgm/opelucid-city-attacked",
      answer: 836,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/the-frozen-city-pokemon-black",
      answer: 837,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-team-plasma",
      answer: 838,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-team",
      answer: 839,
    },
    {
      url: "https://soundcloud.com/docvgm/shadow-triads-theme",
      answer: 840,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/marine-tube-pokemon-black-2",
      answer: 841,
    },
    {
      url: "https://soundcloud.com/user822952949/humilau-city-pokemon-black-and",
      answer: 842,
    },
    {
      url: "https://soundcloud.com/yohaamon/humilau-city-gym",
      answer: 843,
    },
    {
      url: "https://soundcloud.com/user-4778121/route-22-spring-pokemon-black",
      answer: 844,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-21-22-summer-pokemon-black-2-white-2",
      answer: 845,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/plasma-frigate-sortie-pokemon",
      answer: 846,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/infiltrating-the-plasma",
      answer: 847,
    },
    {
      url: "https://soundcloud.com/lrr-1/pokemon-black-white-2-ost-plasma-boss-colress-battle",
      answer: 848,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/confrontation-pokemon-black-2",
      answer: 849,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/absorption-pokemon-black-2",
      answer: 850,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/fusion-pokemon-black-2-white-2",
      answer: 851,
    },
    {
      url: "https://soundcloud.com/pikacatz/pokemon-black-white-2-ost",
      answer: 852,
    },
    {
      url: "https://soundcloud.com/nate-conley-2/pokemon-black-white-2-ost-1",
      answer: 853,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/route-23-pokemon-black-2-white",
      answer: 854,
    },
    {
      url: "https://soundcloud.com/oh-my-gosh-its-a-nerd/ns-castle-blackwhite-2",
      answer: 855,
    },
    {
      url: "https://soundcloud.com/letterman-2/pokemon-black-and-white-2-ns-room",
      answer: 856,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/ns-theme-pokemon-black-2-white",
      answer: 857,
    },
    {
      url: "https://soundcloud.com/gabe-ninja/pokemon-black-2-and-white-2-ost-battle-n",
      answer: 858,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/unova-link-pokemon-black-2",
      answer: 859,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/xtransceiver-minigames-pokemon",
      answer: 860,
    },
    {
      url: "https://soundcloud.com/user-4778121/route-19-autumn-winter-pokemon",
      answer: 861,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-19-20-winter-pokemon-black-2-white-2",
      answer: 862,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/cave-of-being-pokemon-black-2",
      answer: 863,
    },
    {
      url: "https://soundcloud.com/docvgm/black-tower-entrance",
      answer: 864,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/black-tower-pokemon-black-2",
      answer: 865,
    },
    {
      url: "https://soundcloud.com/docvgm/white-treehollow-entrance",
      answer: 866,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/white-treehollow-pokemon-black",
      answer: 867,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/route-22-winter-autumn-pokemon",
      answer: 868,
    },
    {
      url: "https://soundcloud.com/rse-548363113/route-21-22-winter-pokemon-black-2-white-2",
      answer: 869,
    },
    {
      url: "https://soundcloud.com/mystery-room/pokemon-black-white-2-champion-iris-battle",
      answer: 870,
    },
    {
      url: "https://soundcloud.com/user-14456997/pokemon-black-and-white-2-staff-credits",
      answer: 871,
    },
    {
      url: "https://soundcloud.com/user-937373904/the-end-pokemon-black-white-2",
      answer: 872,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/musical-charming-munna-pokemon",
      answer: 873,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/musical-pokemon-party-pokemon",
      answer: 874,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/musical-carnival-pokemon",
      answer: 875,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/musical-meloettaaa-pokemon",
      answer: 876,
    },
    {
      url: "https://soundcloud.com/garagebandpoke/bw-musical-carnival-ludicolo",
      answer: 877,
    },
    // {
    //  url: "https://soundcloud.com/bw2-187523711/pokemon-world-championships",
    //  answer: "Pokémon World Championships Final - Black 2/White 2",
    // },
    {
      url: "https://soundcloud.com/user-367734782/relic-song",
      answer: 878,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/hidden-grotto-pokemon-black-2",
      answer: 879,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/title-screen",
      answer: 880,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/kalos",
      answer: 881,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-x-y-an-adventure-is",
      answer: 882,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-vaniville-town",
      answer: 883,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-1-vaniville-pathway",
      answer: 884,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-aquacorde-town",
      answer: 885,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-friends-theme-a",
      answer: 886,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-its-a-poke-mon",
      answer: 887,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/battle-friend",
      answer: 888,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-hurry-along-1",
      answer: 889,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-2-3-avance-trail-ouvert",
      answer: 890,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/santalune-forest-route-20",
      answer: 891,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-battle-wild-pokemon",
      answer: 892,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-victory-wild-poke",
      answer: 893,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-youngster",
      answer: 894,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-lass",
      answer: 895,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/battle-trainer-battle",
      answer: 896,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-victory-trainer",
      answer: 897,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-santalune-city",
      answer: 898,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-poke-mon-center",
      answer: 899,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-poke-mon-gym",
      answer: 900,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-gym-leader",
      answer: 901,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-victory-gym-leader",
      answer: 902,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-4-5-6-7-22-parterre-way",
      answer: 903,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-poke-fan",
      answer: 904,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-sina-and-dexio",
      answer: 905,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-gate",
      answer: 906,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-lumiose-city",
      answer: 907,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-the-sycamore-poke",
      answer: 908,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/professor-sycamores-theme",
      answer: 909,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-dark-skies",
      answer: 910,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-spotted-twins",
      answer: 911,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-camphrier-town",
      answer: 912,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-spotted-tourist",
      answer: 913,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-parfum-palace",
      answer: 914,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-together-with",
      answer: 915,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-hurry-along-2",
      answer: 916,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-butler",
      answer: 917,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-maid",
      answer: 918,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-8-9-10-11-12-13",
      answer: 919,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/glittering-cave-route-14",
      answer: 920,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-team-flare-appears",
      answer: 921,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-evolution",
      answer: 922,
    },
    {
      url: "https://soundcloud.com/user-744542609/pokemon-xy-spotted-swimmer",
      answer: 923,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-cyllage-city",
      answer: 924,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-bicycle",
      answer: 925,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-hiker",
      answer: 926,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-geosenge-town",
      answer: 927,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted",
      answer: 928,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-black-belt",
      answer: 929,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-shalour-city",
      answer: 930,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-tower-of-mastery",
      answer: 931,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-roller",
      answer: 932,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-successor",
      answer: 933,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-surfing",
      answer: 934,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-swimmer",
      answer: 935,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-riding-skiddo",
      answer: 936,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-coumarine-city",
      answer: 937,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-an-unwavering",
      answer: 938,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-the-kalos-power",
      answer: 939,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-team-flare",
      answer: 940,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-team-flare",
      answer: 941,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-a-mysterious",
      answer: 942,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-friends-theme",
      answer: 943,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-scary-house",
      answer: 944,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/laverre-city",
      answer: 945,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-spotted-furisode",
      answer: 946,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-15-16-17-brun-way",
      answer: 947,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-dendemille-town",
      answer: 948,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-anistar-city",
      answer: 949,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-psychic",
      answer: 950,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-lysandre-labs",
      answer: 951,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-an-eternal-poison",
      answer: 952,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/the-ultimate-weapon-deployed",
      answer: 953,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/team-flare-secret-hq",
      answer: 954,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/the-legendary-pokemon-awoken",
      answer: 955,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/battle-xerneas-yveltal-zygarde",
      answer: 956,
    },
    {
      url: "https://soundcloud.com/zomglord/pokemon-x-y-super-music",
      answer: 957,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/victory-team-flare",
      answer: 958,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/firing-the-ultimate-weapon-1",
      answer: 959,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/firing-the-ultimate-weapon",
      answer: 960,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-az",
      answer: 961,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/route-18-19-21-vallee-etroite",
      answer: 962,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-friends-theme-1",
      answer: 963,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-snowbelle-city",
      answer: 964,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/how-about-a-song-jubilife-city",
      answer: 965,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-poke-mon-village",
      answer: 966,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-victory-road",
      answer: 967,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-ace-trainer",
      answer: 968,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-the-poke-mon",
      answer: 969,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-elite-four",
      answer: 970,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/battle-champion",
      answer: 971,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/victory-champion",
      answer: 972,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/congratulations-on-entering",
      answer: 973,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-the-sun-shines",
      answer: 974,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-ill-go-with-you",
      answer: 975,
    },
    {
      url: "https://soundcloud.com/rainos_u/kiseki-pokemon-x-and-y-ending",
      answer: 976,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-fin",
      answer: 977,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-kiloude-city",
      answer: 978,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/battle-maison",
      answer: 979,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-friend-safari",
      answer: 980,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/gogoat-shuttle",
      answer: 981,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/shopping",
      answer: 982,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-sushi-high-roller",
      answer: 983,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/boutique",
      answer: 984,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-coiffure-clips",
      answer: 985,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/pr-video-studio",
      answer: 986,
    },
    {
      url: "https://soundcloud.com/iipurple-man/lookers-theme-pokemon-x-y",
      answer: 987,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-punk-guy",
      answer: 988,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/hotel-richissime",
      answer: 989,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/lookers-in-trouble",
      answer: 990,
    },
    {
      url: "https://soundcloud.com/daddy-g-815419458/emmas-theme-pokemon-x-and-y",
      answer: 991,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/lookers-sorrowful-theme",
      answer: 992,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/berry-picker",
      answer: 993,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/head-it",
      answer: 994,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/tile-puzzle",
      answer: 995,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/lets-super-train",
      answer: 996,
    },
    {
      url: "https://soundcloud.com/mk-starstorm-mkstarstorm/pokemon-x-and-y-super-training",
      answer: 997,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/success",
      answer: 998,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/try-again",
      answer: 999,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/super-training-secret-super",
      answer: 1000,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/a-poke-radar-hit",
      answer: 1001,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/poke-radar-chain",
      answer: 1002,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-spot",
      answer: 1003,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-wonder-trade",
      answer: 1004,
    },
    {
      url: "https://soundcloud.com/3p9onpybdq4e/gts",
      answer: 1005,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-game-sync",
      answer: 1006,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-mystery-gift",
      answer: 1007,
    },
    {
      url: "https://soundcloud.com/user-744542609/poke-mon-xy-battle-mewtwo",
      answer: 1008,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/happy-birthday-from-pokemon",
      answer: 1009,
    },
    {
      url: "https://soundcloud.com/user-881529531/opening-setting-out-on-a",
      answer: 1010,
    },
    {
      url: "https://soundcloud.com/user-881529531/opening-2-pokemon-omega-ruby",
      answer: 1011,
    },
    {
      url: "https://soundcloud.com/user-881529531/title-screen-main-theme",
      answer: 1012,
    },
    {
      url: "https://soundcloud.com/user-881529531/opening-selection-pokemon",
      answer: 1013,
    },
    {
      url: "https://soundcloud.com/articray200/pokemon-omega-ruby2falpha-sapphire-littleroot-town-music-hq",
      answer: 1014,
    },
    {
      url: "https://soundcloud.com/user-881529531/professor-birchs-laboratory",
      answer: 1015,
    },
    {
      url: "https://soundcloud.com/user-881529531/mays-theme-pokemon-omega-ruby",
      answer: 1016,
    },
    {
      url: "https://soundcloud.com/user-881529531/help-me-pokemon-omega-ruby",
      answer: 1017,
    },
    {
      url: "https://soundcloud.com/user-881529531/wild-pokemon-battle-pokemon",
      answer: 1018,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-wild-pokemon-pokemon",
      answer: 1019,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-101-pokemon-omega-ruby",
      answer: 1020,
    },
    {
      url: "https://soundcloud.com/user-881529531/oldale-town-pokemon-omega-ruby",
      answer: 1021,
    },
    {
      url: "https://soundcloud.com/user-881529531/follow-me-pokemon-omega-ruby",
      answer: 1022,
    },
    {
      url: "https://soundcloud.com/user-881529531/pokemon-center-pokemon-omega",
      answer: 1023,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-youngster-pokemon",
      answer: 1024,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-lass-pokemon-omega",
      answer: 1025,
    },
    {
      url: "https://soundcloud.com/user-881529531/trainer-battle-pokemon-omega",
      answer: 1026,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-trainer-pokemon-omega",
      answer: 1027,
    },
    {
      url: "https://soundcloud.com/user-881529531/petalburg-city-pokemon-omega",
      answer: 1028,
    },
    {
      url: "https://soundcloud.com/user-881529531/wallys-theme-pokemon-omega",
      answer: 1029,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-104-pokemon-omega-ruby",
      answer: 1030,
    },
    {
      url: "https://soundcloud.com/user-881529531/petalburg-woods-pokemon-omega",
      answer: 1031,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-magma-appears-pokemon",
      answer: 1032,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-magma-aqua-battle-pokemon",
      answer: 1033,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-team-magma-aqua",
      answer: 1034,
    },
    {
      url: "https://soundcloud.com/user-881529531/rustboro-city-pokemon-omega",
      answer: 1035,
    },
    {
      url: "https://soundcloud.com/user-881529531/trainers-school-pokemon-omega",
      answer: 1036,
    },
    {
      url: "https://soundcloud.com/user-881529531/cross-the-sea-pokemon-omega",
      answer: 1037,
    },
    {
      url: "https://soundcloud.com/user-881529531/dewford-town-pokemon-omega",
      answer: 1038,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-lady-pokemon-omega",
      answer: 1039,
    },
    {
      url: "https://soundcloud.com/user-881529531/slateport-city-pokemon-omega",
      answer: 1040,
    },
    {
      url: "https://soundcloud.com/user-881529531/oceanic-museum-pokemon-omega",
      answer: 1041,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-magma-aqua-leaders-theme",
      answer: 1042,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-110-pokemon-omega-ruby",
      answer: 1043,
    },
    {
      url: "https://soundcloud.com/user-881529531/bicycle-pokemon-omega-ruby",
      answer: 1044,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-triathlete-pokemon",
      answer: 1045,
    },
    {
      url: "https://soundcloud.com/user-881529531/verdanturf-town-pokemon-omega",
      answer: 1046,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-113-pokemon-omega-ruby",
      answer: 1047,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-twins-pokemon-omega",
      answer: 1048,
    },
    {
      url: "https://soundcloud.com/user-881529531/fallarbor-town-pokemon-omega",
      answer: 1049,
    },
    {
      url: "https://soundcloud.com/user-881529531/mt-chimney-pokemon-omega-ruby",
      answer: 1050,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-hiker-pokemon-omega",
      answer: 1051,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-111-desert-pokemon-omega",
      answer: 1052,
    },
    {
      url: "https://soundcloud.com/user-881529531/gym-pokemon-omega-ruby-alpha",
      answer: 1053,
    },
    {
      url: "https://soundcloud.com/user-881529531/gym-leader-battle-pokemon",
      answer: 1054,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-gym-leader-elite-four",
      answer: 1055,
    },
    {
      url: "https://soundcloud.com/user-881529531/a-road-once-traveled-pokemon",
      answer: 1056,
    },
    {
      url: "https://soundcloud.com/user-881529531/surf-pokemon-omega-ruby-alpha",
      answer: 1057,
    },
    {
      url: "https://soundcloud.com/user-881529531/southern-island-pokemon-omega",
      answer: 1058,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/route-119-pokemon-omega",
      answer: 1059,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/explosive-situation-red-or",
      answer: 1060,
    },
    {
      url: "https://soundcloud.com/user-881529531/fortree-city-pokemon-omega",
      answer: 1061,
    },
    {
      url: "https://soundcloud.com/user-881529531/route-120-pokemon-omega-ruby",
      answer: 1062,
    },
    {
      url: "https://soundcloud.com/user-881529531/reporters-pokemon-omega-ruby",
      answer: 1063,
    },
    {
      url: "https://soundcloud.com/user-881529531/safari-zone-pokemon-omega-ruby",
      answer: 1064,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-gentleman-pokemon",
      answer: 1065,
    },
    {
      url: "https://soundcloud.com/user-881529531/lilycove-city-pokemon-omega",
      answer: 1066,
    },
    {
      url: "https://soundcloud.com/user-881529531/art-museum-pokemon-omega-ruby",
      answer: 1067,
    },
    {
      url: "https://soundcloud.com/user-881529531/brendans-theme-pokemon-omega",
      answer: 1068,
    },
    {
      url: "https://soundcloud.com/user-881529531/rivals-may-brendan-battle",
      answer: 1069,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/evolution-pokemon-omegaruby",
      answer: 1070,
    },
    {
      url: "https://soundcloud.com/user-881529531/poke-mart-pokemon-omega-ruby",
      answer: 1071,
    },
    {
      url: "https://soundcloud.com/user-881529531/mt-pyre-pokemon-omega-ruby",
      answer: 1072,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-psychic-pokemon",
      answer: 1073,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-poke-maniac-pokemon",
      answer: 1074,
    },
    {
      url: "https://soundcloud.com/user-881529531/mt-pyre-outer-wall-pokemon",
      answer: 1075,
    },
    {
      url: "https://soundcloud.com/user-881529531/they-who-squirm-pokemon-omega",
      answer: 1076,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-magma-aqua-hideout",
      answer: 1077,
    },
    {
      url: "https://soundcloud.com/user-881529531/five-in-a-row-pokemon-omega",
      answer: 1078,
    },
    {
      url: "https://soundcloud.com/user-881529531/countdown-to-collapse-pokemon",
      answer: 1079,
    },
    {
      url: "https://soundcloud.com/user-881529531/dive-pokemon-omega-ruby-alpha",
      answer: 1080,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-diver-pokemon-omega",
      answer: 1081,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-aqua-appears-pokemon",
      answer: 1082,
    },
    {
      url: "https://soundcloud.com/user-881529531/team-magma-aqua-leader-battle",
      answer: 1083,
    },
    {
      url: "https://soundcloud.com/user-881529531/drought-pokemon-omega-ruby",
      answer: 1084,
    },
    {
      url: "https://soundcloud.com/user-881529531/heavy-rain-pokemon-omega-ruby",
      answer: 1085,
    },
    {
      url: "https://soundcloud.com/user-881529531/sootopolis-city-pokemon-omega",
      answer: 1086,
    },
    {
      url: "https://soundcloud.com/user-881529531/cave-of-origin-pokemon-omega",
      answer: 1087,
    },
    {
      url: "https://soundcloud.com/user-881529531/primal-groudon-primal-kyogre",
      answer: 1088,
    },
    {
      url: "https://soundcloud.com/user-881529531/coexistence-pokemon-omega-ruby",
      answer: 1089,
    },
    {
      url: "https://soundcloud.com/user-881529531/soaring-dreams-pokemon-omega",
      answer: 1090,
    },
    {
      url: "https://soundcloud.com/user-881529531/soaring-mirages-pokemon-omega",
      answer: 1091,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-tuber-pokemon-omega",
      answer: 1092,
    },
    {
      url: "https://soundcloud.com/user-881529531/ever-grande-city-pokemon-omega",
      answer: 1093,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-road-pokemon-omega",
      answer: 1094,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-ace-trainer-pokemon",
      answer: 1095,
    },
    {
      url: "https://soundcloud.com/user-881529531/rivals-theme-wally-battle",
      answer: 1096,
    },
    {
      url: "https://soundcloud.com/user-881529531/encounter-elite-four-pokemon",
      answer: 1097,
    },
    {
      url: "https://soundcloud.com/user-881529531/elite-four-battle-pokemon",
      answer: 1098,
    },
    {
      url: "https://soundcloud.com/user-881529531/champion-stevens-theme-pokemon",
      answer: 1099,
    },
    {
      url: "https://soundcloud.com/lu-s-ant-nio-costa/battle-steven",
      answer: 1100,
    },
    {
      url: "https://soundcloud.com/user-881529531/victory-champion-pokemon-omega",
      answer: 1101,
    },
    {
      url: "https://soundcloud.com/user-881529531/hall-of-fame-pokemon-omega",
      answer: 1102,
    },
    {
      url: "https://soundcloud.com/user-881529531/entering-the-hall-of-fame",
      answer: 1103,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/lets-return-home-together",
      answer: 1104,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/ending-pokemon-omega-ruby",
      answer: 1105,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/the-end-pokemon-omega-ruby",
      answer: 1106,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/those-who-inherit-eternity",
      answer: 1107,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/azoth-pokemon-omega-ruby-alpha",
      answer: 1108,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/sky-pillar-pokemon-omega-ruby",
      answer: 1109,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/a-meteor-elegy-pokemon-omega",
      answer: 1110,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/rayquaza-battle-pokemon-omega",
      answer: 1111,
    },
    {
      url: "https://soundcloud.com/kiryuins/pokemon-omega-ruby-and-alpha-sapphire-ost-lorekeeper-zinnias-battle-theme",
      answer: 1112,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/per-aspera-ad-astra-pokemon",
      answer: 1113,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/deoxys-battle-pokemon-omega",
      answer: 1114,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/the-melody-of-all-beginnings",
      answer: 1115,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/contest-lobby-pokemon-omega",
      answer: 1116,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/lisias-theme-pokemon-omega",
      answer: 1117,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/presentations-at-a-pokemon",
      answer: 1118,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/appealing-at-a-pokemon-contest",
      answer: 1119,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/results-announcement-pokemon",
      answer: 1120,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/contest-victor-pokemon",
      answer: 1121,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/trick-house-pokemon-omega-ruby",
      answer: 1122,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/super-secret-base-pokemon",
      answer: 1123,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/encounter-poke-fan-pokemon",
      answer: 1124,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/encounter-street-thug-pokemon",
      answer: 1125,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/sea-mauville-pokemon-omega",
      answer: 1126,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/sealed-chamber-pokemon-omega",
      answer: 1127,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/regirock-regice-registeel",
      answer: 1128,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/pokemon-link-pokemon-omega",
      answer: 1129,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/battle-resort-pokemon-omega",
      answer: 1130,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/battle-maison-pokemon-omega",
      answer: 1131,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/chatelaine-battle-pokemon",
      answer: 1132,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/final-battle-world",
      answer: 1133,
    },
    {
      url: "https://soundcloud.com/user-633637319/title-screen-feat-masaya",
      answer: 1134,
    },
    {
      url: "https://soundcloud.com/user-633637319/an-adventure-is-beginning",
      answer: 1135,
    },
    {
      url: "https://soundcloud.com/user-633637319/alola-region-theme-feat-masaya",
      answer: 1136,
    },
    {
      url: "https://soundcloud.com/user-633637319/escape",
      answer: 1137,
    },
    {
      url: "https://soundcloud.com/user-633637319/my-home",
      answer: 1138,
    },
    {
      url: "https://soundcloud.com/user-633637319/professor-kukuis-theme",
      answer: 1139,
    },
    {
      url: "https://soundcloud.com/user-633637319/route-1-on-melemele-island",
      answer: 1140,
    },
    {
      url: "https://soundcloud.com/user-633637319/iki-town-day-feat-takahiro",
      answer: 1141,
    },
    {
      url: "https://soundcloud.com/user-633637319/iki-town-night-feat-takahiro",
      answer: 1142,
    },
    {
      url: "https://soundcloud.com/user-633637319/mahalo-trail",
      answer: 1143,
    },
    {
      url: "https://soundcloud.com/user-633637319/a-tapu-appears",
      answer: 1144,
    },
    {
      url: "https://soundcloud.com/user-633637319/lillies-theme",
      answer: 1145,
    },
    {
      url: "https://soundcloud.com/user-633637319/haus-theme",
      answer: 1146,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-hau",
      answer: 1147,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-wild-pokemon",
      answer: 1148,
    },
    {
      url: "https://soundcloud.com/user-633637319/victory-wild-pokemon",
      answer: 1149,
    },
    {
      url: "https://soundcloud.com/user-633637319/the-festival-in-iki-town",
      answer: 1150,
    },
    {
      url: "https://soundcloud.com/user-633637319/trainers-eyes-meet-trainer",
      answer: 1151,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-trainer",
      answer: 1152,
    },
    {
      url: "https://soundcloud.com/user-633637319/victory-trainer",
      answer: 1153,
    },
    {
      url: "https://soundcloud.com/user-633637319/the-pokemon-research-lab",
      answer: 1154,
    },
    {
      url: "https://soundcloud.com/user-633637319/the-pokemon-center",
      answer: 1155,
    },
    {
      url: "https://soundcloud.com/user-633637319/have-a-break-at-the-cafe",
      answer: 1156,
    },
    {
      url: "https://soundcloud.com/user-633637319/festival-plaza-day",
      answer: 1157,
    },
    {
      url: "https://soundcloud.com/user-633637319/festival-plaza-night",
      answer: 1158,
    },
    {
      url: "https://soundcloud.com/user-633637319/trade",
      answer: 1159,
    },
    {
      url: "https://soundcloud.com/user-633637319/a-mission-at-festival-plaza",
      answer: 1160,
    },
    {
      url: "https://soundcloud.com/user-633637319/festival-plaza-mission-results",
      answer: 1161,
    },
    {
      url: "https://soundcloud.com/user-633637319/trainers-school",
      answer: 1162,
    },
    {
      url: "https://soundcloud.com/user-633637319/hauoli-city-day-feat-takahiro",
      answer: 1163,
    },
    {
      url: "https://soundcloud.com/user-633637319/hauoli-city-night",
      answer: 1164,
    },
    {
      url: "https://soundcloud.com/user-633637319/hurry-along",
      answer: 1165,
    },
    {
      url: "https://soundcloud.com/user-633637319/salon",
      answer: 1166,
    },
    {
      url: "https://soundcloud.com/user-633637319/apparel-shop",
      answer: 1167,
    },
    {
      url: "https://soundcloud.com/user-633637319/malasada-shop",
      answer: 1168,
    },
    {
      url: "https://soundcloud.com/user-633637319/evolution",
      answer: 1169,
    },
    {
      url: "https://soundcloud.com/user-633637319/evolution-alola",
      answer: 1170,
    },
    {
      url: "https://soundcloud.com/user-633637319/ferry-terminal",
      answer: 1171,
    },
    {
      url: "https://soundcloud.com/user-633637319/route-2-on-melemele-island",
      answer: 1172,
    },
    {
      url: "https://soundcloud.com/user-633637319/team-skull-appears-feat",
      answer: 1173,
    },
    {
      url: "https://soundcloud.com/user-633637319/trainers-eyes-meet-team-skull",
      answer: 1174,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-team-skull-feat-kyotaro",
      answer: 1175,
    },
    {
      url: "https://soundcloud.com/user-633637319/victory-team-skull",
      answer: 1176,
    },
    {
      url: "https://soundcloud.com/user-633637319/verdant-cavern-a-trial-site",
      answer: 1177,
    },
    {
      url: "https://soundcloud.com/user-633637319/a-captains-trial-begins",
      answer: 1178,
    },
    {
      url: "https://soundcloud.com/user-633637319/a-totem-pokemon-appears",
      answer: 1179,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-totem-pokemon",
      answer: 1180,
    },
    {
      url: "https://soundcloud.com/user-633637319/victory-totem-pokemon",
      answer: 1181,
    },
    {
      url: "https://soundcloud.com/user-633637319/seaward-cave",
      answer: 1182,
    },
    {
      url: "https://soundcloud.com/user-633637319/island-kahunas-theme",
      answer: 1183,
    },
    {
      url: "https://soundcloud.com/user-633637319/battle-island-kahuna",
      answer: 1184,
    },
    {
      url: "https://soundcloud.com/user-633637319/victory-island-kahuna",
      answer: 1185,
    },
    {
      url: "https://soundcloud.com/user-633637319/ride-pokemon-land",
      answer: 1186,
    },
    {
      url: "https://soundcloud.com/user-633637319/ten-carat-hill",
      answer: 1187,
    },
    {
      url: "https://soundcloud.com/user-451976318/on-the-ship",
      answer: 1188,
    },
    {
      url: "https://soundcloud.com/user-451976318/heahea-city-day",
      answer: 1189,
    },
    {
      url: "https://soundcloud.com/user-451976318/heahea-city-night",
      answer: 1190,
    },
    {
      url: "https://soundcloud.com/user-451976318/route-4-on-akala-island",
      answer: 1191,
    },
    {
      url: "https://soundcloud.com/user-451976318/paniola-town-day",
      answer: 1192,
    },
    {
      url: "https://soundcloud.com/user-451976318/paniola-town-night",
      answer: 1193,
    },
    {
      url: "https://soundcloud.com/user-451976318/paniola-ranch",
      answer: 1194,
    },
    {
      url: "https://soundcloud.com/user-451976318/gladions-theme",
      answer: 1195,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-gladion",
      answer: 1196,
    },
    {
      url: "https://soundcloud.com/user-451976318/ride-pokemon-aquatic",
      answer: 1197,
    },
    {
      url: "https://soundcloud.com/user-451976318/royal-avenue",
      answer: 1198,
    },
    {
      url: "https://soundcloud.com/user-451976318/thrifty-megamart",
      answer: 1199,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-royal-dome-feat-hideaki",
      answer: 1200,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-battle-royal",
      answer: 1201,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-royal-results",
      answer: 1202,
    },
    {
      url: "https://soundcloud.com/user-451976318/mallows-trial",
      answer: 1203,
    },
    {
      url: "https://soundcloud.com/user-451976318/poke-pelago-day",
      answer: 1204,
    },
    {
      url: "https://soundcloud.com/user-451976318/poke-pelago-night",
      answer: 1205,
    },
    {
      url: "https://soundcloud.com/user-451976318/burnets-lab",
      answer: 1206,
    },
    {
      url: "https://soundcloud.com/user-451976318/konikoni-city-day",
      answer: 1207,
    },
    {
      url: "https://soundcloud.com/user-451976318/konikoni-city-night",
      answer: 1208,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-team-skull-admin-feat",
      answer: 1209,
    },
    {
      url: "https://soundcloud.com/user-451976318/aether-paradise",
      answer: 1210,
    },
    {
      url: "https://soundcloud.com/user-451976318/an-encounter",
      answer: 1211,
    },
    {
      url: "https://soundcloud.com/user-451976318/lusamines-theme",
      answer: 1212,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-entrance-to-another-world",
      answer: 1213,
    },
    {
      url: "https://soundcloud.com/user-451976318/ultra-beasts",
      answer: 1214,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-ultra-beast",
      answer: 1215,
    },
    {
      url: "https://soundcloud.com/user-451976318/malie-city-day",
      answer: 1216,
    },
    {
      url: "https://soundcloud.com/user-451976318/malie-city-night",
      answer: 1217,
    },
    {
      url: "https://soundcloud.com/user-451976318/route-10-on-ulaula-island",
      answer: 1218,
    },
    {
      url: "https://soundcloud.com/user-451976318/guzmas-theme-feat-kyotaro",
      answer: 1219,
    },
    {
      url: "https://soundcloud.com/articray200-2_795086342/pokemon-sun-moon-team-skull-leader-guzma-battle-music",
      answer: 1220,
    },
    {
      url: "https://soundcloud.com/user-451976318/aether-house",
      answer: 1221,
    },
    {
      url: "https://soundcloud.com/user-451976318/acerolas-trial",
      answer: 1222,
    },
    {
      url: "https://soundcloud.com/user-451976318/haina-desert",
      answer: 1223,
    },
    {
      url: "https://soundcloud.com/user-451976318/po-town",
      answer: 1224,
    },
    {
      url: "https://soundcloud.com/user-451976318/nanus-theme",
      answer: 1225,
    },
    {
      url: "https://soundcloud.com/user-451976318/infiltration",
      answer: 1226,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-secret-side-of-aether",
      answer: 1227,
    },
    {
      url: "https://soundcloud.com/user-451976318/trainers-eyes-meet-aether",
      answer: 1228,
    },
    {
      url: "https://soundcloud.com/articray200/pokemon-sun-moon-aether-foundation-battle-music",
      answer: 1229,
    },
    {
      url: "https://soundcloud.com/user-451976318/aether-paradise-labs",
      answer: 1230,
    },
    {
      url: "https://soundcloud.com/user-451976318/unsettling-atmosphere",
      answer: 1231,
    },
    {
      url: "https://soundcloud.com/user-451976318/theres-trouble",
      answer: 1232,
    },
    {
      url: "https://soundcloud.com/user-451976318/a-crisis-in-alola",
      answer: 1233,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-lusamine",
      answer: 1234,
    },
    {
      url: "https://soundcloud.com/user-451976318/lively-lillie",
      answer: 1235,
    },
    {
      url: "https://soundcloud.com/user-451976318/seafolk-village-day",
      answer: 1236,
    },
    {
      url: "https://soundcloud.com/user-451976318/seafolk-village-night",
      answer: 1237,
    },
    {
      url: "https://soundcloud.com/user-451976318/ancient-poni-path",
      answer: 1238,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-protector-of-the-island",
      answer: 1239,
    },
    {
      url: "https://soundcloud.com/user-451976318/vast-poni-canyon",
      answer: 1240,
    },
    {
      url: "https://soundcloud.com/user-451976318/to-the-altar",
      answer: 1241,
    },
    {
      url: "https://soundcloud.com/user-451976318/solgaleo-lunala-appears",
      answer: 1242,
    },
    {
      url: "https://soundcloud.com/user-451976318/ultra-space",
      answer: 1243,
    },
    {
      url: "https://soundcloud.com/user-451976318/lusamines-madness",
      answer: 1244,
    },
    {
      url: "https://soundcloud.com/user-451976318/steely-lillie",
      answer: 1245,
    },
    {
      url: "https://soundcloud.com/user-451976318/showdown-lusamine",
      answer: 1246,
    },
    {
      url: "https://soundcloud.com/user-451976318/victory-aether-foundation",
      answer: 1247,
    },
    {
      url: "https://soundcloud.com/user-451976318/a-world-falls-apart",
      answer: 1248,
    },
    {
      url: "https://soundcloud.com/user-451976318/mother-and-daughter",
      answer: 1249,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-solgaleo-lunala",
      answer: 1250,
    },
    {
      url: "https://soundcloud.com/user-451976318/lonely-lillie",
      answer: 1251,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-battle-tree",
      answer: 1252,
    },
    {
      url: "https://soundcloud.com/user-451976318/blues-theme",
      answer: 1253,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-battle-tree-boss",
      answer: 1254,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-path-to-the-league",
      answer: 1255,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-summit-of-mount-lanakila",
      answer: 1256,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-pokemon-league",
      answer: 1257,
    },
    {
      url: "https://soundcloud.com/zokathefox97/pokemon-sun-and-moon-ost-elite",
      answer: 1258,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-battle-at-the-summit",
      answer: 1259,
    },
    {
      url: "https://soundcloud.com/user-451976318/a-champion-is-born",
      answer: 1260,
    },
    {
      url: "https://soundcloud.com/user-451976318/hall-of-fame",
      answer: 1261,
    },
    {
      url: "https://soundcloud.com/user-451976318/battle-tapu",
      answer: 1262,
    },
    {
      url: "https://soundcloud.com/user-451976318/someday",
      answer: 1263,
    },
    {
      url: "https://soundcloud.com/user-451976318/welcome-back",
      answer: 1264,
    },
    {
      url: "https://soundcloud.com/user-451976318/staff-credits-feat-hideaki",
      answer: 1265,
    },
    {
      url: "https://soundcloud.com/user-451976318/the-end-feat-hideaki-kuroda",
      answer: 1266,
    },
    {
      url: "https://soundcloud.com/user-681426033/welcome-to-the-alola-region-pokemon-ultra-sun-ultra-moon",
      answer: 1267,
    },
    {
      url: "https://soundcloud.com/ddd-ddd-203678012/pokemon-ultra-sun-ultra-8",
      answer: 1268,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-trainer-pokemon-ultra-sun-ultra-moon",
      answer: 1269,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-recon-squad-hq-pokemon-ultra-sun-ultra-moon",
      answer: 1270,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-malasada-pokemon-ultra-sun-ultra-moon",
      answer: 1271,
    },
    {
      url: "https://soundcloud.com/user-681426033/poke-ride-mantine-pokemon-ultra-sun-ultra-moon",
      answer: 1272,
    },
    {
      url: "https://soundcloud.com/user-681426033/alola-photoclub-pokemon-ultra-sun-ultra-moon",
      answer: 1273,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-ultra-recon-squad-pokemon-ultra-sun-ultra-moon",
      answer: 1274,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-agency-pokemon-ultra-sun-ultra-moon",
      answer: 1275,
    },
    {
      url: "https://soundcloud.com/user-681426033/handsome-pokemon-ultra-sun-ultra-moon",
      answer: 1276,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-ultra-necrozma",
      answer: 1277,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-wormhole-pokemon-ultra-sun-ultra-moon",
      answer: 1278,
    },
    {
      url: "https://soundcloud.com/user-681426033/event-4-pokemon-ultra-sun-ultra-moon",
      answer: 1279,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-megalopolis-pokemon-ultra-sun-ultra-moon",
      answer: 1280,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-ultra-necrozma-pokemon-ultra-sun-ultra-moon",
      answer: 1281,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-8-pokemon-ultra-sun-ultra-moon",
      answer: 1282,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-6-pokemon-ultra-sun-ultra-moon",
      answer: 1283,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-1-pokemon-ultra-sun-ultra-moon",
      answer: 1284,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-2-pokemon-ultra-sun-ultra-moon",
      answer: 1285,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-3-pokemon-ultra-sun-ultra-moon",
      answer: 1286,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-4-pokemon-ultra-sun-ultra-moon",
      answer: 1287,
    },
    {
      url: "https://soundcloud.com/user-681426033/ultra-space-7-pokemon-ultra-sun-ultra-moon",
      answer: 1288,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-champion-pokemon-ultra-sun-ultra-moon",
      answer: 1289,
    },
    {
      url: "https://soundcloud.com/user-681426033/kantonian-gym-pokemon-ultra-sun-ultra-moon",
      answer: 1290,
    },
    {
      url: "https://soundcloud.com/user-681426033/team-rainbow-rocket-hq-pokemon-ultra-sun-ultra-moon",
      answer: 1291,
    },
    {
      url: "https://soundcloud.com/user-681426033/encounter-team-rainbow-rocket-pokemon-ultra-sun-ultra-moon",
      answer: 1292,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-giovanni-pokemon-ultra-sun-ultra-moon",
      answer: 1293,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-archiemaxie",
      answer: 1294,
    },
    {
      url: "https://soundcloud.com/user-681426033/bgm-mj-vs04dspadpcm",
      answer: 1295,
    },
    {
      url: "https://soundcloud.com/user-681426033/bgm-mj-vs05dspadpcm",
      answer: 1296,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-lysandre-pokemon-ultra-sun-ultra-moon",
      answer: 1297,
    },
    {
      url: "https://soundcloud.com/ddd-ddd-203678012/pokemon-ultra-sun-ultra-moon-2",
      answer: 1298,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-giovanni-pokemon-ultra-sun-ultra-moon-1",
      answer: 1299,
    },
    {
      url: "https://soundcloud.com/user-681426033/the-end-pokemon-ultra-sun-ultra-moon",
      answer: 1300,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/01-into-the-game-lets-go",
      answer: 1301,
    },
    {
      url: "https://soundcloud.com/user-681426033/surf-version-2-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1302,
    },
    {
      url: "https://soundcloud.com/user-681426033/title-screen-pokemon-lets-go-pikachu-eevee-music",
      answer: 1303,
    },
    {
      url: "https://soundcloud.com/user-681426033/pallet-town-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1304,
    },
    {
      url: "https://soundcloud.com/user-681426033/professor-oak-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1305,
    },
    {
      url: "https://soundcloud.com/user-681426033/come-along-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1306,
    },
    {
      url: "https://soundcloud.com/user-681426033/professor-oaks-laboratory-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1307,
    },
    {
      url: "https://soundcloud.com/user-681426033/route-1-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1308,
    },
    {
      url: "https://soundcloud.com/user-681426033/pokemon-center-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1309,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-boy-pokemon-lets-go-pikachueevee",
      answer: 1310,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-trainer-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1311,
    },
    {
      url: "https://soundcloud.com/user-681426033/victory-trainer-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1312,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/viridian-forest-pokemon-lets",
      answer: 1313,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-wild-pokemon-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1314,
    },
    {
      url: "https://soundcloud.com/user-681426033/victory-wild-pokemon-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1315,
    },
    {
      url: "https://soundcloud.com/user-681426033/a-trainer-appears-girl-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1316,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/pewter-city-theme",
      answer: 1317,
    },
    {
      url: "https://soundcloud.com/user-681426033/gym-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1318,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-gym-leader-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1319,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/victory-gym-leader-pokemon-1",
      answer: 1320,
    },
    {
      url: "https://soundcloud.com/user-681426033/rivals-theme-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1321,
    },
    {
      url: "https://soundcloud.com/user-681426033/route-3-4-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1322,
    },
    {
      url: "https://soundcloud.com/user-681426033/mt-moon-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1323,
    },
    {
      url: "https://soundcloud.com/user-681426033/a-trainer-appears-team-rocket-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1324,
    },
    {
      url: "https://soundcloud.com/user-681426033/jessie-james-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1325,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/evolution-pokemon-lets-go",
      answer: 1326,
    },
    {
      url: "https://soundcloud.com/user-681426033/cerulean-city-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1327,
    },
    {
      url: "https://soundcloud.com/user-681426033/pokemon-lets-go-pikachu-eevee-welcome-to-the-world-of-pokemon-intro-theme-ost",
      answer: 1328,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/vermilion-city-theme-pokemon-lets-go",
      answer: 1329,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-s-s-anne-pokemon-lets-go",
      answer: 1330,
    },
    {
      url: "https://soundcloud.com/user-681426033/route-11-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1331,
    },
    {
      url: "https://soundcloud.com/user-681426033/lavender-town-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1332,
    },
    {
      url: "https://soundcloud.com/user-681426033/pokemon-tower-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1333,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/celadon-city-theme-pokemon-lets-go-1",
      answer: 1334,
    },
    {
      url: "https://soundcloud.com/user-681426033/team-rocket-hideout-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1335,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-legendary-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1336,
    },
    {
      url: "https://soundcloud.com/user-681426033/bicycle-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1337,
    },
    {
      url: "https://soundcloud.com/user-104839658/go-park-pokemon-lets-go-ost",
      answer: 1338,
    },
    {
      url: "https://soundcloud.com/user-104839658/catch-go-park-pokemon-lets-go",
      answer: 1339,
    },
    {
      url: "https://soundcloud.com/user-681426033/silph-co-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1340,
    },
    {
      url: "https://soundcloud.com/user-681426033/surf-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1341,
    },
    {
      url: "https://soundcloud.com/vgm-vaccine/cinnabar-island-theme-pokemon-lets-go",
      answer: 1342,
    },
    {
      url: "https://soundcloud.com/vgmdr/pokemon-mansion",
      answer: 1343,
    },
    {
      url: "https://soundcloud.com/user-681426033/victory-road-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1344,
    },
    {
      url: "https://soundcloud.com/user-681426033/champion-battle-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1345,
    },
    {
      url: "https://soundcloud.com/user-681426033/hall-of-fame-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1346,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/congratulations-pokemon-lets",
      answer: 1347,
    },
    {
      url: "https://soundcloud.com/user-681426033/ending-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1348,
    },
    {
      url: "https://soundcloud.com/vgmdr/were-back-pokemon",
      answer: 1349,
    },
    {
      url: "https://soundcloud.com/user-681426033/pokeball-plus-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1350,
    },
    {
      url: "https://soundcloud.com/user-623853790/mystery-gift-theme-pokemon-lets-go-pikachu-eevee",
      answer: 1351,
    },
    {
      url: "https://soundcloud.com/user-681426033/battle-master-trainer-pokemon-lets-go-pikachu-lets-go-eevee",
      answer: 1352,
    },
    {
      url: "https://soundcloud.com/user-939541039/title-screen-pokemon-sword-and",
      answer: 1353,
    },
    {
      url: "https://soundcloud.com/user-939541039/welcome-to-the-world-of",
      answer: 1354,
    },
    {
      url: "https://soundcloud.com/user-939541039/postwick-pokemon-sword-and",
      answer: 1355,
    },
    {
      url: "https://soundcloud.com/user-939541039/hops-theme-pokemon-sword-and",
      answer: 1356,
    },
    {
      url: "https://soundcloud.com/user-939541039/route-1-pokemon-sword-and",
      answer: 1357,
    },
    {
      url: "https://soundcloud.com/blurry-fandub/pokemon-sword-and-shield-wedgehurst-town-theme",
      answer: 1358,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/lets-have-a-champion-time-sword-and-shield",
      answer: 1359,
    },
    {
      url: "https://soundcloud.com/blurry-fandub/pokemon-sword-shield-hop-battle-theme",
      answer: 1360,
    },
    {
      url: "https://soundcloud.com/l9cas/slumbering-weald-pokemon-sword-and-shield-ost",
      answer: 1361,
    },
    {
      url: "https://soundcloud.com/harmynya/pokemon-swordshield-zacianzamazenta-battle-theme-mysterious-being",
      answer: 1362,
    },
    {
      url: "https://soundcloud.com/user-939541039/professor-magnolias-laboratory",
      answer: 1363,
    },
    {
      url: "https://soundcloud.com/the-crafty-army/sonia-s-theme-pokemon-sword-pokemon-shield-original-ost",
      answer: 1364,
    },
    {
      url: "https://soundcloud.com/user-939541039/pokemon-center-pokemon-sword",
      answer: 1365,
    },
    {
      url: "https://soundcloud.com/piwa31/pokemon-sword-and-shield-wild-battle-official",
      answer: 1366,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-wild-pokemon-pokemon",
      answer: 1367,
    },
    {
      url: "https://soundcloud.com/user-939541039/follow-me-pokemon-sword-and",
      answer: 1368,
    },
    {
      url: "https://soundcloud.com/user-939541039/railway-station-pokemon-sword",
      answer: 1369,
    },
    {
      url: "https://soundcloud.com/user-939541039/wild-area-version-1-pokemon",
      answer: 1370,
    },
    {
      url: "https://soundcloud.com/user-11839804/max-raid-battle-pokemon-swordshield-ost",
      answer: 1371,
    },
    {
      url: "https://soundcloud.com/user-573053694/battle-max-raid-capture-chance",
      answer: 1372,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/1-25-lets-make-curry-pokemon",
      answer: 1373,
    },
    {
      url: "https://soundcloud.com/user-939541039/motostoke-pokemon-sword-and",
      answer: 1374,
    },
    {
      url: "https://soundcloud.com/unsupportive/boutique-shop-music-pokemon-sword-and-shield-ost",
      answer: 1375,
    },
    {
      url: "https://soundcloud.com/user-939541039/gym-lobby-pokemon-sword-and",
      answer: 1376,
    },
    {
      url: "https://soundcloud.com/user-876382760/budew-drop-inn-poke-mon-sword",
      answer: 1377,
    },
    {
      url: "https://soundcloud.com/user-939541039/once-upon-a-time-pokemon-sword",
      answer: 1378,
    },
    {
      url: "https://soundcloud.com/user-939541039/team-yell-appears-pokemon",
      answer: 1379,
    },
    {
      url: "https://soundcloud.com/user-939541039/marnies-theme-pokemon-sword",
      answer: 1380,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-gym-challenge-pokemon",
      answer: 1381,
    },
    {
      url: "https://soundcloud.com/joremaster/chairman-rose-encounter-theme-pokemon-sword-shield",
      answer: 1382,
    },
    {
      url: "https://soundcloud.com/user-939541039/route-3-pokemon-sword-and",
      answer: 1383,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-youngster",
      answer: 1384,
    },
    {
      url: "https://soundcloud.com/the-crafty-army/battle-trainer-pokemon-sword-pokemon-shield-ost",
      answer: 1385,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-trainer-pokemon-sword",
      answer: 1386,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-lass",
      answer: 1387,
    },
    {
      url: "https://soundcloud.com/user-939541039/trade-pokemon-sword-and-shield",
      answer: 1388,
    },
    {
      url: "https://soundcloud.com/user-270209865/pokemon-sword-and-shield-evolution-theme",
      answer: 1389,
    },
    {
      url: "https://soundcloud.com/user-939541039/galar-mines-pokemon-sword-and",
      answer: 1390,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-worker",
      answer: 1391,
    },
    {
      url: "https://soundcloud.com/joremaster/bede-encounter-theme-pokemon-sword-shield",
      answer: 1392,
    },
    {
      url: "https://soundcloud.com/blurry-fandub/pokemon-sword-shield-bede-battle-theme",
      answer: 1393,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-farmer",
      answer: 1394,
    },
    {
      url: "https://soundcloud.com/goldmatt/pokemon-sword-and-shield-turffield-ost",
      answer: 1395,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/2-15-gym-mission-pokemon-sword",
      answer: 1396,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-gym-trainer",
      answer: 1397,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-gym-trainer-pokemon",
      answer: 1398,
    },
    {
      url: "https://soundcloud.com/piwa31/pokemon-sword-and-shield-battle-gym-leader",
      answer: 1399,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-gym-leader-pokemon",
      answer: 1400,
    },
    {
      url: "https://soundcloud.com/user-939541039/hulbury-pokemon-sword-and",
      answer: 1401,
    },
    {
      url: "https://soundcloud.com/user-939541039/pokejobs-pokemon-sword-and",
      answer: 1402,
    },
    {
      url: "https://soundcloud.com/piwa31/pokemon-sword-and-shield-marnie",
      answer: 1403,
    },
    {
      url: "https://soundcloud.com/user-939541039/wild-area-version-2-pokemon",
      answer: 1404,
    },
    {
      url: "https://soundcloud.com/user-939541039/rotom-rally-pokemon-sword-and",
      answer: 1405,
    },
    {
      url: "https://soundcloud.com/user-939541039/hammerlocke-pokemon-sword-and",
      answer: 1406,
    },
    {
      url: "https://soundcloud.com/user-939541039/salon-pokemon-sword-and-shield",
      answer: 1407,
    },
    {
      url: "https://soundcloud.com/user-939541039/route-6-pokemon-sword-and",
      answer: 1408,
    },
    {
      url: "https://soundcloud.com/user-939541039/trainers-eyes-meet-weird",
      answer: 1409,
    },
    {
      url: "https://soundcloud.com/user-939541039/stow-on-side-pokemon-sword-and",
      answer: 1410,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/2-33-crumbling-ruins-pokemon",
      answer: 1411,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-secret-of-stow-on-sides",
      answer: 1412,
    },
    {
      url: "https://soundcloud.com/user-939541039/glimwood-tangle-pokemon-sword",
      answer: 1413,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/ballonea-town-pokemon-sword",
      answer: 1414,
    },
    {
      url: "https://soundcloud.com/savvychappie/circhester-poke-mon-sword-and",
      answer: 1415,
    },
    {
      url: "https://soundcloud.com/user-939541039/spikemuth-pokemon-sword-and",
      answer: 1416,
    },
    {
      url: "https://soundcloud.com/blurry-fandub/pokemon-sword-shield-team-yell-battle-theme",
      answer: 1417,
    },
    {
      url: "https://soundcloud.com/lordofthehoodies/pokemon-sword-shield-piers-battle-theme",
      answer: 1418,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-04-route-10-pokemon-sword",
      answer: 1419,
    },
    {
      url: "https://soundcloud.com/user-939541039/wyndon-pokemon-sword-and",
      answer: 1420,
    },
    {
      url: "https://soundcloud.com/user-939541039/tournament-lobby-pokemon-sword",
      answer: 1421,
    },
    // {
    //  url: "https://soundcloud.com/user-939541039/tournament-lobby-locker-room",
    //  answer: -6,
    // },
    {
      url: "https://soundcloud.com/gabriel-lavall-batista/pokemon-sword-shield-marnie",
      answer: 1422,
    },
    {
      url: "https://soundcloud.com/clockwork-259735541/hop-final-battle-pokemon-swordshield",
      answer: 1423,
    },
    {
      url: "https://soundcloud.com/user-939541039/storming-rose-tower-pokemon",
      answer: 1424,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-10-arrival-at-the-top",
      answer: 1425,
    },
    {
      url: "https://soundcloud.com/user-705219356/pokmon-sword-and-shield-oleana-battle-theme",
      answer: 1426,
    },
    {
      url: "https://soundcloud.com/user-939541039/tournament-opening-ceremony",
      answer: 1427,
    },
    {
      url: "https://soundcloud.com/jacob-twee/pokemon-sword-shield-league-tournament-theme",
      answer: 1428,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-gym-leader-rematch",
      answer: 1429,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/chairman-roses-plan-pokemon",
      answer: 1430,
    },
    {
      url: "https://soundcloud.com/user-939541039/slumbering-weald-shrine",
      answer: 1431,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-darkest-day-pokemon-sword",
      answer: 1432,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/energy-plant-pokemon-sword",
      answer: 1433,
    },
    {
      url: "https://soundcloud.com/jacob-twee/pokemon-sword-shield-chairman-rose-battle-theme",
      answer: 1434,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-19-leon-and-eternatus",
      answer: 1435,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-20-battle-eternatus-pokemon",
      answer: 1436,
    },
    {
      url: "https://soundcloud.com/harmynya/pokemon-sword-shield-eternatus-battle-theme-version-1",
      answer: 1437,
    },
    {
      url: "https://soundcloud.com/goldmatt/pokemon-sword-shield-eternatus-battle-theme-version-3",
      answer: 1438,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-23-caught-an-eternatus",
      answer: 1439,
    },
    {
      url: "https://soundcloud.com/user-705219356/pokemon-sword-and-shield-champion-leon-battle-theme",
      answer: 1440,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-champion-pokemon-sword",
      answer: 1441,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-galar-regions-new-champion",
      answer: 1442,
    },
    {
      url: "https://soundcloud.com/user-270209865/pokemon-sword-and-shield-battle-tower-theme-1",
      answer: 1443,
    },
    {
      url: "https://soundcloud.com/piwa31/pokemon-sword-and-shield-theme-by-toby-fox-full",
      answer: 1444,
    },
    {
      url: "https://soundcloud.com/9506715635/pokemon-sword-shield-legendary-battle-theme",
      answer: 1445,
    },
    {
      url: "https://soundcloud.com/user-939541039/staff-roll-pokemon-sword-and",
      answer: 1446,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-isle-of-armor-pokemon",
      answer: 1447,
    },
    // { // = Battle! (Zacian/Zamazenta) (First Encounter)
    //  url: "https://soundcloud.com/user-121188349/zacian-zamazenta-encounter-fog",
    //  answer: -7
    // },
    {
      url: "https://soundcloud.com/municipalsiren4-l/klaras-theme-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1448,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-klara-pokemon-sword-and-shield-ost-gamerip",
      answer: 1449,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/averys-theme-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1450,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-avery-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1451,
    },
    {
      url: "https://soundcloud.com/user-939541039/master-dojo-pokemon-sword-and",
      answer: 1452,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/mustards-theme-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1453,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-mustard-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1454,
    },
    {
      url: "https://soundcloud.com/user-939541039/kubfus-introduction-pokemon",
      answer: 1455,
    },
    {
      url: "https://soundcloud.com/user-939541039/tower-of-waters-pokemon-sword",
      answer: 1456,
    },
    {
      url: "https://soundcloud.com/user-939541039/tower-of-darkness-pokemon",
      answer: 1457,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/final-battle-mustard-pokemon-sword-and-shield-ost-isle-of-armor",
      answer: 1458,
    },
    {
      url: "https://soundcloud.com/user-939541039/victory-mustard-pokemon-sword",
      answer: 1459,
    },
    {
      url: "https://soundcloud.com/user-939541039/kubfus-training-complete",
      answer: 1460,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-crown-tundra-pokemon-sword",
      answer: 1461,
    },
    {
      url: "https://soundcloud.com/user-939541039/peonys-theme-pokemon-sword-and",
      answer: 1462,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-peony-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1463,
    },
    {
      url: "https://soundcloud.com/user-939541039/max-lair-pokemon-sword-and",
      answer: 1464,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/dynamax-adventure-pokemon",
      answer: 1465,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-legendary-raid-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1466,
    },
    {
      url: "https://soundcloud.com/user-939541039/freezington-pokemon-sword-and",
      answer: 1467,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/calyrexs-theme-pokemon-sword",
      answer: 1468,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-calyrex-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1469,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-glastrierspectrier-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1470,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/crown-shrine-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1471,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-mounted-calyrex-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1472,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-regi-trio-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1473,
    },
    {
      url: "https://soundcloud.com/user-939541039/the-legendary-birds-appear",
      answer: 1474,
    },
    {
      url: "https://soundcloud.com/municipalsiren4-l/battle-galarian-legendary-birds-pokemon-sword-and-shield-ost-the-crown-tundra",
      answer: 1475,
    },
    {
      url: "https://soundcloud.com/rse-548363113/opening-movie-pokemon-brilliant-diamondshining-pearl",
      answer: 1476,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/introduction-pokemon-brilliant",
      answer: 1477,
    },
    {
      url: "https://soundcloud.com/docvgm/search-for-the-red-gyarados-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1478,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/twinleaf-town-day",
      answer: 1479,
    },
    {
      url: "https://soundcloud.com/docvgm/105-rival",
      answer: 1480,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/route-201-day",
      answer: 1481,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/verity-lake",
      answer: 1482,
    },
    {
      url: "https://soundcloud.com/docvgm/108-a-surprise-at-the-lake",
      answer: 1483,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/battle-wild-pokemon",
      answer: 1484,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/victory-wild-pokemon",
      answer: 1485,
    },
    {
      url: "https://soundcloud.com/docvgm/111-dawn",
      answer: 1486,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/sandgem-town-day",
      answer: 1487,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/the-pokemon-lab-pokemon",
      answer: 1488,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/hurry-along-pokemon-brilliant",
      answer: 1489,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/pokemon-center-day",
      answer: 1490,
    },
    {
      url: "https://soundcloud.com/docvgm/trainers-eyes-meet-youngster",
      answer: 1491,
    },
    {
      url: "https://soundcloud.com/docvgm/trainers-eyes-meet-lass-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1492,
    },
    {
      url: "https://soundcloud.com/youraveragekirbyfan-lol/battle-trainer-pokemon",
      answer: 1493,
    },
    {
      url: "https://soundcloud.com/curevgm/121-victory-trainer-battle",
      answer: 1494,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/jubilife-city-day",
      answer: 1495,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/poke-mart",
      answer: 1496,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/route-203-day",
      answer: 1497,
    },
    {
      url: "https://soundcloud.com/champion_leon2022/official-ost-battle-vs-rival-pokemon-brilliant-diamond-shining-pearl",
      answer: 1498,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/oreburgh-gate-pokemon",
      answer: 1499,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/oreburgh-city-day-pokemon",
      answer: 1500,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/oreburgh-mine",
      answer: 1501,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/131-pokemon-gym",
      answer: 1502,
    },
    {
      url: "https://soundcloud.com/user-312899488/battle-vs-gym-leader-pokemon",
      answer: 1503,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/victory-gym-leader-pokemon",
      answer: 1504,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-twins",
      answer: 1505,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/floaroma-town-day",
      answer: 1506,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/route-205-day",
      answer: 1507,
    },
    {
      url: "https://soundcloud.com/docvgm/140-team-galactic-appears",
      answer: 1508,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/battle-team-galactic-pokemon-brilliant-diamond-shining-pearl",
      answer: 1509,
    },
    {
      url: "https://soundcloud.com/blurry-fandub/eterna-forest",
      answer: 1510,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/eterna-city-day-pokemon",
      answer: 1511,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/team-galactic-eterna-building-pokemon-brilliant-diamond-shining-pearl",
      answer: 1512,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/battle-team-galactic-commander-pokemon-brilliant-diamond-shining-pearl",
      answer: 1513,
    },
    {
      url: "https://soundcloud.com/curevgm/147-victory-team-galactic",
      answer: 1514,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/evolution-pokemon-brilliant",
      answer: 1515,
    },
    {
      url: "https://soundcloud.com/curevgm/bicycle",
      answer: 1516,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-cyclist",
      answer: 1517,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/route-206-day-pokemon",
      answer: 1518,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/hearthome-city-day-pokemon",
      answer: 1519,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/route-209-day-pokemon",
      answer: 1520,
    },
    {
      url: "https://soundcloud.com/docvgm/trainers-eyes-meet-hiker",
      answer: 1521,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/solaceon-town-day",
      answer: 1522,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/route-210",
      answer: 1523,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/veilstone-city-day-pokemon",
      answer: 1524,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/valor-lakefront-day-pokemon",
      answer: 1525,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/canalave-city",
      answer: 1526,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/route-216-day-pokemon",
      answer: 1527,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/snowpoint-city-day",
      answer: 1528,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/team-galactic-hq-pokemon",
      answer: 1529,
    },
    {
      url: "https://soundcloud.com/docvgm/battle-team-galactic-boss",
      answer: 1530,
    },
    {
      url: "https://soundcloud.com/curevgm/166-deep-within-team-galactic-hq",
      answer: 1531,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/mt-coronet-pokemon-brilliant",
      answer: 1532,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/spear-pillar-pokemon-brilliant",
      answer: 1533,
    },
    {
      url: "https://soundcloud.com/docvgm/the-legendary-pokemon-appears",
      answer: 1534,
    },
    {
      url: "https://soundcloud.com/docvgm/catastrophe-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1535,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/battle-dialga-palkia-pokemon-brilliant-diamond-shining-pearl",
      answer: 1536,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/sunyshore-city-day-pokemon",
      answer: 1537,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/173-victory-road",
      answer: 1538,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-ace-trainer-pokemon-brilliant-diamond-shining-pearl",
      answer: 1539,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/pokemon-league-day-pokemon",
      answer: 1540,
    },
    {
      url: "https://soundcloud.com/docvgm/fight-area-day-pokemon-brilliant-diamond-shining-pearl",
      answer: 1541,
    },
    {
      url: "https://soundcloud.com/tropicalfrosty/route-225-day",
      answer: 1542,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/route-228-day-pokemon",
      answer: 1543,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/201-twinleaf-town-night",
      answer: 1544,
    },
    {
      url: "https://soundcloud.com/docvgm/route-201-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1545,
    },
    {
      url: "https://soundcloud.com/docvgm/pokemon-center-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1546,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/sandgem-town-night-pokemon",
      answer: 1547,
    },
    {
      url: "https://soundcloud.com/docvgm/205-lucas",
      answer: 1548,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/jubilife-city-night-pokemon",
      answer: 1549,
    },
    {
      url: "https://soundcloud.com/curevgm/tv-station-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1550,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/gts-pokemon-brilliant-diamond",
      answer: 1551,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/surf-theme-pokemon-brilliant",
      answer: 1552,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/canalave-city-night-pokemon",
      answer: 1553,
    },
    {
      url: "https://soundcloud.com/docvgm/route-203-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1554,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-black-belt",
      answer: 1555,
    },
    {
      url: "https://soundcloud.com/docvgm/oreburgh-city-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1556,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/route-205-night-pokemon",
      answer: 1557,
    },
    {
      url: "https://soundcloud.com/curevgm/trainers-eyes-meet-sailor",
      answer: 1558,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/eterna-city-night-pokemon",
      answer: 1559,
    },
    {
      url: "https://soundcloud.com/docvgm/the-underground-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1560,
    },
    {
      url: "https://soundcloud.com/pandemicvgm/trainers-eyes-meet-aroma-lady",
      answer: 1561,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/floaroma-town-night-pokemon",
      answer: 1562,
    },
    {
      url: "https://soundcloud.com/docvgm/221-old-chateau",
      answer: 1563,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/222-solaceon-town-night",
      answer: 1564,
    },
    {
      url: "https://soundcloud.com/docvgm/great-marsh-pokemon-brilliant-diamond-shining-pearl",
      answer: 1565,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/224-route-206-night",
      answer: 1566,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-collector",
      answer: 1567,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/226-veilstone-city-night",
      answer: 1568,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/227-game-corner",
      answer: 1569,
    },
    {
      url: "https://soundcloud.com/mimikyugacha-877/pokemon-bdsp-encounter-gambler",
      answer: 1570,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/route-209-night-pokemon",
      answer: 1571,
    },
    {
      url: "https://soundcloud.com/docvgm/snowpoint-city-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1572,
    },
    {
      url: "https://soundcloud.com/pandemicvgm/route-216-night",
      answer: 1573,
    },
    {
      url: "https://soundcloud.com/docvgm/232-lake-caverns",
      answer: 1574,
    },
    {
      url: "https://soundcloud.com/jacob-morales-32/pokemon-brilliant-diamond-1",
      answer: 1575,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/route-210-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1576,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/a-poke-radar-hit-pokemon",
      answer: 1577,
    },
    {
      url: "https://soundcloud.com/docvgm/sunyshore-city-night",
      answer: 1578,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/trainers-eyes-meet-artist",
      answer: 1579,
    },
    {
      url: "https://soundcloud.com/docvgm/amity-square-pokemon",
      answer: 1580,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/hearthome-city-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1581,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/contest-hall-pokemon-brilliant",
      answer: 1582,
    },
    {
      url: "https://soundcloud.com/docvgm/poffins-pokemon-brilliant-diamond-shining-pearl",
      answer: 1583,
    },
    {
      url: "https://soundcloud.com/curevgm/dance-easy",
      answer: 1584,
    },
    {
      url: "https://soundcloud.com/curevgm/dance-difficult-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1585,
    },
    {
      url: "https://soundcloud.com/curevgm/247-contest-1",
      answer: 1586,
    },
    {
      url: "https://soundcloud.com/curevgm/contest-2-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1587,
    },
    {
      url: "https://soundcloud.com/curevgm/contest-3-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1588,
    },
    {
      url: "https://soundcloud.com/curevgm/contest-4-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1589,
    },
    {
      url: "https://soundcloud.com/curevgm/contest-5-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1590,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/contest-results-announcement",
      answer: 1591,
    },
    {
      url: "https://soundcloud.com/curevgm/253-contest-winner",
      answer: 1592,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/route-228-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1593,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/valor-lakefront-night-pokemon",
      answer: 1594,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/fight-area-night-pokemon",
      answer: 1595,
    },
    {
      url: "https://soundcloud.com/pandemicvgm/257-battle-tower",
      answer: 1596,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/route-225-night-pokemon-brilliant-diamond-shining-pearl",
      answer: 1597,
    },
    {
      url: "https://soundcloud.com/docvgm/stark-mountain-pokemon-brilliant-diamond-shining-pearl",
      answer: 1598,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/battle-legendary-pokemon",
      answer: 1599,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/mystery-gift-pokemon-brilliant",
      answer: 1600,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/pokemon-league-night-pokemon",
      answer: 1601,
    },
    {
      url: "https://soundcloud.com/curevgm/decisive-battle-pokemon-league-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1602,
    },
    {
      url: "https://soundcloud.com/curevgm/the-elite-four-appear-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1603,
    },
    {
      url: "https://soundcloud.com/curevgm/pokemon-brilliant-diamond-shining-pearl-elite-four-battle-music-hq",
      answer: 1604,
    },
    {
      url: "https://soundcloud.com/curevgm/victory-elite-four-pokemon-brilliant-diamond-shining-pearl-super-music-collection",
      answer: 1605,
    },
    {
      url: "https://soundcloud.com/hatsune_ranma/champion-cynthia-theme-pokemon-brilliant-diamondshining-pearl",
      answer: 1606,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/battle-vs-champion-cynthia",
      answer: 1607,
    },
    {
      url: "https://soundcloud.com/curevgm/269-victory-champion",
      answer: 1608,
    },
    {
      url: "https://soundcloud.com/mad-doctor-vgm/270-hall-of-fame",
      answer: 1609,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/congratulations-on-entering",
      answer: 1610,
    },
    {
      url: "https://soundcloud.com/pandemicvgm/ending-theme-pokemon-brilliant-diamond-shining-pearl",
      answer: 1611,
    },
    {
      url: "https://soundcloud.com/vinicius-machado-961615358/battle-vs-giratina-pokemon",
      answer: 1612,
    },
    {
      url: "https://soundcloud.com/rse-548363113/hall-of-origin-brilliant-diamond-shining-pearl",
      answer: 1613,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/battle-arceus-pokemon",
      answer: 1614,
    },
    //{
    //  url: "https://soundcloud.com/bw2-187523711/ramanas-park-pokemon-brilliant",
    //  answer: "Ramanas Park? - Brilliant Diamond/Shining Pearl",
    //},
    {
      url: "https://soundcloud.com/dylan-nevin-161049063/pokemon-brilliant-diamond-shining-pearl-minor-legendary-battle-music",
      answer: 1615,
    },
    {
      url: "https://soundcloud.com/bw2-187523711/battle-articuno-zapdos-moltres",
      answer: 1616,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/1-02-transition-pokemon",
      answer: 1617,
    },
    {
      url: "https://soundcloud.com/tharun-s-89604068/pokemon-legends-arceus-professor-laventon-theme",
      answer: 1618,
    },
    {
      url: "https://soundcloud.com/jhong-xina/chat-with-the-professor-pokemon-legends-arceus",
      answer: 1619,
    },
    {
      url: "https://soundcloud.com/jhong-xina/jubilife-village-outdoor-pokemon-legends-arceus",
      answer: 1620,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/galaxy-expedition-team-pokemon-legends-arceus",
      answer: 1621,
    },
    {
      url: "https://soundcloud.com/romualdus-jevon/battle-pokemon-wielder-pokemon-legends-arceus",
      answer: 1622,
    },
    {
      url: "https://soundcloud.com/iratina/obsidian-fieldlands-2-poke-mon",
      answer: 1623,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/spotted-ver-1-pokemon-legends",
      answer: 1624,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/caution-version-2-pokemon-legends-arceus",
      answer: 1625,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/spotted-ver-3-pokemon-legends",
      answer: 1626,
    },
    {
      url: "https://soundcloud.com/trevor-walton-136612129/pokemon-legends-arceus-wild",
      answer: 1627,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/survey-results-day-pokemon",
      answer: 1628,
    },
    {
      url: "https://soundcloud.com/iratina/obsidian-fieldlands-poke-mon",
      answer: 1629,
    },
    {
      url: "https://soundcloud.com/noble-13551787/pokemon-legends-arceus-caution",
      answer: 1630,
    },
    {
      url: "https://soundcloud.com/romualdus-jevon/alphawildpokemon",
      answer: 1631,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/suspense-pokemon-legends-arceus",
      answer: 1632,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/trouble-miss-fortunes-pokemon",
      answer: 1633,
    },
    {
      url: "https://soundcloud.com/iratina/the-heartwood-poke-mon-legends",
      answer: 1634,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/evolution-pokemon-legends",
      answer: 1635,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/the-noble-pokemons-domain",
      answer: 1636,
    },
    {
      url: "https://soundcloud.com/piwa31/pokemon-legends-arceus-noble-battle-theme-phase-1-and-phase-2",
      answer: 1637,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/aftermath-pokemon-legends-arceus",
      answer: 1638,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/minigame-pokemon-legends-arceus-gamerip",
      answer: 1639,
    },
    {
      url: "https://soundcloud.com/iratina/crimson-mirelands-poke-mon",
      answer: 1640,
    },
    {
      url: "https://soundcloud.com/iratina/space-time-distortion-poke-mon",
      answer: 1641,
    },
    {
      url: "https://soundcloud.com/iratina/diamond-pearl-clan-settlement",
      answer: 1642,
    },
    {
      url: "https://soundcloud.com/iratina/crimson-mirelands-2-poke-mon",
      answer: 1643,
    },
    {
      url: "https://soundcloud.com/iratina/cobalt-coastlands-poke-mon",
      answer: 1644,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/2-08-the-sound-of-the-flute",
      answer: 1645,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/iridas-theme-pokemon-legends",
      answer: 1646,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/field-night-pokemon-legends-arceus",
      answer: 1647,
    },
    {
      url: "https://soundcloud.com/rodrigo-luna-276709614/survey-results-night-pokemon",
      answer: 1648,
    },
    {
      url: "https://soundcloud.com/iratina/cobalt-coastland-2-poke-mon",
      answer: 1649,
    },
    {
      url: "https://soundcloud.com/iratina/firespit-island-poke-mon",
      answer: 1650,
    },
    {
      url: "https://soundcloud.com/the-togedemaster/pok-mon-legends-arceus-palina",
      answer: 1651,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/2-15-strength-pokemon-legends",
      answer: 1652,
    },
    {
      url: "https://soundcloud.com/iratina/coronet-highlands-poke-mon",
      answer: 1653,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/wayward-cave-pokemon-legends-arceus",
      answer: 1654,
    },
    {
      url: "https://soundcloud.com/mimikyugacha-877/pokemon-legends-arceus-ost",
      answer: 1655,
    },
    {
      url: "https://soundcloud.com/iratina/alabaster-icelands-poke-mon",
      answer: 1656,
    },
    {
      url: "https://soundcloud.com/iratina/midnight-poke-mon-legends",
      answer: 1657,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/a-new-morning-pokemon-legends",
      answer: 1658,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/alabaster-icelands-2-pokemon-legends-arceus",
      answer: 1659,
    },
    {
      url: "https://soundcloud.com/iratina/snowpoint-temple-poke-mon",
      answer: 1660,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/suspicion-pokemon-legends-arceus",
      answer: 1661,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/expulsion-legend-arceus",
      answer: 1662,
    },
    {
      url: "https://soundcloud.com/iratina/distorted-skies-poke-mon",
      answer: 1663,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/disaster-looming-spotted",
      answer: 1664,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-11-anomaly-battle-noble-omen",
      answer: 1665,
    },
    {
      url: "https://soundcloud.com/iratina/battle-in-distorted-skies-poke",
      answer: 1666,
    },
    {
      url: "https://soundcloud.com/iratina/ancient-retreat-poke-mon",
      answer: 1667,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/lake-cavity-pokemon-legends-arceus",
      answer: 1668,
    },
    {
      url: "https://soundcloud.com/iratina/stone-portal-mt-coronet-poke",
      answer: 1669,
    },
    {
      url: "https://soundcloud.com/iratina/temple-of-origin-spear-pillar",
      answer: 1670,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-17-dialgapalkia-appears",
      answer: 1671,
    },
    {
      url: "https://soundcloud.com/iratina/battle-vs-dialga-palkia",
      answer: 1672,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-19-another-lord-sinnoh",
      answer: 1673,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/frenzied-arcanine-pokemon",
      answer: 1674,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/3-21-origin-pokemon-legends",
      answer: 1675,
    },
    {
      url: "https://soundcloud.com/iratina/battle-vs-dialga-palkia-origin",
      answer: 1676,
    },
    {
      url: "https://soundcloud.com/noble-13551787/pokemon-legends-arceus-end",
      answer: 1677,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/mystery-gift-pokemon-legends",
      answer: 1678,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/mt-moon-dance-legends-arceus",
      answer: 1679,
    },
    {
      url: "https://soundcloud.com/iratina/lake-theme-poke-mon-legends",
      answer: 1680,
    },
    {
      url: "https://soundcloud.com/steven-valcourt-286783649/pokemon-legends-arceus-music-mesprit-azelf-uxie-battle-theme",
      answer: 1681,
    },
    {
      url: "https://soundcloud.com/jacob-morales-32/caution-legendary-pokemon",
      answer: 1682,
    },
    {
      url: "https://soundcloud.com/iratina/battle-vs-giratina-altered",
      answer: 1683,
    },
    {
      url: "https://soundcloud.com/vgm-dosage/volos-transformation-pokemon-legends-arceus-gamerip",
      answer: 1684,
    },
    {
      url: "https://soundcloud.com/iratina/battle-vs-volo-poke-mon",
      answer: 1685,
    },
    {
      url: "https://soundcloud.com/rse-548363113/giratina-emerges-pokemon-legends-arceus",
      answer: 1686,
    },
    // {
    //  url: "https://soundcloud.com/iratina/battle-vs-giratina-origin-form",
    //  answer: -8,
    // },
    {
      url: "https://soundcloud.com/zygarde_lagan/battle-volo-giratina-revival-pokemon-legends-arceus",
      answer: 1687,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/4-19-the-azure-flute-pokemon",
      answer: 1688,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/hall-of-origin-pokemon-legends-arceus",
      answer: 1689,
    },
    {
      url: "https://soundcloud.com/iratina/battle-vs-arceus-poke-mon",
      answer: 1690,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/title-screen-pokemon-legends",
      answer: 1691,
    },
    // {
    //  url: "soundcloud.com/user-675036643/pokemon-scarlet-and-violet-1",
    //  answer: -9,
    // },
    {
      url: "https://soundcloud.com/infinitexd3/1-3-welcome-to-the-world-of",
      answer: 1692,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-vast-paldea-region-the-legendary-pokemons-flight-pokemon-scarlet-violet",
      answer: 1693,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/1-03-home-pokemon-scarlet-and",
      answer: 1694,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/1-04-cabo-poco-pokemon-scarlet",
      answer: 1695,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-8-lively-starter-pokemon",
      answer: 1696,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-9-nemonas-theme",
      answer: 1697,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-10-battle-nemona",
      answer: 1698,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-11-poco-path",
      answer: 1699,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-12-battle-wild-pokemon",
      answer: 1700,
    },
    {
      url: "https://soundcloud.com/rse-548363113/the-legendary-pokemons-strength-pokemon-scarlet-violet",
      answer: 1701,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-16-inlet-grotto",
      answer: 1702,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-17-battle-wild-pokemon-inlet",
      answer: 1703,
    },
    {
      url: "https://soundcloud.com/rse-548363113/houndoom-attacks-pokemon-scarlet-violet",
      answer: 1704,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-19-arvens-theme",
      answer: 1705,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-20-battle-arven",
      answer: 1706,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/south-province-riding-no-intro-pokemon-scarlet-violet-3",
      answer: 1707,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-23-battle-southern-pokemon",
      answer: 1708,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-30-pokemon-center",
      answer: 1709,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-29-los-platos-cortondo",
      answer: 1710,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/south-province-walking-no-intro-pokemon-scarlet-violet-4",
      answer: 1711,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-35-mesagoza",
      answer: 1712,
    },
    {
      url: "https://soundcloud.com/rse-548363113/mesagoza-guitarist-pokemon-scarlet-violet",
      answer: 1713,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-38-team-star-appears",
      answer: 1714,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-39-battle-team-star",
      answer: 1715,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-37-mesagoza-riding",
      answer: 1716,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-42-cassiopeias-theme",
      answer: 1717,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-41-professor-sada-professor",
      answer: 1718,
    },
    {
      url: "https://soundcloud.com/rse-548363113/naranjauva-academy-dorm-roomdirectors-officestaff-roomnurses-office-pokemon-scarletviolet",
      answer: 1719,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/2-1-trainers-eyes-meet",
      answer: 1720,
    },
    {
      url: "https://soundcloud.com/karninecrow/pokemon-scarlet-violet-ost-1",
      answer: 1721,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/victory-trainer-battle-pokemon-scarlet-violet-6",
      answer: 1722,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-63-lets-make-a-sandwich",
      answer: 1723,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-48-taste-test",
      answer: 1724,
    },
    {
      url: "https://soundcloud.com/rse-548363113/evolution-pokemon-scarlet-violet",
      answer: 1725,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-50-gym-lobby",
      answer: 1726,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-51-gym-test",
      answer: 1727,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-53-a-gym-leader-appears",
      answer: 1728,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-54-battle-gym-leader",
      answer: 1729,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-gym-leader-pokemon-scarlet-violet",
      answer: 1730,
    },
    {
      url: "https://soundcloud.com/rse-548363113/west-province-riding-no-intro",
      answer: 1731,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-79-battle-western-pokemon",
      answer: 1732,
    },
    {
      url: "https://soundcloud.com/rse-548363113/asado-desert-riding-pokemon-scarlet-violet",
      answer: 1733,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-76-battle-tera-raid",
      answer: 1734,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-77-victory-tera-raid",
      answer: 1735,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/asado-desert-walking-pokemon",
      answer: 1736,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-84-cascaraffa",
      answer: 1737,
    },
    {
      url: "https://soundcloud.com/rse-548363113/hurry-along-pokemon-scarlet-violet",
      answer: 1738,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-58-battle-titan-pokemon",
      answer: 1739,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-59-the-titans-on-the-move",
      answer: 1740,
    },
    {
      url: "https://soundcloud.com/rse-548363113/in-the-cave-with-arven-pokemon-scarlet-violet",
      answer: 1741,
    },
    {
      url: "https://soundcloud.com/rse-548363113/west-province-walking-no-intro",
      answer: 1742,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-82-medali-porto-marinada",
      answer: 1743,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-90-a-friendly-encounter",
      answer: 1744,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/east-province-riding-no-intro-pokemon-scarlet-violet-2",
      answer: 1745,
    },
    {
      url: "https://soundcloud.com/tkyo-berg/pokemon-scarlet-and-violet-8",
      answer: 1746,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-49-artazon-zapapico",
      answer: 1747,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-65-levincia",
      answer: 1748,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-66-iono-zone",
      answer: 1749,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/east-province-area-three-no-intro-pokemon-scarlet-violet-1",
      answer: 1750,
    },
    {
      url: "https://soundcloud.com/rse-548363113/east-province-walking-no-intro",
      answer: 1751,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/tagtree-thicket-no-intro-pokemon-scarlet-violet-5",
      answer: 1752,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-69-clives-theme",
      answer: 1753,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-70-preparing-for-the-star",
      answer: 1754,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-71-star-barrage",
      answer: 1755,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-72-a-team-star-boss-appears",
      answer: 1756,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-73-battle-team-star-boss",
      answer: 1757,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-74-victory-team-star-boss",
      answer: 1758,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-75-a-year-and-a-half-ago",
      answer: 1759,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-92-north-province-riding",
      answer: 1760,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-93-battle-northern-pokemon",
      answer: 1761,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-96-montenevera",
      answer: 1762,
    },
    {
      url: "https://soundcloud.com/rse-548363113/music-fest-at-montenevera-montenevera-gym-test-pokemon-scarlet-violet",
      answer: 1763,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/305-soulful-beat-pokemon-scarlet-and-violet",
      answer: 1764,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-91-north-province-walking",
      answer: 1765,
    },
    {
      url: "https://soundcloud.com/rse-548363113/casseroya-lake-walking-pokemon-scarlet-violet",
      answer: 1766,
    },
    // {
    //  url: "soundcloud.com/user-675036643/pokemon-scarlet-and-violet-ost-casseroya-lake-riding",
    //  answer: -10,
    // },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-95-snow-slope-run-glaseado",
      answer: 1767,
    },
    {
      url: "https://soundcloud.com/rse-548363113/north-province-area-two-riding-pokemon-scarlet-violet",
      answer: 1768,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-88-alfornada",
      answer: 1769,
    },
    {
      url: "https://soundcloud.com/rse-548363113/emotional-spectrum-practice-alfornada-gym-test-pokemon-scarlet-violet",
      answer: 1770,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-108-pokemon-league-champion",
      answer: 1771,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-109-pokemon-league-lobby",
      answer: 1772,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-110-battle-elite-four",
      answer: 1773,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-111-battle-top-champion",
      answer: 1774,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-top-champion-geeta",
      answer: 1775,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-113-a-new-champion-is-born",
      answer: 1776,
    },
    {
      url: "https://soundcloud.com/ssj4-beat/pokemon-scarlet-violet-nemona-final-battle-theme-hq",
      answer: 1777,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-115-victory-nemona",
      answer: 1778,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-102-battle-director-clavell",
      answer: 1779,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-103-director-clavells-secret",
      answer: 1780,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-104-battle-cassiopeia",
      answer: 1781,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/4-04-hasta-la-vistar-pokemon",
      answer: 1782,
    },
    // {
    //  url: "soundcloud.com/user-675036643/pokemon-scarlet-and-violet-ost-team-stars-farewell",
    //  answer: -11,
    // },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-105-cassiopeias-resolve",
      answer: 1783,
    },
    {
      url: "https://soundcloud.com/rse-548363113/emotion-an-old-friend-pokemon",
      answer: 1784,
    },
    {
      url: "https://soundcloud.com/rse-548363113/to-the-great-crater-of-paldea",
      answer: 1785,
    },
    {
      url: "https://soundcloud.com/karninecrow/pokemon-scarlet-violet-area",
      answer: 1786,
    },
    {
      url: "https://soundcloud.com/karninecrow/pokemon-scarlet-and-violet-2",
      answer: 1787,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-120-a-hostile-reunion",
      answer: 1788,
    },
    {
      url: "https://soundcloud.com/tkyo-berg/pokemon-scarlet-and-251987088",
      answer: 1789,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/4-13-activating-offensive",
      answer: 1790,
    },
    {
      url: "https://soundcloud.com/user-657324383/pokemon-scarlet-and-violet-vs",
      answer: 1791,
    },
    {
      url: "https://soundcloud.com/rse-548363113/victory-final-boss",
      answer: 1792,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-125-who-are-you-really",
      answer: 1793,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/4-17-paradise-protection",
      answer: 1794,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-paradise-protection-protocol-phase-1-scarletviolet",
      answer: 1795,
    },
    {
      url: "https://soundcloud.com/rse-548363113/battle-paradise-protection-protocol-phase-2-pokemon-scarletviolet",
      answer: 1796,
    },
    {
      url: " https://soundcloud.com/infinitexd3/1-87-arvens-true-desire",
      answer: 1797,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-129-farewell-my-free",
      answer: 1798,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-130-moving-from-the-past",
      answer: 1799,
    },
    {
      url: "https://soundcloud.com/rse-548363113/taking-the-long-road-home-pokemon-scarlet-violet",
      answer: 1800,
    },
    {
      url: "https://soundcloud.com/edsheeran/ed-sheeran-celestial",
      answer: 1801,
    },
    {
      url: "https://soundcloud.com/user-657324383/pokemon-scarlet-and-violet",
      answer: 1802,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-33-mystery-gift",
      answer: 1803,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-83-link-battle-start",
      answer: 1804,
    },
    {
      url: "https://soundcloud.com/infiniteshadowx34/1-134-battle-legendary-pokemon",
      answer: 1805,
    },
    {
      url: "https://soundcloud.com/infinitexd3/1-1-main-theme",
      answer: 1806,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/carmine-theme-pok-mon-scarlet",
      answer: 1807,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/battle-carmine-pok-mon-scarlet",
      answer: 1808,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/mossui-town-scarletviolet-the-teal-mask-1",
      answer: 1809,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/battle-kieran-pok-mon-scarlet",
      answer: 1810,
    },
    {
      url: "https://soundcloud.com/tkyo-berg/pokemon-scarlet-violetthe-1",
      answer: 1811,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/battle-kitakami-region-pok-mon",
      answer: 1812,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/camera-pokemon-march",
      answer: 1813,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/camera-johto-wild-battle",
      answer: 1814,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/camera-pokemon-lullaby",
      answer: 1815,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/perrins-theme-scarletviolet-the-teal-mask-2",
      answer: 1816,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/fearsome-orge-folktale-pok-mon",
      answer: 1817,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/kieran-theme-pok-mon-scarlet",
      answer: 1818,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/festival-of-masks-scarletviolet-the-teal-mask-3",
      answer: 1819,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/ogre-oustin-theme",
      answer: 1820,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-16-you-completed-the-ogre",
      answer: 1821,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/the-real-history-scarletviolet-the-teal-mask-4",
      answer: 1822,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/crystal-pool-pok-mon-scarlet",
      answer: 1823,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/kierans-anger",
      answer: 1824,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-21-the-loyal-three-come-back",
      answer: 1825,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/the-loyal-three-wreak-havoc-scarletviolet-the-teal-mask-5",
      answer: 1826,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/battle-loyal-three-pok-mon",
      answer: 1827,
    },
    {
      url: "https://soundcloud.com/ya-boi-tart/battle-kieran-final-pok-mon",
      answer: 1828,
    },
    {
      url: "https://soundcloud.com/user-398209245/battle-ogerpon-pokemon-scarlet-and-violet-the-teal-mask-dlc",
      answer: 1829,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-26-caught-a-ogerpon-pokemon",
      answer: 1830,
    },
    {
      url: "https://soundcloud.com/diamondpearl-886539488/end-of-the-field-trip-pokemon-scarletviolet-the-teal-mask",
      answer: 1831,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-28-i-have-to-become-stronger",
      answer: 1832,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-17-briars-theme-pokemon",
      answer: 1833,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-30-blueberry-academy-pokemon",
      answer: 1834,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-31-to-the-dome-pokemon",
      answer: 1835,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-32-this-is-the-terrarium",
      answer: 1836,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-33-terarium-savanna-biome",
      answer: 1837,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-34-battle-pokemon-in-the",
      answer: 1838,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-35-terarium-coastal-biome",
      answer: 1839,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/5-37-battle-academy-trainer",
      answer: 1840,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-01-terarium-central-plaza",
      answer: 1841,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-02-unsettling-atmosphere",
      answer: 1842,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-03-daily-life-at-the-academy",
      answer: 1843,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-04-blueberry-academy-your",
      answer: 1844,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-06-terarium-canyon-biome",
      answer: 1845,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-07-battle-tera-pokemon-in",
      answer: 1846,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-08-flying-time-trial-pokemon",
      answer: 1847,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-09-you-completed-the-elite",
      answer: 1848,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-10-terarium-polar-biome",
      answer: 1849,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-11-battle-bb-league-elite",
      answer: 1850,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-12-victory-bb-league-elite",
      answer: 1851,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-13-true-intentions-pokemon",
      answer: 1852,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-14-the-battle-begins-pokemon",
      answer: 1853,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-15-battle-champion-kieran",
      answer: 1854,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-16-the-defeated-kieran",
      answer: 1855,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-18-area-zero-underdepths",
      answer: 1856,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-19-terapagos-comes-back-to",
      answer: 1857,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-20-battle-terapagos-pokemon",
      answer: 1858,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-21-conditions-of-the-hidden",
      answer: 1859,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-22-terapagos-goes-rampage",
      answer: 1860,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-23-battle-terapagos-stellar",
      answer: 1861,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-24-caught-the-terapagos",
      answer: 1862,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-25-once-again-starting-from",
      answer: 1863,
    },
    {
      url: "https://soundcloud.com/tkyo-berg/pokemon-scarlet-and-438753409",
      answer: 1864,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-26-star-training-centers",
      answer: 1865,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-27-relic-song-pokemon",
      answer: 1866,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-29-a-village-curse-pokemon",
      answer: 1867,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-30-mochi-mayhem-pokemon",
      answer: 1868,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-31-a-drone-a-pokemon-its-a",
      answer: 1869,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-32-battle-pecharunt-pokemon",
      answer: 1870,
    },
    {
      url: "https://soundcloud.com/sv-dlc2/6-33-title-screen-2-pokemon",
      answer: 1871,
    },
  ];
  shuffleMusic();
  let filteredMusicListWithLinks = [];
  filterMusicLists();
  var firstLoad = true;

  // Translation Constants
  const flags = {
    fr: "./flags/fr.png",
    en: "./flags/en.png",
  }; // Name of the file used for the flag
  const flagsAlt = {
    fr: {
      en: "French Flag",
      fr: "Drapeau français",
    },
    en: {
      en: "US Flag",
      fr: "Drapeau État-Unis",
    },
  }; // Alt text for accessibility
  // Tags
  tagsT = {
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
      '. Basé sur le code de <a href="https://joywave-heardle.glitch.me/" title="Joywave Heardle">Joywave Heardle</a> et sur les musiques du <a href="https://pkmn-heardle.glitch.me/" title="Pokémon Heardle">Pokémon Heardle</a> de <a href="http://www.twitter.com/SgtAngel777" target="_blank">@SgtAngel777</a> et <a href="http://www.twitter.com/NickWrightData" target="_blank">@NickWrightData</a>.</p> \n\n<p class="mb-3">Chaque musique est choisie au hasard dans la bande originale du jeu ' +
      artist +
      '.</p><p class="mb-3">Les musiques sont répertoriées avec le nom des jeux dans lesquels elles figurent. Vous pouvez effectuer une recherche par noms de versions appariées, comme "Rouge/Bleu" ou "Rubis/Saphir". Les musiques des remakes sont incluses, comme Rouge Feu et Vert Feuille ou Diamant Étincelant et Perle Scintillante.</p><p class="mb-3">La liste des musiques provient de vgmdb (qui utilise les albums officiels) quand c\'est possible, sinon de datamining (Concerne Ultra Soleil/Ultra Lune et Diamant Étincelant/Perle Scintillante). Les noms français des musiques proviennent des listes officiels sur iTunes pour les jeux GBA et DS et pour Pokémon X/Y. Pour les autres jeux, les traductions sont déduites à partir des jeux déjà traduits ou sont traduites à la main à partir des noms anglais. N\'hésitez pas à me proposer de meilleures traductions pour Pokémon Soleil/Lune, Épée/Bouclier, Légende: Arceus, ou Écarlate/Violet !</p> \n\n\n\n <p class="mb-3">Vous voulez créer votre propre Heardle Infinie ? Consultez le fichier <a href="https://github.com/nterrien/etrian-infinite-heardle">README</a>.</p>',
    en:
      '<p class="mb-3">A clone of <a href="https://www.heardle.app/" title="Heardle">Heardle</a>, and <a href="https://heardle-kpop.glitch.me/" title="K-Pop Heardle">K-Pop Heardle</a> which can be played infinitely and with ' +
      artist +
      '\'s musics. Based on <a href="https://joywave-heardle.glitch.me/" title="Joywave Heardle">Joywave Heardle</a> code and musics of the original <a href="https://pkmn-heardle.glitch.me/" title="Pokémon Heardle">Pokémon Heardle</a> by <a href="http://www.twitter.com/SgtAngel777" target="_blank">@SgtAngel777</a> and <a href="http://www.twitter.com/NickWrightData" target="_blank">@NickWrightData</a>.</p> \n\n<p class="mb-3">Each music is randomly chosen from mainline ' +
      artist +
      '\'s game soundtrack.</p><p class="mb-3">Songs are listed along with the name of the games they are featured in. You can search by paired version names such as "Red/Blue" or "Ruby/Sapphire". Songs from remakes are included, such as FireRed and LeafGreen, and Brilliant Diamond and Shining Pearl. </p><p class="mb-3">The list of music comes from vgmdb (which uses official albums), when possible, otherwise from datamining (Only for Ultra Sun/Ultra Moon and Brilliant Diamond/Shining Pearl)</p> \n\n\n\n <p class="mb-3">Want to make your own Heardle? Check out the <a href="https://github.com/nterrien/etrian-infinite-heardle">README</a>. </p>',
  };
  //// Support popup
  const supportT = { fr: "Support", en: "Support" };
  const supportPopupT = {
    fr: 'Vous avez des questions ou trouvez des bugs ? Contactez Beignet0 sur Reddit, beignetSan sur Twitch, @beignet0.bsky.social sur Bluesky, beignet1139 sur Discord ou créez un ticket sur <a href="https://github.com/nterrien/pkmn-infinite-heardle/issues" target="_blank">Github</a>! <br><br>Vous pouvez également jouer à <a href="https://nterrien.github.io/pkmn-heardle/" title="Pokémon Heardle">Pokémon Heardle</a> tous les jours. Remerciez <a href="http://www.twitter.com/SgtAngel777" target="_blank">@SgtAngel777</a> et <a href="http://www.twitter.com/NickWrightData" target="_blank">@NickWrightData</a> les créateurs du Pokémon Heardle original !<br><br>Il existe également une version pour <a href="https://prateau.github.io/pmd-infinite-heardle/">Pokémon Donjon Mystère</a> grâce à Ipfil.',
    en: 'Have questions/run into bugs? DM Beignet0 on Reddit, beignetSan on Twitch, @beignet0.bsky.social on Bluesky, beignet1139 on Discord or create an issue in <a href="https://github.com/nterrien/pkmn-infinite-heardle/issues" target="_blank">Github</a>!<br><br>You can also play <a href="https://nterrien.github.io/pkmn-heardle/" title="Pokémon Heardle">Pokémon Heardle</a> daily. Thank the Pokémon Heardle creators <a href="http://www.twitter.com/SgtAngel777" target="_blank">@SgtAngel777</a> and <a href="http://www.twitter.com/NickWrightData" target="_blank">@NickWrightData</a>!<br><br>There\'s also a version for <a href="https://prateau.github.io/pmd-infinite-heardle/">Pokémon Mystery Dungeon</a>, thanks to Ipfil.',
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
  const errorT = {
    fr: "Une erreur s'est produite lors du chargement de la musique. Veuillez recharger et réessayer.\n Vous pouvez contactez l'administrateur de ce site si le problème persiste.",
    en: "There was an error loading the player. Please reload and try again.\n You can contact the site administrator if the problem persists.",
  };
  const loadingT = {
    fr: "Chargement ...",
    en: "Loading player",
  };
  function listenToT(music) {
    switch (language) {
      case "fr":
        return (
          "Ecoutez " + music.title + " - " + music.artist + " sur SoundCloud"
        );
      case "en":
        return (
          "Listen to " + music.artist + " - " + music.title + " on SoundCloud"
        );
    }
  }

  for (let lg of Object.keys(flags)) {
    flags[lg] =
      '<img style="width:16px;height:16px" src="' +
      flags[lg] +
      '" alt="' +
      flagsAlt[lg][language] +
      '" />';
  }

  const Cn = ue(filteredMusicNameList),
    On = {
      subscribe: ue(filteredMusicListWithLinks, Pn).subscribe,
    };

  ("use strict");

  function e() {}

  function shuffleMusic() {
    for (let i = musicListWithLinks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [musicListWithLinks[i], musicListWithLinks[j]] = [
        musicListWithLinks[j],
        musicListWithLinks[i],
      ];
    }
  }

  function nextMusic() {
    currentIndex += 1;
    if (currentIndex >= filteredMusicListWithLinks.length) {
      window.location.reload();
    } else {
      document.body.innerHTML = "";
      new (class extends se {
        constructor(e) {
          super(), re(this, e, jn, En, i, {}, null, [-1, -1]);
        }
      })({
        target: document.body,
        props: {},
      });
    }
  }

  function filterMusicLists() {
    // Remove musics that are filtered out
    let gameList = [...new Set(getGameOrArtistFromMusicName(musicNameList))];
    let removedGameList = removeGames.map((i) => gameList[i]);
    let removedTagsList = removeTags.map((i) => allTags[i]);
    if (gameList.length == removedGameList.length) {
      removeGames = [];
      localStorage.setItem("removeGames", "[]");
      removedGameList = [];
    }
    if (allTags.length == removedTagsList.length) {
      removeTags = [];
      localStorage.setItem("removeTags", "[]");
      removedTagsList = [];
    }
    filteredMusicNameList = musicNameList.filter(
      (m) => !removedGameList.includes(getOneGameOrArtistFromMusic(m))
    );
    if (allTags.length > 0 && removeTags.length > 0) {
      filteredMusicNameList = filteredMusicNameList.filter((m) =>
        m.tags.some((t) => !removedTagsList.includes(t))
      );
    }
    if (filteredMusicNameList.every((m) => m.id == -1)) {
      filteredMusicNameList = musicNameList;
      removeGames = [];
      localStorage.setItem("removeGames", "[]");
      removeTags = [];
      localStorage.setItem("removeTags", "[]");
    }
    const idMusic = new Set(filteredMusicNameList.map((x) => x.id));
    filteredMusicListWithLinks = musicListWithLinks.filter((x) =>
      idMusic.has(x.answer)
    );
  }

  function changeLanguage(code) {
    language = code;
    document.body.innerHTML = "";
    localStorage.setItem("language", language),
      new (class extends se {
        constructor(e) {
          super(), re(this, e, jn, En, i, {}, null, [-1, -1]);
        }
      })({
        target: document.body,
        props: {},
      });
  }

  function saveFilteredGames(filteredGames) {
    removeGames = filteredGames;
    localStorage.setItem("removeGames", JSON.stringify(filteredGames)),
      window.location.reload();
  }

  function saveFilteredTags(filteredTags) {
    removeTags = filteredTags;
    localStorage.setItem("removeTags", JSON.stringify(filteredTags)),
      window.location.reload();
  }

  function t(e) {
    return e();
  }

  function n() {
    return Object.create(null);
  }

  function r(e) {
    e.forEach(t);
  }

  function s(e) {
    return "function" == typeof e;
  }

  function i(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  let o, a;

  function l(e, t) {
    return o || (o = document.createElement("a")), (o.href = t), e === o.href;
  }

  function u(t, n, r) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const r = t.subscribe(...n);
        return r.unsubscribe ? () => r.unsubscribe() : r;
      })(n, r)
    );
  }

  function c(e, t, n, r) {
    if (e) {
      const s = d(e, t, n, r);
      return e[0](s);
    }
  }

  function d(e, t, n, r) {
    return e[1] && r
      ? (function (e, t) {
          for (const n in t) e[n] = t[n];
          return e;
        })(n.ctx.slice(), e[1](r(t)))
      : n.ctx;
  }

  function h(e, t, n, r) {
    if (e[2] && r) {
      const s = e[2](r(n));
      if (void 0 === t.dirty) return s;
      if ("object" == typeof s) {
        const e = [],
          n = Math.max(t.dirty.length, s.length);
        for (let r = 0; r < n; r += 1) e[r] = t.dirty[r] | s[r];
        return e;
      }
      return t.dirty | s;
    }
    return t.dirty;
  }

  function f(e, t, n, r, s, i) {
    if (s) {
      const o = d(t, n, r, i);
      e.p(o, s);
    }
  }

  function m(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }

  function p(e, t) {
    e.appendChild(t);
  }

  function g(e, t, n) {
    e.insertBefore(t, n || null);
  }

  function y(e) {
    e.parentNode.removeChild(e);
  }

  function v(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }

  function w(e) {
    return document.createElement(e);
  }

  function k(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }

  function _(e) {
    return document.createTextNode(e);
  }

  function x() {
    return _(" ");
  }

  function b() {
    return _("");
  }

  function S(e, t, n, r) {
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
  }

  function M(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }

  function $(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }

  function D(e, t) {
    e.value = null == t ? "" : t;
  }

  function T(e, t, n, r) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, r ? "important" : "");
  }

  function Y(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }

  function C(e) {
    a = e;
  }

  function O() {
    if (!a) throw new Error("Function called outside component initialization");
    return a;
  }

  function P(e) {
    O().$$.on_mount.push(e);
  }

  function A() {
    const e = O();
    return (t, n) => {
      const r = e.$$.callbacks[t];
      if (r) {
        const s = (function (e, t, n = !1) {
          const r = document.createEvent("CustomEvent");
          return r.initCustomEvent(e, n, !1, t), r;
        })(t, n);
        r.slice().forEach((t) => {
          t.call(e, s);
        });
      }
    };
  }

  function L(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const N = [],
    H = [],
    I = [],
    W = [],
    R = Promise.resolve();
  let F = !1;

  function G(e) {
    I.push(e);
  }
  const E = new Set();
  let j = 0;

  function B() {
    const e = a;
    do {
      for (; j < N.length; ) {
        const e = N[j];
        j++, C(e), z(e.$$);
      }
      for (C(null), N.length = 0, j = 0; H.length; ) H.pop()();
      for (let e = 0; e < I.length; e += 1) {
        const t = I[e];
        E.has(t) || (E.add(t), t());
      }
      I.length = 0;
    } while (N.length);
    for (; W.length; ) W.pop()();
    (F = !1), E.clear(), C(e);
  }

  function z(e) {
    if (null !== e.fragment) {
      e.update(), r(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(G);
    }
  }
  const U = new Set();
  let V;

  function J() {
    V = {
      r: 0,
      c: [],
      p: V,
    };
  }

  function K() {
    V.r || r(V.c), (V = V.p);
  }

  function Z(e, t) {
    e && e.i && (U.delete(e), e.i(t));
  }

  function q(e, t, n, r) {
    if (e && e.o) {
      if (U.has(e)) return;
      U.add(e),
        V.c.push(() => {
          U.delete(e), r && (n && e.d(1), r());
        }),
        e.o(t);
    }
  }
  const X =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;

  function Q(e) {
    e && e.c();
  }

  function ee(e, n, i, o) {
    const { fragment: a, on_mount: l, on_destroy: u, after_update: c } = e.$$;
    a && a.m(n, i),
      o ||
        G(() => {
          const n = l.map(t).filter(s);
          u ? u.push(...n) : r(n), (e.$$.on_mount = []);
        }),
      c.forEach(G);
  }

  function te(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (r(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }

  function ne(e, t) {
    -1 === e.$$.dirty[0] &&
      (N.push(e), F || ((F = !0), R.then(B)), e.$$.dirty.fill(0)),
      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
  }

  function re(t, s, i, o, l, u, c, d = [-1]) {
    const h = a;
    C(t);
    const f = (t.$$ = {
      fragment: null,
      ctx: null,
      props: u,
      update: e,
      not_equal: l,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(s.context || (h ? h.$$.context : [])),
      callbacks: n(),
      dirty: d,
      skip_bound: !1,
      root: s.target || h.$$.root,
    });
    c && c(f.root);
    let m = !1;
    if (
      ((f.ctx = i
        ? i(t, s.props || {}, (e, n, ...r) => {
            const s = r.length ? r[0] : n;
            return (
              f.ctx &&
                l(f.ctx[e], (f.ctx[e] = s)) &&
                (!f.skip_bound && f.bound[e] && f.bound[e](s), m && ne(t, e)),
              n
            );
          })
        : []),
      f.update(),
      (m = !0),
      r(f.before_update),
      (f.fragment = !!o && o(f.ctx)),
      s.target)
    ) {
      if (s.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(s.target);
        f.fragment && f.fragment.l(e), e.forEach(y);
      } else f.fragment && f.fragment.c();
      s.intro && Z(t.$$.fragment),
        ee(t, s.target, s.anchor, s.customElement),
        B();
    }
    C(h);
  }
  class se {
    $destroy() {
      te(this, 1), (this.$destroy = e);
    }
    $on(e, t) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return (
        n.push(t),
        () => {
          const e = n.indexOf(t);
          -1 !== e && n.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }

  function ie(e) {
    let t, n, r, s;
    const i = e[3].default,
      o = c(i, e, e[2], null);
    let aria = "";
    // I didn't find how to reuse the names of the popup
    switch (i[0].name) {
      case "ge":
        aria = aboutT[language];
        break;
      case "ye":
        aria = supportT[language];
        break;
      case "ve":
        aria = statsT[language];
        break;
      case "we":
        aria = howToPlayT[language];
        break;
      case "mListIco":
        aria = musicListT[language];
        break;
      case "Mt":
        aria = skipT[language];
        break;
      case "$t":
        aria = submitT[language];
        break;
      case "ht":
        aria = playAriaT[language];
        break;
      case "pn":
        aria = playT[language];
        break;
      case "filterIco":
        aria = filterT[language];
        break;
      case "LangIco":
        aria = langListT[language];
        break;
    }
    return {
      c() {
        (t = w("button")),
          o && o.c(),
          M(
            t,
            "class",
            "px-2 py-2 uppercase tracking-widest bg-custom-mg border-none flex items-center font-semibold text-sm svelte-1r54uzk"
          ),
          M(t, "aria-label", aria),
          Y(t, "bg-custom-positive", e[0]),
          Y(t, "bg-custom-mg", e[1]);
      },
      m(i, a) {
        g(i, t, a),
          o && o.m(t, null),
          (n = !0),
          r || ((s = S(t, "click", e[4])), (r = !0));
      },
      p(e, [r]) {
        o &&
          o.p &&
          (!n || 4 & r) &&
          f(o, i, e, e[2], n ? h(i, e[2], r, null) : m(e[2]), null),
          1 & r && Y(t, "bg-custom-positive", e[0]),
          2 & r && Y(t, "bg-custom-mg", e[1]);
      },
      i(e) {
        n || (Z(o, e), (n = !0));
      },
      o(e) {
        q(o, e), (n = !1);
      },
      d(e) {
        e && y(t), o && o.d(e), (r = !1), s();
      },
    };
  }

  function oe(e, t, n) {
    let { $$slots: r = {}, $$scope: s } = t,
      { primary: i = !1 } = t,
      { secondary: o = !1 } = t;
    return (
      (e.$$set = (e) => {
        "primary" in e && n(0, (i = e.primary)),
          "secondary" in e && n(1, (o = e.secondary)),
          "$$scope" in e && n(2, (s = e.$$scope));
      }),
      [
        i,
        o,
        s,
        r,
        function (t) {
          L.call(this, e, t);
        },
      ]
    );
  }
  class ae extends se {
    constructor(e) {
      super(),
        re(this, e, oe, ie, i, {
          primary: 0,
          secondary: 1,
        });
    }
  }
  const le = [];

  function ue(t, n = e) {
    let r;
    const s = new Set();

    function o(e) {
      if (i(t, e) && ((t = e), r)) {
        const e = !le.length;
        for (const e of s) e[1](), le.push(e, t);
        if (e) {
          for (let e = 0; e < le.length; e += 2) le[e][0](le[e + 1]);
          le.length = 0;
        }
      }
    }
    return {
      set: o,
      update: function (e) {
        o(e(t));
      },
      subscribe: function (i, a = e) {
        const l = [i, a];
        return (
          s.add(l),
          1 === s.size && (r = n(o) || e),
          i(t),
          () => {
            s.delete(l), 0 === s.size && (r(), (r = null));
          }
        );
      },
    };
  }
  const ce = ue([]);

  function de() {
    return (
      Boolean(window.dataLayer).valueOf() && Array.isArray(window.dataLayer)
    );
  }

  function he() {
    window.dataLayer.push(arguments);
  }

  function fe(e, t, n) {
    let { properties: r } = t,
      { configurations: s = {} } = t,
      { enabled: i = !0 } = t;

    function o() {
      !(function (e, t, n) {
        let r = e.length;

        function s() {
          (r = --r), r < 1 && n();
        }
        t()
          ? n()
          : e.forEach(
              ({
                type: e,
                url: t,
                options: n = {
                  async: !0,
                  defer: !0,
                },
              }) => {
                const r = "script" === e,
                  i = document.createElement(r ? "script" : "link");
                r
                  ? ((i.src = t), (i.async = n.async), (i.defer = n.defer))
                  : ((i.rel = "stylesheet"), (i.href = t)),
                  (i.onload = s),
                  document.body.appendChild(i);
              }
            );
      })(
        // TODO Is it possible to remove google tag without breaking anything ?
        [
          {
            type: "script",
            url: `//www.googletagmanager.com/gtag/js?id=${r[0]}`,
          },
        ],
        de,
        a
      );
    }

    function a() {
      return (
        (window.dataLayer = window.dataLayer || []),
        he("js", new Date()),
        r.forEach((e) => {
          he("config", e, s[e] || {});
        }),
        ce.subscribe((e) => {
          let t = e.length && e.shift();
          for (; t; ) {
            const { event: n, data: r } = t;
            he("event", n, r), (t = e.shift());
          }
        })
      );
    }
    return (
      P(() => {
        i && o();
      }),
      (e.$$set = (e) => {
        "properties" in e && n(0, (r = e.properties)),
          "configurations" in e && n(1, (s = e.configurations)),
          "enabled" in e && n(2, (i = e.enabled));
      }),
      [r, s, i, o]
    );
  }
  class me extends se {
    constructor(e) {
      super(),
        re(this, e, fe, null, i, {
          properties: 0,
          configurations: 1,
          enabled: 2,
          init: 3,
        });
    }
    get init() {
      return this.$$.ctx[3];
    }
  }

  function pe(e, t) {
    t.send_to || delete t.send_to,
      ce.update((n) => [
        ...n,
        {
          event: e,
          data: t,
        },
      ]);
  }

  function ge(e) {
    let t, n, r, s;
    return {
      c() {
        (t = k("svg")),
          (n = k("circle")),
          (r = k("line")),
          (s = k("line")),
          M(n, "cx", "12"),
          M(n, "cy", "12"),
          M(n, "r", "10"),
          M(r, "x1", "12"),
          M(r, "y1", "16"),
          M(r, "x2", "12"),
          M(r, "y2", "12"),
          M(s, "x1", "12"),
          M(s, "y1", "8"),
          M(s, "x2", "12.01"),
          M(s, "y2", "8"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, i) {
        g(e, t, i), p(t, n), p(t, r), p(t, s);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function ye(e) {
    let t, n;
    return {
      c() {
        (t = k("svg")),
          (n = k("path")),
          M(
            n,
            "d",
            "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, r) {
        g(e, t, r), p(t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function ve(e) {
    let t, n;
    return {
      c() {
        (t = k("svg")),
          (n = k("path")),
          M(
            n,
            "d",
            "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, r) {
        g(e, t, r), p(t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function we(e) {
    let t, n, r, s;
    return {
      c() {
        (t = k("svg")),
          (n = k("circle")),
          (r = k("path")),
          (s = k("line")),
          M(n, "cx", "12"),
          M(n, "cy", "12"),
          M(n, "r", "10"),
          M(r, "d", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"),
          M(s, "x1", "12"),
          M(s, "y1", "17"),
          M(s, "x2", "12.01"),
          M(s, "y2", "17"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, i) {
        g(e, t, i), p(t, n), p(t, r), p(t, s);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function LangIco(e) {
    let t;
    return {
      c() {
        (t = w("span")),
          (t.innerHTML = language + " " + flags[language]),
          M(
            t,
            "style",
            "display: flex;justify-content: center;align-items: center;gap: 4px;"
          );
      },
      m(e, i) {
        g(e, t, i);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function mListIco(e) {
    let t, r;
    return {
      c() {
        (t = k("svg")),
          (r = k("path")),
          M(
            r,
            "d",
            "M 2.324219 3.484375 C 1.039062 3.484375 0 4.523438 0 5.804688 C 0 7.089844 1.039062 8.128906 2.324219 8.128906 C 3.605469 8.128906 4.644531 7.089844 4.644531 5.804688 C 4.644531 4.523438 3.605469 3.484375 2.324219 3.484375 Z M 2.324219 9.675781 C 1.039062 9.675781 0 10.71875 0 12 C 0 13.28125 1.039062 14.324219 2.324219 14.324219 C 3.605469 14.324219 4.644531 13.28125 4.644531 12 C 4.644531 10.71875 3.605469 9.675781 2.324219 9.675781 Z M 2.324219 15.871094 C 1.039062 15.871094 0 16.910156 0 18.195312 C 0 19.476562 1.039062 20.515625 2.324219 20.515625 C 3.605469 20.515625 4.644531 19.476562 4.644531 18.195312 C 4.644531 16.910156 3.605469 15.871094 2.324219 15.871094 Z M 7.742188 7.355469 L 22.453125 7.355469 C 23.308594 7.355469 24 6.660156 24 5.804688 C 24 4.949219 23.308594 4.257812 22.453125 4.257812 L 7.742188 4.257812 C 6.886719 4.257812 6.195312 4.949219 6.195312 5.804688 C 6.195312 6.660156 6.886719 7.355469 7.742188 7.355469 Z M 22.453125 10.453125 L 7.742188 10.453125 C 6.886719 10.453125 6.195312 11.144531 6.195312 12 C 6.195312 12.855469 6.886719 13.546875 7.742188 13.546875 L 22.453125 13.546875 C 23.308594 13.546875 24 12.855469 24 12 C 24 11.144531 23.308594 10.453125 22.453125 10.453125 Z M 22.453125 16.644531 L 7.742188 16.644531 C 6.886719 16.644531 6.195312 17.339844 6.195312 18.195312 C 6.195312 19.050781 6.886719 19.742188 7.742188 19.742188 L 22.453125 19.742188 C 23.308594 19.742188 24 19.050781 24 18.195312 C 24 17.339844 23.308594 16.644531 22.453125 16.644531 Z M 22.453125 16.644531 "
          ),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "white");
      },
      m(e, i) {
        g(e, t, i), p(t, r);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function filterIco(e) {
    let t, r;
    return {
      c() {
        (t = k("svg")),
          (r = k("path")),
          M(
            r,
            "d",
            "M 2 5 C 2 3.34375 3.34375 2 5 2 L 19 2 C 20.65625 2 22 3.34375 22 5 L 22 6.171875 C 22 6.96875 21.683594 7.730469 21.121094 8.292969 L 15.292969 14.121094 C 15.105469 14.308594 15 14.5625 15 14.828125 L 15 17.171875 C 15 17.96875 14.683594 18.730469 14.121094 19.292969 L 11.917969 21.496094 C 10.84375 22.570312 9 21.808594 9 20.285156 L 9 14.828125 C 9 14.5625 8.894531 14.308594 8.707031 14.121094 L 2.878906 8.292969 C 2.316406 7.730469 2 6.96875 2 6.171875 Z M 2 5 "
          ),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "white");
      },
      m(e, i) {
        g(e, t, i), p(t, r);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function ke(e) {
    let t,
      n,
      r,
      s,
      i,
      o,
      a,
      l,
      u,
      c,
      d,
      h,
      f,
      m,
      b,
      ml,
      bLang,
      mLang,
      bFilter,
      mFilter,
      v;
    return (
      (i = new ae({
        props: {
          $$slots: {
            default: [ge],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      i.$on("click", e[1]),
      (a = new ae({
        props: {
          $$slots: {
            default: [ye],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      a.$on("click", e[2]),
      (h = new ae({
        props: {
          $$slots: {
            default: [ve],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      h.$on("click", e[3]),
      (m = new ae({
        props: {
          $$slots: {
            default: [we],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      m.$on("click", e[4]),
      (ml = new ae({
        props: {
          $$slots: {
            default: [mListIco],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      ml.$on("click", e[5]),
      (mLang = new ae({
        props: {
          $$slots: {
            default: [LangIco],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      mLang.$on("click", e[6]),
      (mFilter = new ae({
        props: {
          $$slots: {
            default: [filterIco],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      mFilter.$on("click", e[7]),
      {
        c() {
          (t = w("header")),
            (n = w("div")),
            (r = w("div")),
            (s = w("div")),
            Q(i.$$.fragment),
            (o = x()),
            Q(a.$$.fragment),
            (l = x()),
            (u = w("h1")),
            (u.textContent = artist + " Infinite Heardle"),
            (c = x()),
            (d = w("div")),
            Q(h.$$.fragment),
            (f = x()),
            Q(m.$$.fragment),
            (b = x()),
            Q(ml.$$.fragment),
            (bLang = x()),
            Q(mLang.$$.fragment),
            (bFilter = x()),
            Q(mFilter.$$.fragment),
            M(s, "class", "flex flex-1"),
            M(
              u,
              "class",
              "font-serif text-3xl font-bold flex-grow text-center flex-1"
            ),
            M(d, "class", "flex flex-1 justify-end"),
            M(
              r,
              "class",
              "flex justify-evenly text-custom-fgcolor p-3 items-center"
            ),
            M(n, "class", "max-w-screen-md mx-auto "),
            M(t, "class", "border-b border-custom-line");
        },
        m(e, y) {
          g(e, t, y),
            p(t, n),
            p(n, r),
            p(r, s),
            ee(i, s, null),
            p(s, o),
            ee(a, s, null),
            p(s, f),
            ee(m, s, null),
            p(r, l),
            p(r, u),
            p(r, c),
            p(r, d),
            ee(h, d, null),
            p(d, bFilter),
            ee(mFilter, d, null),
            p(d, b),
            ee(ml, d, null),
            p(d, bLang),
            ee(mLang, d, null),
            (v = !0);
        },
        p(e, [t]) {
          const n = {};
          64 & t &&
            (n.$$scope = {
              dirty: t,
              ctx: e,
            }),
            i.$set(n);
          const r = {};
          64 & t &&
            (r.$$scope = {
              dirty: t,
              ctx: e,
            }),
            a.$set(r);
          const s = {};
          64 & t &&
            (s.$$scope = {
              dirty: t,
              ctx: e,
            }),
            h.$set(s);
          const o = {};
          64 & t &&
            (o.$$scope = {
              dirty: t,
              ctx: e,
            }),
            m.$set(o);
          const z = {};
          64 & t &&
            (z.$$scope = {
              dirty: t,
              ctx: e,
            }),
            ml.$set(z);
          const zLang = {};
          64 & t &&
            (zLang.$$scope = {
              dirty: t,
              ctx: e,
            }),
            mLang.$set(zLang);
          const zFilter = {};
          64 & t &&
            (zFilter.$$scope = {
              dirty: t,
              ctx: e,
            }),
            mFilter.$set(zFilter);
        },
        i(e) {
          v ||
            (Z(i.$$.fragment, e),
            Z(a.$$.fragment, e),
            Z(h.$$.fragment, e),
            Z(m.$$.fragment, e),
            Z(ml.$$.fragment, e),
            Z(mLang.$$.fragment, e),
            Z(mFilter.$$.fragment, e),
            (v = !0));
        },
        o(e) {
          q(i.$$.fragment, e),
            q(a.$$.fragment, e),
            q(h.$$.fragment, e),
            q(m.$$.fragment, e),
            q(ml.$$.fragment, e),
            q(mLang.$$.fragment, e),
            q(mFilter.$$.fragment, e),
            (v = !1);
        },
        d(e) {
          e && y(t), te(i), te(a), te(h), te(m), te(ml), te(mLang), te(mFilter);
        },
      }
    );
  }

  function _e(e) {
    const t = A();

    function n(e, n, r) {
      t("modal", {
        name: e,
        title: n,
        hasFrame: r,
      });
    }
    return [
      n,
      () => {
        n("info", aboutT[language]),
          pe("clickInfo", {
            name: "clickInfo",
          });
      },
      () => {
        n("donate", supportT[language]),
          pe("clickDonate", {
            name: "clickDonate",
          });
      },
      () => {
        n("results", statsT[language]),
          pe("clickStats", {
            name: "clickStats",
          });
      },
      () => {
        n("help", howToPlayT[language]),
          pe("clickHelp", {
            name: "clickHelp",
          });
      },
      () => {
        n("music-list", musicListT[language]),
          pe("clickMusicList", {
            name: "clickMusicList",
          });
      },
      () => {
        n("lang-list", langListT[language]),
          pe("clickLangList", {
            name: "clickLangList",
          });
      },
      () => {
        n("filter", filterT[language]),
          pe("clickFilter", {
            name: "clickFilter",
          });
      },
    ];
  }
  class xe extends se {
    constructor(e) {
      super(), re(this, e, _e, ke, i, {});
    }
  }

  function be(e, t, n) {
    const r = e.slice();
    return (r[5] = t[n]), (r[7] = n), r;
  }

  function Se(e) {
    let t,
      n = Array(e[3]),
      r = [];
    for (let t = 0; t < n.length; t += 1) r[t] = Pe(be(e, n, t));
    return {
      c() {
        t = w("div");
        for (let e = 0; e < r.length; e += 1) r[e].c();
        M(t, "class", "p-3 flex-col items-evenly");
      },
      m(e, n) {
        g(e, t, n);
        for (let e = 0; e < r.length; e += 1) r[e].m(t, null);
      },
      p(e, s) {
        if (9 & s) {
          let i;
          for (n = Array(e[3]), i = 0; i < n.length; i += 1) {
            const o = be(e, n, i);
            r[i] ? r[i].p(o, s) : ((r[i] = Pe(o)), r[i].c(), r[i].m(t, null));
          }
          for (; i < r.length; i += 1) r[i].d(1);
          r.length = n.length;
        }
      },
      d(e) {
        e && y(t), v(r, e);
      },
    };
  }

  function Me(e) {
    let t,
      n,
      r,
      s,
      i,
      o,
      a,
      l,
      u,
      c,
      d,
      h = e[1].img && Ae(e),
      f = e[1].artist && Le(e);
    return {
      c() {
        (t = w("div")),
          (n = w("a")),
          (r = w("div")),
          h && h.c(),
          (s = x()),
          (i = w("div")),
          f && f.c(),
          (o = x()),
          (a = w("div")),
          (a.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="14"><defs><linearGradient id="logo_hover_20" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad"><stop offset="0%" stop-color="#ff7700" stop-opacity="1"></stop><stop offset="100%" stop-color="#ff3300" stop-opacity="1"></stop></linearGradient></defs><path class="text-custom-fg" fill="currentColor" d="M10.517 3.742c-.323 0-.49.363-.49.582 0 0-.244 3.591-.244 4.641 0 1.602.15 2.621.15 2.621 0 .222.261.401.584.401.321 0 .519-.179.519-.401 0 0 .398-1.038.398-2.639 0-1.837-.153-4.127-.284-4.592-.112-.395-.313-.613-.633-.613zm-1.996.268c-.323 0-.49.363-.49.582 0 0-.244 3.322-.244 4.372 0 1.602.119 2.621.119 2.621 0 .222.26.401.584.401.321 0 .581-.179.581-.401 0 0 .081-1.007.081-2.608 0-1.837-.206-4.386-.206-4.386 0-.218-.104-.581-.425-.581zm-2.021 1.729c-.324 0-.49.362-.49.582 0 0-.272 1.594-.272 2.644 0 1.602.179 2.559.179 2.559 0 .222.229.463.552.463.321 0 .519-.241.519-.463 0 0 .19-.944.19-2.546 0-1.837-.253-2.657-.253-2.657 0-.22-.104-.582-.425-.582zm-2.046-.358c-.323 0-.49.363-.49.582 0 0-.162 1.92-.162 2.97 0 1.602.069 2.496.069 2.496 0 .222.26.557.584.557.321 0 .581-.304.581-.526 0 0 .143-.936.143-2.538 0-1.837-.206-2.96-.206-2.96 0-.218-.198-.581-.519-.581zm-2.169 1.482c-.272 0-.232.218-.232.218v3.982s-.04.335.232.335c.351 0 .716-.832.716-2.348 0-1.245-.436-2.187-.716-2.187zm18.715-.976c-.289 0-.567.042-.832.116-.417-2.266-2.806-3.989-5.263-3.989-1.127 0-2.095.705-2.931 1.316v8.16s0 .484.5.484h8.526c1.655 0 3-1.55 3-3.155 0-1.607-1.346-2.932-3-2.932zm10.17.857c-1.077-.253-1.368-.389-1.368-.815 0-.3.242-.611.97-.611.621 0 1.106.253 1.542.699l.981-.951c-.641-.669-1.417-1.067-2.474-1.067-1.339 0-2.425.757-2.425 1.99 0 1.338.873 1.736 2.124 2.026 1.281.291 1.513.486 1.513.923 0 .514-.379.738-1.184.738-.65 0-1.26-.223-1.736-.777l-.98.873c.514.757 1.504 1.232 2.639 1.232 1.853 0 2.668-.873 2.668-2.163 0-1.477-1.193-1.845-2.27-2.097zm6.803-2.745c-1.853 0-2.949 1.435-2.949 3.502s1.096 3.501 2.949 3.501c1.852 0 2.949-1.434 2.949-3.501s-1.096-3.502-2.949-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.096 0 1.551.94 1.551 2.153.001 1.213-.454 2.153-1.551 2.153zm8.939-1.736c0 1.086-.533 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.897h-1.358v3.916c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.754-1.136 2.754-3.103v-3.897h-1.358v3.916zm8.142-.89l.019 1.485c-.087-.174-.31-.515-.475-.768l-2.703-3.692h-1.362v6.894h1.401v-2.988l-.02-1.484c.088.175.311.514.475.767l2.79 3.705h1.213v-6.894h-1.339v2.975zm5.895-2.923h-2.124v6.791h2.027c1.746 0 3.474-1.01 3.474-3.395 0-2.484-1.437-3.396-3.377-3.396zm-.097 5.472h-.67v-4.152h.719c1.436 0 2.028.688 2.028 2.076 0 1.242-.651 2.076-2.077 2.076zm7.909-4.229c.611 0 1 .271 1.242.737l1.26-.582c-.426-.883-1.202-1.503-2.483-1.503-1.775 0-3.016 1.435-3.016 3.502 0 2.143 1.191 3.501 2.968 3.501 1.232 0 2.047-.572 2.513-1.533l-1.145-.68c-.358.602-.718.864-1.329.864-1.019 0-1.611-.932-1.611-2.153-.001-1.261.583-2.153 1.601-2.153zm5.17-1.192h-1.359v6.791h4.083v-1.338h-2.724v-5.453zm6.396-.157c-1.854 0-2.949 1.435-2.949 3.502s1.095 3.501 2.949 3.501c1.853 0 2.95-1.434 2.95-3.501s-1.097-3.502-2.95-3.502zm0 5.655c-1.097 0-1.553-.941-1.553-2.153 0-1.213.456-2.153 1.553-2.153 1.095 0 1.55.94 1.55 2.153.001 1.213-.454 2.153-1.55 2.153zm8.557-1.736c0 1.086-.532 1.756-1.396 1.756-.864 0-1.388-.689-1.388-1.775v-3.794h-1.358v3.813c0 1.978 1.106 3.084 2.746 3.084 1.726 0 2.755-1.136 2.755-3.103v-3.794h-1.36v3.813zm5.449-3.907h-2.318v6.978h2.211c1.908 0 3.789-1.037 3.789-3.489 0-2.552-1.565-3.489-3.682-3.489zm-.108 5.623h-.729v-4.266h.783c1.565 0 2.21.706 2.21 2.133.001 1.276-.707 2.133-2.264 2.133z"></path></svg>'),
          (l = x()),
          (u = w("div")),
          (u.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg>'),
          M(i, "class", "flex-1 mx-3 text-white"),
          M(a, "class", "text-center flex justify-center"),
          M(r, "class", "p-2 flex items-center rounded-sm"),
          Y(r, "bg-custom-positive", e[2].gotCorrect),
          Y(r, "bg-custom-mg", !e[2].gotCorrect),
          M(n, "href", (c = e[1].url)),
          M(n, "title", (d = listenToT(e[1]))),
          M(n, "class", "no-underline"),
          M(t, "class", "p-3 pb-0 flex-col items-evenly");
      },
      m(e, c) {
        g(e, t, c),
          p(t, n),
          p(n, r),
          h && h.m(r, null),
          p(r, s),
          p(r, i),
          f && f.m(i, null),
          p(r, o),
          p(r, a),
          p(r, l),
          p(r, u);
      },
      p(e, t) {
        e[1].img
          ? h
            ? h.p(e, t)
            : ((h = Ae(e)), h.c(), h.m(r, s))
          : h && (h.d(1), (h = null)),
          e[1].artist
            ? f
              ? f.p(e, t)
              : ((f = Le(e)), f.c(), f.m(i, null))
            : f && (f.d(1), (f = null)),
          4 & t && Y(r, "bg-custom-positive", e[2].gotCorrect),
          4 & t && Y(r, "bg-custom-mg", !e[2].gotCorrect),
          2 & t && c !== (c = e[1].url) && M(n, "href", c),
          2 & t && d !== (d = listenToT(e[1])) && M(n, "title", d);
      },
      d(e) {
        e && y(t), h && h.d(), f && f.d();
      },
    };
  }

  function $e(t) {
    let n;
    return {
      c() {
        (n = w("div")), M(n, "class", "w-5 h-5");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function De(e) {
    let t, n, r;

    function s(e, t) {
      return e[0][e[7]].isCorrect || e[0][e[7]].isSkipped
        ? e[0][e[7]].isSkipped
          ? Te
          : void 0
        : Ye;
    }
    let i = s(e),
      o = i && i(e);

    function a(e, t) {
      return e[0][e[7]].isSkipped ? Oe : Ce;
    }
    let l = a(e),
      u = l(e);
    return {
      c() {
        (t = w("div")),
          o && o.c(),
          (n = x()),
          (r = w("div")),
          u.c(),
          M(t, "class", "mr-2"),
          M(r, "class", "flex flex-1 justify-between items-center");
      },
      m(e, s) {
        g(e, t, s), o && o.m(t, null), g(e, n, s), g(e, r, s), u.m(r, null);
      },
      p(e, n) {
        i !== (i = s(e)) &&
          (o && o.d(1), (o = i && i(e)), o && (o.c(), o.m(t, null))),
          l === (l = a(e)) && u
            ? u.p(e, n)
            : (u.d(1), (u = l(e)), u && (u.c(), u.m(r, null)));
      },
      d(e) {
        e && y(t), o && o.d(), e && y(n), e && y(r), u.d();
      },
    };
  }

  function Te(e) {
    let t, n;
    return {
      c() {
        (t = k("svg")),
          (n = k("rect")),
          M(n, "x", "3"),
          M(n, "y", "3"),
          M(n, "width", "18"),
          M(n, "height", "18"),
          M(n, "rx", "2"),
          M(n, "ry", "2"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "class", "text-custom-mg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, r) {
        g(e, t, r), p(t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Ye(e) {
    let t, n, r;
    return {
      c() {
        (t = k("svg")),
          (n = k("line")),
          (r = k("line")),
          M(n, "x1", "18"),
          M(n, "y1", "6"),
          M(n, "x2", "6"),
          M(n, "y2", "18"),
          M(r, "x1", "6"),
          M(r, "y1", "6"),
          M(r, "x2", "18"),
          M(r, "y2", "18"),
          M(t, "class", "text-custom-negative"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, s) {
        g(e, t, s), p(t, n), p(t, r);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Ce(e) {
    let t,
      n,
      r = e[0][e[7]].answer + "";
    return {
      c() {
        (t = w("div")), (n = _(r)), M(t, "class", "text-white text-sm");
      },
      m(e, r) {
        g(e, t, r), p(t, n);
      },
      p(e, t) {
        1 & t && r !== (r = e[0][e[7]].answer + "") && $(n, r);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Oe(t) {
    let n;
    return {
      c() {
        (n = w("div")),
          (n.textContent = skippedT[language]),
          M(n, "class", "text-custom-mg tracking-widest font-semibold");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function Pe(e) {
    let t, n;

    function r(e, t) {
      return e[7] < e[0].length ? De : $e;
    }
    let s = r(e),
      i = s(e);
    return {
      c() {
        (t = w("div")),
          i.c(),
          (n = x()),
          M(
            t,
            "class",
            "p-2 mb-2 border border-custom-mg flex items-center last:mb-0"
          ),
          Y(t, "border-custom-line", e[7] == e[0].length);
      },
      m(e, r) {
        g(e, t, r), i.m(t, null), p(t, n);
      },
      p(e, o) {
        s === (s = r(e)) && i
          ? i.p(e, o)
          : (i.d(1), (i = s(e)), i && (i.c(), i.m(t, n))),
          1 & o && Y(t, "border-custom-line", e[7] == e[0].length);
      },
      d(e) {
        e && y(t), i.d();
      },
    };
  }

  function Ae(e) {
    let t, n, r;
    return {
      c() {
        (t = w("img")),
          l(t.src, (n = e[1].img)) || M(t, "src", n),
          M(t, "class", "h-14 w-14 "),
          M(t, "alt", (r = e[1].artist + " - " + e[1].title));
      },
      m(e, n) {
        g(e, t, n);
      },
      p(e, s) {
        2 & s && !l(t.src, (n = e[1].img)) && M(t, "src", n),
          2 & s &&
            r !== (r = e[1].artist + " - " + e[1].title) &&
            M(t, "alt", r);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Le(e) {
    let t,
      n,
      r,
      s,
      i,
      o = e[1].artist + "",
      a = e[1].title + "";
    return {
      c() {
        (t = w("p")),
          (n = _(o)),
          (r = x()),
          (s = w("p")),
          (i = _(a)),
          M(t, "class", ""),
          M(s, "class", "text-sm ");
      },
      m(e, o) {
        g(e, t, o), p(t, n), g(e, r, o), g(e, s, o), p(s, i);
      },
      p(e, t) {
        2 & t && o !== (o = e[1].artist + "") && $(n, o),
          2 & t && a !== (a = e[1].title + "") && $(i, a);
      },
      d(e) {
        e && y(t), e && y(r), e && y(s);
      },
    };
  }

  function Ne(t) {
    let n;

    function r(e, t) {
      return e[2].hasFinished ? Me : Se;
    }
    let s = r(t),
      i = s(t);
    return {
      c() {
        i.c(), (n = b());
      },
      m(e, t) {
        i.m(e, t), g(e, n, t);
      },
      p(e, [t]) {
        s === (s = r(e)) && i
          ? i.p(e, t)
          : (i.d(1), (i = s(e)), i && (i.c(), i.m(n.parentNode, n)));
      },
      i: e,
      o: e,
      d(e) {
        i.d(e), e && y(n);
      },
    };
  }

  function He(e, t, n) {
    let r,
      { userGuesses: s } = t,
      { maxAttempts: i } = t,
      { currentHeardle: o } = t,
      { todaysGame: a } = t;
    return (
      (e.$$set = (e) => {
        "userGuesses" in e && n(0, (s = e.userGuesses)),
          "maxAttempts" in e && n(4, (i = e.maxAttempts)),
          "currentHeardle" in e && n(1, (o = e.currentHeardle)),
          "todaysGame" in e && n(2, (a = e.todaysGame));
      }),
      (e.$$.update = () => {
        21 & e.$$.dirty &&
          n(3, (r = a.hasFinished && a.gotCorrect ? s.length : i));
      }),
      [s, o, a, r, i]
    );
  }
  class Ie extends se {
    constructor(e) {
      super(),
        re(this, e, He, Ne, i, {
          userGuesses: 0,
          maxAttempts: 4,
          currentHeardle: 1,
          todaysGame: 2,
        });
    }
  }

  function We(t) {
    let n, r;
    return {
      c() {
        (n = w("div")),
          (r = w("i")),
          M(r, "class", "gg-loadbar-sound svelte-15swa4o"),
          Y(r, "musicIsPlaying", t[0]),
          M(n, "class", "scale-150 transform relative");
      },
      m(e, t) {
        g(e, n, t), p(n, r);
      },
      p(e, [t]) {
        1 & t && Y(r, "musicIsPlaying", e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function Re(e, t, n) {
    let { musicIsPlaying: r } = t;
    return (
      (e.$$set = (e) => {
        "musicIsPlaying" in e && n(0, (r = e.musicIsPlaying));
      }),
      [r]
    );
  }
  class Fe extends se {
    constructor(e) {
      super(),
        re(this, e, Re, We, i, {
          musicIsPlaying: 0,
        });
    }
  }

  function Ge(t) {
    let n;
    return {
      c() {
        n = w("div");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }
  class Ee extends se {
    constructor(e) {
      super(), re(this, e, null, Ge, i, {});
    }
  }
  const { document: je } = X;

  function Be(e, t, n) {
    const r = e.slice();
    return (r[33] = t[n]), (r[35] = n), r;
  }

  function ze(e, t, n) {
    const r = e.slice();
    return (r[33] = t[n]), (r[35] = n), r;
  }

  function Ue(e, t, n) {
    const r = e.slice();
    return (r[33] = t[n]), (r[35] = n), r;
  }

  function Ve(e) {
    let t, n, r, s;
    const i = [Ze, Ke],
      o = [];

    function a(e, t) {
      return e[13] ? 0 : 1;
    }
    return (
      (n = a(e)),
      (r = o[n] = i[n](e)),
      {
        c() {
          (t = w("div")),
            r.c(),
            M(t, "class", "text-sm text-center text-custom-line p-6");
        },
        m(e, r) {
          g(e, t, r), o[n].m(t, null), (s = !0);
        },
        p(e, s) {
          let l = n;
          (n = a(e)),
            n === l
              ? o[n].p(e, s)
              : (J(),
                q(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                K(),
                (r = o[n]),
                r ? r.p(e, s) : ((r = o[n] = i[n](e)), r.c()),
                Z(r, 1),
                r.m(t, null));
        },
        i(e) {
          s || (Z(r), (s = !0));
        },
        o(e) {
          q(r), (s = !1);
        },
        d(e) {
          e && y(t), o[n].d();
        },
      }
    );
  }

  function Je(e) {
    let t, n, r, s;
    const i = [Qe, Xe],
      o = [];

    function a(e, t) {
      return e[9] ? 1 : 0;
    }
    return (
      (t = a(e)),
      (n = o[t] = i[t](e)),
      {
        c() {
          n.c(), (r = b());
        },
        m(e, n) {
          o[t].m(e, n), g(e, r, n), (s = !0);
        },
        p(e, s) {
          let l = t;
          (t = a(e)),
            t === l
              ? o[t].p(e, s)
              : (J(),
                q(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                K(),
                (n = o[t]),
                n ? n.p(e, s) : ((n = o[t] = i[t](e)), n.c()),
                Z(n, 1),
                n.m(r.parentNode, r));
        },
        i(e) {
          s || (Z(n), (s = !0));
        },
        o(e) {
          q(n), (s = !1);
        },
        d(e) {
          o[t].d(e), e && y(r);
        },
      }
    );
  }

  function Ke(t) {
    let n, r, s, i;
    return (
      (n = new Ee({})),
      {
        c() {
          Q(n.$$.fragment),
            (r = x()),
            (s = w("p")),
            (s.textContent = loadingT[language]);
        },
        m(e, t) {
          ee(n, e, t), g(e, r, t), g(e, s, t), (i = !0);
        },
        p: e,
        i(e) {
          i || (Z(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          te(n, e), e && y(r), e && y(s);
        },
      }
    );
  }

  function Ze(e) {
    let t, n, r, s, i;
    return (
      (s = new ae({
        props: {
          $$slots: {
            default: [qe],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      s.$on("click", e[22]),
      {
        c() {
          (t = w("p")),
            (t.innerText = errorT[language]),
            (n = x()),
            (r = w("div")),
            Q(s.$$.fragment),
            M(t, "class", "mb-3"),
            M(r, "class", "flex justify-center");
        },
        m(e, o) {
          g(e, t, o), g(e, n, o), g(e, r, o), ee(s, r, null), (i = !0);
        },
        p(e, t) {
          const n = {};
          128 & t[1] &&
            (n.$$scope = {
              dirty: t,
              ctx: e,
            }),
            s.$set(n);
        },
        i(e) {
          i || (Z(s.$$.fragment, e), (i = !0));
        },
        o(e) {
          q(s.$$.fragment, e), (i = !1);
        },
        d(e) {
          e && y(t), e && y(n), e && y(r), te(s);
        },
      }
    );
  }

  function qe(e) {
    let t, n;
    return {
      c() {
        (t = k("svg")),
          (n = k("path")),
          M(n, "d", "M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "24"),
          M(t, "height", "24"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round");
      },
      m(e, r) {
        g(e, t, r), p(t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Xe(t) {
    let n,
      r,
      s,
      i,
      o,
      a,
      l,
      u,
      c = t[4].gameIsActive && et(t);
    return {
      c() {
        (n = w("div")),
          (r = w("div")),
          (s = w("div")),
          (i = w("div")),
          (i.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"></path></svg>'),
          (o = x()),
          (a = w("div")),
          (l = w("p")),
          (l.textContent =
            "Oh no! Seems like today's track is unavailable on\n                            SoundCloud in your location"),
          (u = x()),
          c && c.c(),
          M(i, "class", "mr-3"),
          M(l, "class", "text-sm "),
          M(s, "class", "flex items-center"),
          M(r, "class", "p-3 mb-3 bg-custom-mg rounded-sm"),
          M(n, "class", "max-w-screen-sm w-full mx-auto px-3 flex-col");
      },
      m(e, t) {
        g(e, n, t),
          p(n, r),
          p(r, s),
          p(s, i),
          p(s, o),
          p(s, a),
          p(a, l),
          p(a, u),
          c && c.m(a, null);
      },
      p(e, t) {
        e[4].gameIsActive
          ? c
            ? c.p(e, t)
            : ((c = et(e)), c.c(), c.m(a, null))
          : c && (c.d(1), (c = null));
      },
      i: e,
      o: e,
      d(e) {
        e && y(n), c && c.d();
      },
    };
  }

  function Qe(e) {
    let t,
      n,
      r,
      i,
      o,
      a,
      l,
      u,
      c,
      d,
      h,
      f,
      m,
      v,
      k,
      b,
      S,
      D,
      Y,
      C,
      O,
      P,
      A = mt(e[11]) + "",
      L =
        mt(
          e[15]
            ? e[4].isPrime
              ? e[8].slice(-1)[0]
              : e[2].maxAttempts * e[2].attemptInterval
            : e[3]
        ) + "",
      N = !e[12] && 1 == e[0] && tt();

    function H(e, t) {
      return e[4].isPrime ? rt : nt;
    }
    let I = H(e),
      W = I(e);
    return (
      (D = new ae({
        props: {
          $$slots: {
            default: [ht],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      D.$on("click", function () {
        s(e[18] ? e[6] : e[5]) && (e[18] ? e[6] : e[5]).apply(this, arguments);
      }),
      {
        c() {
          N && N.c(),
            (t = x()),
            (n = w("div")),
            (r = w("div")),
            (i = w("div")),
            (o = w("div")),
            (a = w("div")),
            (l = x()),
            W.c(),
            (u = x()),
            (c = w("div")),
            (d = w("div")),
            (h = w("div")),
            (f = w("div")),
            (m = w("div")),
            (v = w("div")),
            (k = _(A)),
            (b = x()),
            (S = w("div")),
            Q(D.$$.fragment),
            (Y = x()),
            (C = w("div")),
            (O = _(L)),
            M(a, "class", "h-full absolute bg-custom-positive"),
            T(a, "width", e[10] + "%"),
            M(o, "class", "h-full absolute bg-custom-mg overflow-hidden"),
            T(o, "width", (e[15] ? e[16] : "100") + "%"),
            M(i, "class", "h-3 w-full relative overflow-hidden "),
            M(r, "class", "max-w-screen-sm w-full mx-auto px-3 flex-col"),
            M(n, "class", "border-t border-custom-line"),
            M(m, "class", "flex items-center"),
            M(S, "class", "flex justify-center items-center p-1"),
            M(f, "class", "flex justify-between items-center"),
            M(h, "class", "px-3 "),
            M(d, "class", "max-w-screen-sm w-full mx-auto flex-col"),
            M(c, "class", "border-t border-custom-line");
        },
        m(e, s) {
          N && N.m(e, s),
            g(e, t, s),
            g(e, n, s),
            p(n, r),
            p(r, i),
            p(i, o),
            p(o, a),
            p(i, l),
            W.m(i, null),
            g(e, u, s),
            g(e, c, s),
            p(c, d),
            p(d, h),
            p(h, f),
            p(f, m),
            p(m, v),
            p(v, k),
            p(f, b),
            p(f, S),
            ee(D, S, null),
            p(f, Y),
            p(f, C),
            p(C, O),
            (P = !0);
        },
        p(n, r) {
          (e = n)[12] || 1 != e[0]
            ? N && (N.d(1), (N = null))
            : N || ((N = tt()), N.c(), N.m(t.parentNode, t)),
            (!P || 1024 & r[0]) && T(a, "width", e[10] + "%"),
            (!P || 98304 & r[0]) &&
              T(o, "width", (e[15] ? e[16] : "100") + "%"),
            I === (I = H(e)) && W
              ? W.p(e, r)
              : (W.d(1), (W = I(e)), W && (W.c(), W.m(i, null))),
            (!P || 2048 & r[0]) && A !== (A = mt(e[11]) + "") && $(k, A);
          const s = {};
          (262144 & r[0]) | (128 & r[1]) &&
            (s.$$scope = {
              dirty: r,
              ctx: e,
            }),
            D.$set(s),
            (!P || 33052 & r[0]) &&
              L !==
                (L =
                  mt(
                    e[15]
                      ? e[4].isPrime
                        ? e[8].slice(-1)[0]
                        : e[2].maxAttempts * e[2].attemptInterval
                      : e[3]
                  ) + "") &&
              $(O, L);
        },
        i(e) {
          P || (Z(D.$$.fragment, e), (P = !0));
        },
        o(e) {
          q(D.$$.fragment, e), (P = !1);
        },
        d(e) {
          N && N.d(e), e && y(t), e && y(n), W.d(), e && y(u), e && y(c), te(D);
        },
      }
    );
  }

  function et(e) {
    let t, n, r, s, i, o;
    return {
      c() {
        (t = w("p")),
          (n = _("We're really sorry. The answer is ")),
          (r = w("a")),
          (s = _("here")),
          (o = _(
            ", though, if you want to maintain your streak.\n                                We won't tell..."
          )),
          M(r, "href", (i = e[1].url)),
          M(t, "class", "text-xs text-custom-line pt-1");
      },
      m(e, i) {
        g(e, t, i), p(t, n), p(t, r), p(r, s), p(t, o);
      },
      p(e, t) {
        2 & t[0] && i !== (i = e[1].url) && M(r, "href", i);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function tt(e) {
    let t;
    return {
      c() {
        (t = w("div")),
          (t.innerHTML =
            "<p>" +
            volumeT[language] +
            '</p> \n\n                <svg class="mt-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"></path></svg>'),
          M(
            t,
            "class",
            "text-center p-3 flex flex-col items-center text-sm text-custom-line"
          );
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function nt(e) {
    let t;

    function n(e, t) {
      return e[15] ? st : it;
    }
    let r = n(e),
      s = r(e);
    return {
      c() {
        (t = w("div")),
          s.c(),
          M(t, "class", "flex w-full h-full absolute justify-between");
      },
      m(e, n) {
        g(e, t, n), s.m(t, null);
      },
      p(e, i) {
        r === (r = n(e)) && s
          ? s.p(e, i)
          : (s.d(1), (s = r(e)), s && (s.c(), s.m(t, null)));
      },
      d(e) {
        e && y(t), s.d();
      },
    };
  }

  function rt(e) {
    let t,
      n = e[15] && lt(e);
    return {
      c() {
        (t = w("div")), n && n.c(), M(t, "class", "w-full h-full absolute");
      },
      m(e, r) {
        g(e, t, r), n && n.m(t, null);
      },
      p(e, r) {
        e[15]
          ? n
            ? n.p(e, r)
            : ((n = lt(e)), n.c(), n.m(t, null))
          : n && (n.d(1), (n = null));
      },
      d(e) {
        e && y(t), n && n.d();
      },
    };
  }

  function st(e) {
    let t,
      n = Array(e[2].maxAttempts + 1),
      r = [];
    for (let t = 0; t < n.length; t += 1) r[t] = ot(Be(e, n, t));
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = b();
      },
      m(e, n) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, n);
        g(e, t, n);
      },
      p(e, s) {
        if (4 & s[0]) {
          const s = n.length;
          let i;
          for (n = Array(e[2].maxAttempts + 1), i = s; i < n.length; i += 1)
            Be(e, n, i),
              r[i] || ((r[i] = ot()), r[i].c(), r[i].m(t.parentNode, t));
          for (i = n.length; i < s; i += 1) r[i].d(1);
          r.length = n.length;
        }
      },
      d(e) {
        v(r, e), e && y(t);
      },
    };
  }

  function it(e) {
    let t,
      n = Array(Math.floor(e[3] / e[2].attemptInterval)),
      r = [];
    for (let t = 0; t < n.length; t += 1) r[t] = at(ze(e, n, t));
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = b();
      },
      m(e, n) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, n);
        g(e, t, n);
      },
      p(e, s) {
        if (12 & s[0]) {
          const s = n.length;
          let i;
          for (
            n = Array(Math.floor(e[3] / e[2].attemptInterval)), i = s;
            i < n.length;
            i += 1
          )
            ze(e, n, i),
              r[i] || ((r[i] = at()), r[i].c(), r[i].m(t.parentNode, t));
          for (i = n.length; i < s; i += 1) r[i].d(1);
          r.length = n.length;
        }
      },
      d(e) {
        v(r, e), e && y(t);
      },
    };
  }

  function ot(e) {
    let t;
    return {
      c() {
        (t = w("div")), M(t, "class", "bg-custom-bg w-px h-full");
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function at(e) {
    let t;
    return {
      c() {
        (t = w("div")), M(t, "class", "bg-custom-bg w-px h-full");
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function lt(e) {
    let t,
      n,
      r,
      s,
      i = e[8],
      o = [];
    for (let t = 0; t < i.length; t += 1) o[t] = ut(Ue(e, i, t));
    return {
      c() {
        (t = w("div")), (n = x());
        for (let e = 0; e < o.length; e += 1) o[e].c();
        (r = x()),
          (s = w("div")),
          M(t, "class", "bg-custom-line w-px h-full absolute right-0"),
          M(s, "class", "bg-custom-mg w-px h-full absolute right-0");
      },
      m(e, i) {
        g(e, t, i), g(e, n, i);
        for (let t = 0; t < o.length; t += 1) o[t].m(e, i);
        g(e, r, i), g(e, s, i);
      },
      p(e, t) {
        if (384 & t[0]) {
          let n;
          for (i = e[8], n = 0; n < i.length; n += 1) {
            const s = Ue(e, i, n);
            o[n]
              ? o[n].p(s, t)
              : ((o[n] = ut(s)), o[n].c(), o[n].m(r.parentNode, r));
          }
          for (; n < o.length; n += 1) o[n].d(1);
          o.length = i.length;
        }
      },
      d(e) {
        e && y(t), e && y(n), v(o, e), e && y(r), e && y(s);
      },
    };
  }

  function ut(e) {
    let t;
    return {
      c() {
        (t = w("div")),
          M(t, "class", "w-px h-full absolute"),
          T(t, "left", (e[8][e[35]] / e[8].slice(-1)[0]) * 100 + "%"),
          Y(t, "bg-custom-bg", e[35] < e[7] - 1),
          Y(t, "bg-custom-mg", e[35] > e[7] - 1),
          Y(t, "bg-custom-line", e[35] == e[7] - 1);
      },
      m(e, n) {
        g(e, t, n);
      },
      p(e, n) {
        256 & n[0] &&
          T(t, "left", (e[8][e[35]] / e[8].slice(-1)[0]) * 100 + "%"),
          128 & n[0] && Y(t, "bg-custom-bg", e[35] < e[7] - 1),
          128 & n[0] && Y(t, "bg-custom-mg", e[35] > e[7] - 1),
          128 & n[0] && Y(t, "bg-custom-line", e[35] == e[7] - 1);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function ct(t) {
    let n;
    return {
      c() {
        (n = w("div")),
          (n.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'),
          M(n, "class", "ml-1 relative z-10");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function dt(e) {
    let t, n, r;
    return (
      (n = new Fe({
        props: {
          musicIsPlaying: e[18],
        },
      })),
      {
        c() {
          (t = w("div")), Q(n.$$.fragment), M(t, "class", "relative z-10");
        },
        m(e, s) {
          g(e, t, s), ee(n, t, null), (r = !0);
        },
        p(e, t) {
          const r = {};
          262144 & t[0] && (r.musicIsPlaying = e[18]), n.$set(r);
        },
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && y(t), te(n);
        },
      }
    );
  }

  function ht(e) {
    let t, n, r, s;
    const i = [dt, ct],
      o = [];

    function a(e, t) {
      return e[18] ? 0 : 1;
    }
    return (
      (n = a(e)),
      (r = o[n] = i[n](e)),
      {
        c() {
          (t = w("div")),
            r.c(),
            M(
              t,
              "class",
              "flex justify-center items-center text-custom-fg h-14 w-14 border-2 rounded-full relative overflow-hidden"
            );
        },
        m(e, r) {
          g(e, t, r), o[n].m(t, null), (s = !0);
        },
        p(e, s) {
          let l = n;
          (n = a(e)),
            n === l
              ? o[n].p(e, s)
              : (J(),
                q(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                K(),
                (r = o[n]),
                r ? r.p(e, s) : ((r = o[n] = i[n](e)), r.c()),
                Z(r, 1),
                r.m(t, null));
        },
        i(e) {
          s || (Z(r), (s = !0));
        },
        o(e) {
          q(r), (s = !1);
        },
        d(e) {
          e && y(t), o[n].d();
        },
      }
    );
  }

  function ft(e) {
    let t, n, r, s, i, o, a, u, c, d, h;
    const f = [Je, Ve],
      m = [];

    function v(e, t) {
      return e[17] ? 0 : 1;
    }
    return (
      (s = v(e)),
      (i = m[s] = f[s](e)),
      {
        c() {
          (t = w("script")),
            (r = x()),
            i.c(),
            (o = x()),
            (a = w("div")),
            (u = w("div")),
            l(t.src, (n = "https://w.soundcloud.com/player/api.js")) ||
              M(t, "src", "https://w.soundcloud.com/player/api.js"),
            M(a, "class", "hidden");
        },
        m(n, i) {
          p(je.head, t),
            g(n, r, i),
            m[s].m(n, i),
            g(n, o, i),
            g(n, a, i),
            p(a, u),
            e[23](u),
            (c = !0),
            d || ((h = S(t, "load", e[19])), (d = !0));
        },
        p(e, t) {
          let n = s;
          (s = v(e)),
            s === n
              ? m[s].p(e, t)
              : (J(),
                q(m[n], 1, 1, () => {
                  m[n] = null;
                }),
                K(),
                (i = m[s]),
                i ? i.p(e, t) : ((i = m[s] = f[s](e)), i.c()),
                Z(i, 1),
                i.m(o.parentNode, o));
        },
        i(e) {
          c || (Z(i), (c = !0));
        },
        o(e) {
          q(i), (c = !1);
        },
        d(n) {
          y(t),
            n && y(r),
            m[s].d(n),
            n && y(o),
            n && y(a),
            e[23](null),
            (d = !1),
            h();
        },
      }
    );
  }

  function mt(e) {
    var t = Math.floor(e / 6e4),
      n = ((e % 6e4) / 1e3).toFixed(0);
    return t + ":" + (n < 10 ? "0" : "") + n;
  }

  function pt(e, t, n) {
    let r, s, i, o, a, l, u;
    const c = A();
    let { currentAttempt: d } = t,
      { currentHeardle: h } = t,
      { config: f } = t,
      { trackDuration: m = 0 } = t,
      { gameState: p } = t,
      g = !1;
    var y;
    let v = 0,
      w = 0,
      k = !1,
      _ = !1,
      x = !1,
      b = !1,
      S = !1;
    const M = () => {
      y.seekTo(0), y.pause();
    };

    function $(e) {
      c("updatePlayerState", {
        musicIsPlaying: e,
      });
    }
    let D;

    function T() {
      (y = SC.Widget("soundcloud" + h.id)).bind(
        SC.Widget.Events.READY,
        function () {
          y.getCurrentSound(function (e) {
            "BLOCK" === e.policy && n(9, (g = !0)),
              c("updateSong", {
                currentSong: e,
              });
          }),
            y.bind(SC.Widget.Events.PAUSE, function () {
              $(!1);
            }),
            y.bind(SC.Widget.Events.PLAY, function () {
              b ||
                (pe("startGame", {
                  name: "startGame",
                }),
                pe("startGame#" + h.id, {
                  name: "startGame",
                }),
                (b = !0)),
                $(!0),
                n(12, (x = !0));
            }),
            y.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
              n(11, (w = e.currentPosition)),
                1 == s
                  ? p.isPrime
                    ? (n(10, (v = (w / u) * 100)), w > u && M())
                    : (n(10, (v = (w / (d * f.attemptInterval)) * 100)),
                      w > d * f.attemptInterval && M())
                  : (n(10, (v = (w / m) * 100)), w > m && M());
            });
        }
      );
    }
    P(() => {
      const e = document.createElement("iframe");
      (e.name = h.id),
        (e.id = "soundcloud" + h.id),
        (e.allow = "autoplay"),
        (e.height = 0),
        (e.src =
          "https://w.soundcloud.com/player/?url=" + h.url + "&cache=" + h.id),
        D.appendChild(e),
        (_ = !0),
        k &&
          (setTimeout(() => {
            n(13, (S = !0));
          }, 6e3),
          T());
    });
    return (
      (e.$$set = (e) => {
        "currentAttempt" in e && n(0, (d = e.currentAttempt)),
          "currentHeardle" in e && n(1, (h = e.currentHeardle)),
          "config" in e && n(2, (f = e.config)),
          "trackDuration" in e && n(3, (m = e.trackDuration)),
          "gameState" in e && n(4, (p = e.gameState));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty[0] && n(18, (r = p.musicIsPlaying)),
          16 & e.$$.dirty[0] && n(15, (s = p.gameIsActive)),
          16 & e.$$.dirty[0] && n(17, (i = p.playerIsReady)),
          1 & e.$$.dirty[0] && n(7, (o = d)),
          4 & e.$$.dirty[0] && n(8, (a = f.attemptIntervalAlt)),
          405 & e.$$.dirty[0] &&
            n(
              16,
              (l = p.isPrime
                ? (a[o - 1] / a.slice(-1)[0]) * 100
                : (d / f.maxAttempts) * 100)
            ),
          384 & e.$$.dirty[0] && (u = a[o - 1]);
      }),
      [
        d,
        h,
        f,
        m,
        p,
        () => {
          y.seekTo(0), y.play();
        },
        M,
        o,
        a,
        g,
        v,
        w,
        x,
        S,
        D,
        s,
        l,
        i,
        r,
        function () {
          (k = !0),
            _ &&
              (setTimeout(() => {
                n(13, (S = !0));
              }, 6e3),
              T());
        },
        () => {
          y.toggle();
        },
        () => {
          y.seekTo(0), y.play();
        },
        () => {
          window.location.reload();
        },
        function (e) {
          H[e ? "unshift" : "push"](() => {
            (D = e), n(14, D);
          });
        },
      ]
    );
  }
  class gt extends se {
    constructor(e) {
      super(),
        re(
          this,
          e,
          pt,
          ft,
          i,
          {
            currentAttempt: 0,
            currentHeardle: 1,
            config: 2,
            trackDuration: 3,
            gameState: 4,
            togglePlayState: 20,
            scPlay: 5,
            scPause: 6,
            resetAndPlay: 21,
          },
          null,
          [-1, -1]
        );
    }
    get togglePlayState() {
      return this.$$.ctx[20];
    }
    get scPlay() {
      return this.$$.ctx[5];
    }
    get scPause() {
      return this.$$.ctx[6];
    }
    get resetAndPlay() {
      return this.$$.ctx[21];
    }
  }
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self && self;

  function yt(e) {
    var t = {
      exports: {},
    };
    return e(t, t.exports), t.exports;
  }

  function vt(e) {
    throw new Error(
      'Could not dynamically require "' +
        e +
        '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.'
    );
  }
  var wt = yt(function (e, t) {
      var n;
      (n = function () {
        function e(e, t) {
          var n = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t &&
              (r = r.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }

        function t(t) {
          for (var n = 1; n < arguments.length; n++) {
            var s = null != arguments[n] ? arguments[n] : {};
            n % 2
              ? e(Object(s), !0).forEach(function (e) {
                  r(t, e, s[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s))
              : e(Object(s)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(s, e)
                  );
                });
          }
          return t;
        }

        function n(e) {
          return (n =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                })(e);
        }

        function r(e, t, n) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = n),
            e
          );
        }

        function s(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return o(e);
            })(e) ||
            (function (e) {
              if (
                ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
                null != e["@@iterator"]
              )
                return Array.from(e);
            })(e) ||
            i(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }

        function i(e, t) {
          if (e) {
            if ("string" == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === n && e.constructor && (n = e.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(e)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? o(e, t)
                : void 0
            );
          }
        }

        function o(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
          return r;
        }
        var a = function (e) {
            return "string" == typeof e ? document.querySelector(e) : e();
          },
          l = function (e, t) {
            var n = "string" == typeof e ? document.createElement(e) : e;
            for (var r in t) {
              var s = t[r];
              if ("inside" === r) s.append(n);
              else if ("dest" === r) a(s[0]).insertAdjacentElement(s[1], n);
              else if ("around" === r) {
                var i = s;
                i.parentNode.insertBefore(n, i),
                  n.append(i),
                  null != i.getAttribute("autofocus") && i.focus();
              } else r in n ? (n[r] = s) : n.setAttribute(r, s);
            }
            return n;
          },
          u = function (e, t) {
            return (
              (e = e.toString().toLowerCase()),
              t
                ? e
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .normalize("NFC")
                : e
            );
          },
          c = function (e, n) {
            return l(
              "mark",
              t(
                {
                  innerHTML: e,
                },
                "string" == typeof n && {
                  class: n,
                }
              )
            ).outerHTML;
          },
          d = function (e, t) {
            t.input.dispatchEvent(
              new CustomEvent(e, {
                bubbles: !0,
                detail: t.feedback,
                cancelable: !0,
              })
            );
          },
          h = function (e, t, n) {
            var r = n || {},
              s = r.mode,
              i = r.diacritics,
              o = r.highlight,
              a = u(t, i);
            if (((t = t.toString()), (e = u(e, i)), "loose" === s)) {
              var l = (e = e.replace(/ /g, "")).length,
                d = 0,
                h = Array.from(t)
                  .map(function (t, n) {
                    return (
                      d < l && a[n] === e[d] && ((t = o ? c(t, o) : t), d++), t
                    );
                  })
                  .join("");
              if (d === l) return h;
            } else {
              var f = a.indexOf(e);
              if (~f)
                return (
                  (e = t.substring(f, f + e.length)),
                  o ? t.replace(e, c(e, o)) : t
                );
            }
          },
          f = function (e, t) {
            return new Promise(function (n, r) {
              var s;
              return (s = e.data).cache && s.store
                ? n()
                : new Promise(function (e, n) {
                    return "function" == typeof s.src
                      ? s.src(t).then(e, n)
                      : e(s.src);
                  }).then(function (t) {
                    try {
                      return (e.feedback = s.store = t), d("response", e), n();
                    } catch (e) {
                      return r(e);
                    }
                  }, r);
            });
          },
          m = function (e, t) {
            var n = t.data,
              r = t.searchEngine,
              s = [];
            n.store.forEach(function (o, a) {
              var l = function (n) {
                var i = n ? o[language][n] : o[language],
                  a =
                    "function" == typeof r
                      ? r(e, i)
                      : h(e, i, {
                          mode: r,
                          diacritics: t.diacritics,
                          highlight: t.resultItem.highlight,
                        });
                if (a) {
                  var l = {
                    match: a,
                    value: o,
                  };
                  n && (l.key = n), s.push(l);
                }
              };
              if (n.keys) {
                var u,
                  c = (function (e, t) {
                    var n =
                      ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                      e["@@iterator"];
                    if (!n) {
                      if (Array.isArray(e) || (n = i(e))) {
                        n && (e = n);
                        var r = 0,
                          s = function () {};
                        return {
                          s: s,
                          n: function () {
                            return r >= e.length
                              ? {
                                  done: !0,
                                }
                              : {
                                  done: !1,
                                  value: e[r++],
                                };
                          },
                          e: function (e) {
                            throw e;
                          },
                          f: s,
                        };
                      }
                      throw new TypeError(
                        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                      );
                    }
                    var o,
                      a = !0,
                      l = !1;
                    return {
                      s: function () {
                        n = n.call(e);
                      },
                      n: function () {
                        var e = n.next();
                        return (a = e.done), e;
                      },
                      e: function (e) {
                        (l = !0), (o = e);
                      },
                      f: function () {
                        try {
                          a || null == n.return || n.return();
                        } finally {
                          if (l) throw o;
                        }
                      },
                    };
                  })(n.keys);
                try {
                  for (c.s(); !(u = c.n()).done; ) l(u.value);
                } catch (e) {
                  c.e(e);
                } finally {
                  c.f();
                }
              } else l();
            }),
              n.filter && (s = n.filter(s));
            var o = s.slice(0, t.resultsList.maxResults);
            (t.feedback = {
              query: e,
              matches: s,
              results: o,
            }),
              d("results", t);
          },
          p = "aria-expanded",
          g = "aria-activedescendant",
          y = "aria-selected",
          v = function (e, n) {
            const selection = t(
              {
                index: n,
              },
              e.feedback.results[n]
            );
            e.feedback.selection = {
              index: selection.index,
              value: selection.value[language],
              match: selection.match,
            };
          },
          w = function (e) {
            e.isOpen ||
              ((e.wrapper || e.input).setAttribute(p, !0),
              e.list.removeAttribute("hidden"),
              (e.isOpen = !0),
              d("open", e));
          },
          k = function (e) {
            e.isOpen &&
              ((e.wrapper || e.input).setAttribute(p, !1),
              e.input.setAttribute(g, ""),
              e.list.setAttribute("hidden", ""),
              (e.isOpen = !1),
              d("close", e));
          },
          _ = function (e, t) {
            var n = t.resultItem,
              r = t.list.getElementsByTagName(n.tag),
              i = !!n.selected && n.selected.split(" ");
            if (t.isOpen && r.length) {
              var o,
                a,
                l = t.cursor;
              e >= r.length && (e = 0),
                e < 0 && (e = r.length - 1),
                (t.cursor = e),
                l > -1 &&
                  (r[l].removeAttribute(y),
                  i && (a = r[l].classList).remove.apply(a, s(i))),
                r[e].setAttribute(y, !0),
                i && (o = r[e].classList).add.apply(o, s(i)),
                t.input.setAttribute(g, r[t.cursor].id),
                (t.list.scrollTop =
                  r[e].offsetTop - t.list.clientHeight + r[e].clientHeight + 5),
                (t.feedback.cursor = t.cursor),
                v(t, e),
                d("navigate", t);
            }
          },
          x = function (e) {
            _(e.cursor + 1, e);
          },
          b = function (e) {
            _(e.cursor - 1, e);
          },
          S = function (e, t, n) {
            (n = n >= 0 ? n : e.cursor) < 0 ||
              ((e.feedback.event = t), v(e, n), d("selection", e), k(e));
          };

        function M(e, n) {
          var r = this;
          return new Promise(function (s, i) {
            var o, a;
            return (
              (o =
                n ||
                ((a = e.input) instanceof HTMLInputElement ||
                a instanceof HTMLTextAreaElement
                  ? a.value
                  : a.innerHTML)),
              (function (e, t, n) {
                return t ? t(e) : e.length >= n;
              })((o = e.query ? e.query(o) : o), e.trigger, e.threshold)
                ? f(e, o).then(function (n) {
                    try {
                      return e.feedback instanceof Error
                        ? s()
                        : (m(o, e),
                          e.resultsList &&
                            (function (e) {
                              var n = e.resultsList,
                                r = e.list,
                                s = e.resultItem,
                                i = e.feedback,
                                o = i.matches,
                                a = i.results;
                              if (
                                ((e.cursor = -1),
                                (r.innerHTML = ""),
                                o.length || n.noResults)
                              ) {
                                var u = new DocumentFragment();
                                a.forEach(function (e, n) {
                                  var r = l(
                                    s.tag,
                                    t(
                                      {
                                        id: "".concat(s.id, "_").concat(n),
                                        role: "option",
                                        innerHTML: e.match,
                                        inside: u,
                                      },
                                      s.class && {
                                        class: s.class,
                                      }
                                    )
                                  );
                                  s.element && s.element(r, e);
                                }),
                                  r.append(u),
                                  n.element && n.element(r, i),
                                  w(e);
                              } else k(e);
                            })(e),
                          u.call(r));
                    } catch (e) {
                      return i(e);
                    }
                  }, i)
                : (k(e), u.call(r))
            );

            function u() {
              return s();
            }
          });
        }
        var $ = function (e, t) {
          for (var n in e) for (var r in e[n]) t(n, r);
        };

        function D(e) {
          var n = this;
          return new Promise(function (r, s) {
            var i, o, a;
            if (
              ((i = e.placeHolder),
              (a = {
                role: "combobox",
                "aria-owns": (o = e.resultsList).id,
                "aria-haspopup": !0,
                "aria-expanded": !1,
              }),
              l(
                e.input,
                t(
                  t(
                    {
                      "aria-controls": o.id,
                      "aria-autocomplete": "both",
                    },
                    i && {
                      placeholder: i,
                    }
                  ),
                  !e.wrapper && t({}, a)
                )
              ),
              e.wrapper &&
                (e.wrapper = l(
                  "div",
                  t(
                    {
                      around: e.input,
                      class: e.name + "_wrapper",
                    },
                    a
                  )
                )),
              o &&
                (e.list = l(
                  o.tag,
                  t(
                    {
                      dest: [o.destination, o.position],
                      id: o.id,
                      role: "listbox",
                      hidden: "hidden",
                    },
                    o.class && {
                      class: o.class,
                    }
                  )
                )),
              (function (e) {
                var n,
                  r,
                  s,
                  i = e.events,
                  o =
                    ((n = function () {
                      return M(e);
                    }),
                    (r = e.debounce),
                    function () {
                      clearTimeout(s),
                        (s = setTimeout(function () {
                          return n();
                        }, r));
                    }),
                  a = (e.events = t(
                    {
                      input: t({}, i && i.input),
                    },
                    e.resultsList && {
                      list: i ? t({}, i.list) : {},
                    }
                  )),
                  l = {
                    input: {
                      input: function () {
                        o();
                      },
                      keydown: function (t) {
                        !(function (e, t) {
                          switch (e.keyCode) {
                            case 40:
                            case 38:
                              e.preventDefault(),
                                40 === e.keyCode ? x(t) : b(t);
                              break;
                            case 13:
                              t.submit || e.preventDefault(),
                                t.cursor >= 0 && S(t, e);
                              break;
                            case 9:
                              t.resultsList.tabSelect &&
                                t.cursor >= 0 &&
                                S(t, e);
                              break;
                            case 27:
                              (t.input.value = ""), k(t);
                          }
                        })(t, e);
                      },
                      blur: function () {
                        k(e);
                      },
                    },
                    list: {
                      mousedown: function (e) {
                        e.preventDefault();
                      },
                      click: function (t) {
                        !(function (e, t) {
                          var n = t.resultItem.tag.toUpperCase(),
                            r = Array.from(t.list.querySelectorAll(n)),
                            s = e.target.closest(n);
                          s && s.nodeName === n && S(t, e, r.indexOf(s));
                        })(t, e);
                      },
                    },
                  };
                $(l, function (t, n) {
                  (e.resultsList || "input" === n) &&
                    (a[t][n] || (a[t][n] = l[t][n]));
                }),
                  $(a, function (t, n) {
                    e[t].addEventListener(n, a[t][n]);
                  });
              })(e),
              e.data.cache)
            )
              return f(e).then(function (e) {
                try {
                  return u.call(n);
                } catch (e) {
                  return s(e);
                }
              }, s);

            function u() {
              return d("init", e), r();
            }
            return u.call(n);
          });
        }

        function T(e) {
          var t = e.prototype;
          (t.init = function () {
            D(this);
          }),
            (t.start = function (e) {
              M(this, e);
            }),
            (t.unInit = function () {
              if (this.wrapper) {
                var e = this.wrapper.parentNode;
                e.insertBefore(this.input, this.wrapper),
                  e.removeChild(this.wrapper);
              }
              var t;
              $((t = this).events, function (e, n) {
                t[e].removeEventListener(n, t.events[e][n]);
              });
            }),
            (t.open = function () {
              w(this);
            }),
            (t.close = function () {
              k(this);
            }),
            (t.goTo = function (e) {
              _(e, this);
            }),
            (t.next = function () {
              x(this);
            }),
            (t.previous = function () {
              b(this);
            }),
            (t.select = function (e) {
              S(this, null, e);
            }),
            (t.search = function (e, t, n) {
              return h(e, t, n);
            });
        }
        return function e(t) {
          (this.options = t),
            (this.id = e.instances = (e.instances || 0) + 1),
            (this.name = "autoComplete"),
            (this.wrapper = 1),
            (this.threshold = 1),
            (this.debounce = 0),
            (this.resultsList = {
              position: "afterend",
              tag: "ul",
              maxResults: 5,
            }),
            (this.resultItem = {
              tag: "li",
            }),
            (function (e) {
              var t = e.name,
                r = e.options,
                s = e.resultsList,
                i = e.resultItem;
              for (var o in r)
                if ("object" === n(r[o]))
                  for (var l in (e[o] || (e[o] = {}), r[o])) e[o][l] = r[o][l];
                else e[o] = r[o];
              (e.selector = e.selector || "#" + t),
                (s.destination = s.destination || e.selector),
                (s.id = s.id || t + "_list_" + e.id),
                (i.id = i.id || t + "_result"),
                (e.input = a(e.selector));
            })(this),
            T.call(this, e),
            D(this);
        };
      }),
        (e.exports = n());
    }),
    kt = _t(2);

  function _t(e) {
    if (
      "number" != typeof e ||
      Number.isNaN(e) ||
      e < 1 ||
      e === Number.POSITIVE_INFINITY
    )
      throw new Error("`" + e + "` is not a valid argument for `n-gram`");
    return function (t) {
      var n,
        r,
        s = [];
      if (null == t) return s;
      if (((r = t.slice ? t : String(t)), (n = r.length - e + 1) < 1)) return s;
      for (; n--; ) s[n] = r.slice(n, n + e);
      return s;
    };
  }

  function xt(e, t) {
    let n, r, s, i;
    Array.isArray(e)
      ? (s = e.map((e) => String(e).toLowerCase()))
      : ((n = String(e).toLowerCase()), (s = 1 === n.length ? [n] : kt(n))),
      Array.isArray(t)
        ? (i = t.map((e) => String(e).toLowerCase()))
        : ((r = String(t).toLowerCase()), (i = 1 === r.length ? [r] : kt(r)));
    let o,
      a,
      l,
      u = -1,
      c = 0;
    for (; ++u < s.length; )
      for (o = s[u], l = -1; ++l < i.length; )
        if (((a = i[l]), o === a)) {
          c++, (i[l] = "");
          break;
        }
    return (2 * c) / (s.length + i.length);
  }

  function bt(t) {
    let n, r;
    return {
      c() {
        (n = _(skipT[language] + " ")),
          (r = w("span")),
          (r.textContent = "(+1.5s)");
      },
      m(e, t) {
        g(e, n, t), g(e, r, t);
      },
      p: e,
      d(e) {
        e && y(n), e && y(r);
      },
    };
  }

  function St(e) {
    let t, n, r, s, i;
    return {
      c() {
        (t = _(skipT[language] + " ")),
          (n = w("span")),
          (r = _("(+")),
          (s = _(e[0])),
          (i = _("s)")),
          M(n, "class", "tracking-normal lowercase"),
          Y(n, "hidden", e[0] >= e[1].maxAttempts);
      },
      m(e, o) {
        g(e, t, o), g(e, n, o), p(n, r), p(n, s), p(n, i);
      },
      p(e, t) {
        1 & t && $(s, e[0]), 3 & t && Y(n, "hidden", e[0] >= e[1].maxAttempts);
      },
      d(e) {
        e && y(t), e && y(n);
      },
    };
  }

  function Mt(e) {
    let t;

    function n(e, t) {
      return e[2] ? St : bt;
    }
    let r = n(e),
      s = r(e);
    return {
      c() {
        s.c(), (t = b());
      },
      m(e, n) {
        s.m(e, n), g(e, t, n);
      },
      p(e, i) {
        r === (r = n(e)) && s
          ? s.p(e, i)
          : (s.d(1), (s = r(e)), s && (s.c(), s.m(t.parentNode, t)));
      },
      d(e) {
        s.d(e), e && y(t);
      },
    };
  }

  function $t(e) {
    let t;
    return {
      c() {
        t = _(submitT[language]);
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Dt(e) {
    let t, n, s, i, o, a, l, u, c, d, h, f, m, v, _, b, $, T, Y;
    return (
      (v = new ae({
        props: {
          secondary: !0,
          $$slots: {
            default: [Mt],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      v.$on("click", e[10]),
      (b = new ae({
        props: {
          primary: !0,
          $$slots: {
            default: [$t],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      b.$on("click", e[5]),
      {
        c() {
          (t = w("div")),
            (n = w("div")),
            (s = w("div")),
            (i = w("div")),
            (o = k("svg")),
            (a = k("circle")),
            (l = k("line")),
            (u = x()),
            (c = w("input")),
            (d = x()),
            (h = w("div")),
            (h.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),
            (f = x()),
            (m = w("div")),
            Q(v.$$.fragment),
            (_ = x()),
            Q(b.$$.fragment),
            M(a, "cx", "11"),
            M(a, "cy", "11"),
            M(a, "r", "8"),
            M(l, "x1", "21"),
            M(l, "y1", "21"),
            M(l, "x2", "16.65"),
            M(l, "y2", "16.65"),
            M(o, "class", "absolute top-4 left-3"),
            M(o, "xmlns", "http://www.w3.org/2000/svg"),
            M(o, "width", "18"),
            M(o, "height", "18"),
            M(o, "viewBox", "0 0 24 24"),
            M(o, "fill", "none"),
            M(o, "stroke", "currentColor"),
            M(o, "stroke-width", "2"),
            M(o, "stroke-linecap", "round"),
            M(o, "stroke-linejoin", "round"),
            M(
              c,
              "class",
              "focus:outline-none focus:border-custom-positive w-full p-3 pl-9 placeholder:text-custom-line bg-custom-bg text-custom-fg border-custom-mg"
            ),
            M(c, "id", "autoComplete"),
            M(c, "type", "search"),
            M(c, "dir", "ltr"),
            M(c, "spellcheck", "false"),
            M(c, "autocorrect", "off"),
            M(c, "autocomplete", "off"),
            M(c, "autocapitalize", "off"),
            M(h, "class", "absolute right-3 top-4"),
            M(i, "class", "autoComplete_wrapper relative"),
            M(m, "class", "flex justify-between pt-3"),
            M(n, "class", "m-3 mt-0"),
            M(t, "class", "max-w-screen-sm w-full mx-auto flex-col");
        },
        m(r, y) {
          g(r, t, y),
            p(t, n),
            p(n, s),
            p(s, i),
            p(i, o),
            p(o, a),
            p(o, l),
            p(i, u),
            p(i, c),
            D(c, e[4]),
            p(i, d),
            p(i, h),
            p(s, f),
            p(s, m),
            ee(v, m, null),
            p(m, _),
            ee(b, m, null),
            ($ = !0),
            T || ((Y = [S(c, "input", e[8]), S(h, "click", e[9])]), (T = !0));
        },
        p(e, [t]) {
          16 & t && D(c, e[4]);
          const n = {};
          32775 & t &&
            (n.$$scope = {
              dirty: t,
              ctx: e,
            }),
            v.$set(n);
          const r = {};
          32768 & t &&
            (r.$$scope = {
              dirty: t,
              ctx: e,
            }),
            b.$set(r);
        },
        i(e) {
          $ || (Z(v.$$.fragment, e), Z(b.$$.fragment, e), ($ = !0));
        },
        o(e) {
          q(v.$$.fragment, e), q(b.$$.fragment, e), ($ = !1);
        },
        d(e) {
          e && y(t), te(v), te(b), (T = !1), r(Y);
        },
      }
    );
  }

  function Tt(e, t, n) {
    let r,
      { allOptions: s } = t,
      { currentAttempt: i } = t,
      { config: o } = t,
      { isPrime: a } = t;
    const l = {
        focus() {
          document.getElementById("autoComplete").focus();
        },
        clear() {
          (document.getElementById("autoComplete").value = ""), n(4, (r = ""));
        },
      },
      u = A();

    function c(e) {
      "skipped" == e
        ? (u("guess", {
            guess: r,
            isSkipped: !0,
          }),
          n(4, (r = "")))
        : void 0 !== r && "" !== r.trim()
        ? (u("guess", {
            guess: r,
            isSkipped: !1,
          }),
          n(4, (r = "")))
        : l.focus();
    }
    P(() => {
      !(function () {
        const e = new wt({
          placeHolder: placeholderT[language],
          threshold: 1,
          wrapper: !1,
          resultsList: {
            maxResults: 10,
          },
          diacritics: !0,
          noresults: !0,
          searchEngine: "loose",
          data: {
            src: s,
            cache: !1,
            filter: (e) => {
              if (e.length < 6) return e;
              const t = document
                .getElementById("autoComplete")
                .value.toLowerCase();
              return (e = e.sort((e, n) => {
                let r = xt(t, e.value[language].toLowerCase()),
                  s = xt(t, n.value[language].toLowerCase());
                return r === s
                  ? e.value[language] > n.value[language]
                    ? -1
                    : 1
                  : s > r
                  ? 1
                  : -1;
              }));
            },
          },
          resultItem: {
            highlight: !0,
          },
          events: {
            focus: {
              focus: (e) => {},
            },
            input: {
              selection: (t) => {
                let s = t.detail.selection.value;
                (e.input.value = s), n(4, (r = s));
              },
            },
          },
        });
      })();
    });
    return (
      (e.$$set = (e) => {
        s.pop();
        // console.log('all', s)
        "allOptions" in e && n(6, (s = e.allOptions)),
          "currentAttempt" in e && n(0, (i = e.currentAttempt)),
          "config" in e && n(1, (o = e.config)),
          "isPrime" in e && n(2, (a = e.isPrime));
      }),
      [
        i,
        o,
        a,
        l,
        r,
        c,
        s,
        () => {
          soundcloudWidget.toggle();
        },
        function () {
          (r = this.value), n(4, r);
        },
        () => l.clear(),
        () => c("skipped"),
      ]
    );
  }
  _t(3);
  class Yt extends se {
    constructor(e) {
      super(),
        re(this, e, Tt, Dt, i, {
          allOptions: 6,
          currentAttempt: 0,
          config: 1,
          isPrime: 2,
          guessInput: 3,
          togglePlayState: 7,
        });
    }
    get guessInput() {
      return this.$$.ctx[3];
    }
    get togglePlayState() {
      return this.$$.ctx[7];
    }
  }

  function Ct(e) {
    let t, n, r, s, i, o, a, l, u, d, v, k;
    const b = e[6].default,
      D = c(b, e, e[5], null);
    return {
      c() {
        (t = w("div")),
          (n = w("div")),
          (r = w("div")),
          (s = w("h2")),
          (i = _(e[0])),
          (o = x()),
          (a = w("div")),
          (l = w("button")),
          (l.innerHTML =
            '<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),
          (u = x()),
          D && D.c(),
          M(
            s,
            "class",
            "text-sm text-center uppercase text-custom-line font-semibold tracking-widest"
          ),
          M(r, "class", "flex-1 pl-7"),
          (l.autofocus = !0),
          M(l, "class", "border-none text-custom-mg"),
          M(a, "class", "justify-self-end flex"),
          M(n, "class", "flex items-center justify-center mb-6"),
          M(t, "class", "bg-custom-bg border border-custom-mg p-6");
      },
      m(c, h) {
        g(c, t, h),
          p(t, n),
          p(n, r),
          p(r, s),
          p(s, i),
          p(n, o),
          p(n, a),
          p(a, l),
          p(t, u),
          D && D.m(t, null),
          (d = !0),
          l.focus(),
          v || ((k = S(l, "click", e[3])), (v = !0));
      },
      p(e, t) {
        (!d || 1 & t) && $(i, e[0]),
          D &&
            D.p &&
            (!d || 32 & t) &&
            f(D, b, e, e[5], d ? h(b, e[5], t, null) : m(e[5]), null);
      },
      i(e) {
        d || (Z(D, e), (d = !0));
      },
      o(e) {
        q(D, e), (d = !1);
      },
      d(e) {
        e && y(t), D && D.d(e), (v = !1), k();
      },
    };
  }

  function Ot(e) {
    let t, n, r, s, i;
    const o = e[6].default,
      a = c(o, e, e[5], null);
    return {
      c() {
        (t = w("button")),
          (t.innerHTML =
            '<svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'),
          (n = x()),
          a && a.c(),
          (t.autofocus = !0),
          M(t, "class", "border-none text-custom-mg absolute right-3 top-3");
      },
      m(o, l) {
        g(o, t, l),
          g(o, n, l),
          a && a.m(o, l),
          (r = !0),
          t.focus(),
          s || ((i = S(t, "click", e[3])), (s = !0));
      },
      p(e, t) {
        a &&
          a.p &&
          (!r || 32 & t) &&
          f(a, o, e, e[5], r ? h(o, e[5], t, null) : m(e[5]), null);
      },
      i(e) {
        r || (Z(a, e), (r = !0));
      },
      o(e) {
        q(a, e), (r = !1);
      },
      d(e) {
        e && y(t), e && y(n), a && a.d(e), (s = !1), i();
      },
    };
  }

  function Pt(e) {
    let t, n, s, i, o, a, l, u, c;
    const d = [Ot, Ct],
      h = [];

    function f(e, t) {
      return 0 == e[1] ? 0 : 1;
    }
    return (
      (o = f(e)),
      (a = h[o] = d[o](e)),
      {
        c() {
          (t = w("div")),
            (n = x()),
            (s = w("div")),
            (i = w("div")),
            a.c(),
            M(
              t,
              "class",
              "modal-background p-3 flex justify-center svelte-1nyqrwd"
            ),
            M(
              i,
              "class",
              "pointer-events-auto modal w-full mx-auto top-20 relative rounded-sm "
            ),
            e[0] == musicListT[language] || e[0] == langListT[language]
              ? M(
                  i,
                  "style",
                  "width: fit-content; height: calc(100% - 80px); overflow-y: scroll;"
                )
              : M(
                  i,
                  "class",
                  "pointer-events-auto modal w-full limit-height mx-auto top-20 relative rounded-sm " +
                    (e[0] == aboutT[language] || e[0] == filterT[language]
                      ? "max-w-screen-sm"
                      : "max-w-screen-xs")
                ),
            M(i, "role", "dialog"),
            M(i, "aria-modal", "true"),
            M(
              s,
              "class",
              "modal-background p-3 pointer-events-none svelte-1nyqrwd"
            );
        },
        m(r, a) {
          g(r, t, a),
            g(r, n, a),
            g(r, s, a),
            p(s, i),
            h[o].m(i, null),
            e[7](i),
            (l = !0),
            u ||
              ((c = [S(window, "keydown", e[4]), S(t, "click", e[3])]),
              (u = !0));
        },
        p(e, [t]) {
          let n = o;
          (o = f(e)),
            o === n
              ? h[o].p(e, t)
              : (J(),
                q(h[n], 1, 1, () => {
                  h[n] = null;
                }),
                K(),
                (a = h[o]),
                a ? a.p(e, t) : ((a = h[o] = d[o](e)), a.c()),
                Z(a, 1),
                a.m(i, null));
        },
        i(e) {
          l || (Z(a), (l = !0));
        },
        o(e) {
          q(a), (l = !1);
        },
        d(i) {
          i && y(t), i && y(n), i && y(s), h[o].d(), e[7](null), (u = !1), r(c);
        },
      }
    );
  }

  function At(e, t, n) {
    let { $$slots: r = {}, $$scope: s } = t;
    const i = A(),
      o = () => i("close");
    let a,
      { title: l } = t,
      { hasFrame: u } = t;
    const c = "undefined" != typeof document && document.activeElement;
    var d;
    return (
      c &&
        ((d = () => {
          c.focus();
        }),
        O().$$.on_destroy.push(d)),
      (e.$$set = (e) => {
        "title" in e && n(0, (l = e.title)),
          "hasFrame" in e && n(1, (u = e.hasFrame)),
          "$$scope" in e && n(5, (s = e.$$scope));
      }),
      [
        l,
        u,
        a,
        o,
        (e) => {
          if ("Escape" !== e.key) {
            if ("Tab" === e.key) {
              const t = a.querySelectorAll("*"),
                n = Array.from(t).filter((e) => e.tabIndex >= 0);
              let r = n.indexOf(document.activeElement);
              -1 === r && e.shiftKey && (r = 0),
                (r += n.length + (e.shiftKey ? -1 : 1)),
                (r %= n.length),
                n[r].focus(),
                e.preventDefault();
            }
          } else o();
        },
        s,
        r,
        function (e) {
          H[e ? "unshift" : "push"](() => {
            (a = e), n(2, a);
          });
        },
      ]
    );
  }
  class Lt extends se {
    constructor(e) {
      super(),
        re(this, e, At, Pt, i, {
          title: 0,
          hasFrame: 1,
        });
    }
  }

  function Nt(t) {
    let n;
    return {
      c() {
        (n = w("div")),
          (n.innerHTML =
            aboutPopupT[language] +
            ' \n\n\n\n <p class="text-xs mb-3 text-custom-line">Prepared with <a href="https://developers.soundcloud.com">Soundcloud</a>,\n    <a href="https://svelte.dev">Svelte</a>,\n    <a href="https://tailwindcss.com">Tailwind</a>,\n    <a href="https://fonts.google.com/noto/specimen/Noto+Serif+Display">Noto Serif Display</a>, <a href="https://fonts.google.com/noto/specimen/Noto+Sans">Noto Sans</a>,\n    <a href="https://iconsvg.xyz">IconSVG</a>, <a href="https://momentjs.com">momentjs</a>,\n    <a href="https://tarekraafat.github.io/autoComplete.js/#/">autocomplete.js</a>, and powered by <a href="https://glitch.com/">Glitch</a>. <a href="https://omakase.studio" title="Studio Omakase">Served omakase / お任せ</a>. '),
          M(n, "class", "text");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }
  class Ht extends se {
    constructor(e) {
      super(), re(this, e, null, Nt, i, {});
    }
  }

  function getOneGameOrArtistFromMusic(musicName) {
    const splited = musicName[language].split(" - ");
    return splited[splited.length - 1].trim();
  }

  function getGameOrArtistFromMusicName(musicNameList) {
    return musicNameList
      .map((a) => getOneGameOrArtistFromMusic(a))
      .filter((m) => m.length > 0);
  }

  function MLt(t) {
    let n;
    const mapUrl = new Map();
    filteredMusicListWithLinks.forEach((m) => mapUrl.set(m.answer, m.url));
    const musicNameListFiltered = filteredMusicNameList.filter(
      (s) => s.id != -1 && mapUrl.has(s.id)
    );
    const artistOrGame = getGameOrArtistFromMusicName(musicNameListFiltered);
    const diffArtist = artistOrGame.map((a, i) =>
      i > 0 ? !(artistOrGame[i - 1] === a) : false
    );
    const allDifferent = diffArtist.reduce((a, b) => a && b);
    return {
      c() {
        (n = w("div")),
          (n.innerHTML =
            '<ul style="list-style-type: disc;margin-left: 20px;font-size: 12px;display: grid;justify-content: center;">' +
            musicNameListFiltered
              .map(
                (s, i) =>
                  "<li" +
                  (diffArtist[i] && !allDifferent
                    ? ' style="margin-top:10px"'
                    : "") +
                  '><a target="_blank" href="' +
                  mapUrl.get(s.id) +
                  '">' +
                  s[language] +
                  "</a></li>"
              )
              .join("") +
            "</ul>"),
          M(n, "class", "text");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }
  class MLCt extends se {
    constructor(e) {
      super(), re(this, e, null, MLt, i, {});
    }
  }

  function Langt(t) {
    let n;
    let singleLang = [];
    languages.forEach((l) => {
      let buttonLang;
      (buttonLang = w(l == language ? "div" : "button")),
        (buttonLang.innerHTML = l.toUpperCase() + flags[l]),
        M(buttonLang, "style", l == language ? "font-weight:bold;" : ""),
        M(buttonLang, "class", "lang-choice"),
        M(buttonLang, "aria-label", l.toUpperCase()),
        l != language &&
          buttonLang.addEventListener("click", function () {
            changeLanguage(l);
          }),
        singleLang.push(buttonLang);
    });
    return {
      c() {
        (n = w("div")),
          M(n, "style", "display: grid;justify-content: center;"),
          M(n, "class", "text");
      },
      m(e, t) {
        g(e, n, t), singleLang.forEach((k) => p(n, k));
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  class LangCt extends se {
    constructor(e) {
      super(), re(this, e, null, Langt, i, {});
    }
  }

  function Filtert(t) {
    let n;
    let games = new Set();
    getGameOrArtistFromMusicName(musicNameList).forEach((m) =>
      games.add(m.trim())
    );
    let explainationGames = w("div");
    explainationGames.innerHTML = explainationFilterT[language];
    let warning = w("div");
    warning.innerHTML = warningFilterT[language];
    let filteredGames = [...removeGames];
    let filteredTags = [...removeTags];
    let gridGames = gridFilterDiv(filteredGames, games);
    let gridTags = gridFilterDiv(
      filteredTags,
      allTags.map((t) => tagsT[t][language])
    );
    let save = w("button");
    save.innerHTML = saveT[language];
    M(save, "style", "margin-left: auto;margin-right: auto;");
    M(
      save,
      "class",
      "px-2 py-2 uppercase tracking-widest border-none font-semibold text-sm bg-custom-positive"
    );
    M(save, "aria-label", saveAriaT[language]);
    save.addEventListener("click", function () {
      saveFilteredGames(filteredGames);
      saveFilteredTags(filteredTags);
    });
    let selectAllGames = w("button");
    selectAllGames.innerHTML = selectAllT[language];
    M(
      selectAllGames,
      "style",
      "margin-left: auto;margin-right: auto;margin-top: 15px;"
    );
    M(
      selectAllGames,
      "class",
      "px-2 py-2 tracking-widest border-none font-semibold text-sm bg-custom-mg"
    );
    M(selectAllGames, "aria-label", selectAllGamesT[language]);
    selectAllGames.addEventListener("click", function () {
      removeGames = [];
      filteredGames = [];
      y(gridGames);
      y(explainationTags);
      y(ccTags);
      y(gridTags);
      gridGames = gridFilterDiv(filteredGames, games);
      g(n, gridGames, save);
      g(n, explainationTags, save);
      g(n, ccTags, save);
      g(n, gridTags, save);
    });
    let unselectAllGames = w("button");
    unselectAllGames.innerHTML = unselectAllT[language];
    M(
      unselectAllGames,
      "style",
      "margin-left: auto;margin-right: auto;margin-top: 15px;"
    );
    M(
      unselectAllGames,
      "class",
      "px-2 py-2 tracking-widest border-none font-semibold text-sm bg-custom-mg"
    );
    M(unselectAllGames, "aria-label", unselectAllGamesT[language]);
    unselectAllGames.addEventListener("click", function () {
      removeGames = [...games].map((_, index) => index);
      filteredGames = [...removeGames];
      y(gridGames);
      y(explainationTags);
      y(ccTags);
      y(gridTags);
      gridGames = gridFilterDiv(filteredGames, games);
      g(n, gridGames, save);
      g(n, explainationTags, save);
      g(n, ccTags, save);
      g(n, gridTags, save);
    });
    let ccGames = w("div");
    M(ccGames, "class", "button-container");
    p(ccGames, selectAllGames);
    p(ccGames, unselectAllGames);
    let selectAllTags = w("button");
    selectAllTags.innerHTML = selectAllT[language];
    M(
      selectAllTags,
      "style",
      "margin-left: auto;margin-right: auto;margin-top: 15px;"
    );
    M(
      selectAllTags,
      "class",
      "px-2 py-2 tracking-widest border-none font-semibold text-sm bg-custom-mg"
    );
    M(selectAllTags, "aria-label", selectAllTagsT[language]);
    selectAllTags.addEventListener("click", function () {
      removeTags = [];
      filteredTags = [];
      y(gridTags);
      gridTags = gridFilterDiv(
        filteredTags,
        allTags.map((t) => tagsT[t][language])
      );
      g(n, gridTags, save);
    });
    let unselectAllTags = w("button");
    unselectAllTags.innerHTML = unselectAllT[language];
    M(
      unselectAllTags,
      "style",
      "margin-left: auto;margin-right: auto;margin-top: 15px;"
    );
    M(
      unselectAllTags,
      "class",
      "px-2 py-2 tracking-widest border-none font-semibold text-sm bg-custom-mg"
    );
    M(unselectAllTags, "aria-label", unselectAllTagsT[language]);
    unselectAllTags.addEventListener("click", function () {
      removeTags = [...allTags].map((_, index) => index);
      filteredTags = [...removeTags];
      y(gridTags);
      gridTags = gridFilterDiv(
        filteredTags,
        allTags.map((t) => tagsT[t][language])
      );
      g(n, gridTags, save);
    });
    let ccTags = w("span");
    let explainationTags = w("span");
    if (allTags.length > 0) {
      ccTags = w("div");
      M(ccTags, "class", "button-container");
      p(ccTags, selectAllTags);
      p(ccTags, unselectAllTags);
      explainationTags = w("div");
      explainationTags.innerHTML = explainationFilterTagsT[language];
    }
    return {
      c() {
        (n = w("div")),
          M(n, "style", "display: grid;justify-content: center;"),
          M(n, "class", "text");
      },
      m(e, t) {
        g(e, n, t),
          p(n, explainationGames),
          p(n, warning),
          p(n, ccGames),
          p(n, gridGames),
          p(n, explainationTags),
          p(n, ccTags),
          p(n, gridTags),
          p(n, save);
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function gridFilterDiv(filteredList, checkableList) {
    let grid = w("div");
    M(grid, "class", "filter-form");
    [...checkableList].forEach((g, index) => {
      let checkbox;
      let checkboxInput;
      let checkboxLabel;
      (checkbox = w("div")),
        (checkboxInput = w("input")),
        (checkboxInput.id = g),
        (checkboxInput.name = g),
        (checkboxInput.checked = !filteredList.includes(index)),
        (checkboxInput.type = "checkbox"),
        (checkboxLabel = w("label")),
        (checkboxLabel.innerHTML = g),
        p(checkbox, checkboxInput),
        p(checkbox, checkboxLabel),
        M(checkbox, "style", "display: flex;gap: 5px;"),
        M(checkboxLabel, "style", "display:flex;align-items: center;"),
        M(checkboxLabel, "for", g),
        checkboxInput.addEventListener("click", function () {
          const find = filteredList.indexOf(index);
          if (find != -1) {
            filteredList.splice(find, 1);
          } else {
            filteredList.push(index);
          }
        }),
        checkboxInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            checkboxInput.click();
          }
        }),
        p(grid, checkbox);
    });
    return grid;
  }

  class FilterCt extends se {
    constructor(e) {
      super(), re(this, e, null, Filtert, i, {});
    }
  }

  function It(t) {
    let n, r, s, i;
    return {
      c() {
        (n = w("div")),
          (r = w("a")),
          // (r.innerHTML =
          //   '<span class="kofitext svelte-1d3p4dy"><img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="Ko-fi donations" class="kofiimg mr-2 mb-1 svelte-1d3p4dy"/>Support the Heardle devs on Ko-Fi</span><svg xmlns="http://www.w3.org/2000/svg" class="ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"></path></svg>'),
          // M(
          //   r,
          //   "class",
          //   "kofi-button py-2 px-3 rounded-lg items-center flex  svelte-1d3p4dy"
          // ),
          // M(r, "href", "https://ko-fi.com/heardle"),
          // M(r, "title", "Support the Heardle devs on Ko-Fi"),
          M(
            n,
            "class",
            "text-center flex justify-center items-center flex-col "
          );
      },
      m(e, o) {
        g(e, n, o), p(n, r), s || ((i = S(r, "click", t[0])), (s = !0));
      },
      p: e,
      i: e,
      o: e,
      d(e) {
        e && y(n), (s = !1), i();
      },
    };
  }

  function Wt(e) {
    return [
      () => {
        pe("clickKofi", {
          name: "clickKofi",
        });
      },
    ];
  }
  class Rt extends se {
    constructor(e) {
      super(), re(this, e, Wt, It, i, {});
    }
  }

  function Ft(t) {
    let n, r;
    return (
      (n = new Ee({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function Gt(t) {
    let n, r, s, i, o, a, l, u, c, d;
    return {
      c() {
        (n = w("div")),
          (r = w("div")),
          (s = x()),
          (i = w("div")),
          (o = w("p")),
          (a = w("span")),
          (l = x()),
          (u = _(t[0])),
          (c = x()),
          (d = w("div")),
          M(r, "class", "flex justify-center items-center mt-6 mb-1"),
          M(a, "class", "text-custom-negative"),
          M(o, "class", "pb-6"),
          M(i, "class", "text-custom-mg text-xs h-32 overflow-scroll relative"),
          M(d, "class", "absolute h-6 bottom-0 w-full border-custom-fg "),
          T(
            d,
            "background",
            "linear-gradient(to bottom, rgba(18,18,18,0), rgba(18,18,18,1)) no-repeat bottom"
          ),
          T(d, "background-size", "100% 100%"),
          M(n, "class", "relative");
      },
      m(e, t) {
        g(e, n, t),
          p(n, r),
          p(n, s),
          p(n, i),
          p(i, o),
          p(o, a),
          p(o, l),
          p(o, u),
          p(n, c),
          p(n, d);
      },
      p(e, t) {
        1 & t && $(u, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function Et(e) {
    let t, n, r, s;
    const i = [Gt, Ft],
      o = [];

    function a(e, t) {
      return e[0] ? 0 : 1;
    }
    return (
      (t = a(e)),
      (n = o[t] = i[t](e)),
      {
        c() {
          n.c(), (r = b());
        },
        m(e, n) {
          o[t].m(e, n), g(e, r, n), (s = !0);
        },
        p(e, [s]) {
          let l = t;
          (t = a(e)),
            t === l
              ? o[t].p(e, s)
              : (J(),
                q(o[l], 1, 1, () => {
                  o[l] = null;
                }),
                K(),
                (n = o[t]),
                n ? n.p(e, s) : ((n = o[t] = i[t](e)), n.c()),
                Z(n, 1),
                n.m(r.parentNode, r));
        },
        i(e) {
          s || (Z(n), (s = !0));
        },
        o(e) {
          q(n), (s = !1);
        },
        d(e) {
          o[t].d(e), e && y(r);
        },
      }
    );
  }
  class Bt extends se {
    constructor(e) {
      super(), re(this, e, null, Et, i, {});
    }
  }

  function zt(t) {
    let n, r, s, i, o, a, l, u, c;
    return (
      (a = new Rt({})),
      (u = new Bt({})),
      {
        c() {
          (n = w("p")),
            (s = w("p")),
            (n.innerHTML = supportPopupT[language]),
            (r = x()),
            (s = w("p")),
            (i = x()),
            (o = w("div")),
            Q(a.$$.fragment),
            (l = x()),
            Q(u.$$.fragment),
            M(n, "class", "mb-3"),
            M(s, "class", "mb-3"),
            M(o, "class", "pt-6");
        },
        m(e, t) {
          g(e, n, t),
            g(e, r, t),
            g(e, s, t),
            g(e, i, t),
            g(e, o, t),
            ee(a, o, null),
            g(e, l, t),
            ee(u, e, t),
            (c = !0);
        },
        p: e,
        i(e) {
          c || (Z(a.$$.fragment, e), Z(u.$$.fragment, e), (c = !0));
        },
        o(e) {
          q(a.$$.fragment, e), q(u.$$.fragment, e), (c = !1);
        },
        d(e) {
          e && y(n),
            e && y(r),
            e && y(s),
            e && y(i),
            e && y(o),
            te(a),
            e && y(l),
            te(u, e);
        },
      }
    );
  }
  class Ut extends se {
    constructor(e) {
      super(), re(this, e, null, zt, i, {});
    }
  }
  const Vt = {
      attemptInterval: 1.5e3,
      attemptIntervalAlt: [1e3, 2e3, 4e3, 7e3, 11e3, 16e3],
      maxAttempts: 6,
      //   date: date,
    },
    Jt = ["0", "1", "2", "3", "4", "5", "6"];

  function Kt(t) {
    let n, r;
    return {
      c() {
        (n = w("div")), (r = _(t[0])), M(n, "style", "display:none");
      },
      m(e, t) {
        g(e, n, t), p(n, r);
      },
      p(e, [t]) {
        1 & t && $(r, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function Zt(e, t, n) {
    let r = "",
      s = new Date(),
      i =
        3600 * (23 - s.getHours()) +
        60 * (59 - s.getMinutes()) +
        (59 - s.getSeconds());

    function o() {
      let e = Math.floor(i / 3600),
        t = Math.floor((i - 3600 * e) / 60),
        s = Math.floor(i % 60);
      n(
        0,
        (r =
          ("00" + e).slice(-2) +
          ":" +
          ("00" + t).slice(-2) +
          ":" +
          ("00" + s).slice(-2))
      ),
        i--,
        0 == e && 0 == t && 0 == s; // && location.reload(!0) (Reload at midnight)
    }
    return o(), setInterval(o, 1e3), [r];
  }
  class qt extends se {
    constructor(e) {
      super(), re(this, e, Zt, Kt, i, {});
    }
  }

  function Xt(e, t, n) {
    const r = e.slice();
    return (r[10] = t[n]), (r[12] = n), r;
  }

  function Qt(e) {
    let t,
      n,
      r,
      s,
      i,
      o,
      a,
      l,
      u,
      c,
      d,
      h,
      f,
      m,
      k,
      b,
      S,
      D,
      T,
      Y,
      C,
      O,
      P,
      A = Jt[e[3]] + "",
      L = Array(e[1].maxAttempts),
      N = [];
    for (let t = 0; t < L.length; t += 1) N[t] = on(Xt(e, L, t));

    function H(e, t) {
      return 0 == e[3] ? un : e[4] ? ln : an;
    }
    let I = H(e),
      W = I(e),
      R = e[5] && cn();
    return (
      (d = new ae({
        props: {
          primary: !0,
          $$slots: {
            default: [dn],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      d.$on("click", e[6]),
      (S = new qt({})),
      (O = new Rt({})),
      {
        c() {
          (t = w("div")), (n = w("p")), (r = _(A)), (s = x()), (i = w("div"));
          for (let e = 0; e < N.length; e += 1) N[e].c();
          (o = x()),
            (a = w("p")),
            W.c(),
            (l = x()),
            R && R.c(),
            (u = x()),
            (c = w("div")),
            Q(d.$$.fragment),
            (h = x()),
            (f = w("div")),
            (m = w("div")),
            (k = w("button")),
            (k.textContent = nextT[language]),
            (b = x()),
            Q(S.$$.fragment),
            (D = x()),
            (T = w("div")),
            (Y = w("div")),
            (C = x()),
            Q(O.$$.fragment),
            M(n, "class", "text-lg text-custom-line"),
            M(i, "class", "flex justify-center my-2"),
            M(a, "class", "py-1"),
            M(c, "style", "display:none"),
            M(t, "class", "text-center px-3"),
            M(
              k,
              "class",
              "px-2 py-2 uppercase tracking-widest border-none flex items-center font-semibold text-sm svelte-1r54uzk bg-custom-positive"
            ),
            M(k, "aria-label", nextAriaT[language]),
            k.addEventListener("click", function () {
              nextMusic();
            });
          M(m, "class", "flex flex-col justify-center items-center mb-6 mx-3"),
            M(Y, "class", "flex justify-center items-center mb-3"),
            M(T, "class", "bg-custom-highlight py-3 pb-5 mx-3 rounded-t-md");
        },
        m(e, y) {
          g(e, t, y), p(t, n), p(n, r), p(t, s), p(t, i);
          for (let e = 0; e < N.length; e += 1) N[e].m(i, null);
          p(t, o),
            p(t, a),
            W.m(a, null),
            p(t, l),
            R && R.m(t, null),
            p(t, u),
            p(t, c),
            ee(d, c, null),
            g(e, h, y),
            g(e, f, y),
            p(f, m),
            p(m, k),
            p(m, b),
            ee(S, m, null),
            p(f, D),
            p(f, T),
            p(T, Y),
            p(T, C),
            ee(O, T, null),
            (P = !0);
        },
        p(e, n) {
          if (((!P || 8 & n) && A !== (A = Jt[e[3]] + "") && $(r, A), 3 & n)) {
            let t;
            for (L = Array(e[1].maxAttempts), t = 0; t < L.length; t += 1) {
              const r = Xt(e, L, t);
              N[t] ? N[t].p(r, n) : ((N[t] = on(r)), N[t].c(), N[t].m(i, null));
            }
            for (; t < N.length; t += 1) N[t].d(1);
            N.length = L.length;
          }
          I === (I = H(e)) && W
            ? W.p(e, n)
            : (W.d(1), (W = I(e)), W && (W.c(), W.m(a, null))),
            e[5]
              ? R || ((R = cn()), R.c(), R.m(t, u))
              : R && (R.d(1), (R = null));
          const s = {};
          8192 & n &&
            (s.$$scope = {
              dirty: n,
              ctx: e,
            }),
            d.$set(s);
        },
        i(e) {
          P ||
            (Z(d.$$.fragment, e),
            Z(S.$$.fragment, e),
            Z(O.$$.fragment, e),
            (P = !0));
        },
        o(e) {
          q(d.$$.fragment, e),
            q(S.$$.fragment, e),
            q(O.$$.fragment, e),
            (P = !1);
        },
        d(e) {
          e && y(t),
            v(N, e),
            W.d(),
            R && R.d(),
            te(d),
            e && y(h),
            e && y(f),
            te(S),
            te(O);
        },
      }
    );
  }

  function en(t) {
    let n;
    return {
      c() {
        (n = w("div")), M(n, "class", "w-4 h-1 m-0.5 bg-custom-fg");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function tn(e) {
    let t;

    function n(e, t) {
      return e[0][e[12]].isSkipped
        ? sn
        : e[0][e[12]].isCorrect || e[0][e[12]].isSkipped
        ? e[0][e[12]].isCorrect
          ? nn
          : void 0
        : rn;
    }
    let r = n(e),
      s = r && r(e);
    return {
      c() {
        s && s.c(), (t = b());
      },
      m(e, n) {
        s && s.m(e, n), g(e, t, n);
      },
      p(e, i) {
        r !== (r = n(e)) &&
          (s && s.d(1), (s = r && r(e)), s && (s.c(), s.m(t.parentNode, t)));
      },
      d(e) {
        s && s.d(e), e && y(t);
      },
    };
  }

  function nn(e) {
    let t;
    return {
      c() {
        (t = w("div")), M(t, "class", "w-4 h-1 m-0.5 bg-custom-positive");
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function rn(e) {
    let t;
    return {
      c() {
        (t = w("div")), M(t, "class", "w-4 h-1 m-0.5 bg-custom-negative");
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function sn(e) {
    let t;
    return {
      c() {
        (t = w("div")), M(t, "class", "w-4 h-1 m-0.5 bg-custom-mg");
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function on(e) {
    let t;

    function n(e, t) {
      return e[12] <= e[0].length - 1 ? tn : en;
    }
    let r = n(e),
      s = r(e);
    return {
      c() {
        s.c(), (t = b());
      },
      m(e, n) {
        s.m(e, n), g(e, t, n);
      },
      p(e, i) {
        r === (r = n(e)) && s
          ? s.p(e, i)
          : (s.d(1), (s = r(e)), s && (s.c(), s.m(t.parentNode, t)));
      },
      d(e) {
        s.d(e), e && y(t);
      },
    };
  }

  function an(e) {
    let t,
      n,
      r,
      s = (e[0].length * e[1].attemptInterval) / 1e3 + "";
    return {
      c() {
        (t = _("You got today's " + artist + " Heardle within the first ")),
          (n = _(s)),
          (r = _(" seconds."));
      },
      m(e, s) {
        g(e, t, s), g(e, n, s), g(e, r, s);
      },
      p(e, t) {
        3 & t &&
          s !== (s = (e[0].length * e[1].attemptInterval) / 1e3 + "") &&
          $(n, s);
      },
      d(e) {
        e && y(t), e && y(n), e && y(r);
      },
    };
  }

  function ln(e) {
    let t,
      n,
      r,
      s,
      i,
      o = e[1].attemptIntervalAlt[e[0].length - 1] / 1e3 + "",
      a = e[1].attemptIntervalAlt[e[0].length - 1] / 1e3 > 1 ? "s" : "";
    return {
      c() {
        (t = _(goodAnswerT[language])),
          (n = _(o)),
          (r = _("\n                " + secondT[language])),
          (s = _(a)),
          (i = _("."));
      },
      m(e, o) {
        g(e, t, o), g(e, n, o), g(e, r, o), g(e, s, o), g(e, i, o);
      },
      p(e, t) {
        3 & t &&
          o !== (o = e[1].attemptIntervalAlt[e[0].length - 1] / 1e3 + "") &&
          $(n, o),
          3 & t &&
            a !==
              (a =
                e[1].attemptIntervalAlt[e[0].length - 1] / 1e3 > 1
                  ? "s"
                  : "") &&
            $(s, a);
      },
      d(e) {
        e && y(t), e && y(n), e && y(r), e && y(s), e && y(i);
      },
    };
  }

  function un(t) {
    let n;
    return {
      c() {
        n = _(badAnswerT[language]);
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function cn(e) {
    let t;
    return {
      c() {
        (t = w("div")),
          (t.textContent = "Copied to clipboard!"),
          M(
            t,
            "class",
            "tracking-widest uppercase text-xs text-custom-line p-3 pb-0 text-center"
          );
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function dn(e) {
    let t, n, r, s, i, o, a;
    return {
      c() {
        (t = _("Share\n                ")),
          (n = k("svg")),
          (r = k("circle")),
          (s = k("circle")),
          (i = k("circle")),
          (o = k("line")),
          (a = k("line"));
      },
      m(e, l) {
        g(e, t, l), g(e, n, l), p(n, r), p(n, s), p(n, i), p(n, o), p(n, a);
      },
      d(e) {
        e && y(t), e && y(n);
      },
    };
  }

  function hn(e) {
    let t,
      n,
      r = e[2] && Qt(e);
    return {
      c() {
        r && r.c(), (t = b());
      },
      m(e, s) {
        r && r.m(e, s), g(e, t, s), (n = !0);
      },
      p(e, [n]) {
        e[2]
          ? r
            ? (r.p(e, n), 4 & n && Z(r, 1))
            : ((r = Qt(e)), r.c(), Z(r, 1), r.m(t.parentNode, t))
          : r &&
            (J(),
            q(r, 1, 1, () => {
              r = null;
            }),
            K());
      },
      i(e) {
        n || (Z(r), (n = !0));
      },
      o(e) {
        q(r), (n = !1);
      },
      d(e) {
        r && r.d(e), e && y(t);
      },
    };
  }

  function fn(e, t, n) {
    // console.log("current", t);
    let { userGuesses: r } = t,
      { currentHeardle: s } = t,
      { config: i } = t,
      { hasFinished: o } = t,
      { gotCorrect: a } = t,
      { guessRef: l } = t,
      { isPrime: u } = t,
      c = !1;
    return (
      A(),
      (e.$$set = (e) => {
        "userGuesses" in e && n(0, (r = e.userGuesses)),
          "currentHeardle" in e && n(7, (s = e.currentHeardle)),
          "config" in e && n(1, (i = e.config)),
          "hasFinished" in e && n(2, (o = e.hasFinished)),
          "gotCorrect" in e && n(8, (a = e.gotCorrect)),
          "guessRef" in e && n(3, (l = e.guessRef)),
          "isPrime" in e && n(4, (u = e.isPrime));
      }),
      [
        r,
        i,
        o,
        l,
        u,
        c,
        () => {
          let e = artist + " Heardle #" + (s.id + 1),
            t = "";
          a
            ? r.length < i.maxAttempts / 3
              ? (t += "🔊")
              : r.length < (i.maxAttempts / 3) * 2
              ? (t += "🔉")
              : r.length <= i.maxAttempts && (t += "🔈")
            : (t += "🔇");
          for (let e = 0; e < i.maxAttempts; e++)
            r.length > e
              ? 1 == r[e].isCorrect
                ? (t += "🟩")
                : 1 == r[e].isSkipped
                ? (t += "⬛️")
                : (t += "🟥")
              : (t += "⬜️");
          let seconds = i.attemptIntervalAlt[r.length - 1] / 1e3;
          let o =
            e +
            "\n\n" +
            (a
              ? "Got this " +
                artist +
                " Heardle within " +
                seconds +
                " second" +
                (seconds > 1 ? "s" : "")
              : "Failed this " + artist + " Heardle") +
            "\n\n" +
            t +
            "\n\n";
          // + "https://etrian-infinite-heardle.glitch.me/"
          if (
            !navigator.share ||
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            /Firefox/i.test(navigator.userAgent)
          )
            return navigator &&
              navigator.clipboard &&
              navigator.clipboard.writeText
              ? (pe("clickShareClipboard", {
                  name: "clickShareClipboard",
                }),
                n(5, (c = !0)),
                setTimeout(() => {
                  n(5, (c = !1));
                }, 2e3),
                navigator.clipboard.writeText(o))
              : Promise.reject(
                  "There was a problem copying your result to the clipboard"
                );
          navigator
            .share({
              text: o,
            })
            .then(() => {
              pe("clickSharePanel", {
                name: "clickSharePanel",
              });
            })
            .catch(console.error);
        },
        s,
        a,
      ]
    );
  }
  class mn extends se {
    constructor(e) {
      super(),
        re(this, e, fn, hn, i, {
          userGuesses: 0,
          currentHeardle: 0,
          config: 1,
          hasFinished: 2,
          gotCorrect: 8,
          guessRef: 3,
          isPrime: 4,
        });
    }
  }

  function pn(e) {
    let t;
    return {
      c() {
        t = _(playT[language]);
      },
      m(e, n) {
        g(e, t, n);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function gn(e) {
    let t, n, r, s, i, o, a, l, u, c, z, v;
    return (
      (u = new ae({
        props: {
          primary: !0,
          $$slots: {
            default: [pn],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      u.$on("click", e[0]),
      {
        c() {
          (t = w("div")),
            (n = w("div")),
            (n.innerHTML =
              '<div class="mr-4 w-8 text-custom-line"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-7 w-7"><circle cx="5.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="15.5" r="2.5"></circle><path d="M8 17V5l12-2v12"></path></svg></div> \n        <div><p>' +
              howToPlayPopup1T[language] +
              ".</p></div>"),
            (r = x()),
            (s = w("div")),
            (s.innerHTML =
              '<div class="mr-4 w-8 text-custom-line"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></div> \n        <div><p>' +
              howToPlayPopup2T[language] +
              "</p></div>"),
            (i = x()),
            (o = w("div")),
            (o.innerHTML =
              '<div class="mr-4 w-8 text-custom-line"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-7"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></div> \n        <div><p>' +
              howToPlayPopup3T[language] +
              "</p></div>"),
            (a = x()),
            (z = w("div")),
            (z.innerHTML =
              '<div class="mr-4 w-8 text-custom-line"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 2 5 C 2 3.34375 3.34375 2 5 2 L 19 2 C 20.65625 2 22 3.34375 22 5 L 22 6.171875 C 22 6.96875 21.683594 7.730469 21.121094 8.292969 L 15.292969 14.121094 C 15.105469 14.308594 15 14.5625 15 14.828125 L 15 17.171875 C 15 17.96875 14.683594 18.730469 14.121094 19.292969 L 11.917969 21.496094 C 10.84375 22.570312 9 21.808594 9 20.285156 L 9 14.828125 C 9 14.5625 8.894531 14.308594 8.707031 14.121094 L 2.878906 8.292969 C 2.316406 7.730469 2 6.96875 2 6.171875 Z M 2 5 "></path></svg></div> \n        <div><p>' +
              howToPlayPopup4T[language] +
              "</p></div>"),
            (v = x()),
            (zz = w("div")),
            (zz.innerHTML =
              '<div class="mr-4 w-8 text-custom-line"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M 2.324219 3.484375 C 1.039062 3.484375 0 4.523438 0 5.804688 C 0 7.089844 1.039062 8.128906 2.324219 8.128906 C 3.605469 8.128906 4.644531 7.089844 4.644531 5.804688 C 4.644531 4.523438 3.605469 3.484375 2.324219 3.484375 Z M 2.324219 9.675781 C 1.039062 9.675781 0 10.71875 0 12 C 0 13.28125 1.039062 14.324219 2.324219 14.324219 C 3.605469 14.324219 4.644531 13.28125 4.644531 12 C 4.644531 10.71875 3.605469 9.675781 2.324219 9.675781 Z M 2.324219 15.871094 C 1.039062 15.871094 0 16.910156 0 18.195312 C 0 19.476562 1.039062 20.515625 2.324219 20.515625 C 3.605469 20.515625 4.644531 19.476562 4.644531 18.195312 C 4.644531 16.910156 3.605469 15.871094 2.324219 15.871094 Z M 7.742188 7.355469 L 22.453125 7.355469 C 23.308594 7.355469 24 6.660156 24 5.804688 C 24 4.949219 23.308594 4.257812 22.453125 4.257812 L 7.742188 4.257812 C 6.886719 4.257812 6.195312 4.949219 6.195312 5.804688 C 6.195312 6.660156 6.886719 7.355469 7.742188 7.355469 Z M 22.453125 10.453125 L 7.742188 10.453125 C 6.886719 10.453125 6.195312 11.144531 6.195312 12 C 6.195312 12.855469 6.886719 13.546875 7.742188 13.546875 L 22.453125 13.546875 C 23.308594 13.546875 24 12.855469 24 12 C 24 11.144531 23.308594 10.453125 22.453125 10.453125 Z M 22.453125 16.644531 L 7.742188 16.644531 C 6.886719 16.644531 6.195312 17.339844 6.195312 18.195312 C 6.195312 19.050781 6.886719 19.742188 7.742188 19.742188 L 22.453125 19.742188 C 23.308594 19.742188 24 19.050781 24 18.195312 C 24 17.339844 23.308594 16.644531 22.453125 16.644531 Z M 22.453125 16.644531 "></path></svg></div> \n        <div><p>' +
              howToPlayPopup5T[language] +
              "</p></div>"),
            (vv = x()),
            (l = w("div")),
            Q(u.$$.fragment),
            M(n, "class", "flex items-center mb-6"),
            M(s, "class", "flex items-center mb-6"),
            M(o, "class", "flex items-center mb-6"),
            M(z, "class", "flex items-center mb-6"),
            M(zz, "class", "flex items-center mb-6"),
            M(l, "class", "justify-center flex py-2 mt-2");
        },
        m(e, d) {
          g(e, t, d),
            p(t, n),
            p(t, r),
            p(t, s),
            p(t, i),
            p(t, o),
            p(t, a),
            p(t, z),
            p(t, v),
            p(t, zz),
            p(t, vv),
            p(t, l),
            ee(u, l, null),
            (c = !0);
        },
        p(e, [t]) {
          const n = {};
          4 & t &&
            (n.$$scope = {
              dirty: t,
              ctx: e,
            }),
            u.$set(n);
        },
        i(e) {
          c || (Z(u.$$.fragment, e), (c = !0));
        },
        o(e) {
          q(u.$$.fragment, e), (c = !1);
        },
        d(e) {
          e && y(t), te(u);
        },
      }
    );
  }

  function yn(e) {
    const t = A();
    return [() => t("close")];
  }
  class vn extends se {
    constructor(e) {
      super(), re(this, e, yn, gn, i, {});
    }
  }

  function wn(e, t, n) {
    const r = e.slice();
    return (r[15] = t[n]), (r[17] = n), r;
  }

  function kn(t) {
    let n;
    return {
      c() {
        (n = w("div")),
          (n.textContent = "Play daily to see your stats"),
          M(n, "class", "text-center py-3 text-custom-line font-semibold");
      },
      m(e, t) {
        g(e, n, t);
      },
      p: e,
      d(e) {
        e && y(n);
      },
    };
  }

  function _n(e) {
    let t,
      n,
      r,
      s,
      i,
      o,
      a,
      l,
      u,
      c,
      d,
      h,
      f,
      m,
      k,
      b,
      S,
      D,
      T,
      Y,
      C,
      O,
      P,
      A,
      L,
      N,
      H,
      I,
      W,
      R,
      F,
      G,
      E,
      j,
      B = (e[6] > 0 ? ((e[8] / e[6]) * 100).toFixed(1) : 0) + "",
      z =
        e[11].slice(-1)[0].hasFinished || e[7].length < 2
          ? e[7].slice(-1)[0] + ""
          : e[7].slice(-2)[0] + "",
      U = Math.max(...e[7]) + "",
      V = e[9],
      J = [];

    for (let t = 0; t < V.length; t += 1) J[t] = Mn(wn(e, V, t));
    return {
      c() {
        t = w("div");
        for (let e = 0; e < J.length; e += 1) J[e].c();
        (n = x()),
          (r = w("div")),
          (s = w("div")),
          (i = w("div")),
          (o = _(e[6])),
          (a = x()),
          (l = w("div")),
          (l.textContent = playedT[language]),
          (u = x()),
          (c = w("div")),
          (d = w("div")),
          (h = _(e[8])),
          (f = x()),
          (m = w("div")),
          (m.textContent = wonT[language]),
          (k = x()),
          (b = w("div")),
          (S = w("div")),
          (D = _(B)),
          (T = _("%")),
          (Y = x()),
          (C = w("div")),
          (C.textContent = winRateT[language]),
          (O = x()),
          (P = w("div")),
          (A = w("div")),
          (L = w("div")),
          (N = _(z)),
          (H = x()),
          (I = w("div")),
          (I.textContent = currentStreakT[language]),
          (W = x()),
          (R = w("div")),
          (F = w("div")),
          (G = _(U)),
          (E = x()),
          (j = w("div")),
          (j.textContent = maxStreakT[language]),
          M(t, "class", "flex justify-between py-3"),
          M(i, "class", "text-xl font-semibold"),
          M(l, "class", "text-custom-line text-sm "),
          M(s, "class", "flex-1"),
          M(d, "class", "text-xl font-semibold"),
          M(m, "class", "text-custom-line text-sm "),
          M(c, "class", "flex-1"),
          M(S, "class", "text-xl font-semibold"),
          M(C, "class", "text-custom-line text-sm"),
          M(b, "class", "flex-1"),
          M(r, "class", "flex justify-between text-center w-full py-3"),
          M(L, "class", "text-xl font-semibold"),
          M(I, "class", "text-custom-line text-sm"),
          M(A, "class", "flex-1"),
          M(F, "class", "text-xl font-semibold"),
          M(j, "class", "text-custom-line text-sm"),
          M(R, "class", "flex-1"),
          M(P, "class", "flex justify-between text-center w-full py-3 pt-0");
      },
      m(e, y) {
        g(e, t, y);
        for (let e = 0; e < J.length; e += 1) J[e].m(t, null);
        g(e, n, y),
          g(e, r, y),
          p(r, s),
          p(s, i),
          p(i, o),
          p(s, a),
          p(s, l),
          p(r, u),
          p(r, c),
          p(c, d),
          p(d, h),
          p(c, f),
          p(c, m),
          p(r, k),
          p(r, b),
          p(b, S),
          p(S, D),
          p(S, T),
          p(b, Y),
          p(b, C),
          g(e, O, y),
          g(e, P, y),
          p(P, A),
          p(A, L),
          p(L, N),
          p(A, H),
          p(A, I),
          p(P, W),
          p(P, R),
          p(R, F),
          p(F, G),
          p(R, E),
          p(R, j);
      },
      p(e, n) {
        if (1567 & n) {
          let r;
          for (V = e[9], r = 0; r < V.length; r += 1) {
            const s = wn(e, V, r);
            J[r] ? J[r].p(s, n) : ((J[r] = Mn(s)), J[r].c(), J[r].m(t, null));
          }
          for (; r < J.length; r += 1) J[r].d(1);
          J.length = V.length;
        }
        64 & n && $(o, e[6]),
          256 & n && $(h, e[8]),
          320 & n &&
            B !==
              (B = (e[6] > 0 ? ((e[8] / e[6]) * 100).toFixed(1) : 0) + "") &&
            $(D, B),
          128 & n && z !== (z = e[7].slice(-1)[0] + "") && $(N, z),
          128 & n && U !== (U = Math.max(...e[7]) + "") && $(G, U);
      },
      d(e) {
        e && y(t), v(J, e), e && y(n), e && y(r), e && y(O), e && y(P);
      },
    };
  }

  function xn(e) {
    let t,
      n,
      r,
      s = ((e[17] + 1) * e[0].attemptInterval) / 1e3 + "";
    return {
      c() {
        (t = _("< ")), (n = _(s)), (r = _("s"));
      },
      m(e, s) {
        g(e, t, s), g(e, n, s), g(e, r, s);
      },
      p(e, t) {
        1 & t &&
          s !== (s = ((e[17] + 1) * e[0].attemptInterval) / 1e3 + "") &&
          $(n, s);
      },
      d(e) {
        e && y(t), e && y(n), e && y(r);
      },
    };
  }

  function bn(e) {
    let t,
      n,
      r,
      s,
      i,
      o = e[17] + 1 + "";
    return {
      c() {
        (t = w("span")),
          (n = _(o)),
          (r = _("°")),
          (s = x()),
          (i = w("span")),
          Y(t, "font-semibold", e[17] == e[1] - 1 && e[2]),
          Y(t, "text-custom-positive", e[17] == e[1] - 1 && 0 != e[4] && e[2]),
          Y(t, "text-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]),
          M(i, "class", "text-custom-positive");
      },
      m(e, o) {
        g(e, t, o), p(t, n), p(t, r), g(e, s, o), g(e, i, o);
      },
      p(e, n) {
        6 & n && Y(t, "font-semibold", e[17] == e[1] - 1 && e[2]),
          22 & n &&
            Y(
              t,
              "text-custom-positive",
              e[17] == e[1] - 1 && 0 != e[4] && e[2]
            ),
          22 & n &&
            Y(t, "text-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]);
      },
      d(e) {
        e && y(t), e && y(s), e && y(i);
      },
    };
  }

  function Sn(e) {
    let t, n, r;
    return {
      c() {
        (t = k("svg")),
          (n = k("line")),
          (r = k("line")),
          M(n, "x1", "18"),
          M(n, "y1", "6"),
          M(n, "x2", "6"),
          M(n, "y2", "18"),
          M(r, "x1", "6"),
          M(r, "y1", "6"),
          M(r, "x2", "18"),
          M(r, "y2", "18"),
          M(t, "class", "mx-auto"),
          M(t, "xmlns", "http://www.w3.org/2000/svg"),
          M(t, "width", "16"),
          M(t, "height", "16"),
          M(t, "viewBox", "0 0 24 24"),
          M(t, "fill", "none"),
          M(t, "stroke", "currentColor"),
          M(t, "stroke-width", "2"),
          M(t, "stroke-linecap", "round"),
          M(t, "stroke-linejoin", "round"),
          Y(t, "text-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]);
      },
      m(e, s) {
        g(e, t, s), p(t, n), p(t, r);
      },
      p(e, n) {
        22 & n &&
          Y(t, "text-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]);
      },
      d(e) {
        e && y(t);
      },
    };
  }

  function Mn(e) {
    let t,
      n,
      r,
      s,
      i,
      o,
      a,
      l,
      u = (e[15] > 0 ? e[15] : " ") + "";

    function c(e, t) {
      return e[17] === e[9].length - 1 ? Sn : e[3] ? bn : xn;
    }
    let d = c(e),
      h = d(e);
    return {
      c() {
        (t = w("div")),
          (n = w("div")),
          (r = w("div")),
          (s = w("div")),
          (i = _(u)),
          (o = x()),
          (a = w("div")),
          h.c(),
          (l = x()),
          M(s, "class", "h-full absolute text-center w-full py-1 text-xs "),
          Y(s, "bg-custom-positive", e[17] == e[1] - 1 && 0 != e[4] && e[2]),
          Y(s, "bg-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]),
          M(r, "class", "absolute bg-custom-mg w-6"),
          T(r, "height", (e[15] / e[10]) * 100 + "%"),
          M(n, "class", "h-32 relative w-9 flex justify-center items-end"),
          M(
            a,
            "class",
            "text-center border-right text-xs pt-1 text-custom-line"
          ),
          M(t, "class", "flex flex-col items-stretch ");
      },
      m(e, u) {
        g(e, t, u),
          p(t, n),
          p(n, r),
          p(r, s),
          p(s, i),
          p(t, o),
          p(t, a),
          h.m(a, null),
          p(t, l);
      },
      p(e, t) {
        512 & t && u !== (u = (e[15] > 0 ? e[15] : " ") + "") && $(i, u),
          22 & t &&
            Y(s, "bg-custom-positive", e[17] == e[1] - 1 && 0 != e[4] && e[2]),
          22 & t &&
            Y(s, "bg-custom-negative", e[17] == e[1] && 0 == e[4] && e[2]),
          1536 & t && T(r, "height", (e[15] / e[10]) * 100 + "%"),
          d === (d = c(e)) && h
            ? h.p(e, t)
            : (h.d(1), (h = d(e)), h && (h.c(), h.m(a, null)));
      },
      d(e) {
        e && y(t), h.d();
      },
    };
  }

  function $n(t) {
    let n;

    function r(e, t) {
      return e[5] ? _n : kn;
    }
    let s = r(t),
      i = s(t);
    return {
      c() {
        i.c(), (n = b());
      },
      m(e, t) {
        i.m(e, t), g(e, n, t);
      },
      p(e, [t]) {
        s === (s = r(e)) && i
          ? i.p(e, t)
          : (i.d(1), (i = s(e)), i && (i.c(), i.m(n.parentNode, n)));
      },
      i: e,
      o: e,
      d(e) {
        i.d(e), e && y(n);
      },
    };
  }

  function Dn(e, t, n) {
    let { userStats: r } = t,
      { config: s } = t,
      { todaysScore: i } = t,
      { hasFinished: o } = t,
      { daysSince: a } = t,
      l = !1,
      u = 0,
      c = [],
      d = [],
      h = 0,
      { isPrime: f } = t,
      { guessRef: m } = t,
      p = [];
    for (let e = 0; e < s.maxAttempts + 1; e++) p[e] = 0;
    let g = 0;
    if (r.length > 0) {
      l = !0;
      for (let e = 0; e < a + 1; e++) d.push(0);
      for (let e in r)
        !0 === r[e].hasFinished &&
          (++u,
          !0 === r[e].gotCorrect
            ? ((d[r[e].id] = 1),
              ++h,
              ++p[r[e].score - 1],
              p[r[e].score - 1] > g && (g = p[r[e].score - 1]))
            : (++p[s.maxAttempts],
              p[s.maxAttempts] > g && (g = p[s.maxAttempts])));
      c = d.reduce((e, t) => (t ? e[e.length - 1]++ : e.push(0), e), [0]);
    }
    return (
      (e.$$set = (e) => {
        "userStats" in e && n(11, (r = e.userStats)),
          "config" in e && n(0, (s = e.config)),
          "todaysScore" in e && n(1, (i = e.todaysScore)),
          "hasFinished" in e && n(2, (o = e.hasFinished)),
          "daysSince" in e && n(12, (a = e.daysSince)),
          "isPrime" in e && n(3, (f = e.isPrime)),
          "guessRef" in e && n(4, (m = e.guessRef));
      }),
      [s, i, o, f, m, l, u, c, h, p, g, r, a]
    );
  }
  class Tn extends se {
    constructor(e) {
      super(),
        re(this, e, Dn, $n, i, {
          userStats: 11,
          config: 0,
          todaysScore: 1,
          hasFinished: 2,
          daysSince: 12,
          isPrime: 3,
          guessRef: 4,
        });
    }
  }

  var Pn;
  const { document: An, window: Ln } = X;

  function Nn(e) {
    let t, n;
    return (
      (t = new Lt({
        props: {
          hasFrame: e[10].hasFrame,
          title: e[10].title,
          $$slots: {
            default: [Fn],
          },
          $$scope: {
            ctx: e,
          },
        },
      })),
      t.$on("close", e[20]),
      {
        c() {
          Q(t.$$.fragment);
        },
        m(e, r) {
          ee(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          1024 & n[0] && (r.hasFrame = e[10].hasFrame),
            1024 & n[0] && (r.title = e[10].title),
            (1392 & n[0]) | (8 & n[1]) &&
              (r.$$scope = {
                dirty: n,
                ctx: e,
              }),
            t.$set(r);
        },
        i(e) {
          n || (Z(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          q(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          te(t, e);
        },
      }
    );
  }

  function Hn(t) {
    let n, r;
    return (
      (n = new vn({})),
      n.$on("close", t[19]),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function In(e) {
    let t, n;
    return (
      (t = new Tn({
        props: {
          userStats: e[4],
          config: Vt,
          isPrime: e[8].isPrime,
          daysSince: e[11],
          todaysScore: e[6].length,
          guessRef: e[5].gotCorrect ? e[6].length + 1 : 0,
          hasFinished: e[5].hasFinished,
        },
      })),
      {
        c() {
          Q(t.$$.fragment);
        },
        m(e, r) {
          ee(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          16 & n[0] && (r.userStats = e[4]),
            256 & n[0] && (r.isPrime = e[8].isPrime),
            64 & n[0] && (r.todaysScore = e[6].length),
            96 & n[0] && (r.guessRef = e[5].gotCorrect ? e[6].length + 1 : 0),
            32 & n[0] && (r.hasFinished = e[5].hasFinished),
            t.$set(r);
        },
        i(e) {
          n || (Z(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          q(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          te(t, e);
        },
      }
    );
  }

  function Wn(t) {
    let n, r;
    return (
      (n = new Ut({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function Rn(t) {
    let n, r;
    return (
      (n = new Ht({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function MLn(t) {
    let n, r;
    return (
      (n = new MLCt({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function Langn(t) {
    let n, r;
    return (
      (n = new LangCt({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function Filtern(t) {
    let n, r;
    return (
      (n = new FilterCt({})),
      {
        c() {
          Q(n.$$.fragment);
        },
        m(e, t) {
          ee(n, e, t), (r = !0);
        },
        p: e,
        i(e) {
          r || (Z(n.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(n.$$.fragment, e), (r = !1);
        },
        d(e) {
          te(n, e);
        },
      }
    );
  }

  function Fn(e) {
    let t, n, r, s;
    const i = [Rn, Wn, In, Hn, MLn, Langn, Filtern],
      o = [];

    function a(e, t) {
      return "info" == e[10].name
        ? 0
        : "donate" == e[10].name
        ? 1
        : "results" == e[10].name
        ? 2
        : "help" == e[10].name
        ? 3
        : "music-list" == e[10].name
        ? 4
        : "lang-list" == e[10].name
        ? 5
        : "filter" == e[10].name
        ? 6
        : -1;
    }
    return (
      ~(t = a(e)) && (n = o[t] = i[t](e)),
      {
        c() {
          n && n.c(), (r = b());
        },
        m(e, n) {
          ~t && o[t].m(e, n), g(e, r, n), (s = !0);
        },
        p(e, s) {
          let l = t;
          (t = a(e)),
            t === l
              ? ~t && o[t].p(e, s)
              : (n &&
                  (J(),
                  q(o[l], 1, 1, () => {
                    o[l] = null;
                  }),
                  K()),
                ~t
                  ? ((n = o[t]),
                    n ? n.p(e, s) : ((n = o[t] = i[t](e)), n.c()),
                    Z(n, 1),
                    n.m(r.parentNode, r))
                  : (n = null));
        },
        i(e) {
          s || (Z(n), (s = !0));
        },
        o(e) {
          q(n), (s = !1);
        },
        d(e) {
          ~t && o[t].d(e), e && y(r);
        },
      }
    );
  }

  function Gn(e) {
    let t, n, r;

    function s(t) {
      e[23](t);
    }
    let i = {
      isPrime: e[8].isPrime,
      config: Vt,
      allOptions: e[9],
      currentAttempt: e[6].length + 1,
    };
    return (
      void 0 !== e[7] && (i.guessInput = e[7]),
      (t = new Yt({
        props: i,
      })),
      e[22](t),
      H.push(() =>
        (function (e, t, n) {
          const r = e.$$.props[t];
          void 0 !== r && ((e.$$.bound[r] = n), n(e.$$.ctx[r]));
        })(t, "guessInput", s)
      ),
      t.$on("guess", e[15]),
      {
        c() {
          Q(t.$$.fragment);
        },
        m(e, n) {
          ee(t, e, n), (r = !0);
        },
        p(e, r) {
          const s = {};
          var i;
          256 & r[0] && (s.isPrime = e[8].isPrime),
            512 & r[0] && (s.allOptions = e[9]),
            64 & r[0] && (s.currentAttempt = e[6].length + 1),
            !n &&
              128 & r[0] &&
              ((n = !0),
              (s.guessInput = e[7]),
              (i = () => (n = !1)),
              W.push(i)),
            t.$set(s);
        },
        i(e) {
          r || (Z(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          q(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[22](null), te(t, n);
        },
      }
    );
  }

  function En(e) {
    let t, n, s, i, o, a, l, u, c, d, h, f, m, v, k, _, b, $, D, Y, C, O, P, A;
    G(e[18]),
      (l = new me({
        props: {
          properties: ["G-3QSG4MYSLD"],
        },
      }));
    let L = e[10].isActive && Nn(e);
    (f = new xe({})),
      f.$on("modal", e[16]),
      (_ = new Ie({
        props: {
          userGuesses: e[6],
          maxAttempts: Vt.maxAttempts,
          currentHeardle: e[2],
          todaysGame: e[5],
        },
      })),
      ($ = new mn({
        props: {
          config: Vt,
          userGuesses: e[6],
          currentHeardle: e[2],
          hasFinished: e[5].hasFinished,
          gotCorrect: e[5].gotCorrect,
          isPrime: e[8].isPrime,
          guessRef: e[5].gotCorrect ? e[6].length : 0,
        },
      }));
    let N = {
      config: Vt,
      gameState: e[8],
      currentHeardle: e[2],
      trackDuration: e[2].duration,
      currentAttempt: e[6].length + 1,
    };
    (Y = new gt({
      props: N,
    })),
      e[21](Y),
      Y.$on("updateSong", e[13]),
      Y.$on("updatePlayerState", e[14]);
    let H = !e[5].hasFinished && e[8].gameIsActive && Gn(e);
    return {
      c() {
        (t = w("meta")),
          (n = w("link")),
          (s = w("link")),
          (i = w("link")),
          (o = w("link")),
          (a = x()),
          Q(l.$$.fragment),
          (u = x()),
          (c = w("main")),
          L && L.c(),
          (d = x()),
          (h = w("div")),
          Q(f.$$.fragment),
          (m = x()),
          (v = w("div")),
          (k = w("div")),
          Q(_.$$.fragment),
          (b = x()),
          Q($.$$.fragment),
          (D = x()),
          Q(Y.$$.fragment),
          (C = x()),
          H && H.c(),
          (An.title = artist + " Infinite Heardle"),
          M(t, "name", "description"),
          M(
            t,
            "content",
            "Guess the " +
              artist +
              " song from the intro in as few tries as possible"
          ),
          M(o, "rel", "manifest"),
          M(o, "href", "/site.webmanifest"),
          M(h, "class", "flex-none"),
          M(
            k,
            "class",
            "max-w-screen-sm w-full mx-auto h-full flex flex-col justify-between overflow-auto"
          ),
          M(v, "class", "w-full flex flex-col flex-grow relative"),
          M(
            c,
            "class",
            "bg-custom-bg text-custom-fg overflow-auto flex flex-col"
          ),
          T(c, "height", e[3] + "px");
      },
      m(r, y) {
        p(An.head, t),
          p(An.head, n),
          p(An.head, s),
          p(An.head, i),
          p(An.head, o),
          g(r, a, y),
          ee(l, r, y),
          g(r, u, y),
          g(r, c, y),
          L && L.m(c, null),
          p(c, d),
          p(c, h),
          ee(f, h, null),
          p(c, m),
          p(c, v),
          p(v, k),
          ee(_, k, null),
          p(k, b),
          ee($, k, null),
          p(c, D),
          ee(Y, c, null),
          p(c, C),
          H && H.m(c, null),
          (O = !0),
          P ||
            ((A = [S(Ln, "resize", e[17]), S(Ln, "resize", e[18])]), (P = !0));
      },
      p(e, t) {
        e[10].isActive
          ? L
            ? (L.p(e, t), 1024 & t[0] && Z(L, 1))
            : ((L = Nn(e)), L.c(), Z(L, 1), L.m(c, d))
          : L &&
            (J(),
            q(L, 1, 1, () => {
              L = null;
            }),
            K());
        const n = {};
        64 & t[0] && (n.userGuesses = e[6]),
          4 & t[0] && (n.currentHeardle = e[2]),
          32 & t[0] && (n.todaysGame = e[5]),
          _.$set(n);
        const r = {};
        64 & t[0] && (r.userGuesses = e[6]),
          4 & t[0] && (r.currentHeardle = e[2]),
          32 & t[0] && (r.hasFinished = e[5].hasFinished),
          32 & t[0] && (r.gotCorrect = e[5].gotCorrect),
          256 & t[0] && (r.isPrime = e[8].isPrime),
          96 & t[0] && (r.guessRef = e[5].gotCorrect ? e[6].length : 0),
          $.$set(r);
        const s = {};
        256 & t[0] && (s.gameState = e[8]),
          4 & t[0] && (s.currentHeardle = e[2]),
          4 & t[0] && (s.trackDuration = e[2].duration),
          64 & t[0] && (s.currentAttempt = e[6].length + 1),
          Y.$set(s),
          !e[5].hasFinished && e[8].gameIsActive
            ? H
              ? (H.p(e, t), 288 & t[0] && Z(H, 1))
              : ((H = Gn(e)), H.c(), Z(H, 1), H.m(c, null))
            : H &&
              (J(),
              q(H, 1, 1, () => {
                H = null;
              }),
              K()),
          (!O || 8 & t[0]) && T(c, "height", e[3] + "px");
      },
      i(e) {
        O ||
          (Z(l.$$.fragment, e),
          Z(L),
          Z(f.$$.fragment, e),
          Z(_.$$.fragment, e),
          Z($.$$.fragment, e),
          Z(Y.$$.fragment, e),
          Z(H),
          (O = !0));
      },
      o(e) {
        q(l.$$.fragment, e),
          q(L),
          q(f.$$.fragment, e),
          q(_.$$.fragment, e),
          q($.$$.fragment, e),
          q(Y.$$.fragment, e),
          q(H),
          (O = !1);
      },
      d(d) {
        y(t),
          y(n),
          y(s),
          y(i),
          y(o),
          d && y(a),
          te(l, d),
          d && y(u),
          d && y(c),
          L && L.d(),
          te(f),
          te(_),
          te($),
          e[21](null),
          te(Y),
          H && H.d(),
          (P = !1),
          r(A);
      },
    };
  }

  function jn(e, t, n) {
    let r, s, i, o;
    u(e, Cn, (e) => n(26, (r = [...filteredMusicNameList]))),
      u(e, On, (e) => n(27, (s = e)));
    let a = currentIndex,
      l = {
        url: s[a].url,
        correctAnswer: s[a].answer,
        id: a,
        guessList: [],
        hasFinished: !1,
        hasStarted: !1,
      };
    // console.log("a", l);
    var c, d;

    // EventListener, originnally here to reload the page if the day changed
    // void 0 !== document.hidden ?
    //     ((c = "hidden"), (d = "visibilitychange")) :
    //     void 0 !== document.msHidden ?
    //     ((c = "msHidden"), (d = "msvisibilitychange")) :
    //     void 0 !== document.webkitHidden &&
    //     ((c = "webkitHidden"), (d = "webkitvisibilitychange")),
    //     void 0 === document.addEventListener ||
    //     void 0 === c ||
    //     document.addEventListener(
    //         d,
    //         function() {
    //             document[c] || a === currentIndex || location.reload(!0);
    //         }, !1
    //     );
    let h,
      f,
      m = 0;

    function p() {
      n(3, (m = window.innerHeight));
    }
    P(() => {
      p();
    });
    if (localStorage.getItem("language")) {
      language = localStorage.getItem("language");
    }
    if (null == localStorage.getItem("userStats")) {
      (h = []), localStorage.setItem("userStats", JSON.stringify(h));
      firstLoad = false;
    } else {
      if (firstLoad) {
        h = [];
        filterMusicLists();
        firstLoad = false;
      } else {
        h = JSON.parse(localStorage.getItem("userStats"));
      }
      f = h.find((e) => e.id === l.id);
    }
    void 0 === f &&
      ((f = l),
      h.push(f),
      localStorage.setItem("userStats", JSON.stringify(h)));
    let g,
      y,
      v = f.guessList,
      w = {
        gameIsActive: !1,
        musicIsPlaying: !1,
        playerIsReady: !1,
        // isPrime: a >= 7, // C'est le bug bizarre des 9 secondes ?
        isPrime: true,
      };
    let k = {
      isActive: !1,
      hasFrame: !0,
      title: "",
      name: "",
    };

    function _(e, t, r) {
      n(10, (k.isActive = !0), k),
        n(10, (k.name = e), k),
        n(10, (k.title = t), k),
        n(10, (k.hasFrame = r), k);
    }

    null == localStorage.getItem("firstTime") &&
      (_("help", howToPlayT[language]),
      localStorage.setItem("firstTime", "false"));
    return [
      i,
      o,
      l,
      m,
      h,
      f,
      v,
      g,
      w,
      y,
      k,
      a,
      p,
      function (e) {
        let t = e.detail.currentSong;
        let musicString = musicNameList.find((a) => a.id == l.correctAnswer);
        // console.log("current song", l);
        n(2, (l.artist = musicString[language].split(" - ")[1]), l),
          n(2, (l.title = musicString[language].split(" - ")[0]), l),
          n(2, (l.img = t.artwork_url), l),
          n(2, (l.duration = t.duration), l),
          n(2, (l.genre = t.genre), l),
          n(2, (l.date = t.release_date), l),
          (function (e, t, n) {
            e.set(n);
          })(Cn, (r = [...r, l.correctAnswer]), r),
          n(9, (y = r)),
          n(8, (w.playerIsReady = !0), w),
          f.hasFinished || n(8, (w.gameIsActive = !0), w);
      },
      function (e) {
        l.hasStarted ||
          (pe("startGame#" + l.id, {
            name: "startGame",
          }),
          pe("startGame", {
            name: "startGame",
          }),
          n(2, (l.hasStarted = !0), l)),
          n(8, (w.musicIsPlaying = e.detail.musicIsPlaying), w);
      },
      function (e) {
        let t = e.detail.guess,
          r = e.detail.isSkipped,
          s = !1;
        var o;
        var findMusic = musicNameList.find((m) => m[language] == t);
        r ||
          !findMusic ||
          findMusic.id != l.correctAnswer ||
          ((s = !0),
          pe("correctGuess", {
            name: "correctGuess",
          }),
          pe("correctGuess#" + l.id, {
            name: "correctGuess",
          })),
          r
            ? (pe("skippedGuess", {
                name: "skippedGuess",
              }),
              pe("skippedGuess#" + l.id, {
                name: "skippedGuess",
              }))
            : s ||
              (pe("incorrectGuess", {
                name: "incorrectGuess",
              }),
              pe("incorrectGuess#" + l.id, {
                name: "incorrectGuess",
              })),
          n(
            6,
            (v = v.concat({
              answer: e.detail.guess,
              isCorrect: s,
              isSkipped: r,
            }))
          ),
          n(5, (f.guessList = v), f),
          localStorage.setItem("userStats", JSON.stringify(h)),
          (v.length != Vt.maxAttempts && 1 != s) ||
            ((o = s),
            n(8, (w.gameIsActive = !1), w),
            n(5, (f.hasFinished = !0), f),
            n(5, (f.gotCorrect = o), f),
            n(5, (f.score = v.length), f),
            localStorage.setItem("userStats", JSON.stringify(h)),
            i.resetAndPlay(),
            o
              ? (pe("wonGame", {
                  name: "won",
                }),
                pe("wonGame#" + l.id, {
                  name: "won",
                }))
              : (pe("lostGame", {
                  name: "lost",
                }),
                pe("lostGame#" + l.id, {
                  name: "lost",
                })),
            pe("endGame" + l.id + "in" + v.length, {
              name: "#" + v.length,
            }),
            pe("endGame", {
              name: "endGame",
            }),
            pe("endGame#" + l.id, {
              name: "endGame",
            }),
            pe("gameStats#" + l.id, {
              name: v,
            }));
      },
      function (e) {
        _(e.detail.name, e.detail.title, e.detail.hasFrame);
      },
      () => {},
      function () {
        n(3, (m = Ln.innerHeight));
      },
      () => n(10, (k.isActive = !1), k),
      () => n(10, (k.isActive = !1), k),
      function (e) {
        H[e ? "unshift" : "push"](() => {
          (i = e), n(0, i);
        });
      },
      function (e) {
        H[e ? "unshift" : "push"](() => {
          (o = e), n(1, o);
        });
      },
      function (e) {
        (g = e), n(7, g);
      },
    ];
  }
  return new (class extends se {
    constructor(e) {
      super(), re(this, e, jn, En, i, {}, null, [-1, -1]);
    }
  })({
    target: document.body,
    props: {},
  });
})();
