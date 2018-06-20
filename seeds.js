var mongoose = require("mongoose");
var Photo = require("./models/photo");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Antelope Canyon",
        authorName: "Jack",
        image: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/35477052_1776914325758000_8918304109002489856_n.jpg?_nc_cat=0&oh=e685b11c708798b2607b452c4cc1aa91&oe=5BAB709C",
        description: "This is a photo token from Antelope Canyon. To have a perfect view of the sun beam, you need to enter the canyon during noon time.",
        location: "Upper Antelope Canyon, AZ",
        time: "12:00",
        date:"June 16th, 2018",
        system: "IOS",
        filter: "vivid",
        flash: "off",
        lat: 36,
        lng: -111,
    },
    {
        name: "Pacific Coast Highway",
        authorName: "Jack",
        image: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/35686847_1776930889089677_3385182910767169536_n.jpg?_nc_cat=0&oh=f58bc3f0eef625454d8c321e537b62b5&oe=5BB28774",
        description: "Many great views like this can be found on the pacific coast highway",
        location: "Pacific Coast Highway",
        time: "12:00",
        date:"June 16th, 2018",
        system: "IOS",
        filter: "vivid",
        flash: "off",
        lat: 33.32,
        lng: -117.50,
    },
    {
        name: "Brooklyn Bridge",
        authorName: "Jack",
        image: "https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/35650364_1776931032422996_4500933311673139200_n.jpg?_nc_cat=0&oh=acd5dbfbdddb0759e2a1e5626ac2f527&oe=5BAB7DAC",
        description: "There are pedestrian way in the middle of the bridge. You can also take Uber or Lyft to get a great view. To avoid potential crows, you need to be an early bird.",
        location: "Brooklyn Bridge, New York, NY",
        time: "12:00",
        date:"May 14th, 2018",
        system: "IOS",
        filter: "vivid cool",
        flash: "off",
        lat: 40.698,
        lng: -73.996,
    },
    {
        name: "Ponce City Market",
        authorName: "Jack",
        image: "https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/35634041_1776931182422981_8048744583577731072_n.jpg?_nc_cat=0&_nc_eui2=AeGJzrgIpzJhymE4mCXn1LHiko71XLM3H4lYYX8gjDV3nqrT6Wt_VwSrubi4R909oLgqmMYqRmOv_P5tAvprcb2gZLqeN3oO02CuuJaE0PL7Rg&oh=fa5e50c25908d39f1b860706ac05da84&oe=5BB9A476",
        description: "The stair is located at the first floor of ponce city market, which is a great view if you look from the second floor to first",
        location: "Atlanta, GA, USA",
        time: "17:55",
        date:"May 14th, 2018",
        system: "IOS",
        filter: "vivid cool",
        flash: "off",
        lat: 33.7489954,
        lng: -84.3879824,
  }
]

function seedDB(){
    console.log("start of seedDB");
   //Remove all campgrounds
    Photo.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed photos!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few photo
            data.forEach(function(seed){
                Photo.create(seed, function(err, photo){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a photo");
                        //create a comment
                        Comment.create(
                            {
                                text: "The photo looks great.",
                                author: "Ruby"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    photo.comments.push(comment);
                                    photo.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
