const express = require('express')
const router = express.Router() 

router.get('/article',(req, res)=>{
    res.send('Aqui ta os Artigos ')
})

module.exports = router