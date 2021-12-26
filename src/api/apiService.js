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

export const createUser = async (email, name) => {
    const { data } = await axios.post('http://localhost:5000/users/create',{ email, name });
    return data;
}

export const getUser = async (email) => {
    const { data } = await axios.get(`http://localhost:5000/users/user?email=${email}`);
    return data;
}

export const getUsers = async () => {
    const { data: { data } } = await axios.get('http://localhost:5000/users');
    return data;
};

export const createLoan = async ({ bookId, person, loanEnd }) => {
    const data = await axios.post('http://localhost:5000/loan',{ bookId, person, loanEnd });
    return data;
};

export const getLoanByBookId = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/loan/book/${id}`)
    return data;
}

export const getAllLoan = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/loan`)
    return data;
}