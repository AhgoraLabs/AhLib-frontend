import React, { useState, useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';


const styleInput = `h-16 px-4 mt-5 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

const ProfilePage = () => {
    const { user } = useContext(AuthContext);


    const initialValue = {
        password: null
    }


    const [valueForm, setValueForm] = useState(initialValue)

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (dataForm) => {
        const response = axios.post('http://localhost:5000/books/isbn/${value}')

    };

    return (
        <div className='flex justify-around items-center'>
            <form className='flex flex-col rounded-xl h-3/4  mt-4 w-2/4' onSubmit={handleSubmit(onSubmit)}>

                <input
                    className={styleInput}
                    placeholder={'Nome de Usuário'}
                    value={'Pedro Penha Verani'}
                    disabled={true}
                />

                <input
                    className={styleInput}
                    placeholder={'Email'}
                    defaultValue={user.email}
                    disabled={true}
                />

                <input
                    className={styleInput}
                    placeholder={'Nova senha'}
                    {...register('password')}
                    type={'password'}
                    defaultValue={valueForm?.password}
                />






                <div className=' mt-5 flex flex-col rounded-xl h-3/4  mt-4 w-4/4'>
                    <Button className='cursor-pointer bg-primary' variant="contained" type="submit">Enviar</Button>
                </div>
            </form>
        </div>
    )
}

export default ProfilePage;