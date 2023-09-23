const  Sequelize = require("sequelize")
const  connection = require("../database/connection")


const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }
    ,slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({force: false}) // Sincronizar, depois que executar o codigo a primeira vez desabilite essa linha 


module.exports = Category;