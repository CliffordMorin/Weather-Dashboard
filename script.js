//Global Scope El

//Search El
var searchCity = $('#search-city');
var searchCityBtn = $('#search-city-btn');
var searchHistoryList = $('#search-history');
var clearHistoryBtn = $('#clear-history-btn');

//Weather Content El
var currentWeatherContent = $('#current-weather-content');
var currentCity = $('#current-city');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind-speed');
var currentWeatherIcon = $('#icon')
var uvIndex = $('#uv-index');

var fiveDayForecast = $('#five-day-forecast');

// My Key to Get access to the OpenWeather API 
var apiKey = "629c5fc75bc1a656af7ff2d9281035d7";

//Document 

$(document).ready(function () {

    // Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

function currentWeather(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"
    
    fetch(url)
     .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
          return response.json();
     })
     .then(function (data){
        console.log(data);
        fiveDayForecast(data.coord.lat, data.coord.lon);
        currentCity.text(data.name);
        currentTemp.text(data.main.temp);
        currentHumidity.text(data.main.humidity + "%");
        currentWindSpeed.text(data.wind.speed + "mph");
        currentWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
     })
}

function fiveDayForecast(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
    
    fetch(url)

    .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
          return response.json();
     })
     .then(function (data){
         console.log(data);
     })
}

searchCityBtn.on('click', function () {
    var input = searchCity.val()
    console.log(input); 
    currentWeather(input);
})

});