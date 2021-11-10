import {displayGallery} from "./gallery.js";

export function sortGallery(galleryData) {

    let sortedData = "";

    document.getElementById("dropdown-menu-popularity").addEventListener("click", function () {
     
        sortedData = galleryData.sort(function( a , b ){
            let result = a.likes == b.likes ? 0 : a.likes > b.likes ? -1 : 1
            return result ;
        });
        displayGallery(sortedData)
    });

    document.getElementById("dropdown-menu-date").addEventListener("click", function () {

        sortedData = galleryData.sort(function( a , b ){
            let result = a.date == b.date ? 0 : a.date < b.date ? -1 : 1
            return result ;
        });
        displayGallery(sortedData)
    });

    document.getElementById("dropdown-menu-title").addEventListener("click", function () {

        sortedData = galleryData.sort(function( a , b ){
            let result = a.title == b.title ? 0 : a.title < b.title ? -1 : 1
            return result ;
        });
        displayGallery(sortedData)
    });
}