const Sequelize = require("sequelize")

const connection = new Sequelize('myBlog','root','123456',{
    host:'localhost',
    dialect:'mysql',
    timezone:"-03:00",
    logging: console.log, // Adicionando logging para visualizar mensagens de erro
})

module.exports = connection;