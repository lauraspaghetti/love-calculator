console.log("functions.js"); 


/* ********************************************* */
    /* GESTION DE LA SAISIE DE L'UTILISATEUR*/
/* ********************************************* */

///Gestion des accents, des caractères spéciaux, des minuscules et majuscules
let specCharacters = {"à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","è":"e","é":"e","ê":"e","ë":"e","ç":"c","ì":"i","í":"i","î":"i","ï":"i","ù":"u","ú":"u","û":"u","ü":"u","ÿ":"y","ñ":"n","-":" ","_":" "}; 
//Remplacement des caractères spéciaux par un espace, des lettres avec accents en lettres sans accents, des majuscules en minuscules
function replaceSpecChars(string){

    let reg=/[àáäâèéêëçìíîïòóôõöøùúûüÿñ_-]/gi; 
    return string.replace(reg,function(){ return specCharacters[arguments[0].toLowerCase()];}).toLowerCase();
};


/* ********************************************* */
        /* GESTION DES LETTRES EN COMMUN  */
/* ********************************************* */

//Les lettres communes aux deux prénoms doivent être supprimées
deleteSameLetters = (name, letter) => name.replace(letter, '');


/* *********************************************** */
        /* CALCUL DU SCORE DE CHAQUE PRENOM  */
/* *********************************************** */

///Les lettres doivent être converties en nombre, ces nombres sont additionnés entre eux afin d'obtenir un score pour chaque prénom

    //Conversion des lettres en nombres 
    letterToNumber = (name) => name.charCodeAt(0) -96;
    //Calcul du score 
    totalName      = (nameScore, number) => nameScore += number; 

    //Parcours du nom saisi pour convertir les lettres en nombre et les additionner entre elles
    nameCalculator = (name) => {

        let nameScore= 0;

        for (let letter of name){
            
            //Transformation de la lettre en nombre selon son index dans l'alphabet
            let letterInNumber = letterToNumber(letter); 
            // console.log(letterInNumber);
            
            //S'il y a un caractère qui ne correspond pas à une lettre de l'alphabet, ce caractère vaut 0
            if (letterInNumber < 0 || letterInNumber > 26){
                
                letterInNumber= 0; 
                // console.log(letterInNumber); 
            }
            
            //Addition des lettres valeurs de chaque lettre convertie en nombre 
            nameScore = totalName(nameScore, letterInNumber); 
        }; 
        
        return nameScore; 
    }; 

/* **************************************************** */
    /* CALCUL DE LA COMPATIBILITE DES DEUX PRENOMS */
/* **************************************************** */

//fonction permettant de calculer la compatibilité de deux prénoms en additionnant leurs scores respectifs
compatibility = (totalName1, totalName2) => totalName1 + totalName2; 
