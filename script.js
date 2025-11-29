const apiKey = "";


function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found or API key invalid");
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error(error);
            document.getElementById("weatherResult").innerHTML = error.message;
        });
}


function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch location weather");
                    return res.json();
                })
                .then(data => displayWeather(data))
                .catch(error => {
                    console.error(error);
                    document.getElementById("weatherResult").innerHTML = error.message;
                });
        }, () => {
            alert("Unable to get your location");
        });
    } else {
        alert("Geolocation not supported");
    }
}


function displayWeather(data) {
    document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}
