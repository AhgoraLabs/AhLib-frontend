import axios from 'axios';

const headers = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vX3JvZHJpZ3Vlczk3N0Bob3RtYWlsLmNvbSIsImlhdCI6MTYzOTMxMjI1OSwiZXhwIjoxNjM5Mzk4NjU5fQ.HB-V5SmDmMV_qFFyTM5ZspH2xHNop2a-a0JJwUuCczE';
axios.defaults.headers.post['auth'] = headers;
axios.defaults.headers.get['auth'] = headers;
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');

export const createBook = async ({ title, subtitle, description, isbn, author, publishDate, publisher, pages, image, language }) => {
    const data = await axios.post('http://localhost:5000/books/create', {
        title,
        isbn,
        author,
        publishDate : new Date(publishDate),
        pages : pages,
        image,
        subtitle,
        description,
        publisher,
        language
    });
    return data;
}


export const listBooks = async () => {
    const data = await axios.get('http://localhost:5000/books/')
    return data;
}

export const getBook = async (title) => {
    const { data:{ data } } = await axios.get(`http://localhost:5000/books/book?title=${title}`)
    return data;
}

export const authUser = async (email, password ) => {
    const { data } = await axios.post(`http://localhost:5000/users/auth`,{ email, password });
    return data;
}

