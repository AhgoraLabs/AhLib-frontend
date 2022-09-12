'use strict';

import axios from 'axios';
import { memoize } from '../../utils/helpers';

const urlBase = !window.location.host.includes('netlify') ? 'http://localhost:5000' : 'https://ahlib.herokuapp.com'

axios.defaults.headers.post['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.get['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.patch['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.delete['auth'] = window.localStorage.getItem('@App:token');
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('@App:token');

 const fetchLoansByType = async (type) => {
    const response = await axios.get(`${urlBase}/loan/type/${type}`);
    return response;
}

export const memoizeFetchLoansByType = memoize(fetchLoansByType);
