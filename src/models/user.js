const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        minLength : 2,
        maxLength : 50
    },
    lastName : {
        type : String,
        required:true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        lowercase: true,
        trim: true

    },
    password : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        min:18
    },
    skills : {
        type : ["string"]
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male", "female" , "others"].includes(value) ) {
                throw new Error("gender is not valid")
            }
        },
    },
    photoUrl : {
        type: String
    },
    About : {
        type : String,
        default : "This Description is default About the user"
    }
},
{
    timestamps:true,
});


module.exports = mongoose.model("User", userSchema)