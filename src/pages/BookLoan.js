
import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { getUsers, createLoan, extendLoan, getLoanByBookId} from '../api/apiService';
import MultiSelect from '../components/Multiselect';
import { redirectWithMsg } from '../utils/helpers';
import { useLocation } from "react-router-dom";

const BookLoan = ({ match }) => {
    const { search } = useLocation();
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [loan, setLoan] = useState({});


    const fetchLoan = useCallback(async function () {
        let loanInformation = await getLoanByBookId(match.params?.id);
        setLoan(loanInformation);
    }, [])

    const isExtendingLoan = params.extend;

    const { register, handleSubmit } = useForm();
    const [users, setUsers] = useState([]);
    const [selectValue, setSelectValue] = useState();

    const onSubmit = async (data) => {
        const response = isExtendingLoan ? await extendLoan(loan._id, data.date) : await createLoan({
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
        fetchLoan();
    }, [])

    const styleInput = `h-16 px-4 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

    return (
        <div>
            <div className="flex justify-center items-center mx-0 my-auto">
                <form className='flex flex-col justify-center rounded-xl h-screen' onSubmit={handleSubmit(onSubmit)}>
                   {!isExtendingLoan && <MultiSelect users={users} setUser={setSelectValue} />}
                    <div className="flex flex-col my-16">
                        <label className="my-4">{!isExtendingLoan ? 'Data final' : 'Nova Data Final'}</label>
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
