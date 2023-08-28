const express = require("express")
const app = express()
const port = 3000

const bodyParser = require("body-parser")

const connection = require("./database/connection")
const Article = require("./model/Article")
const Category = require("./model/Category")

const articlesController = require("./controller/articlesController")
const categoriesController = require("./controller/categoriesControler")

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/",categoriesController);    
app.use("/",articlesController);

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.get("/", (req,res)=>{
    res.render('index')
})

app.listen(port,() => console.log("servidor online"))