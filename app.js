const express = require('express')
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(express.static('public'))

app.get("/", (req,res)=>{
    res.send("ok")
})

app.listen(port,() => console.log("servidor online"))