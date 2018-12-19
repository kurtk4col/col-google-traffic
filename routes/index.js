const dotenv = require ('dotenv').config();
var express = require('express');
var router = express.Router();

const cloudinary = require('cloudinary').v2; // Make sure to use v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index.js");
  cloudinary.api.resources(function(error, result) {
    console.log("inside cloudinary");
    //console.log(result);
    res.render('index', { title: 'Express', images: result });
  });
  
});

module.exports = router;
