const express = require("express")
const router = express.Router() 
const User = require("../model/User")

router.get('/login',(req, res)=>{
    res.render('admin/users/login')
})

router.get('/admin/user/new',(req, res)=>{
    res.render('admin/users/create')
})


//Create
router.post('/admin/user/create',(req, res)=>{
    let email = req.body.email
    let password = req.body.senha
    let passwordConfirm = req.body.passwordConfirm 
    if(password == passwordConfirm ){
        User.create({
            email:email,
            password:password
        }).then(()=> {
            res.redirect('/admin/user/new')
        })
    }
})

router.get('/admin/user',(req, res)=>{
    res.render('admin/users/users')
})

router.post('/admin/user/update',(req, res)=>{
    res.send("Atualizando usuario")
})
module.exports = router