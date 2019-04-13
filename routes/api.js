var express		= require('express');
var router    = express.Router();
var mongoose = require('mongoose');
const Hotel = require('../controllers/hotel');
const User = require('../controllers/user');


router.route('/hotel/create')
  .post( Hotel.create )


router.route('/hotel/:hotelId')
        .get( Hotel.getOne )



router.route('/hotels')
    .get( Hotel.getAll )


router.route('/hotel/:hotelId/rate/:rating')
    .get( Hotel.rate )


router.route('/hotel/:hotelId/review')
    .post( Hotel.addReview )
    .get( Hotel.getReview )






module.exports = router;