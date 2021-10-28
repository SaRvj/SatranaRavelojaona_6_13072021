//calcul et affichage des like pour chaque photographe
function totalOfLikes() {
    //variables
    let totaloflike = [];

    let eachMediaLikes = document.querySelectorAll(".number");
    Array.from(eachMediaLikes).map(element => { 
        totaloflike.push(element.innerText)
    });
}