const apiKey = '1d20c7f2ae1a7b2e8545831db9522907'; 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;

    if (city) {
        getWeather(city);
    } else {
        weatherResult.innerHTML = 'Пожалуйста, введите город.';
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Город не найден');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = error.message;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p>Температура: ${temperature.toFixed(1)}°C</p>
        <p>Описание: ${description}</p>
    `;
}
