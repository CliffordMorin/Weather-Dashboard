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


//Document Ready

$(document).ready(function () {

    // Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

//Current Weather API fetch function
function currentWeather(city) {
    //set url variable to url string
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"
    
    fetch(url)
     //if the response in not ok then throw back and rerun. If data is ok then return response.
     .then(function (response){
        if (!response.ok) {
            throw response.json();
          }
          return response.json();
     })
     .then(function (data){
        console.log(data);
        //sends latitude and longitude data to five day forecast function
        fiveDayForecast(data.coord.lat, data.coord.lon);
        //change text to respective data call
        currentCity.text(data.name);
        currentTemp.text(data.main.temp);
        currentHumidity.text(data.main.humidity + "%");
        currentWindSpeed.text(data.wind.speed + "mph");
        //changes img to the icon from open weather map data
        currentWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
     })
}

//Five Day forecast API fetch function
function fiveDayForecast(lat, lon) {
    //set url variable to url string
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

//On click of the search btn take the value and send the input to currentWeather function
searchCityBtn.on('click', function () {
    var input = searchCity.val()
    console.log(input); 
    currentWeather(input);
})

});