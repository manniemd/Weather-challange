class Fetch {
  async getCurrent(input) {
    const myKey = "39a9a737b07b4b703e3d1cd1e231eedc";

    //make request to url

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}
//ui starts but can be split
class UI {
    constructor() {
        this.uiContainer = document.getElementById("content");
        this.city;
        this.defaultCity = "London";
    }

    populateUI(data) {
        //de-structure vars

        //add them to inner HTML

        this.uiContainer.innerHTML = `
        
        <div class="card mx-auto mt-5" style="width: 18rem;">
            <div class="card-body justify-content-center">
                <h5 class="card-title">${data.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
                <p class="card-text ">Weather conditions are described as: ${data.weather[0].description}</p>
                
            </div>
        </div>
        
        
        `;
    }

    clearUI() {
        uiContainer.innerHTML = "";
    }

    saveToLS(data) {
        localStorage.setItem("city", JSON.stringify(data));
    }

    getFromLS() {
        if (localStorage.getItem("city" == null)) {
            return this.defaultCity;
        } else {
            this.city = JSON.parse(localStorage.getItem("city"));
        }

        return this.city;
    }

    clearLS() {
        localStorage.clear();
    }
}

//app beggins but can be split maybe.
//inst classes//

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
    const currentVal = search.value;

    ft.getCurrent(currentVal).then((data) => {
        //call a UI method//
        ui.populateUI(data);
        //call saveToLS
        ui.saveToLS(data);
    });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
    const dataSaved = ui.getFromLS();
    ui.populateUI(dataSaved);
});