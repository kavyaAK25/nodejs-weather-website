const request = require("request");

const geocode = (address, countryCode, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=463616152ac2dd20e4939df4218894c4&query=' + encodeURIComponent(address) + '&country=' + encodeURIComponent(countryCode);
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect", undefined);
        } else if (body.error) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            // console.log(response.body);
            // var data = {
            //     latitude: response.body.data[0].latitude,
            //     longitude: response.body.data[0].longitude,
            //     location: response.body.data[0].label
            // }
            // return data; //this doesn't work as it won't return any value to the function call, hence callback

            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            });
        }
    });
}

module.exports = geocode;