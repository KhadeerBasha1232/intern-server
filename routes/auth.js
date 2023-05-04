const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');



const JWT_SECRET = 'khadeerisaboy';

router.post('/createuser', [
  body('email', "Enter a valid Email").isEmail(),
  body('name', "Enter a Valid Name").isLength({ min: 3 }),
  body('password', "ENter a Password more than 5 digits").isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success :success , errors: errors.array() });
  }
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success :success , error: "User with email already exists" })
    }
    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user : {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data , JWT_SECRET)
    success = true;
    res.json({
      success :success,
      authtoken
    })
  }
  catch (error) {
    console.log(error.message)
    res.status(500).send("some error occured")
  }

})


router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', "password cannot be blank").exists(),
], async (req, res) => {

let success = false;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success : success,errors: errors.array() });
  }

  const {email,password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user){
      res.status(400).json({success : success,"message":"Please try to login with correct credentials"})
    }


    const passwordCompare = await bcrypt.compare(password,user.password);
    if (!passwordCompare){
      res.status(400).json({success : success , "message":"Enter the correct Password"})
    }

    const data = {
      user : {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data , JWT_SECRET)
    success = true;
    res.json({
      success : success,
      authtoken
    })

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error") 
  }

})


router.post('/getuser', fetchUser,async (req, res) => {
try {
  userid = req.user.id;
  const user = await User.findById(userid).select("-password")
  res.send(user)
}  catch (error) {
  console.log(error.message)
  res.status(500).send("Internal server error") 
}
})

module.exports = router