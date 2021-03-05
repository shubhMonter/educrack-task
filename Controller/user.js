const express = require('express')
const User = require("../Model/rent");
const bcrypt = require('bcryptjs');
const RegisterValidation = require("../Validator/register");
const secretOrKey = 'abcdefg'
const Register = async(req,res) =>{
 try {
     const {email,password} = req.body;
     const {errors,isValid} = RegisterValidation(req.body);
     if(!isValid){
             return res.status(203).send({status:false,message:'Fields Are Not Valid',errors});
     }
     const userExist = await User.find({email});
    if(!userExist){
        const user = new User({
            email,
            password
        });
             bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) throw err;
                  user.password = hash;
                 user
                    .save()
                    .then(user => res.send({ status: true, message: "Admin added sucessfully" }))
                    .catch(err =>{ 
                        console.log(err);
                        res.status(400).status.json({errors:err});
                    });
                });
              });

    }else{
       return res.status(203).send({status:false,message:'User Already Exist'});
    }

 } catch (err) {
    console.log(err);
    return res.status(400).status.json({errors:err});
 }

}

const Login = async(req,res) =>{

    console.log(req.body);
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const {email,password} = req.body
  
    // Find user by email
   
        User.findOne({ email ,admin:true}).then(user => {
          //check for user
          if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
          }
          // Check Password
          bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
              // User Matched
              const payload = { id: user.id, name: user.email }; // Create JWT Payload
  
              // Sign Token
              jwt.sign(
                payload,
                secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user:admin
                  });
                }
              );
            } else {
              errors.password = 'Password incorrect';
              return res.status(400).json(errors);
            }
          });
  
        }).catch(err=>{
            console.log(err);
            res.status(203).send({status:false,message:'something went wrong!!'})
        });

}

module.exports = {
    Register,
    Login
}