const bcrypt = require("bcrypt");
const User = require('../Model/model');


require("dotenv").config;


exports.signup = async (req,res)=>{

    try{
        const {firstName, lastName, email, password} = req.body;
        const role = "Student";

        const existingUser = await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({
                success: false,
                message: 'User already Exists',
            })
        }

        let hashedpassword;

        try{
            hashedpassword = await bcrypt.hash(password,10);
        }
        catch(err)
        {
            return res.status(500).json({
                success: false,
                message: 'error in hashing Password'
            })
        }


        const user = await User.create({
            firstName, lastName, email, password:hashedpassword, role
        })

        return res.status(200).json({
            success: true,
            message: 'User created Successfully'
        })
    }
    catch(error)
    {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'USer Cannot be registered, please try again later',
        })
    }
}

exports.login = async (req, res)=>{

    try{

        const {email, password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                success : "false",
                message : "fill the details Correctly"
            })
        }

        let usser = await User.findOne({email});


        if(!usser)
        {
            return res.status(401).json({
                success : "false",
                message : "user Not found"
            })
        }

        const Payload = {
            email : usser.email,
            id : usser._id,
            role: usser.role

        }

        if( await bcrypt.compare(password, usser.password))
        {
            return res.status(200).json({
               success : "true",
               message: "User Logged In succesfully"
            })
        }


        else{
        return res.status(403).json({
            success: false,
            message: "Password incorrect",
        });
    }
    


    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: true,
            message:"LOGIN FAILURE"
        })

    }
}