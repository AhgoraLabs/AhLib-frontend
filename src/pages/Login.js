import React, { useContext, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth/AuthContext';
import { createUser } from '../api/apiService';

const Login = () => {

    const { Login } = useContext(AuthContext);
    const [active, setActive] = useState(false);
    const { register, handleSubmit } = useForm();

    let history = useHistory();

    const onSubmit = async ({ login, password }) => {
        await Login(login, password);
        history.push('/home');

    }

    const registerUser = async ({email, name }) => {
        const response =  await createUser(email, name); 
 
        if(response.status === 200){
            history.go('/');
        }
     }
    return (
        <section className={`relative min-h-screen ${active ? 'bg-register' : 'bg-login'} flex justify-center items-center p-5 font-poppins`}>
            <div className='relative w-login h-image-login bg-white shadow-login overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-full flex '>
                    <div className={`relative w-6/12 h-full flex duration-300 ${active ? 'top-full' : 'top-0'} `}>
                        <img alt='book' className='w-image-login h-image-login object-cover absolute' src='https://media.istockphoto.com/photos/many-hardbound-books-background-selective-focus-picture-id1209683444?k=20&m=1209683444&s=612x612&w=0&h=apRHyEOnUCQ7gXkIChHTyixwezHZ4Bm6tDyr7zwu32Y='></img>
                    </div>
                    <div className={`relative w-6/12 h-full bg-white flex justify-center items-start flex-col p-10 duration-300 absolute z-50 ${active ? 'top-full' : 'top-0'}`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='text-l font-bold uppercase tracking-large text-center w-full mb-2.5 text-login'>Sign In</h2>
                            <input
                                className='z-index-1 w-full p-2.5 bg-input text-login border-none outline-none shadow-none text-sm my-2 tracking-wider font-light'
                                name='login'
                                placeholder='Email'
                                type='email'
                                {...register('login')}
                            />
                            <input
                                className='w-full p-2.5 bg-input text-login border-none outline-none shadow-none text-sm my-2 tracking-wider font-light'
                                name='senha'
                                placeholder='Password'
                                type='password'
                                {...register('password')}
                            />
                            <input className='bg-input-submit text-white text-l tracking-wider font-medium my-4 h-12 w-24 cursor-pointer' type='submit' value='Login'></input>
                        </form>
                        <p className='relative mt-5 text-sm tracking-large text-login font-light'>DON'T HAVE AN ACCOUNT?<span onClick={() => setActive(!active)} className='font-semibold text-link cursor-pointer'>SIGN UP. </span></p>
                        {/* <Link to='#' className='text-blue-200'>Esqueci a senha</Link> */}
                    </div>
                </div>
                <div className='absolute top-0 left-0 w-full h-full flex'>
                    <div className={`relative w-6/12 h-full bg-white flex justify-center items-start flex-col p-10 duration-300 ${active ? 'top-0' : 'top-full'}`}>
                        <form onSubmit={handleSubmit(registerUser)}>
                            <h2 className='text-l font-bold uppercase tracking-large text-center w-full mb-2.5 text-login'>CREATE AN ACCOUNT</h2>
                            <input
                                className='w-full p-2.5 bg-input text-login border-none outline-none shadow-none text-sm my-2 tracking-wider font-light'
                                name='email'
                                placeholder='Email'
                                type='email'
                                {...register('email')}
                            />
                            <input
                                className='w-full p-2.5 bg-input text-login border-none outline-none shadow-none text-sm my-2 tracking-wider font-light'
                                name='name'
                                placeholder='Name'
                                type='text'
                                {...register('name')}
                            />
                            <input className='bg-input-signup text-white text-l tracking-wider font-medium my-4 h-12 w-24 cursor-pointer' type='submit' value='Sign up'></input>
                        </form>
                        <p className='relative mt-5 text-sm tracking-large text-login font-light'>ALREADY HAVE AN ACCOUNT?<span onClick={() => setActive(!active)} className='font-semibold text-link cursor-pointer'>SIGN IN.</span></p>
                        {/* <Link to='#' className='text-blue-200'>Esqueci a senha</Link> */}
                    </div>
                    <div className={`relative w-6/12 h-full flex duration-300 ${active ? 'top-0' : '-top-full'}`}>
                        <img alt='book' className={`w-image-login h-image-login object-cover absolute event`} src='https://media.istockphoto.com/photos/stack-of-books-on-table-in-the-room-picture-id1227235401?k=20&m=1227235401&s=612x612&w=0&h=XhxnVPcZdoeVHHpjQhRYf7nDgsuDvEmwosNs54N6OU0='></img>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
