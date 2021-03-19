//Global Scope El

//Search El
var searchCity = $('#search-city');
var searchCityBtn = $('#search-city-btn');
var searchHistoryList = $('#search-history');
var clearHistoryBtn = $('#clear-history-btn');
var cityHistoryBtn = $('#city-btn');

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

//city list array for search history
var cityList = [];

//Document Ready

$(document).ready(function () {

    // Find current date and display in title
var currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")");

//check if search history exists when page loads
getHistory();


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
            currentCity.text(data.name + " ");
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

            //UV Index
            uvIndex.text(data.current.uvi);

            //Changes UV badge color based on UV Index number
            if (data.current.uvi <= 4) {
                uvIndex.addClass('badge badge-success');
            }

            else if (data.current.uvi > 4 && data.current.uvi <= 7) {
                uvIndex.removeClass('badge badge-success');
                uvIndex.addClass('badge badge-warning');
            }

            else {
                uvIndex.removeClass('badge badge-success');
                uvIndex.removeClass('badge badge-warning');
                uvIndex.addClass('badge badge-danger');
            }

            $('#five-day-forecast').empty();
            //Create Cards
            for (let i = 1; i < data.daily.length; i++) {

                //Date for each card 
                var date = new Date(data.daily[i].dt * 1000);  //take the dt and convert it from milliseconds to a readable date info 
                console.log(date);
                var formatDate = moment(date).format('L'); //format the date to month/day/year 
                console.log(formatDate);
                var forecastDateString = formatDate
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

                //create each card
                fiveDayForecast.append(forecastCol);
                forecastCol.append(forecastCard);
                forecastCard.append(forecastCardBody);

                forecastCardBody.append(forecastDate);
                forecastCardBody.append(forecastIcon);
                forecastCardBody.append(forecastTemp);
                forecastCardBody.append(forecastHumidity);

                //add info to each card
                forecastDate.text(forecastDateString);
                forecastIcon.attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
                forecastTemp.text("Temp: " + data.daily[i].temp.day + String.fromCharCode(8457));
                forecastHumidity.text("Humidity: " + data.daily[i].humidity + "%");

                // If there are 5 cards on page then stop loop
                if (i === 5)
                    break;
                
            }

        });
}

//On click of the search btn take the value and send the input to currentWeather, searchHistory and clear the input field.
searchCityBtn.on('click', function () {
    // e.preventDefault(); //don't need this, it prevents the search page from going to index.html
    
    //grabs value entered in search bar
    var input = searchCity.val().trim()
    console.log(input); 

    currentWeather(input);
    searchHistory(input);
    searchCity.val("");
    // window.location.href = './index.html'
});

//on hit of enter key take the value and send the input to currentWeather, searchHistory and clear the input field.
//grab id from form
$('#form-search').on('submit', function () {
    // e.preventDefault(); //don't need this, it prevents the search page from going to index.html
    
    //grabs value entered in search bar
    var input = searchCity.val().trim()
    console.log(input); 

    currentWeather(input);
    searchHistory(input);
    searchCity.val("");
    // window.location.href = './index.html'
});

//Search history 
function searchHistory(input) {

    // console.log(input);
    
    //if there is input in the search bar
    if(input){

        //put value of input into cityList array
        //if it is a new input
        if(cityList.indexOf(input) === -1){
            cityList.push(input)

            //run this function to list all the cities in the local storage/ history
            listArray();
        }
        //if not a new input
        else {
            //then remove the existing input from the array
            var removeIndex = cityList.indexOf(input);
            cityList.splice(removeIndex, 1);

            //push the input to the array
            cityList.push(input);

            //run this function to list all the cities in the local storage/ history so
            //the old entry is at the top of the search history list
            listArray();
        }
    }
}

function listArray() {

    searchHistoryList.empty();

    cityList.forEach(function(city){
        var searchHistoryItem = $('<li type="button" class="list-group-item btn btn-warning btn-sm" id="city-btn">');
        searchHistoryItem.attr("data-value", city);
        searchHistoryItem.text(city);
        searchHistoryList.prepend(searchHistoryItem);
        //click history item to take you to that search
        searchHistoryItem.on('click', function () {
            var input = searchHistoryItem.text()
            console.log(input); 
        
            currentWeather(input);
            searchHistory(input);
        });
    });
     //save input to local storage
     localStorage.setItem("cities",JSON.stringify(cityList));

    //  var storageItem = JSON.parse(localStorage.getItem("input"));
    //  console.log(storageItem)
}

function getHistory() {
    if (localStorage.getItem("cities")) {
        cityList = JSON.parse(localStorage.getItem("cities"));
        var lastIndex = cityList.length - 1;
        
        listArray();

        if (cityList.length !== 0) {
            currentWeather(cityList[lastIndex]);
        }

        else {
            //if there is no history make default city Philadelphia
            currentWeather("Philadelphia");
        }
    }
}

clearHistoryBtn.on("click", function () {
    localStorage.clear();
    cityList = [];
    listArray();
    // searchHistoryList.remove().children();
});

});