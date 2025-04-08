const graphql = require('graphql') ; 
const {GraphQLObjectType , GraphQLString , GraphQLSchema , GraphQLID , GraphQLInt , GraphQLList , GraphQLNonNull } = require('graphql') ; 
const BookGraphQL = require('../database/book') ; 
const Author = require('../database/author') ;

const books = [
    {id: '1' , name: 'The Hobbit' , genre: 'Fantasy' , authorId: '1'} ,
    {id: '2' , name: 'The Lord of the Rings' , genre: 'Fantasy' , authorId: '2'} ,  
    {id: '3' , name: 'Harry Potter and the Philosopher\'s Stone' , genre: 'Fantasy' , authorId: '3'} ,
    {id: '4' , name: 'The Da Vinci Code' , genre: 'Mystery' , authorId: '4'} ,
] ; 

const authors = [
    {id: '1' , name: 'Shwetabh Gangwar' , genre: 'Self-Help'} ,
    {id: '2' , name: 'Michael Bar Zohr' , genre: 'Espionage'} ,  
    {id: '3' , name: 'Robert Kiyosaki' , genre: 'Finance'} ,
    {id: '4' , name: 'Rakesh Maria' , genre: 'Memoir'} ,
]

const BookType = new GraphQLObjectType({
    name: 'Book' , 
    fields: () => ({
        id: {type: GraphQLID} , 
        name: {type: GraphQLString} , 
        genre: {type: GraphQLString} , 
        author: {
            type: AuthorType , 
            resolve (parent , args){
                // return authors.find(author => author.id === parent.authorId) ; 
                return Author.findById(parent.authorId) ; 
            }
        }
    })
}) ; 

const AuthorType = new GraphQLObjectType({
    name: 'Author' , 
    fields: () => ({
        id: {type: GraphQLID} , 
        name: {type: GraphQLString} , 
        age: {type: GraphQLInt} , 
        books: {
            type: new GraphQLList(BookType) , 
            resolve( parent , args) {
                // return books.filter(book => book.authorId === parent.id) ; 
                return BookGraphQL.find({authorId: parent.id}) ; 
            }
        }
    })
}) ; 

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType' , 
    fields: {
        book: {
            type: BookType , 
            args: { id: {type: GraphQLID} } , 
            resolve (parent , args) {
                // return books.find(book => book.id === args.id);
                return BookGraphQL.findById(args.id) ; 
            }
        } , 
        author: {
            type:AuthorType , 
            args: { id: {type: GraphQLID} } ,  
            resolve (parent , args) {
                // return authors.find(author => author.id === args.id) ; 
                return Author.findById(args.id) ; 
            }
        } , 
        book: {
            type: new GraphQLList(BookType) , 
            resolve( parent , args) {
                return BookGraphQL.find()
                // return books ; 
            }
        }  , 
        author: {
            type: new GraphQLList(AuthorType) , 
            resolve( parent , args) {
                return Author.find()
                // return authors ; 
            }
        }
    }
}) ; 

const Mutation = new GraphQLObjectType({
    name: 'Mutation' , 
    fields: {
        addAuthor: {
            type: AuthorType , 
            args: {
                name: {type:new GraphQLNonNull(  GraphQLString)} , 
                age: {type: new GraphQLNonNull(  GraphQLInt)} , 
            } , 
            resolve  (parent , args){
                let author = new Author({name: args.name , age: args.age}) ; 
                return author.save() ; 
            }
        } , 
        addBook: {
            type: BookType , 
            args: {
                name: {type: new GraphQLNonNull( GraphQLString)} , 
                genre: {type: new GraphQLNonNull( GraphQLString)} , 
                authorId: {type: new GraphQLNonNull( GraphQLID)} , 
            } , 
            resolve (parent , args) {
                let book = new BookGraphQL({
                    name: args.name , 
                    genre: args.genre , 
                    authorId: args.authorId 
                }) ; 
                return book.save() ; 
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery , 
    mutation: Mutation
}) ; 

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