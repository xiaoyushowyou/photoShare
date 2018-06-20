var mongoose = require("mongoose");


//SCHEMA SETUP
var photoSchema = new mongoose.Schema({
    authorName: String,
    name: String,
    image: String,
    description: String,
    lat: Number,
    lng: Number,
    location: String,
    system: String,
    time: String,
    date: String,
    filter: String,
    flash: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Photo", photoSchema);

