const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

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