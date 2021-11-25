import boxInfo from "./boxInfo.js"
import Tag from "./Tag.js"
import LightBox from "./lightbox.js"

export default class Media {
    constructor (data, target) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.date = data.date
        this.likes = data.likes
        this.title = data.title
        this.tags = data.tags
        this.img = data.image
        this.video = data.video
        this.price = data.price
        this.alt = data.alt
        this.liked = false
        this.element = this.defineView()
        Media.target = target


        Media.totalLikes += this.likes
        Media.instances = [...Media.instances, this]
    }

    static target
    static instances = []
    static totalLikes = 0

    /**
     * rempli la cible: gallerie avec les medias
     */
    static fill = () => {
        Media.target.innerHTML = ""
        Media.instances.forEach(media => Media.target.appendChild(media.element))
    }

    /**
     * tri les médias
     * @param {string} whichOne popularité / date / titre
     */
    static sortBy = (whichOne) => {
        let element = [...Media.instances]
        switch (whichOne) {
            case 'date':
                element.sort((a,b) => new Date(b.date) - new Date(a.date))
                break;

            case 'title':
                element.sort((a,b) => a.title.localeCompare(b.title))
                break;

            default:
                element.sort((a,b) => b.likes - a.likes)
                break;
        }

        Media.instances = element
        Media.fill()
    }

    /**
     * défini si chaque media est visible ou non selon le tag selectionné
     */
    static defineVisbilityFromFilters = () => {

        Media.instances.forEach(media => {
            let res = media.tags.filter(tag => Tag.activeTags.includes(tag))
            media.element.style.display = res.length == Tag.activeTags.length ? "block" : "none"
        })
    }

    /**
     * incrémente ou décrémente le nombre de like d'un media
     */
    likeNumber = () => {
        if (this.liked){
            this.likes -= 1
            Media.totalLikes -= 1
        } else {
            this.likes += 1
            Media.totalLikes += 1
        }

        this.likeBtn.classList.toggle('fas')
        this.likeBtn.classList.toggle('far')
        this.liked = !this.liked
        this.likeCount.innerHTML = this.likes
        boxInfo.updateTotalLike()
    }

    /**
     * crée et retourne la vue d'un media
     * @returns {HTMLElement}
     */
    defineView = () => {
        let container = document.createElement('article')
        container.setAttribute('class', 'media')

        let media = document.createElement('a')
        media.setAttribute('href', '#')
        media.setAttribute('role', 'button')
        media.setAttribute('class', 'media__link')

        if (this.video) {
            media.classList.add('video-overlay')
        }
        media.innerHTML = this.getMini()
        media.addEventListener('click', () => new LightBox(Media.instances, Media.instances.indexOf(this)) )

        let footer =  document.createElement('footer')
        footer.setAttribute('class', 'media__infos')
        footer.innerHTML = `<p class="media__infos__title">${this.title}</p>`

        let likeNumber = document.createElement('div')
        likeNumber.setAttribute('class', 'media__infos__likes')

        let likeNb = document.createElement('span')
        likeNb.setAttribute('class', 'media__infos__likes-nb')
        likeNb.innerHTML = this.likes

        this.likeCount = likeNb


        likeNumber.appendChild(likeNb)
        likeNumber.appendChild(this.defineLikeBtn())
        footer.appendChild(likeNumber)
        container.appendChild(media)
        container.appendChild(footer)

        return container
    }

    /**
     * crée et retourne le bouton de like
     * @returns {HTMLElement}
     */
    defineLikeBtn = () => {
        let likeBtn = document.createElement('i')
        likeBtn.setAttribute('class', 'far fa-heart media__infos__likes-icon')
        likeBtn.setAttribute('aria-label', 'likes')
        likeBtn.setAttribute('role', 'button')
        likeBtn.setAttribute('tabindex', '0')

        likeBtn.addEventListener('click', this.likeNumber)
        likeBtn.addEventListener('keydown', (e)=> {
            if (e.key === "Enter") {
                this.likeNumber()
            }
        })

        this.likeBtn = likeBtn
        return likeBtn
    }

    /**
     * crée la miniature du media et retourne minimedia
     * @returns {string}
     */
    getMini = () => {
        if (this.img) {
            return `<img class="media__link__img" src="pictures/image/${this.photographerId}/${this.img}" alt="${this.title}, vue rapproché">`
        }
        
        if (this.video){
            return `<video class="media__link__video" aria-label="${this.title}, vue rapproché">
                        <source src="pictures/image/${this.photographerId}/${this.video}" type="video/mp4">
                    </video>`
        }

        return "<p>Aucun média n'a été trouvé</p>"
    }
}