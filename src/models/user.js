const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("email is not valid " + value )
            }
        }

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
        type: String,
    },
    about : {
        type : String,
        default : "This Description is default About the user"
    }
},
{
    timestamps:true,
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id : user._id},"DEV@#TIND@ER123",{expiresIn : "7d"} )
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const hashPassword  = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword );
    return isPasswordValid;
}



module.exports = mongoose.model("User", userSchema)