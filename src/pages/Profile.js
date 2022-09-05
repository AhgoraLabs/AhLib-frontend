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
    console.log(user);
    const [image, setImage] = useState('');

    const initialValue = {
        password: null
    }

    const setImagePath = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const selectOptions = [
        'TECNOLOGIA',
        'EDUCAÇÃO CORPORATIVA',
        'GESTÃO e NEGÓCIOS',
        'PSICOLOGIA/FILOSOFIA/AUTO-AJUDA',
        'ROMANCE',
        'DIREITO',
        'GERAL'
    ];


    const [valueForm] = useState(initialValue)

    const { register, handleSubmit } = useForm();

    const onSubmit = async (dataForm) => {


        const response = await axios.put(`${urlBase}/users`, { ...dataForm, image });
        if (response.status === 200) {
            redirectWithMsg('/livros', 'success', 'Senha atualizada com sucesso!');
        }
    };
    const nomeUsuario = user.name;

    return (
        <>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center w-1/2'>
                    <div className='flex flex-col items-center justify-center w-1/2'>
                        <img src={user.image} alt='user' className='w-32 h-32 rounded-full' />
                    </div>
                    <input
                        type='file'
                        onChange={setImagePath}
                    />
                </div>



            </div>
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



                    <div>
                        <label className=''> Selecione sua categoria de livro favorita</label>
                        <select
                            className={`${styleInput} ml-5`}
                            placeholder={'category'}
                            {...register('category')}
                            defaultValue={valueForm?.category}
                        >
                            {selectOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' mt-5 flex flex-col rounded-xl h-3/4  mt-4 w-4/4'>
                        <Button className='cursor-pointer bg-primary' variant="contained" type="submit">Enviar</Button>
                    </div>



                </form>

            </div>
            <div className='flex justify-center mt-10'>
                <h2>Livros que você lá leu</h2>
                <br />
                <h2>Seus Comentários</h2>


            </div>

        </>
    )
}

export default ProfilePage;