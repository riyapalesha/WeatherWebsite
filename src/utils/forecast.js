const request = require("request")


const forecast = (place,callback)=>
{
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place  + "&appid=9b575d7bb0b3ca673d0ea6dd0806dcad&units=metric&lang=sp"
   
    request({url : url, json : true},(error,response)=>
    {
        if(error)
        {
            callback("unable to connect to service",undefined)
        }
        else if(response.body.error)
        {
            callback("unable to find location",undefined)   
        }
        else
        {
            //console.log(response.body.weather[0].main)
            callback(undefined,
                    "It is currently " + response.body.main.temp + " degrees out and also "+ response.body.weather[0].main
                )
        }
    })
}
module.exports = forecast