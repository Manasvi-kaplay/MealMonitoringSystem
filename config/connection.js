var MongoClients=require("mongodb").MongoClient;
var url="mongodb+srv://manasvi:100Scholars@cluster1.p2nwh.mongodb.net/meals?retryWrites=true&w=majority"
module.exports.init=function(cb){
    MongoClients.connect(url,{ useNewUrlParser: true },{ useUnifiedTopology: true }, cb);
}   