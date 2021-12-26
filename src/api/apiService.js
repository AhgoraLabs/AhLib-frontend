import axios from 'axios';

axios.defaults.headers.post['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.get['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.patch['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.delete['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('@App:token');

export const createBook = async (book) => {
    const data = await axios.post('http://localhost:5000/books/', book);
    return data;
}

export const editBook = async (book) => {
    console.log(book);
    const data = await axios.patch('http://localhost:5000/books/', book);
    return data;
}
export const removeBook = async (id) => {
    const data = await axios.delete(`http://localhost:5000/books/${id}`);
    return data;
}


export const listBooks = async () => {
    const data = await axios.get('http://localhost:5000/books/')
    return data;
}

export const getBook = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/books/${id}`)
    return data;
}

export const authUser = async (email, password) => {
    const { data } = await axios.post(`http://localhost:5000/users/auth`, { email, password });
    return data;
}

