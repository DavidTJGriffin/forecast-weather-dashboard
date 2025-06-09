var searchBtn = document.getElementById('search');
var searchInput = document.getElementById('cityName');
var apiKey = '3075735f44cc723c6a4ccc3fa4f7a600';

var lon;
var lat;

var iconEl = document.querySelector('#icon');
var icons = [
  document.querySelector('#icon0'),
  document.querySelector('#icon1'),
  document.querySelector('#icon2'),
  document.querySelector('#icon3'),
  document.querySelector('#icon4')
];

function getLocation(city) {
  var apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (!data.length) return;
      lon = data[0].lon;
      lat = data[0].lat;
      document.getElementById('city').textContent = data[0].name;
      getWeather();
    })
    .catch(err => console.log('Error', err));
}

function getWeather() {
  var currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(currentURL)
    .then(res => res.json())
    .then(data => {
      document.getElementById('date').textContent = moment.unix(data.dt).format('MMMM Do YYYY');
      iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      document.getElementById('temp').textContent = 'Temp: ' + data.main.temp + '°F';
      document.getElementById('wind').textContent = 'Wind: ' + data.wind.speed + ' mph';
      document.getElementById('humidity').textContent = 'Humidity: ' + data.main.humidity + '%';
    });

  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
      for (var i = 0; i < 5; i++) {
        var idx = i * 8;
        var forecast = data.list[idx];
        icons[i].setAttribute('src', `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`);
        document.getElementById(String(i)).textContent = moment.unix(forecast.dt).format('MM/DD/YYYY');
        document.getElementById('temp' + i).textContent = 'Temp: ' + forecast.main.temp + '°F';
        document.getElementById('wind' + i).textContent = 'Wind: ' + forecast.wind.speed + ' mph';
        document.getElementById('hum' + i).textContent = 'Humidity: ' + forecast.main.humidity + '%';
      }
    })
    .catch(err => console.log('Error', err));
}

function getEnteredLocation() {
  var city = searchInput.value || 'New York';
  getLocation(city);
}

searchBtn.addEventListener('click', getEnteredLocation);

getLocation('New York');

