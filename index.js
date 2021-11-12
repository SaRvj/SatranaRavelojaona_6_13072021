//modules
import {displayPhotographers} from "./js/page.js";
import {filterPhotographers} from "./js/page.js";
import {photographerPage} from "./js/pagephotographers.js";
import {displayGallery} from "./js/gallery.js";
import {sortGallery} from "./js/sorting.js";
import {likeIncrement} from "./js/likesIncrement.js";

//main
fetch("./data/FishEyeData.json")

  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    }
    return response.json();
  })

  .then((data) => {

    const photographersData = data.photographers;
    const mediaData = data.media;

    // display the specifics photographers pages : get the photographer id in the url and filter data with it
    if (document.URL.includes('photographer-page')) {

      let urlParams = new URLSearchParams(document.location.search.substring(1));
      let urlName = urlParams.get("id");
      let filteredDataPhotographers = photographersData.filter(photographer => photographer.id == urlName);
      let filteredDataMedia = mediaData.filter(media => media.photographerId == urlName);

      photographerPage(filteredDataPhotographers[0])
      displayGallery(filteredDataMedia)
      sortGallery(filteredDataMedia);
      likeIncrement(filteredDataMedia);

      return false
    }

    //gestion du bouton retour en haut au défilement de l'écran
    window.onscroll = function () {
      const returnToTopBtn = document.getElementById("index-page-staticBox");

      returnToTopBtn.style.display = "block";
  
      function fadeReturnToTopBtn(){
        returnToTopBtn.style.display = "none";
      };
      setTimeout(function(){ fadeReturnToTopBtn (); }, 5000);
    }

    //afficher la page principale/d'index
    filterPhotographers(photographersData);
    return displayPhotographers(photographersData);
  })
  
  .catch(function (error) {
    console.log(error);
  });