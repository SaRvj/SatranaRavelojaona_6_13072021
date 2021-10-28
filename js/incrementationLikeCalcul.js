//calcul et affichage des like pour chaque photographe
function totalOfLikes() {
    //variables
    let totaloflike = [];

    //afficher le total des likes sur le footer
    let eachMediaLikes = document.querySelectorAll(".number");
    Array.from(eachMediaLikes).map(element => { 
        totaloflike.push(element.innerText)
    });
    
    let valuesArray = [];
    let sum = 0;
    for (var i = 0; i < totaloflike.length; i++) {   
        let value = parseInt(totaloflike[i]);
        valuesArray.push(value);
    }
    for (var i = 0; i < valuesArray.length; i++) {
        sum += valuesArray[i];
    }  
    let totalNumber = document.querySelector(".number-footer");
    totalNumber.innerHTML = sum;

    //tri par popularité
    listenToMenu();
}


//incrémentation des likes de média et le nombre total de likes au clic
function incrementLikes() {
    //récupérer les éléments du DOM
    const likeButtons = document.querySelectorAll(".likes");

    //faire augmenter les nombres
    likeButtons.forEach((btn) => btn.addEventListener("click", increaseNumber));
    likeButtons.forEach((btn) => btn.addEventListener("keyup", increaseNumber2));

    let time = 0;
}