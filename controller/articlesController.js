const express = require("express");
const Article = require("../model/Article");
const Category = require("../model/Category");
const slugify = require("slugify");
const router = express.Router();
const session = require("express-session");
const adminAuth = require("../middlewares/adminAuth");

// Rota para criar um novo artigo
router.get('/article/new', adminAuth, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.render('admin/articles/createArticle', {
            categories,
            session
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar categorias");
    }
});

// Rota para paginação
router.get('/article/page/:num', async (req, res) => {
    try {
        const page = req.params.num;
        let offset = 0;
        
        if (isNaN(page) || page == 1) {
            offset = 0;
        } else {
            offset = (parseInt(page) - 1) * 4;
        }

        const articles = await Article.findAndCountAll({
            limit: 4,
            offset: offset,
            order: [['id', 'DESC']]
        });

        const next = offset + 4 >= articles.count ? false : true;

        const result = {
            page: parseInt(page),
            next,
            articles
        }

        const categories = await Category.findAll();

        res.render("admin/articles/page", { result, categories, session});
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar artigos");
    }
});

// Rota para salvar um novo artigo
router.post('/admin/article/save', adminAuth, async (req, res) => {
    try {
        const { title, body, summary, category } = req.body;

        if (title.trim() !== '' && body.trim() !== '') {
            const article = await Article.create({
                title,
                slug: slugify(title),
                summary,
                body,
                categoryId: category
            });
            res.redirect('/admin/article');
        } else {
            res.redirect("/article/new");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao salvar o artigo");
    }
});

// Rota para ler todos os artigos
router.get('/admin/article', adminAuth, async (req, res) => {
    try {
        const articles = await Article.findAll({ include: [{ model: Category }] });
        res.render('admin/articles/article', { article: articles });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar artigos");
    }
});

// Rota para editar um artigo
router.get('/admin/article/edit/:id', adminAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findByPk(id);

        if (article) {
            const categories = await Category.findAll();
            res.render("admin/articles/editArticle", { categories, article });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao carregar o artigo");
    }
});

// Rota para atualizar um artigo
router.post('/admin/article/update', adminAuth, async (req, res) => {
    try {
        const { id, title, summary, body, category } = req.body;
        const article = await Article.findByPk(id);

        if (article) {
            await article.update({
                title,
                summary,
                body,
                categoryId: category
            });
            res.redirect("/admin/article");
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar o artigo");
    }
});

// Rota para excluir um artigo
router.post('/admin/article/delete', adminAuth, async (req, res) => {
    try {
        const id = req.body.id;
        if (!isNaN(id)) {
            await Article.destroy({
                where: { id }
            });
        }
        res.redirect("/admin/article");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao excluir o artigo");
    }
});

module.exports = router;
