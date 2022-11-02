var inputEL = document.getElementById("input")
var buttonEL = document.getElementById("btn")
const searchHistory = new Set();

inputEL.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sumbitSearch();
  }
});

buttonEL.addEventListener("click", function (event) {
  sumbitSearch();
})

function sumbitSearch() {
  var inputValue = inputEL.value
  document.getElementById('lbl-city').innerHTML = inputValue;

  searchHistory.add(inputValue);
  var historyItems = '';
  for (const city of searchHistory) {
    historyItems += '<option value="' + city + '" />';
  }
  document.getElementById('input-history').innerHTML = historyItems;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c97ce75859mshaa9d4d09b0cd933p12e0c2jsnc00d1dd06b63',
      'X-RapidAPI-Host': 'world-time-by-api-ninjas.p.rapidapi.com'
    }
  };

  fetch('https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?city=' + inputValue, options)
    .then(response => response.json())
    .then(response => setDateTime(response))
    .catch(err => console.error(err));

  const weatherOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c97ce75859mshaa9d4d09b0cd933p12e0c2jsnc00d1dd06b63',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  fetch('https://yahoo-weather5.p.rapidapi.com/weather?location=' + inputValue + '&format=json&u=f', weatherOptions)
    .then(response => response.json())
    .then(response => setWeather(response))
    .catch(err => console.error(err));

  inputEL.value = "";
}

function setDateTime(data) {
  var hour = data.hour;
  const minute = data.minute;
  const date = data.date;
  var ampmString = "am";
  if (hour > 12) {
    hour = hour - 12;
    ampmString = "pm";
  }
  if (hour === 0) {
    hour = 12;
  }
  const time = "" + hour + ":" + minute + " " + ampmString;
  const day_of_week = data.day_of_week;
  document.getElementById('lbl-time').textContent = time;
  document.getElementById('lbl-date').textContent = date;
  document.getElementById('lbl-day_of_week').textContent = day_of_week;
}

function setWeather(data) {
  var temprature = data.current_observation.condition.temperature;
  var text = data.current_observation.condition.text;
  var sunrise = data.current_observation.astronomy.sunrise;
  var sunset = data.current_observation.astronomy.sunset;
  document.getElementById('lbl-temprature').textContent = temprature;
  document.getElementById('lbl-condition').textContent = text;
  document.getElementById('lbl-sunrise').textContent = sunrise;
  document.getElementById('lbl-sunset').textContent = sunset;
}

