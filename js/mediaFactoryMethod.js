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
    
    }
}