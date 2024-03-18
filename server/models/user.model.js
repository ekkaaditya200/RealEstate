import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
},{timestamps:true});

// timestamps which is going to tell the mongodb to record the time of cereation of user and update of user

const User = mongoose.model('User',userSchema);

export default User;