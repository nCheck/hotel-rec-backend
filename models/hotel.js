var mongoose = require('mongoose');
var Schema = mongoose.Schema


var studentSchema = new Schema({
    
    hotelId : String,
    name : String,
    city : String,
    address : String,
    rating : Number,
    phoneNo : String,
    imageUrl : String,
    ratedBy : {
        type : Number,
        default : 3,
        required : true
    },
    reviews : [{type : Schema.Types.ObjectId, ref: 'Review'}]

});


module.exports = mongoose.model('Hotel' , studentSchema);