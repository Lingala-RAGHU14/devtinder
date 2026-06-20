const validator = require("validator") 
const User = require("../models/user")
const bcrypt = require("bcrypt")


const validationSignup = (req) => {

    const {firstName, lastName, email, password} = req.body

    if (!firstName || !lastName) {
        throw new Error("name is not valid ")
    } else if (!validator.isEmail(email)) {
        throw new Error("email is not valid")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please Enter Strong Password..!")
    }
    
}

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName","lastName","age","about","skills","photoUrl","gender"];

  if (req.body.skills && req.body.skills.length > 7) {
    throw new Error("you have enough limit for skills");
  }

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
}

const validateForgotenPassword = async (req) => { }

module.exports = {
    validationSignup,
    validateEditProfileData,
    validateForgotenPassword,
}