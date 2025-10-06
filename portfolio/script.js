const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const themeBtn = document.getElementById("theme-toggle");

// ✅ Use wttr.in API (no API key needed)
async function getWeather(city) {
  try {
    const url = `https://wttr.in/${city}?format=j1`;
    const response = await fetch(url);

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();
    const current = data.current_condition[0];

    cityName.textContent = city;
    temperature.textContent = `🌡️ Temperature: ${current.temp_C}°C`;
    description.textContent = `☁️ Condition: ${current.weatherDesc[0].value}`;
    humidity.textContent = `💧 Humidity: ${current.humidity}%`;
    wind.textContent = `💨 Wind Speed: ${current.windspeedKmph} km/h`;

    weatherInfo.classList.remove("hidden");
  } catch (error) {
    alert("Error fetching weather data!");
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = "";
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
