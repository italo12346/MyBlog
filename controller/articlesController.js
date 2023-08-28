const express = require('express')
const router = express.Router() 

router.get('/admin/article',(req, res)=>{
    res.render('admin/articles/article')
})

module.exports = router