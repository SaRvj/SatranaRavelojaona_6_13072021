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
}