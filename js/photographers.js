//importe les classes
import Api from './classes/Api.js'
import Tag from './classes/Tag.js'
import Error from './classes/error.js'
import Photographer from './classes/Photographer.js'
import sortDropdown from './classes/SortDropDown.js'
import Media from './classes/media.js'
import BoxInfo from './classes/boxInfo.js'
import Contact from './classes/Contact.js'

//éléments du DOM
const photographerTarget = document.getElementById('photographer-profil')
const sortTarget = document.getElementById('sort')
const mediaTarget = document.getElementById('gallery')
const boxInfoTarget = document.getElementById('box-info')


//fonctions
const injectElement = (element, target) => {
    if (element.id == target.id) {
        target.parentNode.replaceChild(element, target)
    } else {
        target.appendChild(element)
    }
}

const getParam = (param) => {
    let search = window.location.search
    let result = new URLSearchParams(search).get(param)

    if (result != null) {
        return result
    }

    return false
}


//comportement par défaut dès que la page est chargée
try {
    await Api.init()
} catch (error) {
    Error.print(error, true)
}

//configure le comportement des tags sur la page
Tag.configTag({
    oneAtTime: true,
    callback: () => { Media.defineVisbilityFromFilters() }
})

//photographes

    //récupère l'ID du photographe
    const photographerId = getParam('id')

    //crée des éléments sur le DOM
    let photographer = new Photographer(Api.takePhotographerById(photographerId))

    //injecte sur le DOM
    Photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })

//tri par

    //crée un élément de tri
    const sort = new sortDropdown()

    //injecte sur le DOM
    injectElement(sort.defineView(), sortTarget)

//Gallerie

    //récupére les medias du photographe
    const medias = Api.takeMediaFromPhotographer(photographerId)

    //crée les médias
    medias.forEach(media => new Media(media, mediaTarget))
    //trie par defaut
    Media.sortBy(sortDropdown.value)

//box info photographe => affiche le prix et total des likes

    //crée un élément
    const boxInfo = new BoxInfo(photographer.price)

    //injecte sur le DOM
    injectElement(boxInfo.defineView(), boxInfoTarget)


//initialise le formulaire de contact

    Contact.init()