import Media from "./media.js"

export default class sortDropdown {
    constructor () {
        this.item = {
            popularity : "Popularité",
            date : "Date",
            title : "Titre"
        }
        this.defaultBtnValue = "Popularité"
        this.state = false
    }

    static value = "popularity"

    /**
     * crée et retourne le composant de tri des medias
     * @returns {HTMLElement} HTMLElement
     */
     defineView = () => {
        //crée les éléments
        let sortView = document.createElement('div')
        sortView.setAttribute('class', 'sort')

        let sortLabel = document.createElement('span')
        sortLabel.setAttribute('id', 'sort-label')
        sortLabel.setAttribute('class', 'sort__label')
        sortLabel.innerHTML = "Trier par"

        let sortRoll = document.createElement('div')
        sortRoll.setAttribute('id', 'sort-wrapper')
        sortRoll.setAttribute('class', 'sort__wrapper')
        this.wrapper = sortRoll

        let sortBtn = document.createElement('button')
        sortBtn.setAttribute('id', 'sort-btn')
        sortBtn.setAttribute('class', 'btn sort-btn')
        sortBtn.setAttribute('aria-expanded', 'false')
        sortBtn.setAttribute('aria-haspopup', 'listbox')
        sortBtn.setAttribute('labelledby', 'sort-label')
        sortBtn.innerHTML = this.defaultBtnValue
        this.btn = sortBtn
        sortBtn.addEventListener('click', this.pressDropDown)

        let sortList = this.getSortList()
        this.list = sortList

        //crée l'arborescence
        sortRoll.appendChild(sortBtn)
        sortRoll.appendChild(sortList)

        sortView.appendChild(sortLabel)
        sortView.appendChild(sortRoll)

        return sortView
    }

    /**
     * crée et retourne la list des options de tri
     * @returns {HTMLElement} HTMLElement
     */
    getSortList = () => {

        let sortList = document.createElement('ul')
        sortList.setAttribute('id', 'sort-list')
        sortList.setAttribute('class', 'sort-list')
        sortList.setAttribute('role', 'listbox')
        sortList.setAttribute('aria-activedescendant', 'popularity')
        sortList.setAttribute('aria-selected', 'true')
        sortList.setAttribute('aria-labelledby', 'sort-label')

        for (const [key, value] of Object.entries(this.item)) {
            let sortItem = document.createElement('li')
            sortItem.setAttribute('id', value)
            sortItem.setAttribute('class', 'sort-list__item')
            sortItem.setAttribute('data-value', key)
            sortItem.setAttribute('tabindex', '0')
            sortItem.setAttribute('role', 'button')
            sortItem.innerHTML = value

            sortItem.addEventListener('click', this.updateSorting)
            sortItem.addEventListener('keydown', (e) => { e.key === 'Enter' && this.updateSorting(e)})

            sortList.appendChild(sortItem)
        }

        return sortList
    }

    /**
     * change l'état du bouton de tri lorsqu'une option est cliquée
     * @param {PointerEvent} e 
     */
    updateSorting = (e) => {
        e.preventDefault()
        this.pressDropDown()
        let newState = e.target.getAttribute('data-value')

        if(newState != sortDropdown.value){
            sortDropdown.value = newState
            this.btnValue = newState
            this.list.setAttribute('aria-activedescendant', newState)
            this.btn.innerHTML = this.item[newState]
            Media.sortBy(newState)
        }
    }

    /**
     * ouvre ou ferme le menu déroulant selon son état d'origine
     */
    pressDropDown = () => {

        if (this.state) {
            this.state = false
            this.btn.setAttribute('aria-expanded', 'false')
            this.wrapper.classList.remove('open')
            this.list.style.display = "none"
            document.removeEventListener('click', this.clickOut)
        }else{
            this.state = true
            this.btn.setAttribute('aria-expanded', 'true')
            this.wrapper.classList.add('open')
            this.list.style.display = "block"
            document.addEventListener('click', this.clickOut)
        }
    }

    /**
     * regarde si le "click" a eu lieu dans le menu déroulant; sinon appeler pressDropDown() 
     * @param {PointerEvent} e 
     */
    clickOut = (e) => {
        if (!e.target.classList.contains('sort-btn') &&
            !e.target.classList.contains('sort-list')) {
            this.pressDropDown()
        }
    }
}