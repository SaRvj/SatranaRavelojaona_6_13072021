import Media from './media.js'

export default class boxInfo {
    constructor (price) {
        this.price = price
    }

    /**
     * modifie le nombre total de like du photographe courant sur la vue
     */
    static updateTotalLike = () => {
        document.getElementById('counter-likes').innerHTML = Media.totalLikes
    }

    /**
     * crée la vue de la box d'information du photographe (nombre de like total + prix)
     * @returns {HTMLElement}
     */
     defineView = () => {
        let container = document.createElement('aside')
        container.setAttribute('id', "box-info")
        container.setAttribute('class', "box-info")

        let counterLike = document.createElement('div')
        counterLike.setAttribute('class', 'box-info__nbrLike')
        counterLike.innerHTML =
        `<span id="counter-likes" class="nbrLike">${Media.totalLikes}</span>
        <i class="fas fa-heart" aria-label="likes"></i>`

        container.appendChild(counterLike)
        container.innerHTML += `<p>${this.price}€ / jour</p>`

        return container
    }
}