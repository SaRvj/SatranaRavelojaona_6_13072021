import Contact from "./Contact.js";
import Tag from "./Tag.js";

export default class photographer {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.portrait = data.portrait
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.tags = data.tags
        photographer.instances = [...photographer.instances, this]
        
        this.element = this.defineView()
    }

    static instances = []
    static emptyTarget = document.getElementById('no-photographer')

    /**
     * choisi la vue du photographe selon la page et retourner la vue
     * @returns {HTMLElement}
     */
     defineView = () => {
        let path = window.location.pathname.split('/')
        path = path[path.length - 1]

        switch (path) {
            case "":
            case "index.html":
                return this.mini()
                break;
            case "photographer-page.html":
                return this.profilPhotographer()
                break;
            default:
                break;
        }
    }

    /**
     * crée et retourne la vue du photographe en miniature (Accueil)
     * @returns {HTMLELement}
     */
    mini = () => {
        let element = document.createElement('article')
        element.setAttribute('class', 'photographer-mini')

        element.innerHTML =
        `<a class="photographer__profil" href="photographer-page.html?id=${this.id}">
            <img class="photographer__profil__img" src="pictures/image/Photographers_ID_Photos/${this.portrait}" alt="">
            <h2 class="photographer__profil__name">${this.name}</h2>
        </a>
        <div class="photographer__infos">
            <p class="photographer__infos__city">${this.city}, ${this.country}</p>
            <p class="photographer__infos__tagline">${this.tagline}</p>
            <p class="photographer__infos__price">${this.price}€/jour</p>
        </div>`

        let tagsList = document.createElement('ul')
        tagsList.setAttribute('class', 'tag-list photographer__tags')

        let tags = this.tags.map(tag => new Tag(tag))

        tags.forEach(tag => {
            tagsList.appendChild(tag.element)
        })

        element.appendChild(tagsList)

        return element
    }

    /**
     * crée et retourner la vue du photographe en profil => Page photographe
     * @returns {HTMLElement}
     */
    profilPhotographer = () => {

        // crée les éléments du profil => éléments du DOM
        let container = document.createElement('section')
        let infosElement = document.createElement('div')
        let contactBtn = document.createElement('button')
        let pictureElement = document.createElement('img')

        //ajoute des attributs aux éléments
        container.setAttribute('id', 'photographer-profil')
        container.setAttribute('class', 'photographer-profil')
        infosElement.setAttribute('class', 'photographer__infos')
        contactBtn.setAttribute('id', 'contact-btn')
        contactBtn.setAttribute('class', 'btn photographer__btn')
        pictureElement.setAttribute('class', 'photographer__img')
        pictureElement.setAttribute('alt', this.name)
        pictureElement.setAttribute('src', `pictures/image/Photographers_ID_Photos/${this.portrait}`)
        
        //ajoute du contenu dans l'élément infos
        infosElement.innerHTML=
        `<h1 class="photographer__infos__name">${this.name}</h1>
        <p class="photographer__infos__city">${this.city}, ${this.country}</p>
        <p class="photographer__infos__tagline">${this.tagline}</p>`

        let tagsList = document.createElement('ul')
        tagsList.setAttribute('class', 'tag-list')
        tagsList.setAttribute('aria-label', 'tags')

        let tags = this.tags.map(tag => new Tag(tag))

        tags.forEach(tag => {
            tagsList.appendChild(tag.element)
        })

        infosElement.appendChild(tagsList)

        //ajouter du text dans le bouton de contact

        contactBtn.innerHTML = "Contactez-moi"

        //ajoute des éléments au container

        container.appendChild(infosElement)
        container.appendChild(contactBtn)
        container.appendChild(pictureElement)

        //ajoute l'évènement "click" sur le bouton de contact
        contactBtn.addEventListener('click', () => Contact.open())

        return container
    }

    /**
     * défini si le photographe doit être visible ou non selon les tags sélectionnés
     */
    static defineVisbilityFromFilters = () => {
        let nbVisible = 0

        photographer.instances.forEach(photographer => {
            let res = photographer.tags.filter(tag => Tag.activeTags.includes(tag))
            
            if (res.length == Tag.activeTags.length) {
                nbVisible++
                photographer.element.style.display = "block"
            }else{
                photographer.element.style.display = "none"
            }
        })

        photographer.emptyTarget.style.display = nbVisible === 0 ? "block" : "none"
    }
}