const Book = require("../models/book");

const getBooks = (request, response) => {
    return Book.find({}).then(
    (books) => { response.status(200).send(books) }
    ).catch(error => response.status(500).send(error.massage))
};

const getBook = (request, response) => {
    const { book_id } = request.params;
    return Book.findById(book_id).then((book) => {
    if (!book) {
      response.status(404).send("Book not found");
    } else {
      response.status(200).send(book);
    }
  }).catch(error => response.status(500).send(error.massage))
};

const createBook = (request, response) => {
    return Book.create({ ...request.body }).then(
        (book) => { response.status(201).send(book) }
    ).catch(error => response.status(500).send(error.massage))
};

const updateBook = (request, response) => {
    const { book_id } = request.params;
    return Book.findByIdAndUpdate(book_id)
    .then((book) => {
        if (!book) {
            response.status(404).send("Book not found");
        } else {
            response.status(200).send(book);
        }
    }).catch(error => response.status(500).send(error.massage))
};

const deleteBook = (request, response) => {
    const { book_id } = request.params;
    return Book.findByIdAndDelete(book_id)
        .then((book) => {
            if (!book) {
                response.status(404).send("Book not found");
            } else {
                response.status(200).send("Success");
            }
        })
        .catch((error) => {
            response.status(500).send(error.message);
        })
};

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook };