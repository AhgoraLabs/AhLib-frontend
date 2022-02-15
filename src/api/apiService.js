import axios from 'axios';


const urlBase = !window.location.host.includes('netlify') ? 'http://localhost:5000' : 'https://sound-aileron-337523.rj.r.appspot.com'


axios.defaults.headers.post['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.get['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.patch['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.delete['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('@App:token');

export const createBook = async (book) => {
    const data = await axios.post(`${urlBase}/books/`, book);
    return data;
}

export const editBook = async (book) => {
    const data = await axios.patch(`${urlBase}/books/`, book);
    return data;
}
export const removeBook = async (id) => {
    const data = await axios.delete(`${urlBase}/books/${id}`);
    return data;
}


export const listBooks = async (limit, offset) => {
    const data = await axios.get(`${urlBase}/books?limit=${limit}&offset=${offset}`);
    return data;
}

export const getBookByTitle = async (title) => {
    const { data: { data } } = await axios.get(`${urlBase}/books/book/${title}`)
    return data;
}

export const makeBookTable = async (limit = 8, offset = 0, title = '') => {
    const data = await (await fetch(`${urlBase}/books/books/table?limit=${limit}&offset=${offset}&title=${title}`)).json();
    return data;
}

export const getBookById = async (id) => {
    const { data: { data } } = await axios.get(`${urlBase}/books/${id}`)
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

        const response = await fetch(`${urlBase}/users/auth`, settings);
        const data = await response.json();
        console.log(data, 'dataapi')

        return data;
    } catch (error) {
        console.log(error, 'erro')
    }

}

export const createUser = async (email, name) => {
    const settings = {
        method: 'POST',
        body: JSON.stringify({ email, name }),
        headers: {
            'content-type': 'Application/json'
        }
    }
    try {
        const response = await fetch(`${urlBase}/users/create`, settings);
        const data = await response.json();
        return data;
    } catch (error) {
        return false;
    }
}

export const getUser = async (email) => {
    const { data } = await axios.get(`${urlBase}/users/user?email=${email}`);
    return data;
}

export const getUsers = async () => {
    const { data: { data } } = await axios.get(`${urlBase}/users`);
    return data;
};

export const createSuggestion = async (suggestionData) => {
    const data = await axios.post(`${urlBase}/suggestion`, suggestionData);
    return data;
}

export const createLoan = async ({ bookId, person, loanEnd }) => {
    const data = await axios.post(`${urlBase}/loan`, { bookId, person, loanEnd });
    return data;
};

export const getLoanByBookId = async (id) => {
    const { data: { data } } = await axios.get(`${urlBase}/loan/book/${id}`)
    return data;
}

export const getAllLoansByBookId = async (id) => {
    const { data: { data } } = await axios.get(`${urlBase}/loan/count/${id}`)
    return data
}

export const getAllLoan = async (id) => {
    const { data: { data } } = await axios.get(`${urlBase}/loan`)
    return data;
}

export const endLoan = async (id) => {
    const data = await axios.patch(`${urlBase}/loan/${id}`, { bookHasReturned: true })
    return data;
}

export const extendLoan = async (id, newDate) => {

    const data = await axios.patch(`${urlBase}/loan/${id}`, { newLoanEnd: newDate, loanEndHasBeenExtended: true })
    return data;
}

export const getCommentsById = async (bookId) => {
    const { data: { data } } = await axios.get(`${urlBase}/comments/?idBook=${bookId}`)
    return data;
};

export const createComment = async (comment) => {
    const { data: { data } } = await axios.post(`${urlBase}/comments`, comment)
    return data;
};

export const getRecommendation = async () => {
    const { data } = await axios.get(`${urlBase}/season`);
    return data;
}

export const createRecommendation = async (recommendation) => {
    const data = await axios.post(`${urlBase}/season`, recommendation)
    return data;
}