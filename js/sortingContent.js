//écoute des tags cliqués et affichage des pages de photographe corresspondant
function sortingTags (){
    
    //récupérer les class des tags
    const allTags = document.querySelectorAll(".tagportrait,.art,.fashion,.architecture,.travel,.sports,.animals,.events");
    const allTagsTag = document.querySelectorAll(".allTags");

    //écoute des clicks sur tous les tags
    for (let i = 0; i < allTags.length ; i++){
        allTags[i].addEventListener("click", function (event){ 
            //récupérer les className des tags séléctionnés 
            let targetTag = event.target.className;

            //récupérer tous les cartes des photographes
            let PhotographerSections = document.getElementsByTagName("section");
            Array.from(PhotographerSections).map(element => { //création d'une nouvelle instance d'Array
                //récupérer les taglists de la carte de photographe en cours
                let inTags = element.lastChild.children; 
                let removeOrStay = 0 ;
                Array.from(inTags).map(element => {
                    //vérifier si le tag sélectionné est présent dans taglist
                    if (element.className == targetTag){
                        removeOrStay++;
                    }  
                    return element;
                });
                //si le tag sélectionné n'est pas présent, la carte du photographe en cours est supprimé
                if (removeOrStay == 0){
                    element.style.display = "none";
                }
            }
        }

    }
}