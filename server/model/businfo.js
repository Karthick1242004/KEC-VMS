const mongoose=require('mongoose')

const BusinfoSchema=new mongoose.Schema({
  id:{
    type:String,
    required:true,
  },
  driver_name:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
  },
  vehicle_number:{
    type:String,
    required:true,
    maxLength:20,
    trim:true
  },
  vehicle_company:{
    type:String,
    required:true
  },
  engine_type:{
    type:String,
    required:true,
  },
  department:{
    type:String,
    required:true,
  },
  last_service:{
    type:Date,
    required:true,
    trim:true
  },
  next_service:{
    type:Date,
    required:true,
    trim:true
  },
})
module.exports=mongoose.model('infobus',BusinfoSchema);

