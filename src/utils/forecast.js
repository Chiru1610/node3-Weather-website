const request = require('request')

const forecast= (latitude,longtitude,callback)=>{

    const url ='http://api.weatherstack.com//current?access_key=417b091d69315d1a147682e16435b3d3&query='+latitude+','+longtitude

    // console.log(urlstring);
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to weather service.',undefined)
        }else if(body.error){
            callback('unable to find location.',undefined)
        }else{
            callback(undefined,'It is '+body.current.weather_descriptions[0] +' day.it is curretntly '+ body.current.temperature +' degree and it feels like '+
            body.current.feelslike + ' degree')
        }

    })

}
module.exports =forecast