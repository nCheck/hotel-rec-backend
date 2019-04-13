var mongoose = require('mongoose');
var Schema = mongoose.Schema


var rideSchema = new Schema({
    
    name : String,
    userId : String,
    text : String,
    rating : Number

});


module.exports = mongoose.model('Review' , rideSchema);