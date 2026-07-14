const router=require('express').Router();
const{createDetails,getDetails,updateDetails,deleteDetails}=require("../controllers/detailsController");
const {protect}=require("../middleware/authMiddleware");


router.post("/",protect,createDetails);
router.get("/",protect,getDetails);
router.put("/:id",protect,updateDetails);
router.delete("/:id",protect,deleteDetails);
module.exports=router;


