import axios from 'axios';

axios.defaults.headers.post['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.get['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('@App:token');

export const createBook = async ({ title, subtitle, description, isbn, author, publishDate, publisher, pages, image, language }) => {
    const data = await axios.post('http://localhost:5000/books/', {
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

export const getBook = async (id) => {
    const { data:{ data } } = await axios.get(`http://localhost:5000/books/${id}`)
    return data;
}

export const authUser = async (email, password ) => {
    const { data } = await axios.post(`http://localhost:5000/users/auth`,{ email, password });
    return data;
}

