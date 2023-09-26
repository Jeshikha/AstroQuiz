//let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${solaireId}`;
let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/saturne`;
let planetName;
let planetMoons;
let planetOrbit;
let modalDYK = document.querySelector(".modal-dyk");

function buildDYK () {
    let dyk = "";

    if (planetMoons === 0 && planetName != "Moon") {
        dyk+= `${planetName}`;
    } else if (planetMoons === 1) {
        dyk+= `${planetName} has 1 moon and`;
    } else if (planetMoons > 1) {
        dyk+=`${planetName} has ${planetMoons} moons and`;
    }

    dyk+= ` takes ${planetOrbit} days to orbit the sun!`
    console.log(dyk);
    modalDYK.textContent = dyk;
}

fetch(queryURL)
    .then (function (response) {
        return response.json();
    }).then(function (data) {
        //console.log(data);
        planetName = data.englishName;
        //console.log(planetName);
        planetMoons = data.moons.length;
        //console.log(planetMoons);
        planetOrbit = Math.floor(data.sideralOrbit);
        //console.log(planetOrbit);
        buildDYK();
 });
 
// need to do some different things for the moon.......


//terre
//lune
//mercure
//venus
//mars
//jupiter
//saturne
//uranus
//neptune
//pluton