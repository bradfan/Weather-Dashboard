//  key into the server
 var  api_key = "9c0a561e074040a45ea42e9938799e26";
 var currentDay = moment().format("MMMM Do YYYY")
//  first element return for ("#id's")
 var btns = document.querySelector("#city-btns");
 var form = document.querySelector("#weather-form");
 var city;
 console.log("city1:",city);

 // user click listen,element <form> need <input> on HTML
 form.addEventListener("submit", function(e){
   e.preventDefault();
    city = document.querySelector("#city").value;
    console.log("city2: ", city)
   
   getWeather(city)
 })
// local storage for user input
var cities = localStorage.getItem("cities")
if(cities){
  cities = JSON.parse(cities);
} else{
  cities = []
}
// keeps the list from repopulating city names that have already been chosen. typed out from Tucker's demo. need to define weather and name.

function renderCityBtns(){
  // innerHTML allows reading everything within a given DOM element aka <HTML tag>
  btns.innerHTML = "";
  cities.forEach(function(city){
  // need a btn to display storage
  var cityBtn = document.createElement("button");
  // set its text to be the city name (user input)
  cityBtn.textContent = city;
  // append the btn to the city-btn div create <div id = "city-btn"> ,display storage
  btns.append(cityBtn);
  });
}

// takes in a city name and retrieves weather data for that city
function getWeather(city){
  // takes in the city and returns current weather data
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`;
   // fetch data from current weather
fetch(currentWeatherUrl)
  .then((data) => data.json())
  .then(function (weather) {
    console.log("weather: ", weather);
    // if that city was not found, alert user
    if(weather.cod === 404){
      // display message to user
      alert("City not found");
      return
    }
    
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    
    var containerEl = document.getElementById("containerEl");
// smaller container (smallContainer) within larger container (container.)For each loop will duplacate boxes within larger container.
    // create the small conatiner
    var smallContainer = document.createElement("div");
    //added html to the small container
    var cityName = document.createElement("p");
    cityName.innerHTML = "Location: "+city;
    smallContainer.append(cityName);
    var currentDay = moment().format("MMMM Do YYYY");
    var currentDayArea = document.createElement("p");
    currentDayArea.innerHTML = "Today's Date: "+currentDay;
    smallContainer.append(currentDayArea);

     var tempData = document.createElement("p");
     tempData.innerHTML = "Temperature: "+ weather.main.temp + " F";
     smallContainer.append(tempData);
     var humidity = document.createElement("p");
     humidity.innerHTML = "Humidity: "+ weather.main.humidity +" %";
     smallContainer.append(humidity);
     var wind = document.createElement("p");
     wind.innerHTML = "Wind Speed: "+ weather.wind.speed +" mph";
     smallContainer.append(wind);
    //appned small conatiner to big container
    containerEl.append(smallContainer)
    
    
    if(!cities.includes(weather.name)){
      cities.push(weather.name);
      localStorage.setItem("cities", JSON.stringify(cities));
      renderCityBtns();
    }
    // send additonal api call with the latitude and longitude for our city
    var onecallURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${api_key}`;
    // send fetch request to get latitude and longitude
    fetch(onecallURL)
      .then((data) => data.json())
      .then(function (oneCallData) {
        console.log("oCD:", oneCallData);
        console.log("oCDvalue:", oneCallData.value);
         var uvIndex = document.createElement("p");
        uvIndex.innerHTML = "UV Index: "+ oneCallData.value;
        containerEl.append(uvIndex);

        $("littleBox").each(function addUvColor(){
        if (paresInt(oneCallData.value) < 3) {
          $(this). addClass("low");
        } else if (parseInt(oneCallData.value) > 3 && (parseInt(oneCallData.value) < 6)) { 
          $(this). addClass("moderate");
          } else $(this). addClass("high");
        })
      });
  });

}


//  getWeather(city);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
// UV ratings low < 2, moderate 3-5, high > 6
