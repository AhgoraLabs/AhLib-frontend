
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { getUsers, createLoan } from '../api/apiService';
import MultiSelect from '../components/Multiselect';
import { redirectWithMsg } from '../utils/helpers';

const BookLoan = ({ match }) => {

    const { register, handleSubmit } = useForm();
    const [users, setUsers] = useState([]);
    const [selectValue, setSelectValue] = useState();

    const onSubmit = async (data) => {
        const response = await createLoan({
            bookId: match.params?.id,
            loanEnd: data.date,
            person: selectValue,
        });
        if (response.status === 200) redirectWithMsg(`/livros/info/${match.params?.id}`, 'success', 'O livro foi emprestado com sucesso');

    };

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    const styleInput = `h-16 px-4 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

    return (
        <div>
            <div className="flex justify-center items-center mx-0 my-auto">
                <form className='flex flex-col justify-center rounded-xl h-screen' onSubmit={handleSubmit(onSubmit)}>
                    <MultiSelect users={users} setUser={setSelectValue} />
                    <div className="flex flex-col my-16">
                        <label className="my-4">Data final</label>
                        <input
                            className={styleInput}
                            placeholder={''}
                            type='date'
                            {...register('date')}
                            required
                        />
                    </div>
                    <Button className={'cursor-pointer bg-primary'} variant="contained" type="submit">Emprestar</Button>
                </form>
            </div>
        </div>
    )
}

export default BookLoan
