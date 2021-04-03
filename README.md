# Weather-Dashboard

[![MIT](https://img.shields.io/badge/license-MIT-green?style=plastic)](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt)

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## How this app works

```
This weather dashboard application was made using html, css, javascript (jQuery), third party API's and moment.js. The third party API used to get data about the weather was One call API and Current Weather Data API from http://openweathermap.org. Incorporated functions are as follows:

* Search bar that saves search history to local storage and adds it to a search history list with a clear button which is clickable and will take you to that previously searched city.

* Current weather of searched city which contains a UV index badge which changes color based on if the UV index is safe, moderate, severe.

* Five day forecast which is 5 cards generated in a for loop which reset with every new search.

* The default city is Philadelphia, in order to show no blank sections when there is no previously searches or local storage is empty. 
```
## Demo

![Demo](Images/demo.gif)

## Links

* Application URL:[Site Link](https://cliffordmorin.github.io/Weather-Dashboard/)

## Questions

 Feel free to reach me at cemorin21@gmail.com with any question regarding this project!

 [![LinkedIn](https://img.shields.io/badge/My%20LinkedIn-Click%20Me!-grey?style=plastic&logo=LinkedIn&labelColor=blue)](https://www.linkedin.com/in/morin-clifford-129888a9/)

 [![GitHub](https://img.shields.io/badge/My%20GitHub-Click%20Me!-blueviolet?style=plastic&logo=GitHub)](https://github.com/CliffordMorin)