// variaveis e seleçao de elementos
const apiKey = "e584801326d935ddbb38588ddf02051c"
const apiCountryURL = "https://flagsapi.com/"
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const humidityElement = document.querySelector("#humidity span")
const windElement = document.querySelector("#wind span")

const weatherContainer = document.querySelector("#weather-data")

//funções
    const getWeatherData = async (city) => {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

        const res = await fetch(apiWeatherURL);
        const data = await res.json();

        return data;
    }

const showWeatherData = async (city) => {
    const data =  await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
    "src", 
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    const countryCode = data.sys.country.toLowerCase();
    countryElement.setAttribute("src", `https://flagcdn.com/w2560/${countryCode}.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

        weatherContainer.classList.remove("hide");

        document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

        weatherContainer.classList.remove("hide");

}
//Eventos
searchBtn.addEventListener("click",(e) => {
    e.preventDefault()

    const city = cityInput.value;
    showWeatherData(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
  
      showWeatherData(city);
    }
  });
  suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });