var connection=require("../config/connection");
module.exports.insert=function(collection_name,obj,cb){
    connection.init(function(err,client){
        var db = client.db('meals');
    db.collection(collection_name).insert(obj,cb)
    });
}
module.exports.findWhere=function(collection_name,obj, cb){
	connection.init(function(err, client){
		var db = client.db('meals');
		db.collection(collection_name).find(obj).toArray(cb);
	});
}