const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weather = document.querySelector('.weather');
const error = document.querySelector('.error');

search.addEventListener('click', () => {

    const APIKey = '185dbcc57e27f9315a49d3f1c762ebd7';
    const city = document.querySelector('.search input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {

                container.style.height = '400px';

                weather.style.display = 'none';

                error.style.display = 'block';
                error.classList.add('fadeIn');

                return;

            }

            error.style.display = 'none';
            error.classList.remove('fadeIn');

            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.weather .temperature');
            const description = document.querySelector('.weather .description');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                
                case "Mist":
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;

            weather.style.display = '';
            weather.classList.add('fadeIn');
            container.style.height = '590px';

        });

});
