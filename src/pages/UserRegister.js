import React from 'react'
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from '../api/apiService';

function UserRegister() {

    const { register, handleSubmit } = useForm();

    let history = useHistory();

    const onSubmit = async ({email, name }) => {
        console.log('chamou a userRegister')
       const response =  await createUser(email, name);

       if(response.status === 200){
           history.go('/');
       }
    }

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
                name='name'
                placeholder='Nome'
                type='text'
                {...register('name')}
            />
            <Button variant='contained' type='submit'>Cadastrar</Button>
        </form>
    </div>
    )
}

export default UserRegister
