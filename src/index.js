function formatDate(timestamp) {
  let date = new Date(timestamp);
  let today = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = date.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `Last Updated: ${hours}:${mins}, ${day} ${today} ${month}`;
}

function getForecast(coordinates); {
    let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
    let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`; 
    axios.get(apiUrl).then(displayForecast); 
} 

function show(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord); 

}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let cityName = document.querySelector("#city-name").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(show);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-temperature-max"> 18° </span>
                  <span class="forecast-temperature-min"> 12° </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let celsiusTemperature = null;

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);


