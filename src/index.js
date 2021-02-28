function sayTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentTime = new Date();
  let currentDay = days[currentTime.getDay()];
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMins = currentTime.getMinutes();
  if (currentMins < 10) {
    currentMins = `0${currentMins}`;
  }

  let sayTime = `${currentDay} ${currentHour}:${currentMins}`;

  return sayTime;
}

let currentDate = document.querySelector("#current-day-time");
currentDate.innerHTML = sayTime();

//Search Engine

function searchCity(event) {
  event.preventDefault();

  let heading = document.querySelector("#city-result");
  let resultInputCity = document.querySelector("#search-a-city");
  let units = "metric";
  let apiKey = "360b9a84873a4d05a10820ef1b61c53c";
  let city = resultInputCity.value.trim();
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
  heading.innerHTML = `${resultInputCity.value}`;
}

let searchForm = document.querySelector("#search-engine-form");
searchForm.addEventListener("submit", searchCity);

function showWeather(response) {
  console.log(response);
  console.log(response.data.main.temp);

  document.querySelector("#city-result").innerHTML = response.data.name;

  let cityTemp = document.querySelector("#display-temp");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  let statusW = document.querySelector("#status-main");
  statusW.innerHTML = response.data.weather[0].main;

  let feelsLikeTemp = document.querySelector("#feels-like");
  feelsLikeTemp.innerHTML = Math.round(response.data.main.feels_like);

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let units = "metric";
  let apiKey = "360b9a84873a4d05a10820ef1b61c53c";
  let urlEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${urlEndPoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function searchMyCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationBtn = document.querySelector("#current-location-button");
currentLocationBtn.addEventListener("click", searchMyCity);
