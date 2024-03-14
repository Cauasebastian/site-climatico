// variáveis e seleção de elementos
const apiKey = "e584801326d935ddbb38588ddf02051c";
const apiCountryURL = "https://flagsapi.com/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// função para obter dados meteorológicos
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

// função para obter imagem da cidade
const getCityImage = async (city) => {
    try {
        const response = await fetch(`${apiUnsplash}${city}`);
        return response.url;
    } catch (error) {
        console.error(error);
        return 'fallback_image_url'; // URL de uma imagem padrão caso haja erro
    }
};

// função para exibir os dados meteorológicos e a imagem da cidade
const showWeatherData = async (city) => {
    try {
        const weatherData = await getWeatherData(city);
        const cityImageUrl = await getCityImage(city);

        cityElement.innerText = weatherData.name;
        tempElement.innerText = parseInt(weatherData.main.temp);
        descElement.innerText = weatherData.weather[0].description;
        weatherIconElement.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
        );
        const countryCode = weatherData.sys.country.toLowerCase();
        countryElement.setAttribute("src", `https://flagcdn.com/w2560/${countryCode}.png`);
        humidityElement.innerText = `${weatherData.main.humidity}%`;
        windElement.innerText = `${weatherData.wind.speed} km/h`;

        document.body.style.backgroundImage = `url("${cityImageUrl}")`;

        weatherContainer.classList.remove("hide");
    } catch (error) {
        console.error(error);
    }
};

// evento para pesquisa ao pressionar Enter
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        e.preventDefault();
        const city = cityInput.value;
        showWeatherData(city);
    }
});

// evento para pesquisa ao clicar no botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});
