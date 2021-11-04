// affichage modals et lightboxes
function putModals(){
    //élements du DOM
    const modalbg = document.querySelector(".bground");
    const modalbg2 = document.querySelector(".bground2");
    const lightBox = document.querySelector(".bground3");
    const lightBoxIn = document.querySelector(".content3");
    const contactBtn = document.querySelectorAll(".p-contact");
    const lightBtn = document.querySelectorAll(".media-img");
    const lightBtnVideo = document.querySelectorAll(".media-vid");
    const closeBtn = document.querySelectorAll(".close");
    const main = document.getElementsByTagName("main");
    const next = document.querySelectorAll(".next");
    const back = document.querySelectorAll(".back");

    //variables
    let mediaType = 0;
    let lightBoxIsOpen = false;
    let ModalIsOpen = false;
    let opened = "";

    /*évènements*/
    //lancer la modale
    contactBtn.forEach((btn) => btn.addEventListener("click", launchModal));

    /*lancer lightboxes*/
    //au click
    lightBtn.forEach((btn) => btn.addEventListener("click", launchLightBox));
    lightBtnVideo.forEach((btn) => btn.addEventListener("click", launchLightBoxVideo));

    //en appuyant sur entrer sur focus
    lightBtn.forEach((btn) => btn.addEventListener("keyup", launchLightBox2));  
    lightBtnVideo.forEach((btn) => btn.addEventListener("keyup", launchLightBoxVideo2));
  
    /*fermer la modal et lightboxes*/
    //au click sur X
    closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

    //en appuyant sur entrer sur focus
    closeBtn.forEach((btn) => btn.addEventListener("keyup", ckeckKeyClose));

    //en appuyant sur échap
    document.addEventListener('keydown', function(e) {
        if(lightBoxIsOpen == true || ModalIsOpen == true){        
            //fermer la modale et lightbow en appuyant sur échap
            if (KeyboardEvent.key === 27){
                closeModal();
            }
  
            //change media en lightbox en pressant la flèche
  
            //flèche gauche pour précédent
            else if(KeyboardEvent.key === 37){
                let target = document.querySelector(".back");
                target.click(); 
            }
  
            //flèche droite pour suivant
            else if (KeyboardEvent.key === 39){
                let target = document.querySelector(".next");
                target.click(); 
            }
        }
    });

    /*fonctions*/
    //lancer la modale formulaire
    function launchModal(){
        ModalIsOpen = true;
        modalbg.style.display = "block";
    }

    //lancer la lightbox contenant les images par click
    function launchLightBox(){ 
        lightBoxIsOpen = true;
  
        //afficher lightbox
        lightBox.style.display = "block";       
  
        //inserer le titre correct des images 
        let mediaTitle = document.getElementById("media-title-ligthbox");
        let targetedTitle = e.target.id;
        mediaTitle.innerHTML = targetedTitle;
          
        //insérer l'image correcte
        let selectedMedia = document.querySelector(".media-ligthbox");
        let targetedImg = e.target.src;
        let targetedAlt = e.target.alt;
  
  
        //vérifier s'il y a déjà une image
        if (selectedMedia.hasChildNodes()){}
        else{
          //insérer l'image une fois
          let imageLightbox = document.createElement('img');
          imageLightbox.id = "image-lightbox";    
          selectedMedia.appendChild(imageLightbox);
          imageLightbox.src = targetedImg;
          imageLightbox.alt = targetedAlt;
        }
        
    }
  
    //lancer la lightbox contenant image par touche de clavier
    function launchLightBox2() {
        if (KeyboardEvent.key === 13) {
            lightBoxIsOpen = true;
  
            //afficher lightbox
            lightBox.style.display = "block"; 
          
            //inserer le titre correct des images
            let mediaTitle = document.getElementById("media-title-ligthbox");
            let targetedTitle = e.target.id;
            mediaTitle.innerHTML = targetedTitle;
            
            //insérer l'image correcte
            let selectedMedia = document.querySelector(".media-ligthbox");
            let targetedImg = e.target.src;
            let targetedAlt = e.target.alt;
  
  
            //vérifier s'il y a déjà une image  
            if (selectedMedia.hasChildNodes()){}
            else{
                //insérer l'image une fois
                let imageLightbox = document.createElement('img');
                imageLightbox.id = "image-lightbox";    
                selectedMedia.appendChild(imageLightbox);
                imageLightbox.src = targetedImg;
                imageLightbox.alt = targetedAlt;
            }
        }
    }
  
    //lancer la lightbox contenant video par click
    function launchLightBoxVideo() {
        lightBoxIsOpen = true; 
  
        //dire à javascript que c'est une vidéo
        mediaType++;
  
        //Display ligthbox
        lightBox.style.display = "block"; 
        
        //inserer le titre correcte de la video 
        let mediaTitle = document.getElementById("media-title-ligthbox");
        let targetedTitle = e.target.id;
        let targetedAlt = e.target.title;
        mediaTitle.innerHTML = targetedTitle;
          
        //insérer la video correcte
        let selectedMedia = document.querySelector(".media-ligthbox");
        let targetedImg = e.target.src;
  
  
        //vérifier s'il y a déjà une video 
        if (selectedMedia.hasChildNodes()){}
        else{
          //insérer la video une fois
          let videoLightbox = document.createElement('video');
          videoLightbox.id = "video-lightbox";    
          selectedMedia.appendChild(videoLightbox);
          let videoLightboxSrc = document.createElement('source');
          videoLightbox.appendChild(videoLightboxSrc);
          videoLightboxSrc.src = targetedImg;
          videoLightbox.title = targetedAlt;
          videoLightboxSrc.type = "video/mp4"; 
          videoLightbox.autoplay = true;
          videoLightbox.setAttribute("controls","controls");   
        }
    }

}