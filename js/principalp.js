const main = async () =>{

    //éléments du DOM
    const main = document.getElementById('main-section');
        
    //récupérer les datas Json
    let fishData = await myFetch();
    
    //récupérer les infos des Photographes
    let fishPhotog = fishData.photographers;
  
    //instancier les class Photographers
    for (let i in fishPhotog){
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
  
        //créer les élements du DOM à partir dse infos des photographes
        newPhotographer.createAndDisplayPhotographerCard(main);
    } 
  
    //écouter les clics sur les tags et afficher les tags sélectionnés
    sortingTags();
   
    //écouter les clics sur les sections photographer pour afficher les pages photographes targeted 
    const photoSections = document.querySelectorAll('.ID');
    Array.from(photoSections).map(element => {
  
        element.addEventListener("click", function (event) {
            let targetId = element.id;
            window.location.href = "Photographer.html" + "?id=" + targetId;
        });
  
        element.addEventListener("keyup", function (event) {
            let targetId = element.id;
            if (event.keyCode === 13) {window.location.href = "Photographer.html" + "?id=" + targetId;}
        });    
    });
};
    
//initier la fonction principale lors de la chargement de la page
window.onload = main;
  