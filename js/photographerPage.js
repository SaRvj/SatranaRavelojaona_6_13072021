
//éléments du DOM
const main = document.getElementById('main-section');

//variables
mediaArray= [];
mediaImage= [];
mediaVideo= [];

//récupérer targeted photographer lors du click précédent (de index.html)
let myUrl = window.location.href;
let url_string = (window.location.href);
let url = new URL(url_string);
let targetId = url.searchParams.get("id");
