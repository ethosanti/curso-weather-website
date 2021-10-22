const request = require('request')

const geocode1 = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGVsdGExNCIsImEiOiJja3Q0eXF5Y2kwM2Y0MnVvMDF3Z3h4d2V4In0.oYgyCiRT15810yTtbkCovQ&limit=1&language=es'
    

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        
        } else {
            console.log(body.features)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode1