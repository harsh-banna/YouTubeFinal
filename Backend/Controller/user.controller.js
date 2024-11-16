import userModel from "../Model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function signup (req,res){
  try{
    const {username,email,password}=req.body;

    let existinguser = await userModel.findOne({email});
    if(existinguser){
        return res.status(500).json({
            success:false,
            message:"user exist",
        })
    }
    
    // hass password with the help of bcrypt
    let hashpassword;
    try{
        hashpassword=await bcrypt.hash(password,10);
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"ERROR IN HASHING PASS"
        })
    }

    const user = await userModel.create({
        username,email,password:hashpassword,image:`https://api.dicebear.com/5.x/initials/svg?seed=${username}`
    })
    return res.status(201).json({
        success:true,
        message:"user created successfully",
    });}
    catch(err){

        console.log(err);
        return res.status(500).json({
            success:false,
            message:"user cant be registerd"
        })
    }

  }

  export async function login(req,res) {
    try {
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"enter all details"
            })
        }
        let user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user not found"
            })
        }
        let payload={
            email:user.email,
            id:user._id,
        }
        if(await bcrypt.compare(password,user.password)){
            let token=jwt.sign(payload,"harsh");

            user=user.toObject();
            user.token=token;
            user.password=undefined;

            res.cookie("harsh",token).status(200).json({
                success:true,
                token,
                user,
                message:"user login  done"
            })
        }
        }catch (error) {
        res.status(500).json({
             success:false,
             message:"LOGIN FAILED"
        })
    }
  }