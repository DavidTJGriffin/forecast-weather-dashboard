var searchBtn = document.getElementById('search');
var searchInput = document.getElementById('cityName');
var searchValue = searchInput.value;
var apiKey = '3075735f44cc723c6a4ccc3fa4f7a600'
var lon; //declaring 
var lat;
var iconEl = document.querySelector("#icon");
var icon0 = document.querySelector('#icon0');
var icon1 = document.querySelector('#icon1');
var icon2 = document.querySelector('#icon2');
var icon3 = document.querySelector('#icon3');
var icon4 = document.querySelector('#icon4');



//Function 
function getLocation() {
    searchValue = 'New York'

    console.log("Searching weather for ...", searchValue);
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&limit=1&appid=" + apiKey;
    console.log(apiURL);
    //Fetch data from the API 
    fetch(apiURL)
        .then(function (res) {
            //console.log(res); 
            return res.json(); //return response as a  JSON object 
        }).then(function (data) {
            console.log("Geocoding Response", data);
            //Grab lat and long from the api response 
            lon = data[0].lon; //assigning 
            lat = data[0].lat;
            //Display City Name on the HTML page 
            document.getElementById('city').textContent = data[0].name;
            //Set in local Storage 


            //Another fetch for ONE CALL API
            getWeather();
        })
        .catch(function (error) {
            console.log("Error", error);
        })
};
getLocation();

function getEnteredLocation() {
    searchValue = searchInput.value;

    console.log("Searching weather for ...", searchValue);
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&limit=1&appid=" + apiKey;
    console.log(apiURL);
    //Fetch data from the API 
    fetch(apiURL)
        .then(function (res) {
            //console.log(res); 
            return res.json(); //return response as a  JSON object 
        }).then(function (data) {
            console.log("Geocoding Response", data);
            //Grab lat and long from the api response 
            lon = data[0].lon; //assigning 
            lat = data[0].lat;
            //Display City Name on the HTML page 
            document.getElementById('city').textContent = data[0].name;
            //Set in local Storage 


            //Another fetch for ONE CALL API
            getWeather();
        })
        .catch(function (error) {
            console.log("Error", error);
        })
};



function getWeather() {
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial' + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
    console.log(apiURL);
    //Fetch data from the API 
    fetch(apiURL)
        .then(function (res) {
            //console.log(res); 
            return res.json(); //return response as a  JSON object 
        }).then(function (data) {
            console.log("One call Response", data);
            document.getElementById('date').textContent = moment().format('MMMM Do YYYY')
            console.log(data.current.weather.icon);
            iconEl.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png');
            document.getElementById('temp').textContent = 'Temp: ' + data.current.temp + '°F'
            document.getElementById('wind').textContent = 'Wind: ' + data.current.wind_speed + ' mph'
            document.getElementById('humidity').textContent = 'Humidity: ' + data.current.humidity + '%'
            document.getElementById('uvIndex').textContent = 'UV index: ' + data.current.uvi
            console.log(data.daily[4].dt)

            // Forecast data displaying to page
            icon0.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[0].weather[0].icon + '@2x.png');
            document.getElementById('0').textContent = moment.unix(data.daily[0].dt).format("MM/DD/YYYY")
            document.getElementById('temp0').textContent = 'Temp: ' + data.daily[0].temp.day + '°F';
            document.getElementById('wind0').textContent = 'Wind: ' + data.daily[0].wind_speed + ' mph'
            document.getElementById('hum0').textContent = 'Humidity: ' + data.daily[0].humidity + '%'

            icon1.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[1].weather[0].icon + '@2x.png');
            document.getElementById('1').textContent = moment.unix(data.daily[1].dt).format("MM/DD/YYYY")
            document.getElementById('temp1').textContent = 'Temp: ' + data.daily[1].temp.day + '°F';
            document.getElementById('wind1').textContent = 'Wind: ' + data.daily[1].wind_speed + ' mph'
            document.getElementById('hum1').textContent = 'Humidity: ' + data.daily[1].humidity + '%'

            icon2.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[2].weather[0].icon + '@2x.png');
            document.getElementById('2').textContent = moment.unix(data.daily[2].dt).format("MM/DD/YYYY")
            document.getElementById('temp2').textContent = 'Temp: ' + data.daily[2].temp.day + '°F';
            document.getElementById('wind2').textContent = 'Wind: ' + data.daily[2].wind_speed + ' mph'
            document.getElementById('hum2').textContent = 'Humidity: ' + data.daily[2].humidity + '%'

            icon3.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[3].weather[0].icon + '@2x.png');
            document.getElementById('3').textContent = moment.unix(data.daily[3].dt).format("MM/DD/YYYY")
            document.getElementById('temp3').textContent = 'Temp: ' + data.daily[3].temp.day + '°F';
            document.getElementById('wind3').textContent = 'Wind: ' + data.daily[3].wind_speed + ' mph'
            document.getElementById('hum3').textContent = 'Humidity: ' + data.daily[3].humidity + '%'

            icon4.setAttribute("src", 'https://openweathermap.org/img/wn/' + data.daily[4].weather[0].icon + '@2x.png');
            document.getElementById('4').textContent = moment.unix(data.daily[4].dt).format("MM/DD/YYYY")
            document.getElementById('temp4').textContent = 'Temp: ' + data.daily[4].temp.day + '°F';
            document.getElementById('wind4').textContent = 'Wind: ' + data.daily[4].wind_speed + ' mph'
            document.getElementById('hum4').textContent = 'Humidity: ' + data.daily[4].humidity + '%'
        })
        .catch(function (error) {
            console.log("Error", error);
        })


};
//Event listener 
searchBtn.addEventListener('click', getEnteredLocation);

