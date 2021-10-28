//récupérer et afficher les medias à p  rtir des id photographers
function MediaFactory(thatMedia){
    if(thatMedia.hasOwnProperty('image')){
        return createImages();
    } else if(thatMedia.hasOwnProperty('video')){
        return createVideos();
    }

    function createImages(){
        //récupérer les éléments du DOM
        let portfolio = document.querySelector(".portfolio");
    
        //création d'élement sur le DOM: injecter des balises dans html
        let media = document.createElement('article');
        let upMedia = document.createElement('div');
        let image = document.createElement('img');
        let downMedia = document.createElement('div');
        let mediaTitle = document.createElement('p');
        let mediaDate = document.createElement('p');
        let mediaPrice = document.createElement('p');
        let likes = document.createElement('div');
        let number = document.createElement('div');
        let heart = document.createElement('i');
        let thisMediaTags = document.createElement('div');
        let hidenTitle = document.createElement('div');

        //appending du DOM: on dit à un élément qu'il a un enfant
        portfolio.appendChild(media);
        media.appendChild(upMedia);
        upMedia.appendChild(image);
        media.appendChild(downMedia);      
        downMedia.appendChild(mediaTitle);
        downMedia.appendChild(mediaDate);
        downMedia.appendChild(mediaPrice);
        downMedia.appendChild(likes);
        likes.appendChild(number);      
        likes.appendChild(heart);
        media.appendChild(thisMediaTags);
        media.appendChild(hidenTitle); 

        //assiger des class et des id aux éléments du Dom
        media.classList.add("media");
        upMedia.classList.add("up-media");
        image.classList.add("media-img");
        downMedia.classList.add("down-media");
        mediaTitle.classList.add("media-title");
        mediaDate.classList.add("media-date", "removable");
        mediaPrice.classList.add("media-price", "removable");    
        likes.classList.add("likes");      
        number.classList.add("number");
        heart.classList.add("fas", "fa-heart", "icon-heart", "icon-heart-plain");
        hidenTitle.classList.add("removable");
        media.id = "IMAGE";   
        upMedia.id = thatMedia.date; 
        image.id = thatMedia.title;      
        hidenTitle.id = thatMedia.title;

        //pour paraméter les innerHTML, sources, alt, arialabel, Tabindex...
        image.tabIndex = '0';   
        likes.tabIndex = '0';
        likes.ariaLabel ="likes";
        image.alt = thatMedia.depiction;
        number.innerHTML = thatMedia.likes;
        mediaDate.innerHTML = thatMedia.date;    
        mediaTitle.innerHTML = thatMedia.title;     
        mediaPrice.innerHTML = thatMedia.price + "€";
        image.src = "./pictures/photographerPhoto/photographersIdPhotos/" + thatMedia.photographerId + "/" + thatMedia.image;
    }
}