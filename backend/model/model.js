const mongoose = require('mongoose');

const uri = "mongodb+srv://sauravthakulla683_db_user:wWL6Cd5TgQkhoPgZ@aegios.9oay7q6.mongodb.net/AegiosDB?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: { type: String },
    age: Number,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;