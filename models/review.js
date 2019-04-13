var mongoose = require('mongoose');
var Schema = mongoose.Schema


var rideSchema = new Schema({
    
    name : String,
    userId : String,
    text : String

});


module.exports = mongoose.model('Review' , rideSchema);