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

// Pagination
router.get('/article/page/:num',(req, res)=>{
    let page = req.params.num
    let offset = 0
    
    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order:[
           [ 'id','DESC']
        ]
    }).then(articles => {
        var next;
        if(offset + 4 >= articles.count){
            next = false;
        }else{
            next = true;
        }

        var result = {
            page: parseInt(page),
            next: next,
            articles : articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page",{result: result, categories: categories})
        });
    })
})
//create
router.post('/admin/article/save',(req, res)=>{
    let title = req.body.title
    let body = req.body.body
    let summary = req.body.summary
    let categoryId = req.body.category
    Article.create({
        title:title,
        slug: slugify(title),
        summary:summary,
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
router.get('/admin/article/edit/:id', (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/editArticle", {categories: categories, article: article})
            });
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});
// Update
router.post('/admin/article/update',(req, res)=>{
    let id = req.body.id
    let title = req.body.title
    let summary = req.body.summary
    let body = req.body.body
    let category = req.body.category
    Article.findByPk(id).then(article=>{
        article.update({
            title:title,
            summary:summary,
            body:body, 
            categoryId:category 
        })
    }).catch(err=>{
        res.redirect("/")
    })
    res.redirect("/admin/article")
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