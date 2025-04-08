const mongoose = require("mongoose") ; 
const connectDB = async () => {
    const mongoDBURL = process.env.DB_CONNECTION_SECRET ; 
    // console.log(mongoDBURL) ;
    await mongoose.connect(mongoDBURL) ; 
}

module.exports = connectDB ; 