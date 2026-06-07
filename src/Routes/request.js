const express = require("express")
const {userAuth} = require("../middlewares/auth.js")
const ConnectionRequest = require("../models/connectionRequest.js")
const User = require("../models/user.js")
const ConnectionRequestModel = require("../models/connectionRequest.js")

const requestRouter = express.Router()

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=> {
    try {
        const fromUserId = req.user._id
        if (!fromUserId) {
            throw new Error("Authenticated user id not found")
        }

        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["interested","ignored"] 
        if(!allowedStatus.includes(status)) {
            return res.status(400).send("Error : Entered a invalid Status")
        }

        const toUser = await User.findById(toUserId) 
        if(!toUser) {
            return res.status(404).send("user is  not found in DB Collection")
        }

        const existingconnectionRequest = await ConnectionRequest.findOne({
        $or: [
            {fromUserId, toUserId},
            {fromUserId : toUserId, toUserId : fromUserId},
        ],  
        })
        if(existingconnectionRequest) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await connectionRequest.save()
        res.json({
            message: "Connection request sent succesfully! ",
            data,
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message )
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req,res)=> {
    const loggedInUser = req.user;
    const {status,requestId} = req.params

    const allowedStatus = ["accepted","rejected"]
    if(!allowedStatus.includes(status)) {
        throw new Error("invalid satus! ")
    }

    const connectionRequest = await ConnectionRequest.findOne({
        toUserId : loggedInUser._id,
        _id : requestId,
        status : "interested"
    })
    if(!connectionRequest) {
        return res.status(404).json({
            message: "connection Request not found"
        })
    }
    connectionRequest.status = status;

    const data = await connectionRequest.save()

    res.json({
        message : "connection request is " + status, data
    })

})

module.exports = requestRouter;