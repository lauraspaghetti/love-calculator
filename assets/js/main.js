console.log('script.js'); 


/* ********************************************* */
    /* GESTION DE LA SAISIE DE L'UTILISATEUR*/
/* ********************************************* */


//Définition des variables qui vont contenir les noms saisis par l'utilisateur.ice
let yourName;
let soulMateName; 

//Initialisation d'une fonction qui récupère la saisie de l'utilisateur
retrieve = () =>{

    const value1= document.getElementById("name1").value;
    const value2= document.getElementById("name2").value;

    // console.log(`Vous avez saisi ${value1} et ${value2}`);

    return {
        yourName     : value1, 
        soulMateName : value2,
    }; 
}; 

//Ciblage du formulaire
const loversForm= document.getElementById('lovers-form'); 
// console.log(loversForm); 

//Application au formulaire d'un évènement qui empêche son envoi au serveur et qui charge le code qui doit s'effectuer une fois que l'utilisateur a appuyé sur le btn "Let's go"
loversForm.addEventListener("submit", onSubmit); 

function onSubmit(event){

    //Empeche la soumission du formulaire au serveur
    event.preventDefault(); 

    //Récupération des noms saisis par l'utilisateur
    let names= retrieve(); 
    // console.log(names);  
    yourName     = names.yourName; 
    soulMateName = names.soulMateName; 
    console.log(`Nom 1 : ${yourName}, nom 2 : ${soulMateName}`); 

    //Application de la fonction gérant les caractères spéciaux aux prénoms saisis par l'utilisateur 
    yourName        = replaceSpecChars(yourName);
    soulMateName    = replaceSpecChars(soulMateName); 
    // console.log(yourName, soulMateName); 

    /* ********************************************* */
            /* GESTION DES LETTRES EN COMMUN  */
    /* ********************************************* */

    //Comparaison des deux deux prénoms pour identifier les lettres en commun et les éliminer
    for (let letterOfYourName of yourName) {

        // console.log( yourName + " : " + letterOfYourName); 
    
        for (let letterOfSoulMateName of soulMateName) {
    
            // console.log( soulMateName + " : " + letterOfSoulMateName); 

            if (letterOfYourName === letterOfSoulMateName){
            
                //S'il y a la même lettre, enlever cette lettre à chacun des deux prénoms 
                yourName       = deleteSameLetters(yourName, letterOfYourName);
                soulMateName   = deleteSameLetters(soulMateName, letterOfSoulMateName);

                //On sort de la boucle pour éviter de supprimer deux fois de suite la même lettre dans le même prénom
                break; 
            }; 
        };
    };//fin de la 1ere boucle for

    //Vérification des prénoms pour voir si les lettres en commun ont bien été supprimées pour chacun 
    console.log(`Nom 1 : ${yourName}, nom 2 : ${soulMateName}`); 

    
    /* *********************************************** */
            /* CALCUL DU SCORE DE CHAQUE PRENOM  */
    /* *********************************************** */

    //Calcul du score des deux noms saisis par l'utilisateur
    let totalOfYourName    = nameCalculator(yourName); 
    console.log(`Total nom 1 : ${totalOfYourName}`);
    let totalOfSmName      = nameCalculator(soulMateName); 
    console.log(`Total nom 2 : ${totalOfSmName}`); 

    /* **************************************************** */
        /* CALCUL DE LA COMPATIBILITE DES DEUX PRENOMS */
    /* **************************************************** */

    //Addition des scores des deux prénoms pour déterminer leur taux de compatibilité
    yourCompatibility= compatibility(totalOfYourName, totalOfSmName); 
    console.log(`Total compatibilité : ${yourCompatibility}`);
    
    //Définition d'un plafond pour le résultat de compatibilité
    if (yourCompatibility > 100){
        
        yourCompatibility= 100; 
    }; 

    /* ****************************** */
        /* AFFICHAGE DU RESULTAT */
    /* ****************************** */

    //Ciblage des balises HTML gérant l'affichage du résultat
    let result      = document.getElementById('compatibility'); 
    console.log(result); 
    let gif         = document.querySelector('figure > img'); 
    console.log(gif); 
    let message     = document.querySelector('figcaption'); 
    console.log(message); 
    let loversForm  = document.querySelector('#lovers-form'); 
    console.log(loversForm); 

    //affichage du taux de compatibilité
    result.innerHTML = `${yourCompatibility} %`;
    //affichage du conteneur du résultat et du button qui permet de relancer le jeu
    document.querySelector('.heart-shape').classList.remove('hidden'); 
    document.getElementById('start-again').classList.remove('hidden'); 
    //on masque le form pour laisser de la place au résultat
    loversForm.classList.add('hidden'); 

    //ajout d'une fonction qui permet de recharger la page au btn 'start-again'
    document.getElementById('start-again').addEventListener('click', function(){
        window.location.reload();
    });

    //gestion des messages et des images affichées en fonction du taux de compatibilité obtenu
    if (yourCompatibility === 100){
        console.log('100'); 
        gif.src = 'assets/img/sailor-moon-6.gif'; 
        gif.alt = 'Sailor Moon in love'; 
        message.innerHTML = "Wow that’s a perfect match ! You should totally go for it, if you have not already done so ! Why not doing a screenshot of your score and send it to your crush ? It’s cringy as hell but when they’ll see that score they’ll fall for you right away."; 
    }else if(yourCompatibility >= 76 && yourCompatibility <= 99){
        console.log('76 et 99'); 
        gif.src = 'assets/img/sailor-moon-5.gif'; 
        gif.alt = 'Sailor Mars beaming'; 
        message.innerHTML = "That’s quite a match, you and your s.o. sure belong together ! You seem to get along very well, an harmonious and beautiful relationship will blossom if you give it a go."; 
    }else if(yourCompatibility >= 68 && yourCompatibility <= 75){
        console.log('67 et 75'); 
        gif.src = 'assets/img/sailor-moon-4.gif'; 
        gif.alt = 'Sailor Venus super happy, eyes shining'; 
        message.innerHTML = "That’s a good score for sure ! You are compatible with your crush, that’s facts. I know we made your day. You’re welcome."; 
    }else if( yourCompatibility >= 50 && yourCompatibility <= 67){
        console.log('50 et 67'); 
        gif.src = 'assets/img/sailor-moon-3.gif'; 
        gif.alt = 'Sailor Neptune determined'; 
        message.innerHTML = "That’s not a perfect score, but it’s not a bad one either. You still have chances to get along well with your crush, and a good relationship is still possible. It won’t be easy but it worth a try. Fighting !"; 
    }else if(yourCompatibility >= 30 && yourCompatibility <= 49){
        console.log('30 et 49'); 
        gif.src = 'assets/img/sailor-moon-2.gif'; 
        gif.alt = 'Sailor Mars shocked'; 
        message.innerHTML = "We know. It’s frustrating. But it’s a truth you have to face : you’re not really compatible with your crush. It’s no picnic, but you know what they say : there’s plenty fishes in the see."; 
    }else if(yourCompatibility === 0 || yourCompatibility > 1 && yourCompatibility <= 29){
        console.log('29 et 0'); 
        gif.src = 'assets/img/sailor-moon-1.gif'; 
        gif.alt = 'Sailor Moon crying'; 
        message.innerHTML = "What a tragedy ! You two are defo not meant to be together, not even a chance. But look at the bright side : now you know they’re not for you, you can go back hunting to find the right one. Good luck, you stunner."; 
    }; 

};//fin de onSubmit()
    






















