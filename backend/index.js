const express = require("express");
const app = express();
const usermodel = require("./model");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname('public')));

app.post("/signup", async (req, res) => {
    const { name, age, email, password } = req.body;
    let user = usermodel.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    let users =  await usermodel.create({ name, age, email, password});
    let token = jwt.sign({ id: users._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully", users });

})

app.post('./login',async(req,res)=>{
    const {email,password} = req.body;
    let user = await usermodel.findOne({email:email});
    if(!user){
        return res.status(400).json({message:"User not found"});
    }
    if(user.password !== password){
        return res.status(400).json({message:"Invalid credentials"});
    }   
    let token = jwt.sign({id:user._id},"secretkey");
    res.cookie("token",token,{httpOnly:true});
    res.status(200).json({message:"Login successful",user});

})

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})