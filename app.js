
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/Programmer'
const BodyParser = require('body-parser');
//start express framework
const app = express();


//connect database with url and for avoiding warning
mongoose.connect(url,{useNewUrlParser : true})

const con = mongoose.connection

con.on('open',()=>{
  console.log('Database Connected..!');
})

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended :true}));

// app.use(express.json())

//creating router
const programmerRouter =require('./routes/programmer')
//use middleware  for mentioning url : for all the programmers req  we have to
//send req to programmerRouter
app.use('/programmers', programmerRouter)



const port = 9000;
app.listen(port,()=>{
  console.log("Server is strated on PORT : " + port);
})
