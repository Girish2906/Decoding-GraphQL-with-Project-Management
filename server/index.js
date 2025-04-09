const express = require('express') ; 
const connectDB = require('./database/connection') ; 
require('dotenv').config({ path: './server/.env' }); 
const {graphqlHTTP} = require('express-graphql') ; 
const schema = require('./schema/schema') ; 

const PORT = process.env.PORT || 3000; 

const app = express() ; 

// graphiql is mainly to enable graphical user interface

app.use('/graphql', graphqlHTTP({
    schema , 
    graphiql: true
}))

connectDB().then(() => {
    console.log("Connected to the Database" , PORT) ; 
    app.listen(PORT , () => {
        console.log("Server is running on port 3000") ; 
    } )
}).catch(() => {
    console.log("Cannot Connect to the Database") ; 
})