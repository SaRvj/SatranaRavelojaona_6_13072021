import photographer from "./Photographer"

const modal = document.getElementById('modalForm')
const contactForm = document.getElementById('contactForm')
const btnCloseModal = document.getElementById('closeModal')
const btnSubmit = document.getElementById('submitForm')

const Regex = {
    text : /^[a-zA-Z \-àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/,
    email : /^[a-z0-9._-]+@{1}[a-z0-9.-_]{2,}[.]{1}[a-z]{2,5}$/
}
const errors = {
    empty : "Veuillez renseigner ce champ.",
    names : {
        invalid : "Caractère utilisé non valide, utilisez uniquement des lettres, espaces et '-'.",
        length : "Ce champ doit comporter au moins 2 caractères."
    },
    email : {
        empty : "Veuillez renseigner votre adresse email.",
        invalid : "L'adresse e-mail n'est pas valide."
    }
}

let validValidation = {}


const open = () => {
    modal.classList.add('open')
    modal.focus()
    document.body.classList.add('no-scroll')
    document.addEventListener('keydown', useKeys)
}

const close = (e) => {
    if(!e || e.target == modal || e.target == btnCloseModal){
        modal.classList.remove('open')
        document.body.classList.remove('no-scroll')
        document.getElementById('contact-btn').focus()
        document.removeEventListener('keydown', useKeys)
    }
}

const useKeys = (e) => {
    e.key === "Escape" && close()

    if(e.key === "Tab" && e.target === btnCloseModal){
        e.preventDefault()
        contactForm.focus()
    }
}


/**
 *initialise la vue et set les events
 */
const init = () => {

    //initialise la vue
    let name = Photographer.instances[0].name
    let formulaire = document.getElementById('contactForm')
    document.getElementById('form-add').innerHTML += name

    //ajoute des évènements liés au formulaire
    modal.addEventListener('click', close)
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()

        if(validateForm(validValidation)){
            let data = new FormData(contactForm) // Contient les données du formulaire validé

            //console.loger des données du formulaire
            console.group('Données du formulaire')
            for(let a of data.entries()) { console.log(a[0]+ ' : '+ a[1]) }
            console.groupEnd()
        
            //code asynchrone ici à ajouter
            

            //à appeller quand l'envoi asynchrone répond par un status 200 Ok
            contactForm.reset()
            Object.values(validValidation).forEach( value => {
                value.validate = false
            })
        }
    });

    //ajoute des évènements liés à la saisie
    [...formulaire.elements].forEach(entry => {
        if (entry.nodeName === "INPUT" || entry.nodeName === "TEXTAREA") {

            if (entry.nodeName === "INPUT" && entry.type === "text") {
                validValidation[entry.id] = {
                    validate : false,
                    controlFunc() { controlInputText(entry, Regex.text, 2) }
                }
            } else if (entry.nodeName === "INPUT" && entry.type === "email") {
                validValidation[entry.id] = {
                    validate : false,
                    controlFunc() { controlInputEmail(entry, Regex.email) }
                }
            } else if (entry.nodeName === "TEXTAREA") {
                validValidation[entry.id] = {
                    validate : false,
                    controlFunc() { controlInputTextarea(entry, 2) }
                }
            }

            entry.addEventListener('input', () => validValidation[entry.id].controlFunc())
        }
    })

}

/**
 * contrôle la saisie de l'utilisateur sur un champ input type text
 * @param {object} entry 
 * @param {regex} regex 
 * @param {number} minLength 
 * @param {number} maxLength 
 */
const controlInputText = (entry, regex, minLength = 1, maxLength) => {
    let value = entry.value

    if (value.length >= minLength && (value.length <= maxLength || maxLength === undefined )) {
        if (value.match(regex) != null) {
            validValidation[entry.id].validate = true
            errorRemove(entry)
        }else{
            validValidation[entry.id].validate = false
            setError(entry, errors.names.invalid)
        }
    }else{
        validValidation[entry.id].validate = false
        value == "" ? setError(entry, errors.empty) : setError(entry, errors.names.length)
    }
}

/**
 * contrôle la saisi de l'utilisateur sur un champ input type email
 * @param {object} entry 
 * @param {regex} regex 
 */
const controlInputEmail = (entry, regex) => {
    let value = entry.value

    if (value.match(regex) != null) {
        validValidation[entry.id].validate = true
        errorRemove(entry)
    }else{
        validValidation[entry.id].validate = false
        value == "" ? setError(entry, errors.email.empty) : setError(entry, errors.email.invalid)
    }
}

/**
 * contrôle la saisi de l'utilisateur sur un champ textarea
 * @param {object} entry 
 * @param {number} minLength 
 * @param {number} maxLength 
 */
const controlInputTextarea = (entry, minLength = 1, maxLength) => {
    let value = entry.value

    if (value.length >= minLength && (value.length <= maxLength || maxLength === undefined )) {
        validValidation[entry.id].validate = true
        errorRemove(entry)
    }else{
        validValidation[entry.id].validate = false
        value == "" ? setError(entry, errors.empty) : setError(entry, errors.names.length)
    }
}

/**
 * contrôle si tous les champs sont renseignés correctement
 * @param {object} entries 
 * @returns {boolean}
 */
const validateForm = (entries) => {
    let formCompleted = true
    Object.entries(entries).forEach( ([key, value]) => {
        if(!value.validate){
            value.controlFunc()
            formCompleted = false
        }
    })

    return formCompleted
}


/**
 * crée une erreur sur un élément du formulaire
 * @param {object} elem 
 * @param {string} error 
 */
const setError = (elem, error) => {
    let target = NodeList.prototype.isPrototypeOf(elem) ? elem[0].parentNode : elem.parentNode
    while (!target.classList.contains('form__item')) {
        target = target.parentNode
    }

    target.setAttribute("data-error", error)
}

/**
 * supprime une erreur d'un element du formulaire
 * @param {object} elmt 
 */
const errorRemove = (elmt) => {

    let target = NodeList.prototype.isPrototypeOf(elmt) ? elmt[0].parentNode : elmt.parentNode
    
    while (!target.classList.contains('form__item')) {
        target = target.parentNode
    }

    target.removeAttribute("data-error")
}


const Contact = {
    init : init,
    open : open,
    close : close
}

export default Contact