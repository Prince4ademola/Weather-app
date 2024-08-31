const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('windSpeed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const locationName = document.getElementById('locationName');

async function checkWeather(city) {
    const api_key = "your_api_key_here"; // Replace with an actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; // Do not use personal API on just any open source

    const weather_data = await fetch(url).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // Use the input city directly
    locationName.innerHTML = city; // Set to what was typed in the box

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;
        default:
            weather_img.src = "./assets/default.png"; // Fallback image
            break;
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
