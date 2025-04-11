const express = require('express') ; 
const connectDB = require('./database/connection') ; 
require('dotenv').config({ path: './server/.env' }); 
const {graphqlHTTP} = require('express-graphql') ; 
const schema = require('./schema/schema') ; 
const cors = require('cors') ; 
const PORT = process.env.PORT || 3000; 

const app = express() ; 
app.use(cors({
    origin: ["http://localhost:5173" , "https://book-worm-frontend.vercel.app"] , 
    credentials: true
})) ;

// graphiql is mainly to enable graphical user interface
app.use('/graphql', graphqlHTTP({
    schema , 
    graphiql: true
})) ;  

connectDB().then(() => {
    console.log("Connected to the Database" , PORT) ; 
    app.listen(PORT , () => {
        console.log("Server is running on port 8000") ; 
    } )
}).catch(() => {
    console.log("Cannot Connect to the Database") ; 
})