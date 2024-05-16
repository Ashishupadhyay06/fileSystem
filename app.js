const express = require('express')
const app = express()
const path = require("path")
const fs = require('fs')


app.set('view engine','ejs');
app.use(express.static(__dirname + 'public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    var arr = []
    fs.readdir(`./files`,function(err, files){
        if(err) return err;
        else{
            files.forEach(filename=>{
                let data = fs.readFileSync(`./files/${filename}`);
                arr.push({filename,data});
            })
            res.render('index',{files:arr}) 
        }
           
})
})

app.get('/create', function (req, res) {
    res.render('create')
})
app.post('/create', function (req, res) {
   fs.writeFile(`./files/${req.body.filename}.txt`, req.body.filedata, function(err){
    res.redirect("/")
   })
})
  
app.listen(3000)