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
    
        //création d'élement sur le DOM
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
    }
}