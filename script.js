//  key into the server
 var  api_key = "9c0a561e074040a45ea42e9938799e26";
//  first element return for ("#id's")
 var btns = document.querySelector("#city-btns");
 var form = document.querySelector("#weather-form");
 var city = document.querySelector("#city-input").value;
//  currently in GV and getWeather function
 var currentWeatherURL = `http://api.openweathermap.org/data/2,5/weather?q=${city}&appid=${api_key}`;


 
 // user click listen,element <form> need <input> on HTML
 form.addEventListener("submit", function(e){
   e.preventDefault();
   console.log(city);
   console.log(weatherURL);
 })
// local storage for user input
var cities = localStorage.getItem("cities")
if(cities){
  cities = JSON.parse(cities);
} else{
  cities = []
}
// keeps the list from repopulating city names that have already been chosen. typed out from Tucker's demo. need to define weather and name.
// if(!cities.includes(weather.name)){
//   cities.push(weather.name);
//   localStorage.setItem("cities", JSON.stringify(cities));
//   renderCityBtns();
// }
function renderCityBtns(){
  // innerHTML allows reading everything within a given DOM element aka <HTML tag>
  btns.innerHTML = "";
  cities.forEach(function(city){
  // need a btn to display storage
  var newBtn = document.createElement("button");
  // set its text to be the city name (user input)
  newBtn.textContent = city;
  // append the btn to the city-btn div create <div id = "city-btn"> ,display storage
  btns.append(newBtn);
  });
}

// takes in a city name and retrieves weather data for that city
function getWeather(city){
  // takes in the city and returns current weather data
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  // send fetch request to get latitude and longitude
fetch(currentWeatherUrl)
  .then((data) => data.json())
  .then(function (weather) {
    console.log(weather);
    // if that city was not found, alert user
    if(weather.cod === 404){
      // display message to user
      alert("City not found");
      return
    }
    // will need for UV info - ?onecall?
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;

    // send additonal api call with the latitude and longitude for our city
    var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(onecallURL)
      .then((data) => data.json())
      .then(function (oneCallData) {
        //   oneCallData has all the information that we need
        console.log(oneCallData);
      });
  });

}
console.log("hello")
 getWeather("Tucson");

