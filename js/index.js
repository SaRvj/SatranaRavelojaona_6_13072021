//importer les classes

import Api from './classes/Api.js'
import Error from './classes/error.js'
import Tag from './classes/Tag.js'
import photographer from './classes/Photographer.js'

//éléments du DOM

let tagTarget = document.getElementById('tags')
let photographerTarget = document.getElementById('listPhotographers')


//fonctions
const injectElement = (element, target) => {
    target.appendChild(element)
}


//comportement par défaut dès que la page est chargée
//const connected = await Api.init()

try {
    await Api.init()
} catch (error) {
    Error.print(error)
}

//tags

    //configure du comportement des tags sur la page
    Tag.configTag({
        oneAtTime: false,
        callback: () => { photographer.defineVisbilityFromFilters() }
    })

    //crée des éléments
    Api.getAllTags().forEach(tag => new Tag(tag))

    //injecte dans le document
    Tag.instances.forEach(i => {
        injectElement(i.element, tagTarget)
    })


//photographes

    //crée des éléments
    Api.takeAllPhotographers().forEach(p => new photographer(p))

    //injecte sur le DOM
    photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })


//affiche direct-link-pageIndex
function displayLinkPageIndex() {
    const returnMain = document.querySelector(".direct-link-pageIndex");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            returnMain.style.display = "block";
            returnMain.style.opacity = "1";
        } else {
            returnMain.style.display = "none";
            returnMain.style.opacity = "0";
        }
    });
}

displayLinkPageIndex()