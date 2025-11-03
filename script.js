
 
const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p:nth-child(1)");
const dateField = document.querySelector(".time_location p:nth-child(2)");
const weatherField = document.querySelector(".condition p:nth-child(2)");
const searchField = document.querySelector(".search_area");
const searchbutton = document.querySelector("button");

const weatherIcon = document.querySelector(".weather_icon"); // the <img> in your HTML
const loader = document.querySelector(".loader"); // the loader div

const API_KEY = WEATHER_API_KEY;

//  Load last searched city from localStorage OR use default
let target = localStorage.getItem("lastCity") || "Chennai";

//  Reusable alert function (setTimeout added)
const showAlert = (msg) => {
    alert(msg);
    setTimeout(() => console.log("Alert closed"), 1000);
};

// Show / hide loader
const showLoader = () => loader.style.display = "block";
const hideLoader = () => loader.style.display = "none";

const fetchResults = async (targetLocation = "Chennai") => {
    try {
        // ✅ Template literal

        showLoader();
        let url = `https://api.weatherapi.com/v1/current.json?key=e5c231bb75d74675b7d155715251010&q=${targetLocation}&aqi=no`;

        const res = await fetch(url);
        const data = await res.json();


        hideLoader();

        //  Error handling
        if (data.error) {
            showAlert("City not found! Try again ❌");
            return;
        }

        //  ES6 destructuring
        const { name, localtime } = data.location;
        const { temp_c, condition } = data.current;

        //  Update UI
        temperatureField.textContent = `${temp_c}°C`;
        locationField.textContent = name;
        dateField.textContent = localtime;
        weatherField.textContent = condition.text;

         //  Update weather icon
        weatherIcon.src = `https:${condition.icon}`;
        weatherIcon.style.display = "block";
        weatherIcon.alt = condition.text;

        //  Save last searched city
        localStorage.setItem("lastCity", name);

    } catch (error) {
        showAlert("Something went wrong! Try again ⚠️");
        console.error(error);
    }
};

//  Arrow function event listener
searchbutton.addEventListener("click", (e) => {
    e.preventDefault();
    let city = searchField.value.trim();

    if (!city) {
        showAlert("Please enter a city name 🏙️");
        return;
    }

    fetchResults(city);
});
// Load default / last searched city

fetchResults(target);

