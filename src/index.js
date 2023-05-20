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

  return `${hours}:${mins}, ${day} ${today} ${month}`;
}

function show(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°C`;
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
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let cityName = document.querySelector("#city-name").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;

  axios.get(apiUrl).then(show);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);