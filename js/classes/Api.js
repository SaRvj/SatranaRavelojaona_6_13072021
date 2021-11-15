import Error from './error'

/**
 *simule une api, elle devra être modifié une fois l'api créé
 */
export default class Api {

    static photographers
    static medias

    /**
     *récupère les données du fichier json et les stoquent dans des variables statiques
     */
    static init = async () => {
            const req = await fetch('./data/FishEyeData.json')
            if (!req.ok) {
                throw "Données momentanément indisponible"
            }
            const data =  await req.json()

            Api.photographers = data.photographers
            Api.medias = data.media        
    }

    /**
     *récupère tous les photographes
     * @returns {object}
     */
    static takeAllPhotographers = () => {
        return Api.photographers
    }

    /**
     *récupère les informations d'un photographe par l'intermédiaire de son id
     * @param {number} id 
     * @returns {object}
     */
    static takePhotographerById = (id) => {
        id = parseInt(id, 10)

        if (!isNaN(id)) {
            const res = Api.photographers.find(photographer => photographer.id === id)
            return res || Error.print("Ce photographe n'existe pas", true)
        }
    }

    /**
     * récupère tous les tags de tous les photographes
     * @returns {array}
     */
    static getAllTags = () => {
        let allTags = []

        Api.photographers.forEach(photographer => {
            let tagsPhotographer = photographer.tags
            
            tagsPhotographer.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags = [...allTags, tag]
                }
            })
        })

        return allTags
    }

    /**
     * récupère tout les médias d'un photographe
     * @param {number} id 
     * @returns 
     */
    static takeMediaFromPhotographer = (id) => {
        return Api.medias.filter(media => media.photographerId == id)
    }
}