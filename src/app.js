const path = require('path')
const express = require('express')
const { hasSubscribers } = require('diagnostics_channel')
const hbs = require('hbs')
const app = express()
const request = require("request")

const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename) 

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>
{
    res.render('index',{
        title : "Whats the Weather?",
        name : "riya"
    })
}) 

app.get('/about',(req,res)=>
{
    res.render('about',{
        title : "About title",
        name : "riya"
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        helpText : "This is some helpful text ! ",
        title : 'Help title',
        name : 'riya'
    })
})


app.get('/products',(req,res) =>
{
    if(! req.query.search)
    {
        return res.send({
            error : "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products : {}
    })
})

// app.get('/weather',(req,res) =>
// {
//     if(! req.query.address)
//     {
//         return res.send({
//             error : "You must provide address"
//         })
//     }
//    
//     res.send({
//         location : req.query.address
//     })
// })


app.get('/weather',(req,res) =>
{
    if(! req.query.place)
    {
        return res.send({
            error : "You must provide address"
        })
    }
    
    
    forecast(req.query.place,(error,forecastData)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({

            title : "Weather Now !",
            name : "riya palesha",
            forecast : forecastData,
            address : req.query.place
        })
        
    })
})


// app.get('',(req,res)=>
// {
//     res.send("<h1>hello express !</h1>")
// }) 

// app.get('/help',(req,res)=>
// {
//     res.send([{
//         name : "riya",
//         age : 20
//     },{
//         name : "su",
//         age : 14
//     }])
// })

// app.get('/about',(req,res)=>
// {
//     res.send({
//         name : "riya",
//         age : 20
//     })
// })

// app.get('/weather',(req,res)=>
// {
//     res.send("weather page !")
// })

app.get('/help/*',(req,res) =>
{
    res.render("404",
    {
        title : "404",
        name : "Riya",
        errorMessage : "Help article not found."
    })
})

app.get('*',(req,res)=>
{
    res.render("404",
    {
        title : "404",
        name : "Riya",
        errorMessage : "Page not found"
    })
})

app.listen(3000,()=>
{
    console.log("server is up and running on port 3000!")
})

