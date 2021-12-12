import React, { useContext } from 'react'
import { Button, TextField } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authUser } from '../api/apiService';
import UserContext from '../context/user';

const Login = () => {

    const { setState } = useContext(UserContext);

    const { register, handleSubmit } = useForm();
    let history = useHistory();

    const onSubmit = async ({ email, senha }) => {
        const { data } = await authUser(email, senha);
        console.log(data);

        if (data) {
            setState({
                token: data.token,
                profile: data.user.profile,
                name: data.user.name,
                email: data.user.email
            })
            localStorage.setItem('token', data.token)
            history.push('/home');
        }
    };

    return (
        <div className='h-screen bg-primary flex justify-center items-center flex-col'>
            <form className='bg-white rounded-sm h-96 w-2/4 flex justify-evenly items-center flex-col' onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className='h-12 w-1/2 border-blue-500'
                    name='email'
                    placeholder='Email'
                    type='email'
                    {...register('email')}
                />
                <TextField
                    className='h-12 w-1/2 mx-10'
                    name='senha'
                    placeholder='Senha'
                    type='password'
                    {...register('senha')}
                />
                <Button variant='contained' type='submit'>Login</Button>
            </form>
            <div className='bg-white w-1/2 flex flex-row justify-evenly items-center h-10'>
                <Link to='#' className='text-blue-200'>Cadastrar</Link>
                <Link to='#' className='text-blue-200'>Esqueci a senha</Link>
            </div>
        </div>
    )
}

export default Login
