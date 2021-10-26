//récupérer le data json
const myFetch = async () =>{ 

    return await fetch('https://raw.githubusercontent.com/SaRvj/SatranaRavelojaona_6_13072021/master/FishEyeData.json')
    .then(function(resp){return resp.json();})
    .then(function(data){return data})
    .catch(function(error) {console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);});
};