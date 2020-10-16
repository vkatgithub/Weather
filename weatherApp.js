let loc = document.getElementById("location");
let tempicon = document.getElementById("tempIcon");
let tempvalue = document.getElementById("tempValue");
let climate = document.getElementById("climate");
const searchbutton = document.getElementById("searchButton");
let iconfile;
const searchinput = document.getElementById("searchInput");

// any location
searchbutton.addEventListener("click",(e) =>{
    e.preventDefault();
    getWeather(searchinput.value);
    searchinput.value = '';
});

const getWeather = async(city) =>
{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cb5827fcdadda1188912281a8e46933f`,
        {mode: 'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id, main} = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like-273);
        if(id<300 && id>200){
            tempicon.src = "./icons/weather/svg/041-thunderstorm.svg";
        }
        else if(id<400 && id>300){
            tempicon.src = "./icons/weather/svg/029-raindrop.svg";
        }
        else if(id<600 && id>500){
            tempicon.src = "./icons/weather/svg/027-rain.svg";
        }
        else if(id<700 && id>600){
            tempicon.src = "./icons/weather/svg/031-snow.svg";
        }
        else if(id<800 && id>700){
            tempicon.src = "./icons/weather/svg/042-tornado.svg";
        }
        else if(id<810 && id>800){
            tempicon.src = "./icons/weather/svg/006-cloudy.svg";
        }
        else if(id == 800){
            tempicon.src = "./icons/weather/svg/036-sun.svg";
        }
    }
    catch(error)
    {
        alert('City Not Found');
    }
};

// Own Location
window.addEventListener("load", () =>{
    let long;
    let lat;
    //const proxy = "https://cors-anywhere.herokuapp.com/";


    if(navigator.geolocation)
       {
        navigator.geolocation.getCurrentPosition((position)=>
        {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const api = `$(proxy)api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb5827fcdadda1188912281a8e46933f`;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=cb5827fcdadda1188912281a8e46933f`;
        {mode: 'cors'};

            fetch(api).then((response) => 
            {
                return response.json();
            })

            .then(data =>
            {
                const{name} = data;
                const{feels_like} = data.main;
                const{id, main} = data.weather[0];
                
                loc.textContent = name;
                climate.textContent = main;
                tempvalue.textContent = Math.round(feels_like-273);
                if(id<300 && id>200){
                    tempicon.src = "./icons/weather/svg/041-thunderstorm.svg";
                }
                else if(id<400 && id>300){
                    tempicon.src = "./icons/weather/svg/029-raindrop.svg";
                }
                else if(id<600 && id>500){
                    tempicon.src = "./icons/weather/svg/027-rain.svg";
                }
                else if(id<700 && id>600){
                    tempicon.src = "./icons/weather/svg/031-snow.svg";
                }
                else if(id<800 && id>700){
                    tempicon.src = "./icons/weather/svg/042-tornado.svg";
                }
                else if(id<810 && id>800){
                    tempicon.src = "./icons/weather/svg/006-cloudy.svg";
                }
                else if(id == 800){
                    tempicon.src = "./icons/weather/svg/036-sun.svg";
                }
                console.log(data);
            });
        }
    );}
});
