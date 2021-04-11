//VARIABLES FOR CURRENT DAY FORECAST
var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var cityName = document.querySelector('.cityName')
var temperature = document.querySelector('.temperature')
var humidityValue = document.querySelector('.humidityValue')
var windSpeed = document.querySelector('.windSpeed')
var UvIndex = document.getElementById("UV-index")
var fiveDayForecast = document.getElementById("weekForecast")


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
        var nameValue = data.name;     
        var tempValue = data.main.temp;
        var humidValue = data.main.humidity;
        var windValue = data.wind.speed;

        cityName.innerHTML = nameValue;
        temperature.innerHTML = tempValue +' ˚C ';
        humidityValue.innerHTML = humidValue +'˚%';
        windSpeed.innerHTML = windValue + ' MPH ';



        
        // //UV REQUEST
        // //need a variable for latitude 
        // //need a variable for latitude 
        var APIKey = 'bee9bea7f570ee0519f49aaa8cf31eff';
        var requestForCurrentUvData = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        console.log(requestForCurrentUvData)
    
        fetch(requestForCurrentUvData)
        .then (function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            //not working 
    })
})
}

//Function to get API for the 5 day forecast 

button.addEventListener('click', getFiveDayForecastApi)

function getFiveDayForecastApi(){
    var requestUrlForFiveDayForecastApi = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=bee9bea7f570ee0519f49aaa8cf31eff&units=metric'
    console.log(requestUrlForFiveDayForecastApi)

    fetch(requestUrlForFiveDayForecastApi)
    .then(function (response){
        return response.json();
    })
    .then(function (fiveDayData) {
        console.log(fiveDayData);
        console.log(fiveDayData.list[0]);
        console.log(fiveDayData.list[1]);
        console.log(fiveDayData.list[2]);
        console.log(fiveDayData.list[3]);
        console.log(fiveDayData.list[4]);

   

        for (let i = 0; i <= 5; i++) {
            console.log(i)
            
            var fiveDayTemp = document.createElement('p')
            var fiveDayHumidity = document.createElement('p')
            var fiveDayWindSpeed = document.createElement('p')
            fiveDayTemp.textContent = fiveDayData.list[i].main.temp +' ˚C ';
            fiveDayHumidity.textContent = fiveDayData.list[i].main.humidity +'˚%';
            fiveDayWindSpeed.textContent = fiveDayData.list[i].wind.speed + ' MPH ';
            fiveDayForecast.append(fiveDayTemp, fiveDayHumidity, fiveDayWindSpeed)
        }
        
        
    })

    // for (let i = 1; i <= 6; i++) {
    //     console.log(i)
    //     var fiveDayTemp = document.createElement('p')
    //     var fiveDayHumidity = document.createElement('p')
    //     var fiveDayWindSpeed = document.createElement('p')
    //     fiveDayTemp.textContent = 
    //     fiveDayHumidity.textContent = 
    //     fiveDayWindSpeed.textContent = `Wind Speed: ${data.list[i].wind.speed}MPH`

}


// //SET CITY TO LOCAL STORAGE 
//What ever the value of text input is needs to be saved to local storage 
//Key = city name & value = valueName

// Create list of items added to search

   
//DATES FOR 5 DAY FORECAST
$("#currentDay").text(moment().format("dddd, MMM Do YYYY"));

$("#day1").text(moment().add(1, 'days').format("dddd, MMM Do"));

$("#day2").text(moment().add(2, 'days').format("dddd, MMM Do"));

$("#day3").text(moment().add(3, 'days').format("dddd, MMM Do"));

$("#day4").text(moment().add(4, 'days').format("dddd, MMM Do"));

$("#day5").text(moment().add(5, 'days').format("dddd, MMM Do"));

// //SET CITY TO LOCAL STORAGE
//localStorage.setItem(inputValue, value);




