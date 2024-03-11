function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apikey = "b28e85c81450dc6466bb04f3d658aae5";
    async function getnavigator() {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (success) => resolve(success.coords),
                (error) => reject(error)
            );
        });
        return position;
    }
    getnavigator().then(data => {
        const lat = data.latitude;
        const lon = data.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const weatherInfo=document.getElementById("weatherInfo");
                weatherInfo.innerHTML=`
                <h2>${data.name}</h2>
                <p>${data.weather[0].description}</p>
                <p>Temperature:${data.main.temp}C</p>
                <p>Humidity:${data.main.humidity}%</p>
                `;
            })
            .catch(error => {
                console.log("Error fetching weather data:", error);
                const weatherInfo = document.getElementById("weatherInfo");
                weatherInfo.innerHTML = "<p>Failed to fetch weather data. Please try Again later.</p>";
            });
    });
}
