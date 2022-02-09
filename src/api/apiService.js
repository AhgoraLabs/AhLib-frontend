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


export const listBooks = async (limit, offset) => {
    const data = await axios.get(`http://localhost:5000/books?limit=${limit}&offset=${offset}`);
    return data;
}

export const getBookByTitle = async (title) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/books/book/${title}`)
    return data;
}

export const getBookById = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/books/${id}`)
    return data;
}


export const authUser = async (email, password) => {
    try {
        const settings = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'Application/json'
            }
        }

        const response = await fetch('http://localhost:5000/users/auth', settings);
        const data = await response.json();
        console.log(data, 'dataapi')

        return data;
    } catch (error) {
        console.log(error, 'erro')
    }

}

export const createUser = async (email, name) => {
    const { data } = await axios.post('http://localhost:5000/users/create', { email, name });
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

export const createSuggestion = async (suggestionData) => {
    const data = await axios.post('http://localhost:5000/', suggestionData);
    return data;
}

export const createLoan = async ({ bookId, person, loanEnd }) => {
    const data = await axios.post('http://localhost:5000/loan', { bookId, person, loanEnd });
    return data;
};

export const getLoanByBookId = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/loan/book/${id}`)
    return data;
}

export const getAllLoansByBookId = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/loan/count/${id}`)
    return data
}

export const getAllLoan = async (id) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/loan`)
    return data;
}

export const endLoan = async (id) => {
    const data = await axios.patch(`http://localhost:5000/loan/${id}`, { bookHasReturned: true })
    return data;
}

export const extendLoan = async (id, newDate) => {

    const data = await axios.patch(`http://localhost:5000/loan/${id}`, { newLoanEnd: newDate, loanEndHasBeenExtended: true })
    return data;
}

export const getCommentsById = async (bookId) => {
    const { data: { data } } = await axios.get(`http://localhost:5000/comments/?idBook=${bookId}`)
    return data;
};

export const createComment = async (comment) => {
    const { data: { data } } = await axios.post(`http://localhost:5000/comments`, comment)
    return data;
};