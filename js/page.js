export function displayPhotographers(photographersData) {

    const photographers = photographersData;
    let indexPhotographersDOM = "";
  
    photographers.forEach((photographer) => {
        indexPhotographersDOM += `
           
                <div class="photographer-card">
                    <a href="photographer-page.html?id=${photographer.id}" tabindex="0">
                        <figure class="photographer-card-picture">
                            <img src= pictures/Photographers_ID_Photos/${photographer.portrait} alt= "portrait de ${photographer.name}" />
                        </figure>
                        <figcaption class="photographer-card-name">
                            <h2>${photographer.name}</h2>
                        </figcaption>
                    </a>
                    <div>
                        <h3 class="photographer-card-location">${photographer.city}, ${photographer.country}</h3>
                        <p class="photographer-card-tagLine">${photographer.tagline}</p>
                        <p class="photographer-card-price">${photographer.price}€ /jour</p>
                        <ul class="photographer-card-tags" role='list'>
                        ${photographer.tags.map((tag) => {return "<li><a href='#' class='tag' tabindex='0' data-name='" + tag + "'>" + "#" + tag + "</a></li>";}).join(' ')}
                        </ul>
                    </div>
                </div>
            `;
        });
        //  après .map(), .join(' ') est là pour supprimer la virgule entre chaque élément li
    
        document.getElementById("section-photographers-cards").innerHTML = indexPhotographersDOM;
    }
  
  
    // filtrer les photographes par tag lorsqu'on clique dessus et affiche les photographes consernés
    export function filterPhotographers(photographersData) {
  
        let selectedTag = "";
  
        document.addEventListener("click", (event) => {
  
            if (event.target.className === "tag"||event.target.className === "tag selected-tag") {
                selectedTag = event.target?.dataset?.name;
                specificPhotographer(selectedTag)
                tagStylisation(selectedTag)
            }
  
            return false;;
        });
  
        function tagStylisation(selectedTag) {
  
            document.querySelectorAll(".tag").forEach(element => {
  
                let tag = element.dataset.name;
        
                if (tag === selectedTag) {
                    if (element.classList.contains("selected-tag")){
                        element.classList.remove("selected-tag")
                
                    } else{
                        element.classList.add("selected-tag")
                
                    }
                    
                } else {
                    element.classList.remove("selected-tag")
                }
            });
        }
  
        function specificPhotographer(tagName) {
            console.log (tagName);
            let filterResult = [];
            let tagSelected = document.querySelector('.tag.selected-tag');
            if (tagSelected == null){
                tagSelected = '';
                filterResult = photographersData.filter(photographer => photographer.tags.includes(tagName));
            } else {
            let dataName = tagSelected.getAttribute('data-name');
            console.log (dataName);
            console.log (tagSelected);
            if (tagName == dataName){
                fetch("./data/FishEyeData.json")

                .then((response) => {
                    if (!response.ok) {
                    throw new Error("HTTP error, status = " + response.status);
                    }
                    return response.json();
                })

                .then((data) => {
                filterResult = data.photographers;
                });
    
            } else {
                filterResult = photographersData.filter(photographer => photographer.tags.includes(tagName));
            }
            filterResult = photographersData.filter(photographer => photographer.tags.includes(tagName));
        }
        // relance la fonction d'affichage mais avec seulement les filtrés
        return displayPhotographers(filterResult);
    }
    
}