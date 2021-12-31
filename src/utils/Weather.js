const request = require('postman-request')



const forcast = ({index,Longitude,Latitude},callback)=>{

    //Weather 
    const url = 'http://api.weatherstack.com/current?access_key=86cfdb668fdc48b70cdb7179eb05468a&query='+Longitude+','+Latitude+'&units=m'
    request({url,json:true},
    (err,{body})=>{
    if(err)
    {
        callback(err)
    }
    else
    {
        const data = body
        if(data.success)
        {
            console.log('Some Error')
            return
        }
        
        // var str = "\n------------------------------\n"
        // str += "Index : "+ Data.index + "\nName : " + data.location.name+"\nCountry : "+ data.location.country
        var FF = ""
        data.current.weather_descriptions.forEach(dis => {
            FF += dis+" , " 
        });
        // str += "\nWeather Descriptions : "+FF+"\nTemp :- "+data.current.temperature+"\nFeels :-"+data.current.feelslike
        // str += "\n------------------------------\n"

        const OBJ = {
            'Index' : index,
            'Name' : data.location.name,
            'Country' :  data.location.country,
            'Weather_Descriptions' : FF,
            'Temp':data.current.temperature,
            'Feels':data.current.feelslike
        }

        callback(false,OBJ)
    }
    });
}
    


// forcast({ index: 0, Longitude: 28.01806, Latitude: 73.31694 },
//     (error,res)=>
//     {
//         console.log("Error: ",error)
//         console.log("Data: ",res)
//     });

module.exports = forcast