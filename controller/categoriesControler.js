const express = require('express')
const router = express.Router() 

router.get('/categories',(req, res)=>{
    res.send('Aqui ta as categorias ')
})

module.exports = router