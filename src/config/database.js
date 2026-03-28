const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://namastedev:c45sSELVJ5kNuLxD@namastedev.r6qad5m.mongodb.net/devTinder")
}


module.exports = connectDB