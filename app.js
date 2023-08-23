const express = require('express')
const app = express()
const connection = require('./database/connection')
const bodyParser = require('body-parser')

const port = 3000

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.get("/", (req,res)=>{
    res.send("ok")
})

app.listen(port,() => console.log("servidor online"))