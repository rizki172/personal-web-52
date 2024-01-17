const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) =>{
    res.send('Hellos world')
}) 
app.listen(port,() => {
    console.log(`Server berjalan di  ${port}`)
})