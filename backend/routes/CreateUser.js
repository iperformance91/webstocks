const express = require('express')
const router = express.Router();
const User = require('../models/User')
const {body , validationResult} = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWTSECRET =  "loveisthesecretofallissues"

router.post("/createuser" , [
    body('email').isEmail(),
    body('name').isLength({min : 5}),
    body('password' ,'Incorrect Password').isLength({min : 5})]
 , async (req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }
        const salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(req.body.password , salt);
        await User.create({
            name : req.body.name , 
            email : req.body.email,
            password :secpassword,
            location : req.body.location
        })

        res.json({success : true});
    }catch(err){
        console.log(err)
        res.json({success : false});
    }
})

router.post("/loginuser" , async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    try{
        let userdata =await User.findOne({email});
        if(!userdata){
            return res.status(400).json({errors : "Try logging with Valid Credentials"})
        }

        const passwordcomp = await bcrypt.compare(password , userdata.password)

        if(!passwordcomp){
            return res.status(400).json({errors : "Try logging with Valid Credentials"})
        }

        const data = {
            user : {
                id : userdata.id
            }
        }
        const authToken = jwt.sign(data , JWTSECRET)
        return res.status(200).json({success : true , authToken : authToken})
    }catch(err){
        console.log(err)
        res.json({success : false});
    }
})

module.exports = router;

