// Variáveis e seleção de elementos
const apiKey = "e584801326d935ddbb38588ddf02051c";
const apiCountryURL = "https://flagsapi.com/";

const apiUnsplash = "https://api.unsplash.com/search/photos";
const unsplashAccessKey = "_U6u2T_YHdoyQIrF_2IwmmOX4PiCzh_2ooEPgUME7qQ"; // client_id da API do Unsplash

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

// Função para obter dados meteorológicos
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

// Função para obter imagem da cidade
const getCityImage = async (city) => {
    try {
        // Gera um número de página aleatório para obter resultados diferentes
        const randomPage = Math.floor(Math.random() * 10) + 1;

        const response = await fetch(`${apiUnsplash}?query=${city}&client_id=${unsplashAccessKey}&order_by=popular&page=${randomPage}&per_page=8`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular; // URL da primeira imagem encontrada
        }
        return 'fallback_image_url'; // URL de uma imagem padrão caso nenhuma imagem seja encontrada
    } catch (error) {
        console.error(error);
        return 'fallback_image_url'; // URL de uma imagem padrão caso haja erro
    }
};


// Função para exibir os dados meteorológicos e a imagem da cidade
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

// Evento para pesquisa ao pressionar Enter
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        e.preventDefault();
        const city = cityInput.value;
        showWeatherData(city);
    }
});

// Evento para pesquisa ao clicar no botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});
