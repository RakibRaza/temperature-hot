document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault();
  let city = document.getElementById("city");
  if (city.value) {
    getWeather(city.value);
    city.value = "";
  }
});
// load
window.addEventListener("DOMContentLoaded", () => {
  getWeather("dhaka");
});
// get weather
async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=66cb2360820631e7f3a56386bd7e2928`
    );
    const data = await res.json();
    console.log(data);
    const dataObj = {
      weather: data.weather[0].main,
      temp: data.main.temp,
      location: data.name + "," + data.sys.country,
      icon: data.weather[0].icon,
    };
    displayWeather(dataObj);
  } catch (error) {
    console.log(error);
    alert("City Not Found.");
  }
}
// display weather
function displayWeather({ weather, temp, location, icon }) {
  const html = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" />
      <h1>${location}</h1>
      <h3><span>${temp}</span>&deg;C</h3>
      <h3>${weather}</h3>
      <h4>${displayDate()}</h4>`;
  document.querySelector(".weather-status").innerHTML = html;
}

function displayDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const date = days[today.getDate()];
  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const day = today.getDay();
  return `${day} ${month} (${date}) , ${year}`;
}
