var express=require("express");
var router=express.Router();
router.get('/',function(req,res){
    var pagedata={"title":"Home page","pagename":"Home"}
    res.render("layout",pagedata);
})
module.exports=router;