const express = require('express');
const mongoose = require('mongoose'); 
const ejs = require('ejs');
const Photo = require('./models/Photo')
const moment = require('moment')

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.locals.fromNow = function(date){
    return moment(date).format('MM/DD/YYYY');
  }

mongoose.connect('mongodb://localhost/pcat-test-db');

const port = 3000;

app.get('/', async (req, res)=>{

    const photos =  await Photo.find({} );

    res.render("index", { photos})
})

app.get('/photos/:id', async (req, res)=>{

    const id = req.params.id;  
    const photos =  await Photo.findById(id); 
    res.render("photo", { photos})
})


app.get('/about', (req, res)=>{
 
    res.render("about")
})
app.get('/add', (req, res)=>{
 
    res.render("add")
})

app.post('/photos', async (req, res) => {
 
   await Photo.create(req.body);

    res.redirect('/')
})




app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor `)
})