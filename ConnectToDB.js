const mongoose = require('mongoose');

const MongoURI = "mongodb+srv://awais:19ntu1151@todo-app.nsjx3hg.mongodb.net/Awais";

const ConnectToDB = async() =>{
 await mongoose.connect(MongoURI)
 console.log("MongoDB is  Connected")
}


 module.exports = ConnectToDB;