
const fs = require('fs')
const Photo = require('../models/Photo')
exports.getAllPhotos = async (req, res) => {
    
    const page = req.query.page || 1;
    const photosPerPage = 2;
    
    const totalPhotos = await Photo.find().countDocuments();
    console.log(totalPhotos)

    const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page -1) * photosPerPage)
    .limit(photosPerPage);


   // const photos = await Photo.find({}).sort('-dateCreated');

    res.render("index", { 
        photos,
        current : page,
        pages: Math.ceil(totalPhotos / photosPerPage)
    })
}

exports.getPhoto = async (req, res) => {

    const id = req.params.id;
    const photos = await Photo.findById(id);
    res.render("photo", { photos })
}

exports.editPhoto = async (req, res) => {

    const id = req.params.id;
    const photos = await Photo.findById(id);
    res.render("edit", { photos })
}

exports.createPhoto = async (req, res) => {

    let uploadeImage = req.files.image;
    let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name;
    const uploadDir = 'public/uploads/';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    uploadeImage.mv(
        uploadPath,
        async () => {

            await Photo.create({
                ...req.body,
                image: "/uploads/" + uploadeImage.name
            });
            res.redirect('/')
        }
    )

}

exports.updatePhoto =async (req, res) => {

    const id = req.params.id;
    const photos = await Photo.findById(id);
    photos.title = req.body.title;
    photos.description = req.body.description;
    photos.save();
    res.redirect('/photos/' + id)
}

exports.deletePhoto = async (req, res) => {


    const id = req.params.id;
    const photo = await Photo.findOne({ _id: id });
    const uploadPath = __dirname + "/../public";

    const resimtam = uploadPath + photo.image;
    if (fs.existsSync(resimtam)) { 
        fs.unlinkSync(resimtam);
    }
    
    await Photo.findByIdAndDelete(id);
    res.redirect('/')

}

exports.addPhoto =  (req, res) => { 
    res.render("add")
}