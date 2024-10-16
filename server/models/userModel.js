const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  rollNo:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  branch:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  year:{
    type:String,
    required:false
  },
  gender:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  section:{
    type:String,
    required:true
  },
  isVerified:{
    type:Boolean,
    required:true
  }

});
module.exports = mongoose.model('StudentDetails', studentSchema);
