const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String,
        minlength:6,
        match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one special character.'
    ]
    }},
    {
timestamps:true
    
});
module.exports=mongoose.model("User",userSchema);