document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput = document.getElementById('input');
    const getWeatherButton = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const discriptionDisplay = document.getElementById('discription');
    const  errorMessage = document.getElementById('error-msg');
    const ApiKey = "7aef58f22f3f746d630ef2ca1631fab1";

    getWeatherButton.addEventListener('click' , async()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(err){
            showError(err && err.message ? err.message : 'City Not Found');
        }
    });

    async function fetchWeatherData(city){
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;

        const response = await fetch(URL);
        console.log(typeof response);
        console.log("Response",response);

        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data  = await response.json();
        return data;
    }
    function displayWeatherData(weatherData){
        const { name, main, weather } = weatherData;
        cityName.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
        discriptionDisplay.textContent = `Weather: ${weather[0].description}`;

        errorMessage.classList.add("hidden");
        weatherInfo.classList.remove("hidden");
    }

    function showError(message){
        weatherInfo.classList.add('hidden');
        //errorMessage.textContent = message || 'City not found. Please try again';
        errorMessage.classList.remove('hidden');
    }
});