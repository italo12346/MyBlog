const  Sequelize = require("sequelize")
const  connection = require("../database/connection")


const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

//User.sync({force: true}) // Sincronizar, depois que executar o codigo a primeira vez desabilite essa linha 


module.exports = User;