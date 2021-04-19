var apiKey = "bc1932a860e4325ff6590d5142f62e5a";
//date
//object moment
var now = moment().format("(L)");

// selectors 
var weatherDay = document.querySelector("#showCurrentWeather")
var weatherInfo = document.querySelector("#weather-container")
var listado = document.querySelector("#listCity");
var title = document.querySelector("#tittle5")
var cardEL = document.querySelector("#allday")
//forecast
var day1 = document.querySelector("#eachday1")

//elements for show weather data
var listdata = document.createElement("div")
var tempS = document.createElement("p");
var humS = document.createElement("p");
var windS = document.createElement("p");
var UVS = document.createElement("p");
//array for list cities
var list = []


var ShowLocal = function () {
    list = JSON.parse(localStorage.getItem("name"))
    if (!list) {
        list = []
    }
    listado.innerHTML = " ";
    for (var i = 0; i < list.length; i++) {
        listcities(list[i])
    }

}


// show the weather info current day

function searchCurrent(city) {
    console.log("searchcurr:", city)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            if (response.ok) {
                console.log(response)
                response.json().then(function (data) {

                    if (list.indexOf(city) === -1) {
                        list.push(city)
                        localStorage.setItem("name", JSON.stringify(list));
                        ShowLocal()

                    }

                   
                    var dateCity = document.createElement("div"); 
                    var image = document.createElement("img")
                    var imageUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

                    image.setAttribute("src", imageUrl)

                    dateCity.innerHTML = city + " " + now;
                    dateCity.appendChild(image)

                   
                    weatherDay.innerHTML = "";
                    
                    weatherDay.classList.add("currentStyle")
                    weatherDay.appendChild(dateCity);


                    
                    weatherInfo.innerHTML = "";
                    listdata.innerHTML = "";

                    
                    searchUV(data.coord.lat, data.coord.lon);

                    

                    tempS.textContent = " Temperature:" + " " + data.main.temp + " " + "ºF";
                    humS.textContent = " Humidity:" + " " + data.main.humidity + " " + "%";
                    windS.textContent = " Wind" + " " + "Speed:" + " " + data.wind.speed + " " + "MPH";

                    
                    weatherInfo.classList = "card"

                    listdata.appendChild(weatherDay)
                    listdata.appendChild(tempS)
                    listdata.appendChild(humS)
                    listdata.appendChild(windS)
                    weatherInfo.appendChild(listdata)
                })
            }
            else {
                alert("Error" + " " + response.statusText)
            }
        }).catch(function (error) {
            alert("Error" + " " + error.statusText)
        })
}



//function UV

function searchUV(lat, lon) {


    fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`)
        .then(function (response) {

            if (response.ok) {
                response.json().then(function (data) {


                    //create the button
                    var buttonUVEL = document.createElement("button");
                    buttonUVEL.classList.add("btn");

                    // passing the value and get the UV data 
                    buttonUVEL.textContent = data.value;

                    //condicional for the conditions are favorable (green), moderate(yellow) or severe(red)
                    if (data.value < 3) {
                        buttonUVEL.classList.add("btn-success");
                    }
                    else if (data.value < 7) {
                        buttonUVEL.classList.add("btn-warning");
                    }
                    else {
                        buttonUVEL.classList.add("btn-danger");
                    }

                    var UVel = document.createElement("div");
                    UVel.innerText = "UV Index:" + " ";
                    UVel.appendChild(buttonUVEL);

                    //display on page the UV data
                    listdata.appendChild(UVel)
                    weatherInfo.appendChild(listdata)
                })
            }
            else {
                alert("Error UV " + " " + response.statusText)
            }

        }).catch(function (error) {
            alert("Error UV" + error.statusText)
        })
}



//function  5 forecast

function searchForecast(city) {
    console.log("serchforecast:", city)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            if (response.ok) {

                response.json().then(function (data) {

                    //create element for the title
                    var titleforecast = document.createElement("h2")
                    //clear the title
                    title.textContent = "";

                    // tittle for 5 days forecast
                    titleforecast.textContent = "5-Day Forecast:"
                    title.appendChild(titleforecast)


                    for (var i = 6; i < 39; i += 8) {

                        //create elements for show the info for each day
                        var div = document.createElement("div")
                        var firstDT = document.createElement("p")
                        var firstDH = document.createElement("p")
                        var imagen1 = document.createElement("img")
                        var time1 = document.createElement("h4")

                        time1.textContent = data.list[i].dt_txt.split(" ")[0];
                        time1.classList = "dateForecast";
                        imagen1.setAttribute("src", "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                        imagen1.classList = " imgDisplay ";
                        firstDT.textContent = " Temp:" + " " + data.list[i].main.temp + " " + "ºF";
                        firstDH.textContent = " Humidity:" + " " + data.list[i].main.humidity + " " + "%";
                        div.classList = 'col-md-2 style  forecast mr-3 ';

                        div.appendChild(time1)
                        div.appendChild(imagen1)
                        div.appendChild(firstDT)
                        div.appendChild(firstDH)
                        cardEL.appendChild(div)

                    }

                })
                //clear the info for the 5 day forescast
                cardEL.innerHTML = "";
            }
            else {
                alert("Error" + " " + response.statusText)
            }

        }).catch(function (error) {

            alert("Error" + " " + error.statusText)
        })
}

// list of cities

var listcities = function (cityIn) {

    var firstC = document.createElement("button")
    firstC.classList = " list-group-item list-group-item-action";

    firstC.textContent = cityIn;
    listado.appendChild(firstC)

}

//listener click for the list button cities

document.getElementById("listCity").addEventListener("click", function (event) {

    //call the fuction from the list button cities
    searchCurrent(event.target.textContent);
    searchForecast(event.target.textContent);
})

// listener onclick button for search

document.getElementById("searchC").addEventListener("click", function (event) {
    event.preventDefault();

    //get the value  for seach
    var cityIn = document.getElementById("city").value;
    document.getElementById("city").value = "";
    //convert the city name
    cityIn = cityIn.toUpperCase();

    //call the list cities


    if (cityIn) {
        //call for current weather day
        searchCurrent(cityIn);

        //call for 5 days forecast
        searchForecast(cityIn);


    }
    else {
        alert("You need in a City name")
    }

})


ShowLocal();