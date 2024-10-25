const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.getElementById('weather-icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const airPressureOutput = document.querySelector('.airPressure');
const visibilityOutput = document.querySelector('.visible');
const sunriseOutput = document.querySelector('.sunrise');
const sunsetOutput = document.querySelector('.sunset');

let city; 

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

async function fetchWeatherData(cityInput) {
    const promise=await fetch(`http://api.weatherapi.com/v1/current.json?key=d0f6924e70184a3d843205950242310&q=${cityInput}&aqi=yes`);
    return await promise.json()
}
button.addEventListener("click",async()=>{
    const value=input.value;
    const result= await fetchWeatherData(value);
    console.log(result);
    nameOutput.innerText=result.location.name;
    timeOutput.innerText=result.location.localtime;
    dateOutput.innerText=result.location.date;
    cloudOutput.innerHTML = `Cloudiness: ${data.current.cloud}%`;
    humidityOutput.innerHTML = `Humidity: ${data.current.humidity}%`;
    windOutput.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    airPressureOutput.innerHTML = `Air Pressure: ${data.current.pressure_mb} hPa`;
    visibilityOutput.innerHTML = `Visibility: ${data.current.vis_km} km`;
    sunriseOutput.innerHTML = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
    sunsetOutput.innerHTML = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
    const currentTime = new Date(data.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeOutput.innerHTML = currentTime;

    let timeOfDay = "day";
    if (!data.current.is_day) {
        timeOfDay = "night";
    }

    const code = data.current.condition.code;

    if (code == 1000) {
        app.style.backgroundImage = `url(clear.jpg)`;
        btn.style.background = "#e5ba92";
    } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
        app.style.backgroundImage = `url(cloudy.jpg)`;
        btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
    } else if ([1063, 1069, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)) {
        app.style.backgroundImage = `url(rainy.jpg)`;
        btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
    } else {
        app.style.backgroundImage = `url(snowy.jpg)`;
        btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
    }

    app.style.opacity = "1";  
})
.catch(() => {
    console.error('Fetch error:', error);
    alert('City not found, please try again');
    app.style.opacity = "1";
});


fetchWeatherData();
app.style.opacity = "1";
