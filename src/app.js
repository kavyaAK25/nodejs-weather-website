const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')//customised view path
const partialsPath = path.join(__dirname, '../templates/partials')


//set uphandlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath)//setting express point to custom template(views)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kavya A K'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kavya A K'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kavya A K',
        helpText: 'This page will help you understand about my app!'
    })
})
app.get('/weather', (req, res) => {
    if (!(req.query.address && req.query.country)) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, req.query.country, (error, { latitude: lat, longitude: long, location: loc } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, forecastData = []) => {
            console.log(forecastData)
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: loc,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Help article not found',
        name: 'Kavya A K'
    })
})

// When url has anything other than the above routes (* -> wild card character) 
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Page not found',
        name: 'Kavya A K'
    })
});

app.listen(port, () => {
    console.log("Server started on ", port)
});