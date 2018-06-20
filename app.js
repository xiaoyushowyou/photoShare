var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Photo = require("./models/photo");
var Comment = require("./models/comment");
// var User = require("./models/user");
var seedDB = require("./seeds");

const cheerio = require('cheerio')
const $ = cheerio



require('dotenv').config();

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

seedDB();


mongoose.connect('mongodb://xiaoyu:yxy123@ds263520.mlab.com:63520/jackphotoshare');

// mongoose.connect("mongodb://localhost/photoshare");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

//List of photos
app.get("/photos", function(req,res) {
    Photo.find({}, function(err, allPhotos){
        if (err) {
            console.log("There is error");
        }
        else {
            console.log("The data passed from dbs to file");
            res.render("index",{photos: allPhotos});
        }
    });
});

//New
app.get("/photos/new", function(req, res) {
    res.render("new.ejs")
})

//Create
app.post("/photos", function(req,res) {
    var name = req.body.name;
    var authorName = req.body.authorName;
    var image = req.body.image;
    var description = req.body.description;
    var time = req.body.time;
    var date = req.body.date;
    var filter;
    var system = req.body.system;
    var flash = req.body.flash;
    
    if (system == "IOS") {
        filter = req.body.filter_ios;
    }
    else if (system == "Andriod")
    {
        filter = req.body.filter_android;
    }
    else {
        filter = req.body.filter_others;
    }
   
    //create new photo and save to db
    console.log(req.body.location)
    
    geocoder.geocode(req.body.location, function (err, data) {
    console.log(data);
    console.log(geocoder)
    if (err || !data.length) {
        console.log("Geocoder Error")
        return res.redirect('/photos');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    // var lat = 50;
    // var lng = -111;
    var location = data[0].formattedAddress;
    console.log(data[0])
    var newPhoto = {name: name, authorName: authorName, image: image, description: description, time: time, flash: flash, date:date, filter: filter, system: system, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    Photo.create(newPhoto, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/photos");
        }
    });
  });
})

//SHOW
app.get("/photos/:id", function(req, res) {
    Photo.findById(req.params.id).populate("comments").exec(function(err,foundPhoto) {
        if(err) {
            console.log(err);
        }  
        else {
            console.log(foundPhoto);
            res.render("show", {photo: foundPhoto});
        }
    });
})

//Add New Comment to Certain Photo
app.get("/photos/:id/comments/new", function(req, res){
    // find campground by id
    Photo.findById(req.params.id, function(err, foundPhoto){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {photo: foundPhoto});
        }
    })
});

app.post("/photos/:id/comments", function(req,res){
   Photo.findById(req.params.id, function(err, foundPhoto){
       if(err){
           console.log(err);
           res.redirect("/photos");
       } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   foundPhoto.comments.push(comment);
                   foundPhoto.save();
                   res.redirect('/photos/' + foundPhoto._id);
               }
            })
       }
   })
});
           
 
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Photoshare has started");
});