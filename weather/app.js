const URL_BASE= 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '4860deee9fe38a1e1e60f4b085eaaac5';
const buscar = document.querySelector('#buscar');
const divMostrarClima = document.querySelector('#mostrarClima');
const divBuscarClima = document.querySelector('#buscarClima');
const cityInput = document.querySelector('#cityInput');


async function getLocalWeather(lat, lon){
    // const response = await fetch()
    const response = await fetch(URL_BASE + `?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    console.log(data)
    verClima(data);
}

buscar.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Por favor, ingresa una ciudad.');
    }
});

async function getWeatherByCity(city){
    // const response = await fetch()
    const response = await fetch(`${URL_BASE}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    buscarClima(data);
}

navigator
.geolocation
.getCurrentPosition((pos) =>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    // console.log(lat, lon);
    getLocalWeather(lat, lon);
})



function verClima(data) {
    const temp = data.main.temp;
    let backgroundColor;
    let gifUrl;

    if (temp <= 0) {
        backgroundColor = '#cfe5f8'; 
        gifUrl = '../assets/gifs/cold.gif';
    } else if (temp > 0 && temp <= 10) {
        backgroundColor = '#ececec'; 
        gifUrl = '../assets/gifs/chilly.gif';
    } else if (temp > 10 && temp <= 20) {
        backgroundColor = '#f8efbd'; 
        gifUrl = '../assets/gifs/commfortable.gif';
    } else if (temp > 20 && temp <= 30) {
        backgroundColor = '#ffcbb4'; 
        gifUrl = '../assets/gifs/warm.gif';
    } else if (temp > 30) {
        backgroundColor = '#ffa5a4'; 
        gifUrl = '../assets/gifs/hot.gif';
    }
    divMostrarClima.style.backgroundColor = backgroundColor; 
    divMostrarClima.innerHTML = `
        <h2>La Temperatura en ${data.name}  es: </h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Descripción: ${data.weather[0].main}</p>
        <img src="${gifUrl}" alt="GIF del clima">
    `;
}

function buscarClima(data) {
    let resultadosClima = document.querySelector('#resultadosClima');

    if (!resultadosClima) {
        resultadosClima = document.createElement('div');
        resultadosClima.id = 'resultadosClima';
        divBuscarClima.appendChild(resultadosClima);
    }
    if (data.cod === 200) {
        const temp = data.main.temp;
        let backgroundColor;
        let gifUrl;

        if (temp <= 0) {
            backgroundColor = '#cfe5f8'; 
            gifUrl = '../assets/gifs/cold.gif';
        } else if (temp > 0 && temp <= 10) {
            backgroundColor = '#ececec'; 
            gifUrl = '../assets/gifs/chilly.gif';
        } else if (temp > 10 && temp <= 20) {
            backgroundColor = '#f8efbd'; 
            gifUrl = '../assets/gifs/commfortable.gif';
        } else if (temp > 20 && temp <= 30) {
            backgroundColor = '#ffcbb4'; 
            gifUrl = '../assets/gifs/warm.gif';
        } else if (temp > 30) {
            backgroundColor = '#ffa5a4'; 
            gifUrl = '../assets/gifs/hot.gif';
        }
        divBuscarClima.style.backgroundColor = backgroundColor;
        resultadosClima.innerHTML = `
            <h2>La Temperatura en ${data.name}  es: </h2>
            <p>Temperatura: ${data.main.temp}°C</p>
            <p>Humedad: ${data.main.humidity}%</p>
            <p>Descripción: ${data.weather[0].description}</p>
            <img src="${gifUrl}" alt="GIF del clima">
        `;
    } else {
        divBuscarClima.innerHTML = `<p>No se encontro la ciudad. Intentalo de nuevo.</p>`;
        divBuscarClima.style.backgroundColor = '';
    }
}




