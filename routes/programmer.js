// for routing we need express as well as router from express

const express= require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Programmer = require('../models/programmer.js')

//read data and also get data by query
/*  GET : http://localhost:9000/programmer   {fetch all programmers}*/
// send req to database thats why we use async await here
router.get('/', async(req,res)=>{
   try {
     //its async means callback funct
     //we can create static find method for query
     // const programmers = await Programmer.find({name : 'rusha'});
     const query = req.query
     const programmers = await Programmer.find(query);

     //res.send will give normal text format and res.json will give json format
     res.json(programmers);


   } catch (err) {
     res.send('Error' + err);
   }
})


/*POST :  http://localhost:9000/programmer  {send data from clinet -> server}*/
//create data
router.post('/',async(req,res)=>{
  // create object for storing data clinet -> Server
  const programmer = new Programmer({
    name:req.body.name,
    tech:req.body.tech,
    subscription:req.body.subscription
  })

try {
  const data = await programmer.save()
  //same data ca be viewed y client
  res.json(data)
} catch (err) {
  res.send("Error "+ err)
}
 // console.log(req.body);
})



/*GET : http://localhost:9000/programmer/<id>  {it gives only one programmer*/
//get data of specific id
router.get('/:id',async(req,res)=>{
try {
 const result = await Programmer.findById(req.params.id)

 if(!result){
   return  res.status(404).json({
        msg:"Programmer Not Found "
   });
 }

  res.json(result)
 console.log(result);
} catch (err) {
  res.send('Error' + err);
}
})


/*  DELETE :  http://localhost:9000/programmer/<id>  {for Delete specific programers data}*/
//delete specific data by their id
router.delete('/:id',async (req,res)=>{
  try {
    const programmer2 = await Programmer.findByIdAndDelete(req.params.id)

    if(!programmer2){
      return res.status(404).json({
           msg:"Programmer Not Found "
      });
    }
    res.json({
      msg:'Successfully Deleted',
      data:programmer2
    })
  }catch (err) {
    res.send("Error"+err);
  }
})


/*  PATCH :  http://localhost:9000/programmer/<id>  {for updating specific programers data}*/
// update data of specific user by id
router.patch('/',async(req,res)=>{
  try {

   const programmer3 =await Programmer.findById(req.query.id)

  if(!programmer3){
    return res.status(404).send("Programmer Not Fount With "+ req.params.id + " Id")
  }

  programmer3.subscription = req.body.subscription;

  const data = await programmer3.save()

   res.json(data)
   console.log(data);
  } catch (err) {
    res.send("Error"+err)
  }
})




module.exports = router;
