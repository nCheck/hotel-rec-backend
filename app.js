var app = require('express')();
var http = require('http').Server(app); //Server
const port  = process.env.PORT || 3000;
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');







//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



//DB

require('./models/db')

//Authorization

// app.use(basicAuth({
//   authorizer: myAsyncAuthorizer,
//   authorizeAsync: true,
// }))

// function myAsyncAuthorizer(username, password, cb) {
//   if (username.startsWith('A') && password.startsWith('secret'))
//       return cb(null, true)
//   else
//       return cb(null, false)
// }



//Routes

var userRoutes = require('./routes/api');


app.use('/', userRoutes)

app.get('/request', function(req, res){
  res.sendFile( __dirname + '/views/request.html' )
});

app.get('/', function(req, res){
    res.sendFile( __dirname + '/views/driver.html' )
  });




app.get('/login', (req , res)=>{

  res.send(req.headers)

})

app.get('/test', (req , res)=>{
  res.send({test : true})
})


http.listen(port, function(){
  console.log('listening on *:3000');
});