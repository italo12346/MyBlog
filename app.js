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
    Article.findAll().then(article=>{
        res.render('index',{
            article:article
        })
    })

})

app.get("/:slug", (req,res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(!undefined){
            res.render('admin/articles/pageArticle',{article:article})
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.listen(port,() => console.log("servidor online"))