"use strict";

// éléments du DOM
const lightbox = document.getElementById("lightboxModal");
const gallery = document.querySelector("#article-gallery-cards");
const mainContent = document.getElementById("main-content");

// lance la lightbox
gallery.addEventListener("click", (event) => {
    if (event.target.className === "lightbox-link") {

        let mediaPosition = getPosition(event.target.id, document.querySelectorAll(".lightbox-link"));

        desactivateBackgroundFocus();
        return displayLightbox(mediaPosition)
    }
});

//bouton média suivant et précédent de la lightbox
document.getElementById("lightbox-nextBtn").addEventListener("click", (event) => {
    displayNextMedia()
});
document.getElementById("lightbox-prevBtn").addEventListener("click", (event) => {
    displayPreviousMedia()
});

// ferme la lightbox
document.getElementById("lightbox-closeBtn").addEventListener("click", function () {
    closeModalLightbox()
});

// navigation au clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        return closeModalLightbox()
    }
    if (event.key === 'ArrowRight') {
        return displayNextMedia()
    }
    if (event.key === 'ArrowLeft') {
        return displayPreviousMedia()
    }
    if (event.key === 'Enter') {
        if (event.target.className === "lightbox-link") {
            let mediaPosition = getPosition(event.target.id, document.querySelectorAll(".lightbox-link"));
            desactivateBackgroundFocus();
            return displayLightbox(mediaPosition)
        }
    }
});

// fonctions de la lightbox
function closeModalLightbox() {
    lightbox.style.display = "none";
    lightbox.setAttribute('aria-hidden', 'true');
    mainContent.setAttribute('aria-hidden', 'false');
    reactivateBackgroundFocus();
}

function getPosition(targetId, targetlist) {

    for (let i = 0; i < targetlist.length; i++) {
        if (targetlist[i].id.includes(targetId)) {
            return i;
        }
    }
    return null;
}

function displayNextMedia() {

    let targetlist = document.querySelectorAll(".lightbox-link");
    let mediaPosition = getPosition(document.querySelector(".lightbox-media").id, targetlist);

    if (mediaPosition < targetlist.length - 1) {
        displayLightbox(mediaPosition + 1)
    }
    return false;
}

function displayPreviousMedia() {

    let targetlist = document.querySelectorAll(".lightbox-link");
    let mediaPosition = getPosition(document.querySelector(".lightbox-media").id, targetlist);

    if (mediaPosition !== 0) {
        displayLightbox(mediaPosition - 1)
    }
    return false;
}

function displayLightbox(index) {

    let targetlist = document.querySelectorAll(".lightbox-link");
    let tagName = targetlist[index].tagName;
    let src = targetlist[index].getAttribute('src');
    let alt = targetlist[index].getAttribute('alt');
    let id = targetlist[index].getAttribute('id');

    // console.log(`${tagName}, ${src}, ${alt}`)
    // output exemple : IMG, /pictures/930/Sport_Next_Hold.jpg, Climber

    let lightboxDOM = "";

    if (tagName === "IMG") {
        lightboxDOM = `
            <div class="lightbox-img lightbox-media" id="${id}">
                <img src="${src}" alt="${alt}">
                <div class="lightbox-title">${alt}</div>
            </div>
        `
    }

    if (tagName === "VIDEO") {
        lightboxDOM = `
            <div class="lightbox-video lightbox-media" id="${id}">
                <video controls>
                    <source src="${src}" alt="${alt}">
                        Your browser does not support the video tag.
                </video>
                <div class="lightbox-title">${alt}</div>
            </div>
        `
    }

    document.getElementById("lightbox-container").innerHTML = lightboxDOM;

    // affiche la lightbox
    lightbox.setAttribute('aria-hidden', 'false');
    mainContent.setAttribute('aria-hidden', 'true');
    return lightbox.style.display = "block";
}

// fonction focus des modals
function desactivateBackgroundFocus() {

    function desactivateFocusElement(element) {
        element.setAttribute("tabindex", "-1");
    }

    desactivateFocusElement(document.querySelector(".logo-fisheye"));
    desactivateFocusElement(document.getElementById("contact-modal-form-launchBtn"));
    desactivateFocusElement(document.getElementById("dropdown-menu-popularity"));
    desactivateFocusElement(document.getElementById("dropdown-menu-date"));
    desactivateFocusElement(document.getElementById("dropdown-menu-title"));

    document.querySelectorAll(".lightbox-link").forEach(element => {
        desactivateFocusElement(element)
    });

    document.querySelectorAll(".photo-caption-likes-heartIcon").forEach(element => {
        desactivateFocusElement(element)
    });
}

function reactivateBackgroundFocus() {

    function activateFocusElement(element) {
        element.setAttribute("tabindex", "0");
    }

    activateFocusElement(document.querySelector(".logo-fisheye"));
    activateFocusElement(document.getElementById("contact-modal-form-launchBtn"));
    activateFocusElement(document.getElementById("dropdown-menu-popularity"));
    activateFocusElement(document.getElementById("dropdown-menu-date"));
    activateFocusElement(document.getElementById("dropdown-menu-title"));

    document.querySelectorAll(".lightbox-link").forEach(element => {
        activateFocusElement(element)
    });

    document.querySelectorAll(".photo-caption-likes-heartIcon").forEach(element => {
        activateFocusElement(element)
    });
}