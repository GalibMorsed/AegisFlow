const mongo = require(`mongoose`);
mongo.connect('mongodb://127.0.0.1:27017/Ageios')
const userschema = mongo.Schema({
    name:{
        type:String
    },
    age:Number,
    email:String,
    password:String
})

const users = mongo.model('user',userschema);
module.exports=users;