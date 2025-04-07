const graphql = require('graphql') ; 
const {GraphQLObjectType , GraphQLString} = require('graphql') ; 

const BookType = new GraphQLObjectType({
    name: 'Book' , 
    fields: () => ({
        id: {type: GraphQLString} , 
        name: {type: GraphQLString} , 
        genre: {type: GraphQLString} , 
    })
})

// const {projects , clients} = require('../utils/sampleData.js') ; 

// const {GraphQLObjectType , GraphQLString , GraphQLID, GraphQLSchema} = require('graphql') ; 

// const ClientType = new GraphQLObjectType({
//     name: 'Client' , 
//     fields: () => ({
//         id: {type: GraphQLID} , 
//         name: {type: GraphQLString} , 
//         email: {type: GraphQLString} , 
//         phone: {type: GraphQLString} , 
//     })
// }) ; 

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType' , 
//     fields: {
//         client: {
//             type: ClientType , 
//             args: { id: {type: GraphQLID} } , 
//             resolve (parent , args) {
//                 return clients.find(client => client.id === args.id) ; 
//             }
//         }
//     }
// }) ; 

// module.exports = new GraphQLSchema({
//     query: RootQuery
// })