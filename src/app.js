const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chiru'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chiru'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chiru'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return  res.send({
            error: 'address must be provided !'

        })
    }

    
    geocode(req.query.address,(error,{latitue,longtitude,location}={})=>{
        if(error){
            return res.send({
                error
    
            })
        }
            forecast(latitue,longtitude,(error,forecastdata)=>{
                if(error){
                    return res.send({
                        error
            
                    })
                }

                res.send({
                    forecast : forecastdata,
                    location,
                    address: req.query.address
                })
                
            })
        })   

   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error: 'you must provide search term'

        })
    }
    console.log(req.query.search)
    res.send({
       products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('pagenotfound', {
        title: '404',
        ErrorMessage: 'help article not found.',
        name: 'Chiru'
    })
})

app.get('*',(req,res)=>{

    res.render('pagenotfound', {
        title: '404',
        ErrorMessage: 'page not found.',
        name: 'Chiru'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

// app.get('',(req,res)=>{

//     res.send(indexpage)
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Chiru',
//         age:32
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send()
// })