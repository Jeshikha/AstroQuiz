let queryURL = 'https://api.le-systeme-solaire.net/rest/bodies/terre';

fetch(queryURL)
    .then (function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        let planetMoons = data.moons.length;
        console.log(planetMoons);
 });