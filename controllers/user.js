
const Mongoose = require('mongoose');
const User = Mongoose.model('User');


module.exports.createUser  = (req , res) =>{
    let b = req.body;
    let userId = req.userId;
    let name = req.name;

    let query = {
        userId,name
    }

    User.create( query , (err , data)=>{

        if(err){
            res.send({err})
        } else{
            res.send({data})
        }

    } )
    

}



module.exports.findUserbyUsername = (req , res) =>{

    var username = req.query.username;
    let query = {
        username
    }

    User.findOne(query , (err , data)=>{

        if(err){
            res.send({err})
        } else{
            res.send({data})
        }

    })

}


