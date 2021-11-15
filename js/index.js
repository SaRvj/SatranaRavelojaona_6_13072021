//importer les classes

import Api from './class/Api.js'
import Error from './class/Error.js'
import Tag from './class/Tag.js'
import photographer from './class/photographer.js'

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
    Tag.config({
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