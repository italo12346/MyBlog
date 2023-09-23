const express = require("express")

const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require("../model/User")
const session = require("express-session")
const loginCheck = require("../middlewares/loginCheck")



router.get('/login',loginCheck, (req, res) => {
    res.render('admin/users/login')
})

router.get('/admin/users/new', (req, res) => {
    res.render('admin/users/create')
})

router.post('/authenticate', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    User.findOne({ where: { email: email } }).then((user) => {
        if (user != undefined) {
            let correct = bcrypt.compareSync(password,user.password)
            if (correct == true) {
                session.user = {
                    id:user.id,
                    email:user.email,
                }
                res.redirect("/admin/article")
            }else{
                res.redirect("/login")
            }
        } else {
            res.redirect("/login")
        }
    })
})
//Create
router.post('/admin/users/create', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let passwordConfirm = req.body.passwordConfirm
    if (password == passwordConfirm) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        User.findOne({ where: { email: email } }).then(user => {
            if (user == undefined) {
                User.create({
                    email: email,
                    password: hash,
                }).then(() => {
                    res.redirect("/admin/users")
                }).catch((err) => {
                    console.log(err);
                    res.redirect('/admin/users/new')
                })
            } else {
                res.send("usuario ja existe")
            }
        })
    } else {
        res.redirect('/admin/users/new')
    }
})
// Read
router.get('/admin/users', (req, res) => {
    User.findAll().then(users => {
        res.render('admin/users/users', { users: users })
    })

})

router.post('/admin/users/update', (req, res) => {
    res.send("Atualizando usuario")
})

//Logout

router.get("/logout",(req, res)=>{
   session.user = undefined
   res.redirect('/login')
})
module.exports = router