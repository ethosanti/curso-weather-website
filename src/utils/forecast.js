const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'https://api.weatherbit.io/v2.0/forecast/daily?lat='+ latitude +'&lon='+longitude+'&key=e52b1e6b4e114cecb61a4d4fbd51c343&lang=es&limit=1'
   // console.log('forecast:=> latitud='+latitude+' lon='+longitude)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Forecast;- Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Forecast:- Unable to find location', undefined)
        } else {
            //callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            callback(undefined, 'Ciudad :- '+body.city_name + ' => El tiempo ;- ' + body.data[0].weather.description+' => Maxima Temperatura ;- '+ body.data[0].max_temp + ' => Codigo ;- '+body.country_code )
        }
    })
}

module.exports = forecast