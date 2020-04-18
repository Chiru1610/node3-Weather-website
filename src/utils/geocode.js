
const request = require('request')

const geocode =(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2hpcnUxNjEwIiwiYSI6ImNrOHhidzNxNTB0dTUzZnNmM2Q1Mmd2engifQ.7YXiVT7MCm07JZVnLJOlcQ&limit=1'
    console.log(url)
    request({url,json:true},(error,{body}) =>{

        if(error){
            callback('unable to connect to location service internet !.',undefined)
        }else if(body.features.length === 0){
            callback('unable to find the location.',undefined)
        }else{
            callback(undefined,{
                longtitude:body.features[0].geometry.coordinates[0],
                latitue:body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }

    })
}



module.exports= geocode;