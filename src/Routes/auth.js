const express = require("express")
const {userAuth} = require("../middlewares/auth.js")
const User = require("../models/user")
const {validationSignup} = require("../utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")

const AuthRouter = express.Router()

AuthRouter.post("/signup", async (req,res)=> {

    //validation
    try{
     validationSignup(req)

    // encryption 
    const  {firstName, lastName, email, password} = req.body
    
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash)

        const user = new User({
            firstName,lastName,email,password: passwordHash
        })
    
    await user.save()
    res.send("user added successfully")
    }catch (err) {
        res.status(400).send("Getting error to save the user " + err.message)
    }
})

AuthRouter.post("/login",async (req,res)=> {
    try{
        const {email,password} = req.body 

        if (!validator.isEmail(email)) {
            throw new Error("email is not a valid please enter a valid email id")
        }

        const user = await User.findOne({email : email}) 
        if (!user) {
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid = await user.validatePassword(password)    

        if (isPasswordValid) {
            const token = await user.getJWT()
            res.cookie("token",token, {expires: new Date(Date.now() +1 * 3600000),})
            res.send(user)
        }else {
            throw new Error("Invalid Credentials")
        }
    }catch (err) {
        res.status(400).send ("ERROR: " + err.message)
    }
})

AuthRouter.post("/logout",async (req,res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now())
    })
    res.send("You're logged out successfully")
})

module.exports = AuthRouter