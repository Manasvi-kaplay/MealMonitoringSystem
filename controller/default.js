var express=require("express");
var router=express.Router();
router.use("/authentication",require("./authentication"))
router.use("/home",require("./home"))
router.use("/uploadData",require("./uploadData"))
module.exports=router;