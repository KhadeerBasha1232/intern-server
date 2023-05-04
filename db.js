const mongoose = require('mongoose')
const mongURI = "mongodb+srv://khadeer:Khajavali12@cluster0.lctuidz.mongodb.net/intern?retryWrites=true&w=majority"

const connectToMongo =() =>{
    mongoose.connect(mongURI , ()=>{
        console.log("connection to mongo success")
    })
    
}

mongoose.set('strictQuery', true);

module.exports = connectToMongo;