const express = require("express")
const router = express.Router()
const slugify = require("slugify")
const Category = require("../model/Category")

router.get('/admin/category/new', (req, res) => {
    res.render('admin/categories/createCategory')
})

router.get('/admin/category/edit/:id', (req, res) => {
    let id = req.params.id
    console.log(id);
    if(isNaN(id)){
        res.redirect('/admin/category')
    }
    Category.findByPk(id).then(categories =>{
        if(categories != undefined){
            res.render('admin/categories/editCategory',{
                categories:categories
            })
        }else{
            res.redirect('/admin/category')
        }
    })
})

// Read
router.get('/admin/category', (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/category', {
            categories: categories
        })
    })
})

// Create
router.post('/admin/category/save', (req, res) => {
    let title = req.body.title;
    if (title == undefined) {
        res.redirect('/')
    } else {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/category/new')
        })
        console.log('cadastrado com sucesso')
    }
})
// Update
router.post('/admin/category/update', (req, res) => {
   let id = req.body.id
   let title = req.body.title
   Category.update({title: title},{
    where:{
        id: id
    }
   }).then(()=>{
    res.redirect('/admin/category/')
   })
})

// Delete
router.post('/admin/category/delete', (req, res) => {
    let id = req.body.id
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/category");
            });
        } else {// NÃO FOR UM NÚMERO
            res.redirect("/admin/category");
        }
    }
})
module.exports = router