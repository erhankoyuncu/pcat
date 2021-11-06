const express = require('express');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');


const moment = require('moment')

// Controllers 
const photoController = require('./controllers/photoControllers')

const app = express();
app.set("view engine", "ejs");

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.locals.fromNow = function (date) {
    return moment(date).format('MM/DD/YYYY');
}
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))
 
mongoose.connect('mongodb://localhost/pcat-test-db');

const port = 3000;

//Kontroller
app.get('/', photoController.getAllPhotos)
app.get('/photos/:id', photoController.getPhoto )
app.get('/photos/edit/:id',photoController.editPhoto) 
app.post('/photos', photoController.createPhoto ) 
app.put('/photos/:id', photoController.updatePhoto ); 
app.delete("/photos/:id", photoController.deletePhoto )
app.get('/add', photoController.addPhoto)


app.get('/about', (req, res) => {

    res.render("about")
})

 

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor `)
})