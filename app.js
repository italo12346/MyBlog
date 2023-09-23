const express = require("express");
const app = express();
const port = 3000; // Alterei a porta

const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/connection");

// Models
const Article = require("./model/Article");
const Category = require("./model/Category");
const User = require("./model/User");

// Controllers
const articlesController = require("./controller/articlesController");
const categoriesController = require("./controller/categoriesControler");
const userController = require("./controller/userController");

// View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", userController);

// Session
app.use(session({
    secret: "segredo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    // Em produção, utilize um mecanismo de armazenamento apropriado
    // Para desenvolvimento, o MemoryStore é aceitável
    // Exemplo usando Redis:
    // store: new RedisStore({ client: redisClient })
}));

// Console.log(session.user) foi removido, pois session.user é undefined aqui

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then(article => {
        Category.findAll().then(categories => {
            res.render('index', {
                article: article,
                categories: categories,
                session: session // Corrigido para req.session
            });
        });
    });
});

app.get("/article/:slug", (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article) { // Corrigido para verificar se o artigo foi encontrado
            Category.findAll().then(categories => {
                res.render('admin/articles/pageArticle', {
                    article: article,
                    categories: categories,
                    session: session // Corrigido para req.session
                });
            });
        } else {
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/');
    });
});

app.listen(port, () => console.log("servidor online"));
