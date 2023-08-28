const express = require("express")
const Article = require("../model/Article")
const router = express.Router() 

router.get('/admin/article',(req, res)=>{
    Article.findAll().then(articles=>{
        res.render('admin/articles/article',{
            article:articles
        })
    })

})

router.get('/admin/article/new',(req, res)=>{
    
})

module.exports = router