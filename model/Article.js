const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Category = require("./Category");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    summary: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Relacionamento entre tabelas
Article.belongsTo(Category); // Um para muitos
Category.hasMany(Article); // Um para Um

Article.sync({ force: false }); // Sincronizar, depois que executar o código a primeira vez desabilite essa linha 

module.exports = Article;


// Relacionamento entre tabelas
Article.belongsTo(Category); // Estabelece uma relação de muitos para um (um artigo pertence a uma categoria)
Category.hasMany(Article); // Estabelece uma relação de um para muitos (uma categoria tem muitos artigos)

Article.sync({ force: false }); // Sincroniza a definição do modelo com o banco de dados (force: false não recria a tabela se ela já existir)