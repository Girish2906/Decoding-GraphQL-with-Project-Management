const mongoose = require('mongoose') ; 

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String , required: true
    } ,
    age: {
        type: Number , required: true
    } , 
    // authorId: {
    //     type: mongoose.Schema.Types.ObjectId , 
    //     ref: 'Author' , 
    //     required: true
    // }
}) ; 

module.exports = mongoose.model('Author' , AuthorSchema) ;