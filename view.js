const express=require('express')
const hbs=require('hbs')
const fs=require('fs')
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getDate',()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('upperCase',(text)=>{
return text.toUpperCase()
})

var a=express()

a.set('view engine',hbs)
a.get('/',(req,res)=>{
//res.send("<h1>hello world</h1>")
res.send( {
        name:'shreya',
        rides:[
        'bike',
        'cycle'
    ]
    })
})
// a.get('/about',(req,res)=>{
//     res.send('About page')
// })
a.use((req,res,next)=>{
    var date=new Date().toString()
    var log=date+':'+ (req.method,req.url)
    console.log(log)
    fs.appendFile('view.log',log + '\n' ,(err)=>{
        if(err)
        {
            console.log('unable to find view.log')
        }
    })
//console.log(date+':'+req.method, req.url)
    next()
})
// a.use((req,res,next)=>{
//     res.render('maintenence.hbs')
// })
a.use(express.static(__dirname + '/folder'))
a.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page',
       // currentYear:new Date().getFullYear()

    })
})
a.get('/home',(req,res)=>{
    res.render('home.hbs',{
       pageTitle:'Home page',
       welcomeMessage:'Welcome to the home page' ,
       //currentYear:new Date().getFullYear()
    })
})
a.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to get data'
    })
    })


a.listen(3000)