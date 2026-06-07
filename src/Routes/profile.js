const express = require("express")
const {userAuth} = require("../middlewares/auth.js")
const {validateEditProfileData} = require("../utils/validation.js")
const User = require("../models/user")
const bcrypt = require("bcrypt")



const profileRouter = express.Router()

profileRouter.get("/profile/view",userAuth, async (req,res) => {
    try {
        const user = req.user
        res.send(user)
    }catch (err) {
        res.status(400).send ("Please log in to access the profile  " + err.message)
    } 
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit data")
    }

    const loggedInUser = req.user
    


    const updates = Object.keys(req.body)
    console.log(loggedInUser)


    if (updates.length === 0) {
      throw new Error("No update data provided")
    }

    updates.forEach((field) => {
      loggedInUser[field] = req.body[field]
    })

    await loggedInUser.save()
    res.send({ message: ` ${loggedInUser.firstName} your Profile updated successfully`, user: loggedInUser })
  } catch (err) {
    res.status(400).send("you're unable to edit this profile " + err.message)
  }
})

profileRouter.patch("/profile/forgotPassword", userAuth,  async (req,res)=> {
  console.log("route hit")
  try{
    const {password,email} = req.body 
    const  user = await User.findOne({email:email})
    console.log(password)

    if(!user) {
        throw new Error("user not found ")
    }

    const passwordHashed = await bcrypt.hash(password,10)
    console.log(passwordHashed)

    user.password = passwordHashed
    await user.save()
    res.send("profile password updated successfully")
  }catch(err) {
    res.status(400).send("Error " + err.message )
  }

}
)



module.exports = profileRouter;