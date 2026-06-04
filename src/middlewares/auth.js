const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req,res,next)=> {
    // we need to read the cookie
    try{
        const cookies = req.cookies
    const {token} = cookies 
    if (!token) {
        throw new Error("invalid token......!")
    } 
    const DecodedObj = await jwt.verify(token , "DEV@#TIND@ER123")
    const {_id} = DecodedObj 

    const user =await User.findById(_id)
    if (!user) {
        throw new Error("User is not Found")
    }
    req.user = user
    next()
}catch (err) {
    res.status(400).send("ERROR " + err.message)
}

}

module.exports = { userAuth, }