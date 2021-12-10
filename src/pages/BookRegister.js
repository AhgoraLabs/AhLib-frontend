import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { createBook } from '../api/apiService';
import { normalizeBookData } from '../utils/normalize';
import axios from 'axios';
const BookRegister = () => {

    const InitialValue = {
        isbn: '',
        title: '',
        author: '',
        publishDate: '',
        pages: '',
        image: '',
        language: '',
        description: '',
        subtitle: '',
        publisher: '',

    };

    const styleInput = `h-16 px-4 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

    const [valueForm, setValueForm] = useState(InitialValue)

    const { register, handleSubmit } = useForm();

    const onSubmit =  async (dataForm) => {
        const response = dataForm.ISBN ? await createBook(valueForm) : await createBook(dataForm)
        const { data } = response;

        data.message === 'Livro cadastrado com sucesso.' ? setValueForm(InitialValue) : alert('Erro ao salvar livro');
    };

    const fetchBook = async (value) => {
        let data = '';

        if (value !== '') {
            data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=%22%22+isbn=${value}`)
        }
        const dataNormalized = normalizeBookData(data);

    
        return setValueForm(dataNormalized)
    };



    return (
        <div className="flex justify-around items-center">

            <form className='flex flex-col rounded-xl h-3/4 h-screen justify-around w-2/4' onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styleInput}
                    placeholder={'ISBN'}
                    {...register('ISBN')}
                    defaultValue={valueForm?.isbn}
                    required
                    onBlur={(e) => fetchBook(e.target.value)}
                />
                <input
                    className={styleInput}
                    placeholder={'Título'}
                    {...register('Title')}
                    required defaultValue={valueForm?.title}
                />
                <input
                    className={styleInput}
                    placeholder={'Subtitulo'}
                    {...register('Subtitle')}
                    defaultValue={valueForm?.subtitle}
                />
                <input
                    className={styleInput}
                    placeholder={'Autor'}
                    {...register('author')}
                    defaultValue={valueForm?.author}
                />
                <input
                    className={styleInput}
                    placeholder={'Editora'}
                    {...register('publisher')}
                    defaultValue={valueForm?.publisher}
                />
                <input
                    className={styleInput}
                    type="date"
                    placeholder={'Publicação'}
                    {...register('publishDate')}
                    defaultValue={valueForm?.publishDate}
                />
                <input
                    className={styleInput}
                    placeholder={'Total de páginas'}
                    {...register('pages')}
                    defaultValue={valueForm?.pages}
                />
                <input
                    className={styleInput}
                    placeholder={'Imagem'}
                    {...register('image')}
                    defaultValue={valueForm?.image}
                />
                <input  
                    className={styleInput}
                    placeholder={'Idioma'}
                    {...register('language')}
                    defaultValue={valueForm?.language}
                />
                <textarea
                    className={'h-32 px-4 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans'}
                    {...register('description')}
                    defaultValue={valueForm?.description}
                >
                </textarea>
                <Button className={'cursor-pointer bg-primary'} variant="contained" type="submit">Enviar</Button>
            </form>
        </div>
    )
}

export default BookRegister
