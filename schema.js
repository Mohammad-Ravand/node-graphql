
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql

  type Book {
    id: ID
    title: String
    author: String
  }

 type Image {
    id:ID
    path:String
 }

  type Author {
    id:ID
    fullName:String
    images:[Image]
  }
 

  type Query {
    books: [Book]
    findBook(id: ID!): Book
    
    authors:[Author]
    findAuthor(id:ID!): Author

  }

  type Mutation {
    createBook(title: String!, author: String!): Book
    updateBook( id:ID!,title: String, author: String): Book
    deleteBook( id:ID!): Book
    
    createAuthor(fullName: String!): Author
    updateAuthor( id:ID!,fullName: String): Author
    deleteAuthor( id:ID!): Author

    createImage(authorId: ID!, path: String!): Image

  }



`;

export default typeDefs;