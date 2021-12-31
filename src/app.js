const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocoding = require('./utils/geocode')
const forcast = require('./utils/Weather')

const app = express()
const static = path.join(__dirname,'../public')
const templates = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',templates)
app.use(express.static(static))
hbs.registerPartials(partials)

app.get('',(req,res)=>{
    res.render("index",{
        title:'Hello',
        name:'Jay Sood',
        time:Date().toString()
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:'Hello',
        name:'Jay Sood',
        time:Date().toString()
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title:'Hello',
        name:'Jay Sood',
        time:Date().toString()
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.search)
    {
        return res.send(
            {error:"Location Not Provided"}
        )
    }
    else
    {
        console.log(req.query.search)
 
        geocoding(req.query.search,(error,loc)=>
        {
            if(error) 
            { 
                console.log(error)
                return res.send({error:"Location Not Found"})
            }
            return res.send({Locations:loc})
        
        }); 
    }
})

app.get("/weather/Location",(req,res)=>{
    if(!req.query.index)
    {
        return res.send(
            {error: 'query was not apropriate'}
        )

    }
    
    const element = {
        index: req.query.index, 
        Longitude: req.query.Longitude,
        Latitude: req.query.Latitude
    }

    forcast(element,(error,result)=>
    {
        if(error)
        {
            return res.send(
                {error:"Weather Not Available"}
            )
        }
        else
        {
            console.log("Data: ",res)
            return res.send(
                {Data:result}
            )
        }
    });
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',
    {
        title:'Hello',
        name:'Jay Sood',
        time:Date().toString(),
        page : 'Help is '
    })
})

app.get('*',(req,res)=>{
    res.render('404',
    {
        title:'Hello',
        name:'Jay Sood',
        time:Date().toString(),
        page : 'YOLO bit '
    })
})


app.listen(3000,()=>{
    console.log('Server is up on port: 3000 ')
})
