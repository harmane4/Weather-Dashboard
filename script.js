//SELECTORS
var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var cityName = document.querySelector(".cityName");
var temperature = document.querySelector(".temperature");
var humidityValue = document.querySelector(".humidityValue");
var windSpeed = document.querySelector(".windSpeed");
var uvIndex = document.getElementById("UV-index");
var fiveDayForecast = document.getElementById("weekForecast");
var currentWeatherIcon = document.getElementById("weatherIcon");
var cityNameList = document.querySelector(".city-list")


button.addEventListener('click', addSearchResult); 
document.addEventListener('DOMContentLoaded', getSearchResult)


function addSearchResult(event) {
    event.preventDefault();
    var searchResultDiv = document.createElement("div"); 
    searchResultDiv.classList.add("cityName");

    var newSearchResult = document.createElement('li'); 
    newSearchResult.innerText = inputValue.value; 
    newSearchResult.classList.add('cityName-item');
    searchResultDiv.appendChild(newSearchResult);
    //add cityName to local storage 
    saveSearchResult(inputValue.value);


    cityNameList.appendChild(searchResultDiv);
}

function saveSearchResult(searchResult) {
    let citySearchResult; 
    if (localStorage.getItem("cityNames")=== null) {
        citySearchResult = [];
    } else {
        citySearchResult = JSON.parse(localStorage.getItem("cityNames"));
    }
    citySearchResult.push(searchResult); 
    localStorage.setItem("cityNames", JSON.stringify(citySearchResult)); 
}

function getSearchResult() {
    let citySearchResult; 
    if (localStorage.getItem("cityNames")=== null) {
        citySearchResult = [];
    } else {
        citySearchResult = JSON.parse(localStorage.getItem('cityNames'));
    }
citySearchResult.forEach(function(citySearch) {

    var citySearchDiv = document.createElement("div"); 
    citySearchDiv.classList.add("cityName");

    var newCitySearch = document.createElement('li'); 
    newCitySearch.innerText = citySearch; 
    newCitySearch.classList.add('cityName-item');
    citySearchDiv.appendChild(newCitySearch);
  


    cityNameList.appendChild(citySearchDiv);
});
} 



button.addEventListener("click", getWeatherForecasts);

//Current  day forecast
function getWeatherForecasts() {
  var requestUrlForCurrentDayForecastApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";
  console.log(requestUrlForCurrentDayForecastApi);

  fetch(requestUrlForCurrentDayForecastApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var nameValue = data.name;
      var tempValue = data.main.temp;
      var humidValue = data.main.humidity;
      var windValue = data.wind.speed;
      var iconCode = data.weather[0].icon;
      const img = document.querySelector('#weatherIcon');
      img.setAttribute('src', `http://openweathermap.org/img/wn/${iconCode}@2x.png`)

      cityName.innerHTML = nameValue;
      temperature.innerHTML = tempValue + " ˚C ";
      humidityValue.innerHTML = humidValue + "%";
      windSpeed.innerHTML = windValue + " MPH ";

      // //REQUEST FOR 5 EXTENDED DAY FORECAST
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;

      var requestForExtendedForecastData =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=minutely,hourly&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";
      console.log(requestForExtendedForecastData);

      fetch(requestForExtendedForecastData)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (forecastData) {
  
          for (let i = 1; i <= 6; i++) {
            let day = document.getElementById(`day${i}`)

            var fiveDayTemp = document.createElement("p");
            var fiveDayHumidity = document.createElement("p");
            var fiveDayWindSpeed = document.createElement("p");
            var fiveDayWeatherIcon = document.createElement("img")
            var iconImage = forecastData.daily[i].weather[0].icon
            var uvValue = forecastData.current.uvi;
            fiveDayTemp.textContent = forecastData.daily[i].temp.day + " ˚C ";
            fiveDayHumidity.textContent = forecastData.daily[i].humidity + "˚%";
            fiveDayWeatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${iconImage}@2x.png`)
            fiveDayWindSpeed.textContent =
              forecastData.daily[i].wind_speed + " MPH ";
              day.append(
              fiveDayTemp,
              fiveDayHumidity,
              fiveDayWindSpeed,
              fiveDayWeatherIcon
            );

            uvIndex.innerHTML = uvValue;
           
                //BACKGROUND COLOUR OF UV INDEX WILL CHANGE DEPENDING ON CONDITIONS 
            if (uvValue < 3) {
                document.getElementById("UV-index").style.backgroundColor = "green";
            }
            if (uvValue >= 3 && uvValue < 8) {
                document.getElementById("UV-index").style.backgroundColor = "orange"; 
            }
            if (uvValue >= 7) {
                document.getElementById("UV-index").style.backgroundColor = "red";
            }
            
    
          }
        });
    });

   


    

  //DATES FOR 5 DAY FORECAST
  $("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

  $("#day1").text(moment().add(1, "days").format("dddd, MMM Do"));

  $("#day2").text(moment().add(2, "days").format("dddd, MMM Do"));

  $("#day3").text(moment().add(3, "days").format("dddd, MMM Do"));

  $("#day4").text(moment().add(4, "days").format("dddd, MMM Do"));

  $("#day5").text(moment().add(5, "days").format("dddd, MMM Do"));

 
}
