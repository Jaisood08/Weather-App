const request = require('postman-request')

const geocoding = (Location,callback)=>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(Location)+'.json?access_token=pk.eyJ1IjoiamFpc29vZDA4IiwiYSI6ImNreG45eng0OTA2azIydW9lZnMybDZna2kifQ.z4GVDRBaRmjndjo6OHFF6w'

    request({url:url,json:true},
    (err,{body}={})=>
    {
        if(err)
        {
            callback(err)
        }
        else
        {
            const Data = body.features
                
            if(Data.length === 0 )
            {
                const sr = "0 Result Found for location : " + Location
                callback(sr)
                return
            }

            var Locations =[]
            var i = 0
            Data.forEach((Place)=>{
                Locations.push(
                    {
                        'index':i,
                        'Longitude':Place.center[1],
                        'Latitude':Place.center[0]
                    }
                )
                i++
            })
            callback(false,Locations)
        }
    })
}


// geocoding('**',(err,res)=>{
//     console.log("Error : ",err)
//     console.log("Data : ", res)
// })

module.exports = geocoding