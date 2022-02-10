// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import { createBook, getBookById, editBook } from '../api/apiService';
import { normalizeBookData } from '../utils/normalize';
import axios from 'axios';
import { redirectWithMsg } from '../utils/helpers';

const urlBase = !window.location.host.includes('netlify') ? 'http://localhost:5000' : 'https://sound-aileron-337523.rj.r.appspot.com'

const BookRegister = ({ match }) => {

    const InitialValue = {
        isbn: '',
        title: '',
        author: '',
        pages: '',
        image: '',
        language: '',
        description: '',
        subtitle: '',
        publisher: '',
    };
    const [valueForm, setValueForm] = useState(InitialValue)
    const { register, handleSubmit, setValue } = useForm();

    let isEdit = useMemo(() => !!match.params?.id, [match.params.id]);

    const styleInput = `h-16 px-4 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchBookById = async (id) => {
        const book = await getBookById(id);
        setValueForm(book);
        for (const key in book) {
            setValue(key, book[key]);
        }

    }

    useEffect(() => {
        if (isEdit) {
            fetchBookById(match.params?.id)
        }
    },  [isEdit, match.params?.id]);

    const onSubmit = async (dataForm) => {
        let response = '';
        if (isEdit) {
            response = await editBook({ _id: match.params?.id, ...dataForm });
        }
        else {
            response = dataForm.isbn ? await createBook(valueForm) : await createBook(dataForm);
        }

        if (response.status === 200) redirectWithMsg(`${isEdit ? `/livros/info/${match.params?.id}` : '/livros'}`, 'success', `O livro foi ${isEdit ? 'Editado' : 'Cadastrado'} com sucesso`);
    };


    const fetchBook = async (value) => {
        if (value !== '') {
            const { data } = await axios.get(`${urlBase}/books/isbn/${value}`)
            return setValueForm(data ? normalizeBookData(data, value) : {});
        }
        return {}
    };

    return (
        <div className="flex justify-around items-center">

            <form className='flex flex-col rounded-xl h-3/4 h-screen justify-around w-2/4' onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styleInput}
                    placeholder={'ISBN'}
                    {...register('isbn')}
                    defaultValue={valueForm?.isbn}
                    required
                    onBlur={(e) => isEdit ? '' : fetchBook(e.target.value)}
                />
                <input
                    className={styleInput}
                    placeholder={'Título'}
                    {...register('title')}
                    required
                    defaultValue={valueForm?.title}
                />
                <input
                    className={styleInput}
                    placeholder={'Subtitulo'}
                    {...register('subtitle')}
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
