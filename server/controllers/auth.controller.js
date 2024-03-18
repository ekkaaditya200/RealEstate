import User from '../models/user.model.js';
import { errorHandler } from '../utls/error.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const newUser = await User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User is created successfully!");
    } catch (error) {
        next(error);
        // next(errorHandler(440,"Error from function")); //Sometimes we want to send the custom error so we need custome error function 
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, 'Invalid Cridential !'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid Cridential !'));
        }
        // if the both email and password is correct we need to authenticate the user by adding cookie inside the browser we need to create the hash token that includes the email of the user or the id of the user, and we save the token inside the browser cookie. For this we will use jwt token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }
    catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) //If user exist then save the data to cookie with jwt token
        {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
        else {
            //as we are doing sign in we need a password 
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const newUser = new User({ username: req.body.name.split(" ").join("".toLowerCase()) + Math.random().toString(36).slice(-4), email: req.body.email, password: generatedPassword, avatar: req.body.photo });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = async(req,res,next)=>{
    try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out');
    }catch(error){
        next(error);
    }
}