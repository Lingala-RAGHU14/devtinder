const express = require("express")
const {userAuth} = require("./middlewares/auth.js")
const User = require("./models/user")
const {validationSignup} = require("./utils/validation")
const bcrypt = require("bcrypt")
const validator = require("validator")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

const authRouter = require("./Routes/auth.js")
const profileRouter = require("./Routes/profile.js")
const requestRouter = require("./Routes/request.js")
const userRouter = require("./Routes/user.js")

const connectDB = require("./config/database.js")
const app = express() 

app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
// express gave direct json covert to js object

// put the data into DB


// app.post("/login",async (req,res)=> {
//     try{
//         const {email,password} = req.body 

//         if (!validator.isEmail(email)) {
//             throw new Error("email is not a valid please enter a valid email id")
//         }

//         const user = await User.findOne({email : email}) 
//         if (!user) {
//             throw new Error("Invalid Credentials")
//         }
//         const isPasswordValid = await user.validatePassword(password)    

//         if (isPasswordValid) {
//             const token = await user.getJWT()
//             res.cookie("token",token, {expires: new Date(Date.now() +1 * 3600000),})
//             res.send("you're logged in successfully")
//         }else {
//             throw new Error("Invalid Credentials")
//         }
//     }catch (err) {
//         res.status(400).send ("Getting error to save the user " + err.message)
//     }
// })
// app.get("/profile",userAuth, async (req,res) => {
//     try {
//         const user = req.user
//         res.send(user)
//     }catch (err) {
//         res.status(400).send ("Please log in to access the profile  " + err.message)
//     }
    
// })

// app.post("/sendConnectionReq",userAuth, async (req,res)=> {
//     const user = req.user
//     console.log("sending a connection request")
//     res.send("This connection was sent by " + user.firstName)
// })

// to get user by email we use find()


// to update the user using userId

// app.patch("/user",async (req,res) => {
//     const userId = req.body.userId
//     const data = req.body
//     // console.log(data)
//     try {
//        const user =  await User.findByIdAndUpdate(userId,data,{returnDocument:'after'})
//        console.log(user)
//        res.send("user updated successfully")
//     }catch (err) {
//         res.status(500).send("something went wrong")
//     }
// })
// to update the user using emailId 

// app.patch("/user", async (req,res)=> {
//    const emailId = req.query.Email || req.body.Email || req.body.email
//    const userId = req.query.userId || req.body.userId
//    const data = { ...req.body }

//    if (!emailId && !userId) {
//        return res.status(400).send("Email or userId is required")
//    }

//    if (data.Email) {
//        data.Email = data.Email.toLowerCase()
//    }
//    if (data.email) {
//        data.Email = data.email.toLowerCase()
//        delete data.email
//    }

//    const filter = userId ? { _id: userId } : { Email: emailId }
//    delete data.userId

//    if (Object.keys(data).length === 0) {
//        return res.status(400).send("No update data provided")
//    }

//    try{
//         const updatedUser = await User.findOneAndUpdate(filter, data, { returnDocument: 'after', runValidators: true })
//         console.log(updatedUser)
//         if(!updatedUser) {
//             return res.status(400).send("such user not found")
//         }

//         res.send("updated successfully")
//     const ALLOWED_UPDATE = ["password", "age", "photoUrl", "about","skills"] 
    
//     const isUpdateAllowed = object.keys(data).every((k) => 
//         ALLOWED_UPDATE.includes(k)
// )
//     if(!isUpdateAllowed) {
//         return res.status(400).send("update is not allowed") }
//     if (data.skills > 10) {
//         return res.status(400).send("not allowed more than 10 skills")
//     }
//     }catch (err) {
//         console.error(err)
//         res.status(500).send(err.message || "something went wrong")
//     }
// })
// for the git  
connectDB()
    .then(()=> {
        console.log("DB connected  Succesfully")
        app.listen(3000, ()=> {
        console.log("server started successfully")
})
})
.catch((err)=> {
    console.error("DB Not connected",err)
})

// app.get("/getUserData",(req,res) => {
//     try{
//         throw new Error("getting error")
//         res.status(500).send("user Data sent")
//     }
//     catch(err) {
//         res.status(500).send("some error")
//     }  
// })

// app.use("/",(err,req,res,next)=> {
//     if(err) {
//         res.status(500).send("something went wrong")
//     }
// })

// when we "use" Handle Auth Middlewares for All GET, POST .... requests
// "use" === "all" (both are one in same)


// app.use("/admin",adminAuth )

// app.get("/user/login", (req,res)=> {
//     res.send("user logged in successfully")
// })

// app.get("/user",userAuth,(req,res)=> {
//     res.send("user data sent succeeded")
// })
// app.get("/admin/getData",(req,res)=>{
//      res.send("The data is successfully sent")

// })

// app.get("/admin/deleteUser",(req,res)=> {
//      res.send("user deleted successfully")

// })

// app.use("/router", [rH1,rH2,rH3,rH4,rH5]) // writing routes inside the array nothing will break 
// app.use("/users", (req,res,next) => {
//     console.log("this is 1st call")
//     // res.send("Response 1")
//     next()
// },(req,res)=>{
//      console.log("this is 2nd call")
//     res.send("response 2")
// })

// app.get("/users", (req,res)=> {
//     res.send({
//         name : "raghu",
//         fatherName : "Rajesh",
//         BrotherName: "Rohith"
//     })
// })

// app.delete("/users", (req,res) => {
//     res.send("data successfully deleted from Database")
// })
// app.patch("/users", (req,res) => {
//     res.send("data successfully patched from Database")
// })

// this will match all the http methods to api call /test
// app.use("/test", (req,res)=> {   // request handlers && order is very important 
//     res.send("server testing by routings")
// })


// // app.use("/helo", (req,res)=> {
// //     res.send("hello hello hello")
// // })

// app.listen(3000, () => {
//     console.log("server sucessfully started")
// })