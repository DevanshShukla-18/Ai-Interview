const userModel = require("../models/user.modle");
const tokenBlacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



/**
 * @name registerUserController
 * @description Register a new user, expects username,email,password
 * @access Public
 */
async function registerUserController(req,res){

    const { userName, email, password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({message: "Please provide userName, email and password"});
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{userName},{email}]
    });

    if(isUserAlreadyExist){
        return res.status(400).json({message: "Account already exist with this email address or username."});
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        userName,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id,
        userName: user.userName,
    },process.env.JWT_SECRET, {expiresIn: "1d"});

    res.cookie("token", token);

    res.status(201).json({message: "User created successfully.",user:{
        id: user._id,
        userName: user.userName,
        email: user.email
    }});
}

/**
 * @name loginUserController
 * @description Login a user, expects email and password in request body
 * @access Public
 */
async function loginUserController(req,res){
    const { email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Must enter email and password for login"});
    }

    const user = await userModel.findOne({
        email
    });

    if(!user){
        return res.status(400).json({message: "Invalid email"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign({
        id: user._id,
        userName: user.userName
    },process.env.JWT_SECRET,{expiresIn: "1d"});

    res.cookie("token",token);

    res.status(200).json({message: "User login successfully.",user:{
        id: user._id,
        userName: user.userName,
        email: user.email
    }})
}

/**
 * @name logoutUserController
 * @description User can logout using this api
 * @access Public
 */
async function logoutUserController(req,res){

    const token = req.cookies.token;

    if(token){
        await tokenBlacklistModel.create({token});
    }

    res.clearCookie("token");

    res.status(200).json({message: "User logged out successfully."});
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access private
 */
async function getMeController(req,res){

    const user = await userModel.findById({
        _id: req.user.id
    });

    res.status(200).json({
        message: "User fetched successfully",
        user:{
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    })
}

module.exports = { registerUserController, loginUserController, logoutUserController, getMeController};