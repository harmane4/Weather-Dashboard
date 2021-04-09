//DATES FOR 5 DAY FORECAST 
$("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

$("#day1").text(moment().add(1, 'days').format("dddd, MMM Do"));

$("#day2").text(moment().add(2, 'days').format("dddd, MMM Do"));

$("#day3").text(moment().add(3, 'days').format("dddd, MMM Do"));

$("#day4").text(moment().add(4, 'days').format("dddd, MMM Do"));

$("#day5").text(moment().add(5, 'days').format("dddd, MMM Do"));

var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var cityName = document.querySelector('.cityName')
var temperature = document.querySelector('.temperature')
var humidityValue = document.querySelector('.humidityValue')
var windSpeed = document.querySelector('.windSpeed')

button.addEventListener('click', getCurrentDayForecastApi)

//Function to get API for the current forecast 
function getCurrentDayForecastApi(){
    var requestUrlForCurrentDayForecastApi = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric'
    console.log(requestUrlForCurrentDayForecastApi)

    fetch(requestUrlForCurrentDayForecastApi)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        var nameValue = data['name'];     
        var tempValue = data['main']['temp'];
        var humidValue = data['main']['humidity'];
        var windValue = data['wind']['speed'];

        cityName.innerHTML = nameValue;
        temperature.innerHTML = tempValue;
        humidityValue.innerHTML = humidValue;
        windSpeed.innerHTML = windValue;


    })
}

button.addEventListener('click', getFiveDayForecastApi)
//Function to get API for the 5 day forecast 
function getFiveDayForecastApi(){
    var requestUrlForFiveDayForecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric'
    console.log(requestUrlForFiveDayForecastApi)

    fetch(requestUrlForFiveDayForecastApi)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
    })
}



// */

// var repoList = document.querySelector('ul');
// var fetchButton = document.getElementById('fetch-button');
// var temperatureVal = document.querySelector('.temperature'); 
// var humidityVal = document.querySelector('.humidityValue');
// var city = "London";




// //Function to get API for the current forecast 
// function getCurrentForecastApi(){
//     var requestUrlForCurrentDayForecastApi = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric'
//     console.log(requestUrlForCurrentDayForecastApi)

//     fetch(requestUrlForCurrentDayForecastApi)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         var {temp, humidity} = data.main;
//         //Set DOM elements from API
//         temperatureVal.textContent = temp;
//         humidityVal.textContent = humidity;

//     })

// }
// getCurrentForecastApi()

// //Function to get API for the 5 day forecast 
// function getFiveDayForecastApi() {
//     var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric';
//     console.log(requestURL)

//     fetch(requestURL)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//     console.log(data)
//     console.log(data.list[0].main.temp);
//     console.log(data.list[0].main.humidity)
//     console.log((data.list[0].wind.speed))
//     console.log((data.list[0].wind.speed))
//     for (var i = 0; i < data.length; index+8) {
//         var minTemp = document.createElement('p')
//        minTemp.textContent = data.list[0].main.temp_min
//     }
//     }
//     )}
// getFiveDayForecastApi()

// //SEARCH BUTTON FOR CITY 
// function clickHandler(event) {
//    event.preventDefault()
//    var input = document.getElementById('#city-search').value 
//    city = input 
   
// }



// fetchButton.addEventListener('click', clickHandler);

// //SET CITY TO LOCAL STORAGE 


// //Function to get API for 5 day forecast 
// button.addEventListener("click", getFiveDayForecastApi);

// function getFiveDayForecastApi() {
//     var requestUrlForFiveDayForecastApi =
//     "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric"
//     console.log(requestUrlForFiveDayForecastApi);
  
//     fetch(requestUrlForFiveDayForecastApi)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         console.log(data);
//         //for (var i = 0; i <= 5; i + 8) 
//         //console.log(i)
//       });
// }
   
//DATES FOR 5 DAY FORECAST
$("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

$("#day1").text(moment().add(1, 'days').format("dddd, MMM Do"));

$("#day2").text(moment().add(2, 'days').format("dddd, MMM Do"));

$("#day3").text(moment().add(3, 'days').format("dddd, MMM Do"));

$("#day4").text(moment().add(4, 'days').format("dddd, MMM Do"));

$("#day5").text(moment().add(5, 'days').format("dddd, MMM Do"));

// //SET CITY TO LOCAL STORAGE





// */

// var repoList = document.querySelector('ul');
// var fetchButton = document.getElementById('fetch-button');
// var temperatureVal = document.querySelector('.temperature');
// var humidityVal = document.querySelector('.humidityValue');
// var city = "London";

// var myKey = 'bee9bea7f570ee0519f49aaa8cf31eff'



// //Function to get API for the current forecast
// function getCurrentForecastApi(){
//     var requestUrlForCurrentDayForecastApi = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric'
//     console.log(requestUrlForCurrentDayForecastApi)

//     fetch(requestUrlForCurrentDayForecastApi)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         var {temp, humidity} = data.main;
//         //Set DOM elements from API
//         temperatureVal.textContent = temp;
//         humidityVal.textContent = humidity;

//     })

// }
// getCurrentForecastApi()

// //Function to get API for the 5 day forecast
// function getFiveDayForecastApi() {
//     var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=London&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric';
//     console.log(requestURL)

//     fetch(requestURL)
//     .then(function (response){
//         return response.json();
//     })
//     .then(function (data) {
//     console.log(data)
//     console.log(data.list[0].main.temp);
//     console.log(data.list[0].main.humidity)
//     console.log((data.list[0].wind.speed))
//     console.log((data.list[0].wind.speed))
//     for (var i = 0; i < data.length; index+8) {
//         var minTemp = document.createElement('p')
//        minTemp.textContent = data.list[0].main.temp_min
//     }
//     }
//     )}
// getFiveDayForecastApi()

// //SEARCH BUTTON FOR CITY
// function clickHandler(event) {
//    event.preventDefault()
//    var input = document.getElementById('#city-search').value
//    city = input

// }

// fetchButton.addEventListener('click', clickHandler);


