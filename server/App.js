require('dotenv').config()
const express = require ('express');
const bodyParser = require ("body-parser")
const app = express();

 app.use (bodyParser.urlencoded({extended:true}))
 app.use(express.static('public')) 
app.get('/', (req, res)=>{
    res.sendFile(__dirname + "./index.html")
})

app.post('/tescomcbtor.html', (req, res)=>{
    // res.send(`<input type = "text" name = "name"></input> <input type = "submit" value = '${sendName()}'; onclick = send()></input>`)
let uname = req.body.uname;
let ognum = req.body.ognum;
let fnumber = req.body.fnumber   
console.log(uname, ognum, fnumber)
res.sendFile(__dirname + "/public/tescomcbtor.html")
})



const PORT = process.env.PORT || 5000

app.listen( PORT, ()=>{
    console.log(`the server is running at ${PORT}` )
})