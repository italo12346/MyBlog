const session = require("express-session")

function loginCheck(req,res, next){
    if (session.user != undefined) {
        res.send('voce ja esta logado ')
    }else{
        next()
    }
}
module.exports = loginCheck