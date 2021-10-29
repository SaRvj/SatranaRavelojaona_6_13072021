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
                //si le tag sélectionné est présent, la carte du photographe en cours est affiché
                else {element.style.display = "block";}
                return element;
            });
        });

    }
    //écoute des click sur allTagsTag
    for (let i = 0; i < allTagsTag.length ; i++) {
        allTagsTag[i].addEventListener("click", function (event){
            //récupérer toutes les cartes photographes
            let PhotographerSections = document.getElementsByTagName("section");
            Array.from(PhotographerSections).map(element => {
            //afficher toutes les cartes photographes       
            element.style.display = "block";
            return element;
            });
        });
    }
}

//mettre une écoute sur les tags cliqués et afficher le Media Articles correspondant
function sortingMediaTags (){
    //récupérer les class des tags
    const allTags = document.querySelectorAll(".tagportrait,.art,.fashion,.architecture,.travel,.sports,.animals,.events");
    const allTagsTag = document.querySelectorAll(".allTags");

    //écoute des click sur alltags
    for (let i = 0; i < allTags.length ; i++){
        allTags[i].addEventListener("click", function (event){

            //récupérer les className des tags séléctionnés
            let targetTag = event.target.className;

            //récupérer tous les articles dans Media
            let mediaArticles = document.getElementsByTagName("article");
            Array.from(PhotographerSections).map(element => { //création d'une nouvelle instance d'Array
                let inTags = element.lastChild.previousSibling.id;
                
                //si le tag sélectionné n'est pas présent, la carte du photographe en cours est supprimé
                if (inTags == targetTag){
                    element.style.display = "block";
                }

                //si le tag sélectionné est présent, la carte du photographe en cours est affiché
                else {
                    element.style.display = "none";
                }        
                return element;
            });      
        });
    }
}