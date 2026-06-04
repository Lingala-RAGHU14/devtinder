const validator = require("validator") 

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

module.exports = {
    validationSignup,
}