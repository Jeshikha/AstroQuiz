const apiKey = 'CqWJ0hTZI8DCeDELuvf2vsBNl3CvheYwNVfKESCO';

// Fetch the Astronomy Picture of the Day
fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        const imageUrl = data.url;

        // Set the retrieved image as the background of the body
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });