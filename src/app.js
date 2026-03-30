const express = require("express")
const {adminAuth,userAuth} = require("./middlewares/auth.js")
const User = require("./models/user")

const connectDB = require("./config/database.js")
const app = express() 

// express gave direct json covert to js object

app.use(express.json())
// put the data into DB
app.post("/signup", async (req,res)=> {
        const user = new User(req.body)

    try{
    await user.save()
    res.send("user added successfully")
    }catch (err) {
        res.status(400).send("Getting error to save the user")
    }
})

// to get user by email we use find()
app.get("/user", async (req,res)=> {
    const Useremail = req.body.Email
    console.log(Useremail)  

    try{
        
        const user = await User.find({Email: Useremail})
        res.send(user)
    }catch (err) {
        res.status(400).send("something went wrong")
    }
})
//  when two  users with same id we should use "findOne"
app.get("/oneUser", async (req,res)=> {
    const Useremail = req.body.Email
    console.log(Useremail)  

    try{
        
        const user = await User.findOne({Email: Useremail})
        res.send(user)
    }catch (err) {
        res.status(400).send("something went wrong")
    }
})

// to get all the users from DB
app.get("/feed",async (req,res)=> {
    try {
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

//  to delete the user from the DB
app.delete("/user",async (req,res)=> {
   const  userId = req.body.userId
   console.log(userId)

    try{
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    }catch (err) {
        res.status(500).send("something went wrong")
    }
})

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

app.patch("/user", async (req,res)=> {
   const emailId = req.body.Email
//    console.log(emailId)
   const data = req.body
//    console.log(data)
   try{
        const userEmail = await User.findOneAndUpdate({Email : emailId},data)
        console.log(userEmail)
        if(!userEmail) {
            res.status(400).send("such user not found")
        }else {
            res.send("updated successfully using email")
        }
      
        
   }catch (err) {
        res.status(500).send("something went wrong")
    }
})
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