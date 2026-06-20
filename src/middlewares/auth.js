const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req,res,next)=> {
    // we need to read the cookie
    try{
        const cookies = req.cookies
    const {token} = cookies 
    if (!token) {
        return res.status(401).send("please log in")
    } 
    const DecodedObj = await jwt.verify(token , "DEV@#TIND@ER123")
    const {_id} = DecodedObj 

    const user = await User.findById(_id)
    if (!user) {
        return res.status(404).send("User not found")
    }
    req.user = user
    next()
}catch (err) {
    if (res.headersSent) return next(err)
    return res.status(400).send("ERROR " + err.message)
}

}

module.exports = { userAuth, }