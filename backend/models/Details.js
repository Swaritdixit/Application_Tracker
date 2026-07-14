const mongoose=require('mongoose');
const detailsSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    type:{
        type:String,
         required:true,
         enum:['Placement','Internship']
       },
       applied:{
           type:Date,
           default:Date.now
       },
       important:{
            type:String
       },
       result:{
        type:String,
       },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true  
    }

},
{
    timestamp:true
});
module.exports=mongoose.model("Details",detailsSchema);