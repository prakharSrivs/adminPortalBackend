require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cors = require("cors")
const Event = require('./Schema/EventSchema');
const User = require('./Schema/UserSchema');
const authenticateJWT = require("./Middlewares/authorize");

const app=express();

const dbUrl=process.env.DB_URL || "mongodb://localhost:27017/adminPortal";

mongoose.connect(dbUrl).then(()=>{
    console.log("Database Connected Successfully")
})
.catch((e)=>{
    console.log("Error Connecting to the database")
    console.log(e)
})


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get("/events",authenticateJWT,async (req,res)=>{
    try{
        const events = await Event.find();
        return res.status(200).json(events);
    }
    catch(e){
        console.log(e)
        return res.status(500).json({message:"Unable to Complete the Request, Internal Server Error"})
    }

})

app.post("/user/signup",async(req,res)=>{
    const { username, email, password } = req.body;
    if(!(username || email || password )) return res.status(400).json({message:"Fields Missing Information "});

    const user = await User.find({email});
    console.log(user)
    if(user.length) return res.status(403).json({message:"User Already Exists"});

    const hashedPassword = await bcrypt.hash(password,12);
    
    try{
        const userObject = {
            name:username,
            email,
            hashedPassword
        }
        const newUser = new User(userObject);
        await newUser.save();
        const token = jwt.sign({id:newUser.id,name:newUser.username},process.env.SECRET,{expiresIn:"30m"})
        return res.status(200).json({
            message:"User Created Successfully",
            token,
            username:newUser.username,
            userId:newUser.id,
        })
    }
    catch(e){
        return res.status(500).json({message:"Internal Server Error, Cannot Create User"})
    }
})

app.post("/user/login",async(req,res)=>{
    const { email,password }=req.body;

    if(!(email || password)) return res.status(400).json({message:"Fields Missing Information"});

    const [ user ] = await User.find({email});
    if(!(user)) return res.status(401).json({message:"Invalid Credentials "});

    try{
        if(await bcrypt.compare(password,user.hashedPassword)) {
            const token = jwt.sign({id:user.id,name:user.username},process.env.SECRET,{expiresIn:"30m"})
            return res.status(200).json({
                message:"User LoggedIn Successfully",
                token,
                username:user.username,
                userId:user.id,
            })
        }
        else return res.status(401).json({message:"Invalid Credentials"});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({message:"Internal Server Error, Please Try after some time"})
    }
})

app.get('/users',authenticateJWT,async(req,res)=>{
    const users = await User.find();
    return res.json(users)
})

app.post("/events/add",authenticateJWT,async (req,res)=>{
    const { eventHeading,eventDesc,eventDate,eventTime,eventLocation,eventImgUrl,eventLink } = req.body;

    if (!(eventHeading || eventDesc || eventDate || eventTime || eventLocation || eventImgUrl || eventLink))
    return res.status(400).json({message:" Fields Missing Information "});   

    try{
        const eventObject = { 
            heading:eventHeading,
            description:eventDesc,
            date:eventDate,
            time:eventTime,
            location:eventLocation,
            imageURL:eventImgUrl,
            link:eventLink };
        const event = new Event(eventObject);
        await event.save();
        return res.status(200).json({message:"Event Added Successfully "});
    }
    catch(e){
        console.log(e)
        return res.status(500).json({ message:"Internal Server Error, Please Try after some time",error:e })
    }    
})

app.listen(4000,()=>{
    console.log("Listening on Port 4000")
})