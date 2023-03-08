const weatherButton = document.querySelector('#weather-button');
const weatherInput = document.querySelector('#weather-input');
const weatherList = document.querySelector('#weather-list');

weatherButton.addEventListener('click', () => {
    const searchQuery = weatherInput.value.trim();
    if (searchQuery) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=9fd7a449d055dba26a982a3220f32aa2`;
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherList.innerHTML = '';
            if (data.weather) {
                data.weather.forEach(weather => {
                    const newWeather = document.createElement('li');
                    newWeather.innerHTML = `
                    <h2>${data.name}</h2>
                    <h1>${data.sys.country}</h1>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}</p>
                    <p>Wind: ${data.wind.speed} km/h</p>
                    <p>${data.weather[0].main}, ${data.weather[0].description}</p>
                    `;
                weatherList.appendChild(newWeather);
                });
            } else {
                const noResults = document.createElement('li');
                noResults.textContent = 'No results found.';
                weatherList.appendChild(noResults);
            }
        })
        .catch(error => console.error(error));
    }
})