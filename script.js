
//DATES FOR 5 DAY FORECAST 
$("#currentDay").text(moment().format("dddd, MMM Do YYYY"));
console.log(moment().format("dddd, MMM Do YYYY"));

$("#day1").text(moment().add(1, 'days').format("dddd, MMM Do"));
console.log(moment().add(1, 'days').format("dddd, MMM Do"));

$("#day2").text(moment().add(2, 'days').format("dddd, MMM Do"));
console.log(moment().add(2, 'days').format("dddd, MMM Do"));

$("#day3").text(moment().add(3, 'days').format("dddd, MMM Do"));
console.log(moment().add(3, 'days').format("dddd, MMM Do"));

$("#day4").text(moment().add(4, 'days').format("dddd, MMM Do"));
console.log(moment().add(4, 'days').format("dddd, MMM Do"));

$("#day5").text(moment().add(5, 'days').format("dddd, MMM Do"));
console.log(moment().add(5, 'days').format("dddd, MMM Do"));

var requestURL = api.openweathermap.org/data/2.5/forecast?q={Perth}&appid={API key}

function weatherForecast() {
    fetch(requestURL)
}