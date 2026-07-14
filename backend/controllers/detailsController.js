const details=require("../models/Details");
const createDetails=async(req,res)=>{
    try{
        const {name,type,applied,important,result}=req.body;
        if(!name||!type)
        {
            return res.status(400).json({message:"Fill all details"});
        }
        const newDetails=await details.create({
            name,
            type,
            applied,
            important,
            result,
            user:req.user.id
        });
        return res.status(200).json(newDetails);

    }catch(err)
    {
       return res.status(500).json({message:"Error Adding"});
    }
}
const getDetails=async(req,res)=>{
    try{
        const allDetails=await details.find({user:req.user.id}).sort({applied:-1});
        res.status(200).json(allDetails);
    }
    catch(error)
    {
        return res.status(500).json({message:error.message});
    }
}
const updateDetails=async(req,res)=>{
    try{
        const {name,type,applied,important,result}=req.body;
        const allDetails=await details.findById(req.params.id);
        if(!allDetails)
        {
            return res.status(404).json({message:"Note not found"});
        }
        if(allDetails.user.toString()!==req.user.id)
        {
                    return res.status(403).json({message:"Not authorized to update this note"});
        }
        const updateDetails=await details.findByIdAndUpdate(req.params.id,{
            name,type,applied,important,result
        },{new:true});
        res.status(200).json(updateDetails);
        
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}
const deleteDetails=async(req,res)=>{
    try{
      const deleteDetail=await details.findById(req.params.id);
      if(!deleteDetail)
      {
        return res.status(400).json({message:"Not Found"});
      }
      if(req.user.id!==deleteDetail.user.toString())
      {
        return res.status(400).json({message:"Not Authorised"});
      }
      await details.findByIdAndDelete(req.params.id);
      return res.status(200).json({message:"Deleted"})
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
module.exports={deleteDetails,updateDetails,getDetails,createDetails};