//let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/${solaireId}`;
let queryURL = `https://api.le-systeme-solaire.net/rest/bodies/earth`;
let planetName;
let planetMoons;
let planetOrbit;
let planetTemp;
let orbitee;
let modalDYK = document.querySelector(".modal-dyk");

function buildDYK () {
    let dyk = "";

    if (planetName === "Moon") {
        dyk+= 'The ';
        orbitee = 'Earth';
    } else {
        orbitee = 'Sun';    
    }

    dyk+= `${planetName} `;

    if (planetMoons === null) {
        return; 
    } else if (planetMoons === 0) {
        dyk+= `has 0 moons,`;
    } else if (planetMoons === 1) {
        dyk+= `has 1 moon,`;
    } else if (planetMoons > 1) {
        dyk+= `has ${planetMoons} moons,`;
    }

    dyk+= ` takes ${planetOrbit} days to orbit the ${orbitee}`;

    dyk+= ' and has an average temperature of ' + planetTemp + '\xB0C?';

    console.log(dyk);
    modalDYK.textContent = dyk;
}

fetch(queryURL)
    .then (function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        if (data.englishName) {
            planetName = data.englishName;
            console.log(planetName);
        }
        
        if (data.moons) {
            planetMoons = data.moons.length;
            console.log(planetMoons);
        }
        
        if (data.sideralOrbit) {
            planetOrbit = Math.floor(data.sideralOrbit);
            console.log(planetOrbit);
        }
        if (data.avgTemp) {
            planetTemp = parseInt(data.avgTemp) - 273.15;
            planetTemp = Math.round((planetTemp + Number.EPSILON) * 100) / 100;
            console.log(planetTemp);
        }
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