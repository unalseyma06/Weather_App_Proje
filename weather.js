const form = document.querySelector("section.weather-banner form");
const input = document.querySelector(".weather-container input");
const msg= document.querySelector("span.weather-msg");
const list = document.querySelector(".weather-results ul.weather-cities");

form.addEventListener("submit" , (event) => {
    event.preventDefault();
    getWeatherDataFormApi();
});

const getWeatherDataFormApi = async () => {
    const API_KEY = "a709ba1c986439f8888108f89afc62f1"
    const inputValue = input.value 
    const units = "metric"
    const lang = "tr" ;

const url =  `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&lang=${lang}&units=${units}`;

try {
    const response = await axios(url);
    console.log(response);

    const { main, sys, name, weather, wind } = response.data
    const iconUrl =`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const cityNameSpans = list.querySelectorAll(".weather-city span")
    const cityNameSpansArray = Array.from(cityNameSpans);
    if(cityNameSpansArray.length > 0) {
        const filteredArray = cityNameSpansArray.filter((item) => item.innerText ==name);
        console.log(filteredArray);
        if(filteredArray.length > 0) {
            msg.innerText = `zaten ${name} sehri i.in hava durumunu biliyorsunuz. lütfen başka bir sehir arayın`;
            setTimeout(() => {
                msg.innerText = "";
            }, 5000);
            form.reset();
            return;
        }
    }

    const createdLi = document.createElement("li");
    createdLi.classList.add("weather-city");
    createdLi.innerHTML= `
    <h2 class="weather-city-name">
    <span>${name} </span>
    <sup>${sys.country} </sup>
    </h2>
    <div class="weather-city-temp">
    ${Math.round(main.temp)}
    <sup>C</sup>
    </div>
    <figure>
    <img src= "${iconUrl}" class="weather-city-icon" alt="" />
    <figcaption>${weather[0].description} </figcaption>
    </figure>
    <div class="text-center">
     <span >RÜZGAR ${wind.speed} KbH</span>
     <span >NEM ${main.humidity} % </span>
  
    </div>
   
    `
    list.prepend(createdLi)
} catch (error) {
    console.log(error); 
    msg.innerText = "404 (şehir bulunamadı)"
    setTimeout(() => {
        msg.innerText= ""
    }, 5000)
}
form.reset();

}