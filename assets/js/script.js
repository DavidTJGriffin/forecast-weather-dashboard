var searchBtn = document.getElementById('search');
var searchInput = document.getElementById('cityName');
var apiKey = '3075735f44cc723c6a4ccc3fa4f7a600'
var lon; //declaring 
var lat;

//Function 
function getLocation(){
    console.log("Searching weather for ...", searchInput.value); 
    var apiURL ="http://api.openweathermap.org/geo/1.0/direct?q="+ searchInput.value + "&limit=1&appid=" + apiKey; 
    console.log(apiURL); 
    //Fetch data from the API 
    fetch(apiURL)
    .then( function(res) {
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
    .catch(function(error){
        console.log("Error", error); 
    })
}

function getWeather () {
    var apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
    console.log(apiURL); 
    //Fetch data from the API 
    fetch(apiURL)
    .then( function(res) {
        //console.log(res); 
        return res.json(); //return response as a  JSON object 
    }).then(function (data) {
        console.log("One call Response", data);

    })
    .catch(function(error){
        console.log("Error", error); 
    })
};
//Event listener 
searchBtn.addEventListener('click', getLocation); 

