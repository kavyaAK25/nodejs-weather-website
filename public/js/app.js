//console.log("Client side JS loaded")

const weatherForm = document.querySelector('form')

const loc = document.getElementById('locInput')
const cc = document.getElementById('ccInput')

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = loc.value
    const countrycode = cc.value
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location + '&country=' + countrycode).then((res) => {
        res.json().then((weatherData) => {
            if (weatherData.error) {
                message1.textContent = weatherData.error
            } else {
                message1.textContent = weatherData.location
                message2.textContent = weatherData.forecast
            }
        })
    })
})