const Sequelize = require("sequelize");
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: process.env.DB_TIMEZONE,
    logging: console.log, // Adicionando logging para visualizar mensagens de erro
});

module.exports = connection;
