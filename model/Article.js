const  Sequelize = require("sequelize")
const  connection = require("../database/connection")
const Category = require("./Category")
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull: false
    }
})

//Relacionamneto entre tabelas
Article.belongsTo(Category) // Um para muitos
Category.hasMany(Article) // Um para Um

//Article.sync({force: true}) // Sincronizar, depois que executar o codigo a primeira vez desabilite essa linha 

module.exports = Article;