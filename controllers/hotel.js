const Mongoose = require('mongoose');
const Hotel = Mongoose.model('Hotel');
const Review = Mongoose.model('Review');




module.exports.create = ( req , res ) =>{

    let b = req.body;
    let hotelId = b.hotelId,
        name = b.name,
        city = b.city,
        address = b.address,
        rating = b.rating || 2,
        phoneNo = b.phoneNo,
        imageUrl = b.imageUrl

    let query = { hotelId, name , city, address,
                rating, phoneNo, imageUrl };
    
    Hotel.create( query ).then( doc =>{
        res.send({ status : true , data : doc })
    } ).catch( err => res.send({error : err}) )

}

module.exports.getOne = ( req , res ) =>{

    let hotelId = req.params.hotelId;

    Hotel.findOne({hotelId}).then( doc =>{
        res.send({ status : true , data : doc })
    } ).catch( err => res.send({error : err}) )

}

module.exports.getAll = ( req , res ) =>{


    Hotel.find({}).populate('reviews').then( doc =>{
        res.send({ status : true , data : doc })
    } ).catch( err => res.send({error : err}) )

}


module.exports.rate = ( req , res ) =>{

    let hotelId = req.params.hotelId,
        rate = req.params.rating;
    
    Hotel.findOne( { hotelId } ).populate('reviews').then( doc =>{
        var old = doc.rating,
            users = doc.ratedBy;
        var newRate = (( old * users ) + parseFloat(rate)) / ( users + 1 );
        doc.rating = newRate;
        doc.ratedBy = users + 1;
        doc.save()
        res.send({ status : true , data : doc })
    } ).catch( err => res.send({error : err}) )

}


module.exports.addReview = ( req , res ) =>{

    var b = req.body;
    let hotelId = req.params.hotelId,
        name = b.name, text = b.text, rating = b.rating;
    
    Review.create( { hotelId,name,text,rating } ).then( rev =>{

        Hotel.findOne( { hotelId } ).then( doc =>{
            var old = doc.rating,
                users = doc.ratedBy;
            var newRate = (( old * users ) + parseFloat(rating)) / ( users + 1 );
            doc.rating = newRate;
            doc.ratedBy = users + 1;
            doc.save()

            Hotel.findOneAndUpdate({hotelId}, { $push : { reviews : rev } } ) .then( hotel =>{

                res.send( hotel )
    
            } ).catch( err => res.send({error : err}) )

        } ).catch( err => res.send({error : err}) )    



    } ).catch( err => res.send({error : err}) )


}

module.exports.getReview =  ( req , res ) =>{

    let hotelId = req.params.hotelId

    Hotel.findOne({ hotelId }).populate('reviews')
        .then( hotel => res.send({ status : true , data : hotel.reviews }) )
        .catch( err => res.send({error : err}) )

}