//Global Scope El

//Search El
var searchCity = $('#search-city');
var searchCityBtn = $('#search-city-btn');
var searchHistoryList = $('#search-history');
var clearHistoryBtn = $('#clear-history-btn');

//Current Weather Content El
var currentWeatherContent = $('#current-weather-content');
var currentCity = $('#current-city');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWindSpeed = $('#current-wind-speed');
var currentWeatherIcon = $('#icon')
var uvIndex = $('#uv-index');

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
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"
    
    fetch(currentWeatherURL)
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
            currentWindSpeed.text(data.wind.speed + " MPH");
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

            //UV Index and box/badge coloring
            uvIndex.text(data.current.uvi);

            if (data.current.uvi <= 3) {
                uvIndex.addClass('badge badge-success');
            }

            else if (data.current.uvi >= 4 && data.current.uvi <= 7) {
                uvIndex.removeClass('badge badge-success');
                uvIndex.addClass('badge badge-warning');
            }

            else {
                uvIndex.removeClass('badge badge-success');
                uvIndex.removeClass('badge badge-warning');
                uvIndex.addClass('badge badge-danger');
            }
            //Create Cards
            for (let i = 1; i < data.daily.length; i++) {

                var forecastDateString = moment(data.daily[i].dt_txt).format('L');
                console.log(forecastDateString);

                //Five Day Forecast El
                var fiveDayForecast = $('#five-day-forecast');
                var forecastCol = $("<div class='col-12 col-md-6 col-lg forecast-day mb-3'>");
                var forecastCard = $("<div class='card text-white bg-primary'>");
                var forecastCardBody = $("<div class='card-body'>");

                var forecastDate = $("<h5 class='card-title'>");
                var forecastIcon = $("<img>");
                var forecastTemp = $("<p class='card-text mb-0'>");
                var forecastHumidity = $("<p class='card-text mb-0'>");

                fiveDayForecast.append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                forecastDate.text(forecastDateString);
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
                forecastTemp.text("Temperature: " + data.daily[i].temp.day + String.fromCharCode(8457));
                forecastHumidity.text("Humidity: " + data.daily[i].humidity + "%");
            }

        })
}

//On click of the search btn take the value and send the input to currentWeather function
searchCityBtn.on('click', function (event) {
    event.preventDefault();
    
    var input = searchCity.val()
    console.log(input); 
    currentWeather(input);
})

});