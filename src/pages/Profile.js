import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';
import { redirectWithMsg } from "../utils/helpers";


const urlBase = !window.location.host.includes('netlify') ? 'http://localhost:5000' : 'https://ahlib.herokuapp.com'
const styleInput = `h-16 px-4 mt-5 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const initialValue = {
        password: null
    }


    const [valueForm] = useState(initialValue)

    const { register, handleSubmit } = useForm();

    const onSubmit = async (dataForm) => {
        const response = await axios.patch(`${urlBase}/users`, dataForm);
        if(response.status === 200) {
            redirectWithMsg('/livros', 'success', 'Senha atualizada com sucesso!');
        }
    };
    const nomeUsuario = user.name;

    return (
        <div className='flex justify-around items-center'>
            <form className='flex flex-col rounded-xl h-3/4  mt-4 w-2/4' onSubmit={handleSubmit(onSubmit)}>

                <input
                    className={styleInput}
                    placeholder={'Nome de Usuário'}
                    value={user.name}
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