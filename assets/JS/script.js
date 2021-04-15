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
var cityNameList = document.querySelector(".city-list");
var cityNames;

//EVENT LISTENERS
getSearchHistoryFromLocalStorage();
renderSearchHistoryResults();
button.addEventListener("click", getWeatherForecasts);

//LOCAL STORAGE FUNCTIONS
// TO DO 5. When the city name is clicked on -- (event listener?) the data appears from local storage

function saveSearchHistoryToLocalStorage(city) {
  //city is the parameter that represents the argument
  cityNames.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(cityNames));
}

function getSearchHistoryFromLocalStorage() {
  var citySearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
  if (!citySearchHistory) {
    // checking to see if anything exsists in local storage
    cityNames = [];
  } else {
    cityNames = citySearchHistory;
  }
}

function renderSearchHistoryResults() {
  for (let index = 0; index < cityNames.length; index++) {
    const city = cityNames[index];
    var listElement = document.createElement("li");
    listElement.textContent = city;
    cityNameList.appendChild(listElement);
  }
}

//CURRENT DAY FORECAST

function getWeatherForecasts() {
  var requestUrlForCurrentDayForecastApi =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";

  fetch(requestUrlForCurrentDayForecastApi)
    .then(function (response) {
      return response.json(); //Converts response to usable object
    }) //Have another .then setting data to local storage? JSON.stringfy(data)
    //Return data & then render the data in a function? Copy whole function?
    .then(function (data) {
      saveSearchHistoryToLocalStorage(inputValue.value);
      var nameValue = data.name;
      var tempValue = data.main.temp;
      var humidValue = data.main.humidity;
      var windValue = data.wind.speed;
      var iconCode = data.weather[0].icon;
      const img = document.querySelector("#weatherIcon");
      img.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${iconCode}@2x.png`
      );

      //TO DO add .catch Window Alert and have text appear that says "invalid city name - please check spelling and try again"

      cityName.innerHTML = nameValue;
      temperature.innerHTML = tempValue + " ˚C ";
      humidityValue.innerHTML = humidValue + "%";
      windSpeed.innerHTML = windValue + " MPH ";

      // 5 EXTENDED DAY FORECAST

      var longitude = data.coord.lon;
      var latitude = data.coord.lat;

      var requestForExtendedForecastData =
        "http://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=minutely,hourly&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";

      fetch(requestForExtendedForecastData)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (forecastData) {
          for (let i = 1; i <= 6; i++) {
            let box = document.getElementById(`box${i}`); //template literal - i is the variable that get 1 on each loop. Add variable with concatenating

            var fiveDayTemp = document.createElement("p");
            var fiveDayHumidity = document.createElement("p");
            var fiveDayWindSpeed = document.createElement("p");
            var fiveDayWeatherIcon = document.createElement("img");
            var iconImage = forecastData.daily[i].weather[0].icon;
            var uvValue = forecastData.current.uvi;
            fiveDayTemp.textContent = forecastData.daily[i].temp.day + " ˚C ";
            fiveDayHumidity.textContent = forecastData.daily[i].humidity + "˚%";
            fiveDayWeatherIcon.setAttribute(
              "src",
              `http://openweathermap.org/img/wn/${iconImage}@2x.png`
            );
            fiveDayWindSpeed.textContent =
              forecastData.daily[i].wind_speed + " MPH ";
            box.append(
              // This is not correct
              fiveDayTemp,
              fiveDayHumidity,
              fiveDayWindSpeed,
              fiveDayWeatherIcon
            );

            uvIndex.innerHTML = uvValue;

            //BACKGROUND COLOUR OF UV INDEX WILL CHANGE DEPENDING ON CONDITIONS
            if (uvValue < 3) {
              document.getElementById("UV-index").style.backgroundColor =
                "green";
            }
            if (uvValue >= 3 && uvValue < 8) {
              document.getElementById("UV-index").style.backgroundColor =
                "orange";
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
