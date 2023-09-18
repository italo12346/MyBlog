const express = require("express")
const app = express()
const port = 3000

const bodyParser = require("body-parser")
const session = require("express-session")
const connection = require("./database/connection")

//Models
const Article = require("./model/Article")
const Category = require("./model/Category")
const User = require("./model/User")

//Controllers
const articlesController = require("./controller/articlesController")
const categoriesController = require("./controller/categoriesControler")
const userController = require("./controller/userController")

// view enginer
app.set('view engine','ejs')
app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use("/",categoriesController);    
app.use("/",articlesController);
app.use("/",userController);

// Session
app.use(session({
    secret:"asdfghjtres",
    cookie:{maxAge :300000}
}))
// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

app.get("/", (req,res)=>{
    Article.findAll({
        order:[['id','DESC']],
        limit:4
    }).then(article=>{
        Category.findAll().then(categories=>{
            res.render('index',{
                article:article,
                categories:categories
            })
        })
    })
})

app.get("/article/:slug", (req,res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article =>{
        if(!undefined){
            Category.findAll().then(categories=>{
                res.render('admin/articles/pageArticle',{
                    article:article,
                    categories:categories
                })
            })
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})

app.listen(port,() => console.log("servidor online"))