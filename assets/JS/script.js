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
var historyButton = document.querySelector("#historyButton")
var cityNames;

//EVENT LISTENERS
getSearchHistoryFromLocalStorage();
renderSearchHistoryResults();
button.addEventListener("click", clickInput);
historyButton.addEventListener("click", historyClick)

//LOCAL STORAGE FUNCTIONS
function saveSearchHistoryToLocalStorage(city) {
  //city is the parameter that represents the argument
  if (!cityNames.includes(city)) {
    cityNames.push(city);
  }
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
  cityNameList.innerHTML = "";
  inputValue.value = "";
  for (let index = 0; index < cityNames.length; index++) {
    const city = cityNames[index];
    if (cityNames.length === 6  ) {
      cityNames.shift()
    } 
    var listElementButton = document.createElement("button");
    var listElement = document.createElement("li");
    listElementButton.setAttribute("class" , "historyButton")
    listElementButton.textContent = city;
    cityNameList.appendChild(listElement); //append li to ul 
    listElement.appendChild(listElementButton); //append button to li

    listElementButton.classList.add("listButton")
  }
}

function historyClick(eventObject) {
searchResult = eventObject.target.innerText
getWeatherForecasts(searchResult)
}

function clickInput() {
  if (inputValue.value != null){
   userSearchInput = inputValue.value;
  }
  getWeatherForecasts(userSearchInput)
}

//CURRENT DAY FORECAST

function getWeatherForecasts(searchResult) {
 
  var requestUrlForCurrentDayForecastApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchResult +
    "&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";

  fetch(requestUrlForCurrentDayForecastApi)
    .then(function (response) {
      return response.json(); //Converts response to usable object
    }) //Have another .then setting data to local storage? JSON.stringfy(data)
    //Return data & then render the data in a function? Copy whole function?
    .then(function (data) {
      saveSearchHistoryToLocalStorage(searchResult);
      var nameValue = data.name;
      var tempValue = data.main.temp;
      var humidValue = data.main.humidity;
      var windValue = data.wind.speed;
      var iconCode = data.weather[0].icon;
      const img = document.querySelector("#weatherIcon");
      img.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`
      );

      //TO DO add .catch Window Alert and have text appear that says "invalid city name - please check spelling and try again"

      cityName.innerHTML = nameValue;
      temperature.innerHTML = " Temperature = " + tempValue + " ˚C ";
      humidityValue.innerHTML = " Humidity = " +  humidValue + "%";
      windSpeed.innerHTML = " Wind Speed = " + windValue + " MPH ";

      // 5 EXTENDED DAY FORECAST

      var longitude = data.coord.lon;
      var latitude = data.coord.lat;

      var requestForExtendedForecastData =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=minutely,hourly&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric";

      fetch(requestForExtendedForecastData)
        .then(function (resp) {
          return resp.json();
        })
        .then(function (forecastData) {
          for (let i = 1; i <= 5; i++) {
            var box = document.getElementById(`box${i}`); //template literal - i is the variable that get 1 on each loop. Add variable with concatenating

            var fiveDayTemp = document.createElement("p");
            var fiveDayHumidity = document.createElement("p");
            var fiveDayWindSpeed = document.createElement("p");
            var fiveDayWeatherIcon = document.createElement("img");
            var iconImage = forecastData.daily[i].weather[0].icon;
            var uvValue = forecastData.current.uvi;
            fiveDayTemp.textContent = " Temperature " + forecastData.daily[i].temp.day + " ˚C ";
            fiveDayHumidity.textContent = " Humidity " + forecastData.daily[i].humidity + "˚%";
            fiveDayWeatherIcon.setAttribute(
              "src",
              `https://openweathermap.org/img/wn/${iconImage}@2x.png`
            );
            fiveDayWindSpeed.textContent =
            " Wind Speed " +forecastData.daily[i].wind_speed + " MPH ";
            box.append(
              // This is not correct
              fiveDayTemp,
              fiveDayHumidity,
              fiveDayWindSpeed,
              fiveDayWeatherIcon
            );

            uvIndex.innerHTML = " UV Index = " + uvValue;

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
       
        })
        // .catch(window.alert("Please try again")); 
        // If 404 message is received have window alert 
        // .catch if (err) {
        // return window.alert()
        //}
        getSearchHistoryFromLocalStorage();
        renderSearchHistoryResults();
    })
    // .catch(window.alert("Please try again")); 

  //DATES FOR 5 DAY FORECAST
  $("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

  for (let index = 1; index < 6; index++) {
    // $(`#box${index}`).text(moment().add(index, "days").format("dddd, MMM Do"));
    $("#box" + index).text(moment().add(index, "days").format("dddd, MMM Do"));
    
  }
}
