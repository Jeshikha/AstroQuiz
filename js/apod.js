const apiKey = 'CqWJ0hTZI8DCeDELuvf2vsBNl3CvheYwNVfKESCO';
const targetDate = '2023-09-28'; // Specify the target date in 'YYYY-MM-DD' format

// Fetch the Astronomy Picture of the Day for the specified date
fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${targetDate}`)
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

// To generate everyday images from NASA API 

// const apiKey = 'CqWJ0hTZI8DCeDELuvf2vsBNl3CvheYwNVfKESCO';

// // Fetch the Astronomy Picture of the Day
// fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
//     .then((response) => response.json())
//     .then((data) => {
//         const imageUrl = data.url;

//         // Set the retrieved image as the background of the body
//         document.body.style.backgroundImage = `url(${imageUrl})`;
//         document.body.style.backgroundSize = 'cover';
//     })
//     .catch((error) => {
//         console.error('Error fetching data:', error);
//     });
