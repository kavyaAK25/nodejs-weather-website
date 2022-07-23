const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ef246fd4ba94d3a5a2ae40d909fefbb&query=' + lat + ',' + long + '&units=f';

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            /*
                callback(undefined, {
                    location: body.location.name,
                    country: body.location.country,
                    description: body.current.weather_descriptions
                })
            */
            // OR
            //console.log(body)
            const { weather_descriptions, temperature, feelslike, humidity } = body.current;
            callback(undefined, weather_descriptions + ", It is currently " + temperature + " degrees, but it feels like " + feelslike + " degrees out there! and the humidity is " + humidity)
        }
    })
}

module.exports = forecast;