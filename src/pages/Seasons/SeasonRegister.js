/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react'
import { TextField, Button } from '@mui/material'
import AuthContext from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { createRecommendation, listBooks } from '../../api/apiService';

const SeasonRegister = () => {

    ;
    const [books, setBooks] = useState();
    const [bookId, setBookId] = useState();

    const { register, handleSubmit } = useForm();

    const { user: { id } } = useContext(AuthContext);

    let history = useHistory();

    const onSubmit = async (data) => {
        const recommendation = {
            userId: id,
            bookId: bookId,
            ...data
        }
        const response = await createRecommendation(recommendation);
        if (response.status === 200) {
            history.push('/recomendacao');
        }

    }

    const handleChange = (value) => {
        setBookId(value)
    }

    const fetchBooks = async () => await listBooks(999, 0);


    useEffect(async () => {
        const { data: { data } } = await fetchBooks();
        setBooks(data);
    }, []);

    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <form className='bg-white rounded-xl h-3/6 w-5/6 flex justify-between p-4 items-center flex-col shadow-lg' onSubmit={handleSubmit(onSubmit)}>
                <select className='w-5/6 h-12 bg-white outline-none border-2 rounded-md px-2 text-base'
                 onClick={({target}) => handleChange(target.value)}
                  >
                    {books?.map(({ title, _id }) => {
                        return (
                            <option
                                key={_id}
                                value={_id}
                                required
                            >
                                {title}
                            </option>
                        )
                    })}
                </select>
                <TextField
                    className='h-12 w-5/6 border-blue-500'
                    type='Date'
                    name={'seasonEndDate'}
                    {...register('seasonEndDate')}
                />
                <TextField
                    className='h-24 w-5/6 mx-10 mb-8'
                    multiline
                    rows={4}
                    name='description'
                    label={'Descrição'}
                    type='text'
                    {...register('description')}
                />
                <Button className='relative' variant='contained' type='submit'>Adicionar</Button>
            </form>
        </div>
    )
}

export default SeasonRegister