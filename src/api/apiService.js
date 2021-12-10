import axios from 'axios';

const headers = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjExMjNAaG90bWFpbC5jb20iLCJpYXQiOjE2Mzg5MjIzMTQsImV4cCI6MTYzOTAwODcxNH0.u4awMg3qaZ9VowyWn1jnXP8UjHxnMvhUGqZXQJ_22fk';
axios.defaults.headers.post['auth'] = headers;

export const createBook = async ({ title, subtitle, description, isbn, author, publishDate, publisher, pages, image, language }) => {
    const data = axios.post('http://localhost:5000/books/create', {
        title,
        isbn,
        author,
        publishDate : new Date(publishDate),
        pages : parseInt(pages),
        image,
        subtitle,
        description,
        publisher,
        language
    }, headers);
    return data;
}
