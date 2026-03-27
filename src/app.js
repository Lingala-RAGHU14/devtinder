const express = require("express")

const app = express()

app.get("/users", (req,res)=> {
    res.send({
        name : "raghu",
        fatherName : "Rajesh",
        BrotherName: "Rohith"
    })
})

app.post("/users", (req,res) => {
    res.send("data successfully saved to Database")
})
app.delete("/users", (req,res) => {
    res.send("data successfully deleted from Database")
})
app.patch("/users", (req,res) => {
    res.send("data successfully patched from Database")
})

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