let planetName;
let planetMoons;
let planetOrbit;
let planetTemp;
let orbitee;
let captionDYK = document.querySelector(".p-dyk");

function buildDYK () {
    let dyk = "";

    if (planetName === "Moon") {
        dyk+= 'The ';
        orbitee = 'Earth';
    } else {
        orbitee = 'Sun';    
    }

    dyk+= `${planetName} `;

    if (planetName === "Moon") {

    } else if (planetMoons === 0) {
        dyk+= `has 0 moons,`;
    } else if (planetMoons === 1) {
        dyk+= `has 1 moon,`;
    } else if (planetMoons > 1) {
        dyk+= `has ${planetMoons} moons,`;
    }

    dyk+= ` takes ${planetOrbit} days to orbit the ${orbitee}`;

    dyk+= ' and has an average temperature of ' + planetTemp + '\xB0C.';

    captionDYK.innerHTML = '<strong>Did you know?</strong> ' + dyk;
}