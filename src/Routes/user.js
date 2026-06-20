const express =  require("express");
const ConnectionRequest = require("../models/connectionRequest")
const {userAuth}  = require("../middlewares/auth")
const User = require("../models/user")

const userRouter =  express.Router()

const SAFEDATA = "firstName lastName age gender skills photoUrl about";

userRouter.get("/user/request/received",userAuth,async (req,res)=> {
    try{
        const loggedinUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        toUserId : loggedinUser._id,
        status : "interested"
    }).populate("fromUserId", SAFEDATA)
    res.json({
        message : "Data fetched Successfully",
        data : connectionRequest
    })
    }catch (err) {
        res.status(400).send("ERROR "  + err.message)
    }


})

userRouter.get("/userConnections", userAuth, async (req,res)=> {
   try { 
    const loggedinUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
        $or : [
            {toUserId : loggedinUser._id,status : "accepted"},
            {fromUserId : loggedinUser._id,status : "accepted"}
        ],
    }).populate("fromUserId", SAFEDATA).populate("toUserId", SAFEDATA)

    const data = connectionRequest.map((row)=> {
        if(row.fromUserId._id.toString() === loggedinUser._id.toString()) {
            return row.toUserId;
        }
        return row.fromUserId;
    })

    res.json({
        data 
    })
   }catch (err) {
    res.status(400).send("ERROR: "+ err.message )
   }
})

userRouter.get("/feed", userAuth, async (req,res)=> {
    try { 
    const loggedinUser = req.user
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10 
    limit = limit > 50 ? 50 : limit 
    const skip = (page -1 ) * limit 

    const connectionRequest = await ConnectionRequest.find({
        $or : [
            {fromUserId: loggedinUser._id.toString()},
            {toUserId: loggedinUser._id.toString()},
        ]
    }).select("fromUserId toUserId")

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
        hideUsersFromFeed.add(req.fromUserId.toString()),
        hideUsersFromFeed.add(req.toUserId.toString())
    })  
    const users = await User.find({
       $and :  [ 
            { _id : {$nin : Array.from(hideUsersFromFeed)}},
            { _id : {$ne : loggedinUser._id}}       
    ]
    }).select(SAFEDATA).skip(skip).limit(limit)
    res.json({
        message : users
    })
}catch (err) {
    res.status(400).send("ERROR " + err.message)
}
})

module.exports = userRouter;