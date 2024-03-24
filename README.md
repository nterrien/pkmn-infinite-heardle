# pkmn-infinite-heardle

## ENG

A clone of [Heardle](https://www.heardle.app/), and [K-Pop Heardle](https://heardle-kpop.glitch.me/) which can be played infinitely and with Pokémon's musics. Based on [Joywave Heardle](https://joywave-heardle.glitch.me/)

code edited from: [WJSN Heardle](https://github.com/haseul/wjsn-heardle)
<br />
<br />
HOW TO RUN INFINITE HEARDLE LOCALLY:
Open **index.html** with your browser (Firefox, Chromium)
<br />
<br />
HOW TO MAKE YOUR OWN INFINITE HEARDLE (UDPATED on **2022-11-20**)
(If you want an infinite heardle that does not includes translations you can check the readme of [Etrian Infinite Heardle](https://glitch.com/edit/#!/etrian-infinite-heardle))

1. **Remix this project** to create your own copy of the code
2. **Rename the project** with the URL that you'd like to Heardle to live at, by going to **Settings > Edit Project Details**
3. Open the **index.html** file & replace **"Pokémon"** with the artist/genre of your heardle. Make sure to **do this first**, if you update the main.js first, sometimes your link will still show Joywave even after you update everything.
4. In the **index.html** file, you can update the image that gets shared with your link by updating lines **19-29**. To make sure the images show up correctly when sharing to twitter, make sure to use different links for the 2 sections!

(Items 5-12 are all edits to the **main.js file**)

5. On line **2** of **main.js** file and update **artist** with the **artist/genre** of your heardle - This will update all the text boxes & titles where "Pokémon" shows up
6. On line **3** of **main.js** file, update **twitter** with your own twitter or instagram handle - This will update the contact info and replace every instance of "joywavez"
7. On line **5** of **main.js** file, update **zipUrl** with the url of the zip with the version of your heardle that can be exectued locally. If you don't want that you can replace with "".
8. On line **7** of **main.js** file, update **languages** with the list of languages your using. If you dont plan on using multiple languages remix the [Etrian Infinite Heardle](https://glitch.com/edit/#!/etrian-infinite-heardle) instead.
9. On line **8** of **main.js**, update **language** with your default language.
10. On line **17** of **main.js**, "const **musicNameList**" is initialized. Replace the text with a list of song titles that you want to show up as suggestions in your Heardle. Every song should have a different id, and an entry for every language in languages. For each language, the song name should follow the format **"Song - Artist".** Make sure each song is in quotes and has a comma after it
11. On line **8595** of **main.js**, "const **musicListWithLinks**" is initialized. Here you'll have to replace the links with links to your songs. Only Soundcloud links at the moment. Each link will have to follow the following format: **`{ url: "<link>", answer: id of the song },`**  . Make sure to have **at least 10 songs** in your lists otherwise you'll run into issues with the search bar!
12. If you want to edit the text of the interface edit constants between line **15369** and line **15415**. (flags, aboutT, supportT, statsT, howToPlayT, musicListT, langListT, volumeT, submitT, placeholderT, nextT, goodAnswerT, secondT, badAnswerT, supportPopupT, howToPlayPopup1T, howToPlayPopup2T, howToPlayPopup3T, aboutPopupT)

<br /> 
<br />

Glitch auto saves your code, so your changes should be available as soon as the code is editted.
<br />

Heardle sometimes doesnt work in the "Open Preview Pane" option, so it's best view it in the "Preview in new window" option
<br />

**ARCHIVING YOUR HEARDLE**
<br />
If your heardle goes blank/shows an empty page once it runs out of songs and you'd like to disable your site without archiving your site, you can update the **index.html** with a few lines of html.
I have an example of how to do that on **line 4** [here](https://glitch.com/edit/#!/testerheardle?path=index.html%3A55%3A0) and you can preview it [here](https://testerheardle.glitch.me/)
<br />
<br />

Feel free to dm me @beignet0 on Reddit, beignetSan on Twitch or beignet1139 on Discord if you have any issues/questions!
<br />
<br />

**KNOWN ISSUES**
- This code is specific to Soundcloud links.

  - I have a [youtube](https://glitch.com/~youtube-heardle-template) version, but its very basic and may have bugs; youtube links can be weird depending on your location, so it messes things up.

  - If you want to use a Spotify playlist, visit [https://audial.mogdan.xyz/custom](https://audial.mogdan.xyz/custom). You'll be able to add a link to your playlist and it seems to work similarly to Heardle.

## FRA

Un clone de [Heardle](https://www.heardle.app/), et de [K-Pop Heardle](https://heardle-kpop.glitch.me/) qui peut être joué à l'infini et avec les musiques de Pokémon. Basé sur [Joywave Heardle](https://joywave-heardle.glitch.me/)

code édité à partir de: [WJSN Heardle](https://github.com/haseul/wjsn-heardle)
<br />
<br />
COMMENT FAIRE TOURNER INFINITE HEARDLE EN LOCAL:
Ouvrez **index.html** avec votre navigateur (Firefox, Chromium)
<br />
<br />
COMMENT FAIRE VOTRE PROPRE HEARDLE INFINIE (MISE À JOUR LE **2022-11-20**)
(Si vous voulez un Heardle infini qui ne comprend pas de traductions, vous pouvez consulter le README de [Etrian Infinite Heardle](https://glitch.com/edit/#!/etrian-infinite-heardle))

1. **Remixez ce projet** pour créer votre propre copie du code.
2. **Renommez le projet** avec l'URL que vous souhaitez utiliser pour utiliser le Heardle utilisez en allant dans **Settings > Edit Project Details**
3. Ouvrez le fichier **index.html** et remplacer **"Pokémon"** par l'artiste/genre de votre Heardle.
Assurez-vous de faire cela **en premier**, si vous mettez d'abord à jour le fichier main.js, il se peut que votre lien affiche toujours Joywave même après avoir tout mis à jour.
4. Dans le fichier **index.html**, vous pouvez mettre à jour l'image qui est partagée avec votre lien en mettant à jour les lignes **19-29**.

(Les points 5-12 sont tous des modifications du fichier **main.js**) 

5. À la ligne **2** du fichier **main.js**, mettez à jour **artist** avec le nom de l'**artiste/genre** de votre Heardle. Cela va mettre à jour tous les textes où "Pokémon" apparaît.
6. À la ligne **3** du fichier **main.js**, mettez à jour **twitter** avec votre propre identifiant twitter ou instagram - Cela mettra à jour les informations de contact et remplacera chaque instance de "joywavez".
7. À la ligne **5** du fichier  **main.js**, mettez à jour **zipUrl** avec l'url du zip qui contient une version du Heardle qui peut être executé localement. Si vous ne voulez pas de cette option, vous pouvez remplacer par "".
8. À la ligne **7** du fichier  **main.js**, mettez à jour **languages** avec la liste des langues utilisées. Si vous ne prévoyez pas d'utiliser plusieurs langues
remixez le [Etrian Infinite Heardle](https://glitch.com/edit/#!/etrian-infinite-heardle) à la place.
9. À la ligne **8** du fichier  **main.js**, mettez à jour **language** avec la langue par défaut.
10. À la ligne **17** du fichier  **main.js**, "const **musicNameList**" est initialisée. Remplacez le texte par la liste de titres de chansons que vous souhaitez voir apparaître comme suggestions dans votre Heardle. Chaque chanson doit avoir un id différent, et une entrée pour chaque langue dans languages. Pour chaque langue, le nom de la chanson doit suivre le format **"Nom de la musique - Artiste/Genre/Jeu"**. Assurez-vous que chaque chanson est entre guillemets et qu'elle est suivie d'une virgule.
11. À la ligne **8595** du fichier  **main.js**, "const **musicListWithLinks**" est initialisée.  Ici, vous devez remplacer les liens par des liens vers vos musiques. Seulement des liens Soundcloud. Chaque ligne devra suivre le format suivant : **`{ url : "<link>", answer : id de la chanson }`**,. Assurez-vous d'avoir au moins 10 chansons dans vos listes sinon vous rencontrerez des problèmes avec la
barre de recherche !
12. Si vous voulez modifier le texte de l'interface, éditez les constantes entre la ligne **15369** et la ligne **15415**. (flags, aboutT, supportT, statsT, howToPlayT, musicListT, langListT, volumeT, submitT, placeholderT, nextT, goodAnswerT, secondT, badAnswerT, supportPopupT, howToPlayPopup1T, howToPlayPopup2T, howToPlayPopup3T, aboutPopupT)

<br /> 
<br />

Glitch sauvegarde automatiquement votre code, donc vos changements devraient être disponibles dès que le code est édité. 
<br />

Heardle ne fonctionne parfois pas dans l'option "Open Preview Pane", il est donc préférable de le visualiser dans l'option "Preview in new window". 
<br />

**ARCHIVAGE DE VOTRE HEARDLE**
<br />
Si votre heardle devient vide/affiche une page vide une fois qu'il n'y a plus de chansons et que vous souhaitez désactiver votre site sans l'archiver, vous pouvez mettre à jour l'**index.html** avec quelques lignes de html. J'ai un exemple de comment faire cela sur la **ligne 4** [ici](https://glitch.com/edit/#!/testerheardle?path=index.html%3A55%3A0) et vous pouvez
le visualiser [ici](https://testerheardle.glitch.me/)
<br />
<br />
N'hésitez pas à dm @beignet0 sur Reddit, beignetSan sur Twitch ou beignet1139 sur Discord si vous avez des problèmes/questions sur le Pokémon Infinite Heardle ! <br />
<br />

**PROBLÈMES CONNUS**
- Ce code est spécifique aux liens Soundcloud.

  - Il y a une version [youtube](https://glitch.com/~youtube-heardle-template), mais elle est très basique et peut avoir des bugs ; les liens youtube peuvent être bizarres en fonction de votre localisation, ce qui peut perturber les choses.

  - Si vous voulez utiliser une liste de lecture Spotify, rendez-vous sur [https://audial.mogdan.xyz/custom](https://audial.mogdan.xyz/custom). Vous pourrez ajouter un lien à votre liste de lecture et cela à l'air de fonctionner de manière similaire à Heardle.