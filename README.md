# pkmn-infinite-heardle

## ENG

A clone of [Heardle](https://www.heardle.app/), and [K-Pop Heardle](https://heardle-kpop.glitch.me/) which can be played infinitely and with Pokémon's musics. Based on [Joywave Heardle](https://joywave-heardle.glitch.me/)

Each music is randomly chosen from Pokémon's soundtrack.

code edited from: [WJSN Heardle](https://github.com/jeroldcamacho/wjsn-heardle)
<br />
<br />
HOW TO RUN INFINITE HEARDLE LOCALLY:
Open **index.html** with your browser (Firefox, Chromium)
<br />
<br />
HOW TO MAKE YOUR OWN INFINITE HEARDLE (UDPATED on **25/07/09**)
(If you want an infinite heardle that does not includes translations you can check the readme of [Etrian Infinite Heardle](https://github.com/nterrien/etrian-infinite-heardle))

1. **Fork this project** to create your own copy of the code.
2. **Rename the project** with the URL that you'd like to Heardle to live at, by going to **Settings > Repository name**
3. Use Github as host by going to **Settings > Pages**. In Source, choose "Deploy from a branch" and in branch choose "master".
4. Open the **index.html** file & replace **"Pokémon"** with the artist/genre of your heardle. Make sure to **do this first**, if you update the main.js first, sometimes your link will still show Joywave even after you update everything.
5. In the **index.html** file, you can update the image that gets shared with your link by updating lines **21-23**.
6. You can update the icon in your browser's tab by updating the favicon.png image.

(Items 7-13 are all edits to the **main.js file**)

7. On line **2** of **main.js** file and update **artist** with the **artist/genre** of your heardle - This will update all the text boxes & titles where "Pokémon" shows up up
8. On line **4** of **main.js** file and update **languages** with the list of languages of your Heardle.
9. On line **19** of **main.js**, "const **allTags**" is initialized. This allows you to use a tag system to filter music. You can replace them with [] if you don't want to use tags.
10. On line **6** of **main.js**, update **language** with your default language.
11. On line **38** of **main.js**, "var **musicNameList**" is initialized. Replace it with a list of music titles you'd like to appear as suggestions in your Heardle. The list should follow the format: **`{ id : music id, codeLanguage : "Music title" }`**. Each music must have a different id, and there must be one entry per language. For each language, music titles should follow the format **"Music - Artist/Genre/Game"**. Make sure each music is in quotes and has a comma after it.
12. On line **11568** of **main.js**, "var **musicListWithLinks**" is initialized. Here you'll have to replace the links with links to your musics. Only Soundcloud links at the moment. Each link will have to follow the following format: **`{ url: "<link>", answer: id of the music },`**. Make sure to have **at least 10 musics** in your lists otherwise you'll run into issues with the search bar!
13. If you want to modify the interface text, edit the constants between line **19120** and line **19306**. (flags, aboutT, supportT, statsT, howToPlayT, musicListT, langListT, volumeT, submitT, placeholderT, nextT, goodAnswerT, secondT, badAnswerT, supportPopupT, howToPlayPopup1T, howToPlayPopup2T, howToPlayPopup3T, aboutPopupT). Don't forget to add the new language flags to the "flags" folder if necessary. In particular, if you want to edit the text in the **info button (About)** on the top left, around **line 19185** you can update the text that shows up there. Search for **"A clone of..."** to find the line easier. Similarly, if you want to edit the text in the **heart button (Support)** next to the info button, around **line 19200**, you can update the text that shows up there. Search for **"Have questions..."** to find the line easier.

**KNOWN ISSUES**

- This code is specific to Soundcloud links.

  - There is a [youtube](https://glitch.com/~youtube-heardle-template) \[NOTE: this link doesn't work anymore\] version, but its very basic and may have bugs; youtube links can be weird depending on your location, so it messes things up.

  - If you want to use a Spotify playlist, visit [https://audial.mogdan.xyz/custom](https://audial.mogdan.xyz/custom). You'll be able to add a link to your playlist and it seems to work similarly to Heardle.

## FRA

Un clone de [Heardle](https://www.heardle.app/), et de [K-Pop Heardle](https://heardle-kpop.glitch.me/) qui peut être joué à l'infini et avec les musiques de Pokémon. Basé sur [Joywave Heardle](https://joywave-heardle.glitch.me/)

Chaque musique est choisie au hasard dans la bande-son de Pokémon.

code édité à partir de : [WJSN Heardle](https://github.com/jeroldcamacho/wjsn-heardle)
<br />
<br />
COMMENT FAIRE TOURNER INFINITE HEARDLE EN LOCAL:
Ouvrez **index.html** avec votre navigateur (Firefox, Chromium)
<br />
<br />
COMMENT FAIRE VOTRE PROPRE HEARDLE INFINIE (MISE À JOUR LE **25/07/09**)
(Si vous voulez un Heardle infini qui ne comprend pas de traductions, vous pouvez consulter le README de [Etrian Infinite Heardle](https://github.com/nterrien/etrian-infinite-heardle))

1. **Forkez ce projet** pour créer votre propre copie du code.
2. **Renommez le projet** avec l'URL que vous souhaitez utiliser pour le Heardle, en allant dans **Settings > Repository name**
3. Utilisez Github comme hôte en allant dans **Paramètres > Pages**. Dans Source, choisissez "Deploy from a branch" et dans branch choisissez "master".
4. Ouvrez le fichier **index.html** et remplacez **"Pokémon"** par l'artiste/genre de votre Heardle. Assurez-vous de faire cela **en premier**, si vous mettez d'abord à jour le fichier main.js, il se peut que votre lien affiche toujours Joywave même après avoir tout mis à jour.
5. Dans le fichier **index.html**, vous pouvez mettre à jour l'image qui est partagée avec votre lien en mettant à jour les lignes **21-23**.
6. Vous pouvez mettre à jour l'icône de l'onglet de votre navigateur en mettant à jour l'image favicon.png.

(Les points 7 à 13 sont tous des modifications du fichier **main.js**)

7. Sur la ligne **2** du fichier **main.js**, mettez à jour **artist** avec l'**artiste/genre** de votre Heardle. Cela va mettre à jour toutes les zones de texte et les titres où "Pokémon" apparaît.
8. Sur la ligne **4** du fichier **main.js**, mettez à jour **languages** avec la liste des langues de votre Heardle.
9. A la ligne **19** du **main.js**, "const **allTags**" est initialisé. Elle permet d'utiliser un système de tags pour filtrer les musiques. Vous pouvez les remplacer par [] si vous ne souhaitez pas utiliser de tags.
10. À la ligne **6** du fichier **main.js**, mettez à jour **language** avec la langue par défaut.
11. À la ligne **38** de **main.js**, "var **musicNameList**" est initialisée. Remplacez la par une liste de titres de musiques que vous souhaitez voir apparaître comme suggestions dans votre Heardle. La liste dois suivre le format: **`{ id : id de la musique, codeLanguage : "Titre de la musique" }`**. Chaque musique doit avoir un id différent, et il faut une entrée par langue. Pour chaque langue, le nom de la musique doit suivre le format **"Nom de la musique - Artiste/Genre/Jeu"**. Assurez-vous que chaque musique est entre guillemets et qu'elle est suivie d'une virgule.
12. À la ligne **11568** de **main.js**, "var **musicListWithLinks**" est initialisée. Ici, vous devrez remplacer les liens par des liens vers vos musiques. Seulement des liens Soundcloud. Chaque ligne devra suivre le format suivant : **`{ url : "<link>", answer : id de la musique }`,**. Assurez-vous d'avoir au moins **10 musiques** dans votre listes sinon vous rencontrerez des problèmes avec la barre de recherche !
13. Si vous voulez modifier le texte de l'interface, éditez les constantes entre la ligne **19120** et la ligne **19306**. (flags, aboutT, supportT, statsT, howToPlayT, musicListT, langListT, volumeT, submitT, placeholderT, nextT, goodAnswerT, secondT, badAnswerT, supportPopupT, howToPlayPopup1T, howToPlayPopup2T, howToPlayPopup3T, aboutPopupT). N'oubliez pas d'ajouter les nouveau drapeaux de langue dans le dossier "flags" si besoin. En particulier, si vous voulez éditer le texte dans le **bouton info (À propos)** en haut à gauche, autour de la ligne **19185**, vous pouvez mettre à jour le texte qui s'y affiche. Cherchez **"Un clone de... "** pour trouver la ligne plus facilement. De même, si vous souhaitez modifier le texte du **bouton cœur (Support)** à côté du bouton info, autour de la ligne **19200**, vous pouvez mettre à jour le texte qui s'affiche à cet endroit. Cherchez **"Have questions..."** pour trouver la ligne plus facilement.

**PROBLÈMES CONNUS**

- Ce code est spécifique aux liens Soundcloud.

  - Il y a une version [youtube](https://glitch.com/~youtube-heardle-template) [NOTE : ce lien ne fonctionne plus], mais elle est très basique et peut avoir des bugs ; les liens youtube peuvent être bizarres en fonction de votre localisation, ce qui peut perturber les choses.

  - Si vous voulez utiliser une liste de lecture Spotify, rendez-vous sur [https://audial.mogdan.xyz/custom](https://audial.mogdan.xyz/custom). Vous pourrez ajouter un lien à votre liste de lecture et cela à l'air de fonctionner de manière similaire à Heardle.
