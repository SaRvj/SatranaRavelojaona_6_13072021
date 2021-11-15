const pageIndex = document.getElementsByTagName('pageIndex')

export default class Error {

    /**
     * redirige vers la page d'acceuil et stoque le message d'erreur pour l'afficher
     * @param {string} error 
     */
    static redirectIndex = (error) => {
        sessionStorage.setItem('error', error)
        window.location.href = "index.html"
    }

    /**
     * crée et affiche un message d'erreur
     * @param {string} errorMsg 
     * @param {boolean} returnHome 
     */
    static print = (errorMsg, returnHome) => {


        if (returnHome) {
            pageIndex[0].innerHTML += `<div class="msg-error"><p>${errorMsg}</p><a href="index.html">Retour à l'accueil</a></div>`
        }else{
            pageIndex[0].innerHTML = `<div class="msg-error"><p>${errorMsg}</p></div>`
        }
    }
}