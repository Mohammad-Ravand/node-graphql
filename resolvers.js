
import { authors,images, books } from './data.js'

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
        authors:()=> authors,
        findAuthor(parent, args, contextValue, info) {
            return authors.find((author) => author.id === args.id);
        },
        findBook(parent, args, contextValue, info) {
            return books.find((book) => book.id === args.id);
        },

    },
    Author:{
        images:(parent)=>{
            if(parent.images?.length){

                return images.filter(image=> Array.from(parent?.images)?.includes(image.id))
            }else{
                return null;
            }
        }
    },
    Mutation: {
        createBook: (parent, { title, author }) => {
            const newBook = { id: String(books.length + 1), title, author };
            books.push(newBook);
            return newBook;
        },
        updateBook: (parent, { id, title, author }) => {
            try {
                let book = books.find(book => book.id.toString() == id.toString());
                if (!book) {
                    throw new Error('book not found');
                }

                if (title) {
                    book.title = title;
                }

                if (author) {
                    book.author = author;
                }

                return book;

            } catch (error) {
                console.log(error.message);
            }

        },
        deleteBook: (parent, { id }) => {
            try {
                let book = books.find(book => book.id.toString() == id.toString());
                if (!book) {
                    throw new Error('book not found');
                }

                delete books[books.indexOf(book)];
                return book;

            } catch (error) {
                console.log(error.message);
            }

        },
        createAuthor: (parent, { fullName }) => {
            console.log(parent)
            return
            const newAuthor = { id: String(authors.length + 1), fullName };
            authors.push(newAuthor);
            return newAuthor;
        },
        updateAuthor: (parent, { id, fullName }) => {
            try {
                let author = authors.find(author => author.id.toString() == id.toString());
                if (!author) {
                    throw new Error('author not found');
                }

                if (fullName) {
                    author.fullName = fullName;
                }

                return author;

            } catch (error) {
                console.log(error.message);
            }

        },
        deleteAuthor: (parent, { id }) => {
            try {
                let author = authors.find(author => author.id.toString() == id.toString());
                if (!author) {
                    throw new Error('author not found');
                }

                delete authors[authors.indexOf(author)];
                return author;

            } catch (error) {
                console.log(error.message);
            }

        },
        createImage: (parent,{authorId,path})=>{
            const author = authors.find(author => author.id === authorId);
            const index = authors.indexOf(author)

            if (author) {
              const newImage = { id: String(images.length + 1), path };
              author.images.push(newImage.id);
              authors[index] = author;
              images.push(newImage);
              
              return newImage;
            }
            return null;
        }

    },

};

export default resolvers;