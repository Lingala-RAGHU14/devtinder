const express = require("express")
const {adminAuth,userAuth} = require("./middlewares/auth.js")

const app = express() 



app.get("/getUserData",(req,res) => {
    try{
        throw new Error("getting error")
        res.status(500).send("user Data sent")
    }
    catch(err) {
        res.status(500).send("some error")
    }  
})

app.use("/",(err,req,res,next)=> {
    if(err) {
        res.status(500).send("something went wrong")
    }
})













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
app.use("/test", (req,res)=> {   // request handlers && order is very important 
    res.send("server testing by routings")
})


// app.use("/helo", (req,res)=> {
//     res.send("hello hello hello")
// })

app.listen(3000, () => {
    console.log("server sucessfully started")
})