const express = require('express')
const port = process.env.port || 5000
const path = require('path')
const rootRouter = require('./routes/root-router')
const expressEJSLayout  = require('express-ejs-layouts')
const app = express()


app.use(express.urlencoded({extended : true}))
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname, "assets")))
app.use(expressEJSLayout)
 app.set("layout extractStyles" , true)
 app.set("layout extractScripts" , true)
app.use("/" , rootRouter)

app.listen(port , (err)=>{
    if(err){
        console.log(`Server error : ${err.message}`)
        return;
    }

    console.log(`Server listening on port ${port}`)
})