const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/userModel');
const fetchStudentData = require('../utils/fetchStudentData');
const gender = require('../utils/gender');
const sendEmail = require('../utils/sendEmail');

const userLogin = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    const user = await User.findOne({ rollNo });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    if(!user.isVerified){
      return res.status(200).json({success:false,status:200,message:'User not verified',data:{}});
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    return res.status(200).json({ success:true,message:"login successful.", token,data:user });
  } catch (error) {
    return res.status(500).json({ success:false,message: 'Server Error', error });
  }
};
const userRegister = async (req, res) => {
  try {
    const { rollNo, password, year } = req.body;
    const user = await User.findOne({ rollNo });
    if (user) {
      return res.status(400).json({ success:false,message: 'User already exists',data:{} });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await fetchStudentData(rollNo);
    const { studentName, specialization, section, email } = await response;
    const studentGender= await gender(studentName);

    const newUser = await User.create({
      rollNo,
      name: studentName,
      branch: specialization,
      email,
      year,
      section,
      gender: studentGender,
      password: hashedPassword,
      isVerified: false,
    });
    await newUser.save();
    token= jwt.sign({ _id: newUser._id }, process.env.JWT_P_SECRET, { expiresIn: '10m' });
    if(sendEmail(email,'Verify Your Email','','Please click on the link to verify your email address. <a href="https://nsutorbit.techpi.me/verify?secret='+token+'">Click here to verify</a>')){
      return res.status(200).json({ success:true,status:200,message:'User Registered Successfully',data:newUser });
    }
    else{
      return res.status(500).json({ error: 'Server Error' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server Error' + error });
  }
};
const verifyStudent = async(req, res) => {
  try{
      const userId = req.body._id;
      const user = await User.findById(userId);
      if(!user){
          return res.status(400).json({ error: 'User not found' });
      }
      user.isVerified = true;
      await user.save();
      user.password = undefined;
      token= jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({success:true,status:200,message:'User Verified Successfully',data:user,token});

  }
  catch(error){
      return res.status(500).json({success:false,status:500,error:'Server Error'});
  }
};
module.exports = { userLogin, userRegister,verifyStudent};
