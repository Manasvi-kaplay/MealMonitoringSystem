var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var session=require("express-session");
var fileupload=require("express-fileupload");
var ejs=require("ejs");
var path = require('path');
var fs=require("fs");
const {spawn} = require('child_process');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:false,
  limit:'50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(express.static(__dirname+"/public"));
app.use(session({ secret : "TSS", saveUninitialized: true}));
app.use(fileupload());
app.use(require("./controller/default"));
app.post('/upload',function(req,res){
  var dataToSend;
  var date=new Date();
   var file_file=req.files.photo;
   var nameArr = file_file.name.split(".");
	var ext = nameArr[nameArr.length-1];
         file_file.name=req.session.userid+"-"+date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"."+ext;
         console.log("file_file.name...",file_file.name);
              var filepath = path.resolve("public/uploads/"+file_file.name);
              file_file.mv(filepath, function(err){
                     if(err){
                         console.log(err);
                         return;
                     }    
                 });
                 const python = spawn('python', ['countPeople.py',filepath]);
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend+=data.toString()
  });
  python.on('close', (code) => {
    console.log("code..",code);
    console.log("dataToSend..",dataToSend);
    res.send("No. of people having lunch: ",dataToSend);
  })
})
app.listen(process.env.PORT || 5500,function(){
    console.log("server started at port 5500");
});