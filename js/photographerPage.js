
//éléments du DOM
const main = document.getElementById('main-section');

//variables
mediaArray= [];
mediaImage= [];
mediaVideo= [];

//récupérer targeted photographer lors du click précédent (de index.html)
let myUrl = window.location.href;
let url_string = (window.location.href);
let url = new URL(url_string);
let targetId = url.searchParams.get("id");

//récupérer Data Json
let fishData = await myFetch();

//récupérer les infos ds photographes 
let fishPhotog = fishData.photographers;

//récupérer photos medias des photographes 
let fishMedia = fishData.media;

//instancier une class pour chaque photographe
for (let i in fishPhotog){
    if(fishPhotog[i].id == targetId){
      let newPhotographer = new Photographer(
        fishPhotog[i].name,
        fishPhotog[i].id,
        fishPhotog[i].city,
        fishPhotog[i].country,
        fishPhotog[i].tags,
        fishPhotog[i].tagline,
        fishPhotog[i].price,
        fishPhotog[i].portrait
        );
        //récupérer et afficher les médias de ID Photographe
        for (let i in fishMedia){
        if(fishMedia[i].photographerId == newPhotographer.id){
            newPhotographer.media.push(fishMedia[i]);
            }
        }

        //création des éléments du DOM pour les medias des Photographes 
        newPhotographer.createAndDisplayPhotographerInfos();

        //créer et afficher les tags
        newPhotographer.createAndDisplayTags();
    }
}