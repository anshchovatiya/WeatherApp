// city name that entered in search bar and form
let cityName = document.getElementById("city_name");
let form = document.getElementById("form");



// this will formate time and return time 

function convertToTime(time) {

    let hour = time.getHours();
    let minutes = time.getMinutes();
    if (hour < 10) { hour = "0" + hour }
    if(minutes < 10) { minutes = "0" + minutes };
    let string = `${hour}:${minutes}`
    return string;
}



// openweather api link with key https://api.openweathermap.org/data/2.5/weather?q=surat&appid=5de6e6e1ecb58b89dda409772caf2ea2

// weather api link with api key https://api.weatherapi.com/v1/current.json?key=62f0431db4624002a23125651241307&q=${cityName}&aqi=no

// this is a function that will fetch api data
async function fetchApiData(cityName) {
    try {
        let link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5de6e6e1ecb58b89dda409772caf2ea2`
        let weatherApi = await fetch(link);
        let data = await weatherApi.json();

        let { dt, main, name, sys, weather, wind } = data;

        // this convert country code to full name of country
        let region = new Intl.DisplayNames(['en'], { type: 'region' }).of(sys.country);
        document.querySelector(".city_name").innerHTML = `${name},${region}`;
        // this changes date based on international time zones
        let date = new Date(dt * 1000);
        document.querySelector(".current_time").innerHTML = date.toLocaleString();
        // this will give description of the current weather
        document.querySelector(".weather_status").innerHTML = weather[0].main;
        let temprature = main.temp - 273.15;
        // this will give temprature
        document.querySelector(".temprature").innerHTML = `${Math.round(temprature)}&deg;`;
        document.querySelector(".weather_icon").innerHTML = `<img src ="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weathericon" class="m-auto">`
        let sunrise = new Date(sys.sunrise * 1000);
        let time = convertToTime(sunrise);
        document.querySelector(".min_temprature").innerHTML = `Sunrise : ${time}`;
        let sunset = new Date(sys.sunset*1000);
        time = convertToTime(sunset);
        document.querySelector(".max_temprature").innerHTML = `Sunset : ${time}`;

       temprature = main.feels_like - 273.15;
        document.getElementById("FeelsLike").innerHTML = `${temprature.toFixed(2)}&deg;`;
        document.getElementById("Humidity").innerHTML = `${main.humidity}&percnt;`;
        document.getElementById("windSpeed").innerHTML = `${wind.speed} m&#x2f;s`;
        document.getElementById("pressure").innerHTML = `${main.pressure} mb`;

    } catch (error) {
        document.querySelector(".city_name").innerHTML = `Info not available`;
    }
}

fetchApiData("surat");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchApiData(cityName.value);
    cityName.value = "";
})




















// // this is a function that will fetch api data
// async function fetchApiData(cityName){
//     try {
//         let link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5de6e6e1ecb58b89dda409772caf2ea2`
//         let weatherApi = await fetch(link);
//         let data = await weatherApi.json();
//         console.log(data);
//         let {current,location} = data;
//         let {name,region,country} = location;
//         let {condition,humidity,feelslike_c,pressure_mb,last_updated,temp_c,heatindex_c,windchill_c} = current;

//         console.log(name);
//         document.querySelector(".city_name").innerHTML = `${name},${region},${country}`;
//         let date = new Date();
//         document.querySelector(".current_time").innerHTML = date.toLocaleString();
//         document.querySelector(".weather_status").innerHTML = condition.text;
//         document.querySelector(".temprature").innerHTML = `${temp_c}&deg;`;





//     } catch (error) {
//         document.querySelector(".city_name").innerHTML = `Info not available`;
//         // console.log(error);
//     }
// }
