var express=require("express");
var router=express.Router();
var crypto=require("crypto");
var allQueries=require("../model/allQueries")
router.post('/',function(req,res){
var email=req.body.email;
var password=req.body.password;
allQueries.findWhere("registeredSchools",{email:email},function(err,user){
    if(err){
        res.status(400).json({status:0,error:err});
    }
    if(user.length==0){
        res.status(400).json({status:0,error:"No user found!"});
    }
    else{
        console.log("user[0]..",user[0])
        var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
        var mystr = mykey.update(user[0].password, 'hex', 'utf8');
        mystr += mykey.final('utf8');
        if(mystr==password){
            req.session.userid = user[0].id;
            req.session.is_user_logged_in=true;
            //res.status(200).json({status:1,result:"Successful login","details":req.session});
            var pagedata={"title":"School profile","pagename":"SchoolProfile","district":user[0].district,"school":user[0].school,"address":user[0].address,"phone":user[0].phone,"id":user[0].id}
            res.render("layout",pagedata);
        }
        else{
            res.status(400).json({status:0,error:"Incorrect password!"});
        }
    }
})
})
router.post('/signup',function(req,res){
    var school=req.body.school;
    var district=req.body.district;
    var address=req.body.address;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;
    var id="";
    id=id+district+"-"+school.split(" ")[0]+"-"+email.split("@")[0];
    console.log("id..",id);
    var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    var mystr = mykey.update(password, 'utf8', 'hex');
    mystr += mykey.final('hex');
    var obj={"school":school,"district":district,"address":address,"phone":phone,"email":email,"password":mystr,"id":id};
    allQueries.insert("registeredSchools",obj,function(err,result){
        if(err){
            res.status(400).json({status:0,error:err});
        }
        if(result){
            res.status(200).json({status:1,result:result});
        }
    })
})
module.exports=router;