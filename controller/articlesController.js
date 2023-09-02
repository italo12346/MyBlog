const express = require("express")
const Article = require("../model/Article")
const Category = require("../model/Category")
const slugify = require("slugify")
const router = express.Router() 



router.get('/admin/article/new',(req, res)=>{
    Category.findAll().then(categories=>{
        res.render('admin/articles/createArticle',{
            categories:categories
        })
    })
})

//create
router.post('/admin/article/save',(req, res)=>{
    let title = req.body.title
    let body = req.body.body
    let categoryId = req.body.category
    Article.create({
        title:title,
        slug: slugify(title),
        body:body,
        categoryId:categoryId
    }).then(()=>{
        res.redirect('/admin/article')
    })

})
//Read
router.get('/admin/article',(req, res)=>{
    Article.findAll({include:[{model: Category}]}).then(articles=>{
        res.render('admin/articles/article',{
            article:articles
        })
    })
})

//Update
router.get('/admin/article/edit/:id',(req, res)=>{
    let id = req.params.id
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {categories: categories, article: article})

            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
})

//Delete
router.post('/admin/article/delete', (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/article");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/admin/article");
        }
    }
})

module.exports = router