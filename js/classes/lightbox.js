export default class LightBox {
    constructor (elemList, currentIndex) {
        this.elements = elemList
        this.id = currentIndex
        this.current = this.elements[this.id]
        this.target = document.getElementById('modal-lightbox')

        this.render()
    }

    /**
     * crée la vue et retourner la vue
     * @returns {HTMLElement}
    */
    defineView = () => {

        let container = document.createElement('div')
        container.setAttribute('class', 'lightbox__container')

        let mediaContainer = document.createElement('div')
        mediaContainer.setAttribute('class', 'media-container')
        this.mediaContainer = mediaContainer

        let title = document.createElement('p')
        title.setAttribute('class', 'title')
        title.innerHTML = this.current.title
        this.title = title

        let arrowLeft = document.createElement('button')
        arrowLeft.setAttribute('class', 'arrow-left')
        arrowLeft.setAttribute('aria-label', 'précédent')
        arrowLeft.innerHTML = `<i role="button" class="fas fa-chevron-left"></i>`
       arrowLeft.addEventListener('click', () => this.prevMedia())

        let arrowRight = document.createElement('button')
        arrowRight.setAttribute('class', 'arrow-right')
        arrowRight.setAttribute('aria-label', 'suivant')
        arrowRight.innerHTML = `<i role="button" class="fas fa-chevron-right"></i>`
        arrowRight.addEventListener('click', () => this.nextMedia())

        let btnClose = document.createElement('button')
        btnClose.setAttribute('class', 'close')
        btnClose.setAttribute('aria-label', 'fermer la vue rapproché')
        btnClose.innerHTML = `<i class="fas fa-times"></i>`
        this.btnClose = cbtnClose
        btnClose.addEventListener('click', () => this.close())


        mediaContainer.appendChild(this.getMedia())

        container.appendChild(mediaContainer)
        container.appendChild(title)
        container.appendChild(arrowLeft)
        container.appendChild(arrowRight)
        container.appendChild(btnClose)

        return container
    }

    open = () => {
        this.target.classList.add('open')
        document.body.classList.add('no-scroll')
        document.addEventListener('keydown', this.keyControl)
        this.target.focus()
    }

    close = () => {
        this.target.classList.remove('open')
        document.body.classList.remove('no-scroll')
        document.removeEventListener('keydown', this.keyControl)
    }

    trackFocus = (e) => {
        if (e.target === this.btnClose) {
            e.preventDefault()
            this.target.focus()
        }
    }

    /**
     * contrôle les entrées clavier sur la lightbox
     * @param {KeybordEvent} e 
     */
    keyControl = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.prevMedia()
                break;
            case 'ArrowRight':
                this.nextMedia()
                break;
            case 'Escape':
                this.close()
            break;
            case 'Tab':
                this.trackFocus(e)
            break;
            default:
                break;
        }
    }

    nextMedia = () => {
        this.id = (this.id + 1 >= this.elements.length) ? 0 : this.id + 1
        this.current = this.elements[this.id]
        this.title.innerHTML = this.current.title
        this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0])
    }

    prevMedia = () => {
        this.id = (this.id - 1 === -1) ? this.elements.length - 1 : this.id - 1
        this.current = this.elements[this.id]
        this.title.innerHTML = this.current.title
        this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0])
    }

    /**
     * crée le html qui contient la media et retourne media
     * @returns {HTMLElement}
     */
    getMedia = () => {
        let media
        if (this.current.img) {
            media = document.createElement('img')
            media.setAttribute('class', 'media')
            media.setAttribute('alt', this.current.alt)
            media.src = `imgs/photos/${this.current.photographerId}/` + this.current.img
        }else{
            media = document.createElement('video')
            media.setAttribute('class', 'media')
            media.setAttribute('controls', 'true')

            media.innerHTML = `<source src="imgs/photos/${this.current.photographerId}/${this.current.video}" type="video/mp4">`
        }
        this.media = media
        return media
    }

    /**
     * ajoute la vue au document
     */
    render = () => {
        this.target.innerHTML = ''
        this.target.appendChild(this.defineView())
        this.open()
    }
}