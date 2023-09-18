const express = require("express")
const router = express.Router() 
const bcrypt = require('bcryptjs')
const User = require("../model/User")

router.get('/login',(req, res)=>{
    res.render('admin/users/login')
})

router.get('/admin/user/new',(req, res)=>{
    res.render('admin/users/create')
})


//Create
 router.post('/admin/users/create',(req, res)=>{
     let email = req.body.email
     let password = req.body.password
     let passwordConfirm = req.body.passwordConfirm 
     if(password == passwordConfirm ){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        User.findOne({where:{email:email}}).then(user =>{
            if(user == undefined){
                User.create({
                    email:email,
                    password:hash,
                }).then(()=>{
                    res.redirect("/admin/user")
                }).catch((err)=>{
                    console.log(err);
                    res.redirect('/admin/user/new')
                })
            }else{
                res.send("usuario ja existe")
            }
        })}else{
        res.redirect('/admin/user/new')
     }
 })
// Read
router.get('/admin/users',(req, res)=>{
    User.findAll().then(users=>{
        res.render('admin/users/users',{users:users})
    })
    
})

router.post('/admin/users/update',(req, res)=>{
    res.send("Atualizando usuario")
})
module.exports = router