const session = require("express-session")

function adminAuth(req,res, next){
    if (session.user != undefined) {
        next()
    }else{
        res.redirect("/login")
    }
}
module.exports = adminAuth