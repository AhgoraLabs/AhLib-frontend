import React, { useState } from 'react';
import { Button } from '@mui/material';
import { createSuggestion } from '../api/apiService'
import { redirectWithMsg } from '../utils/helpers'

const SuggestionPage = () => {
    const [suggestionData, setSuggestionType] = useState({});

    const selectOptions = [
        'Tipo de sugestão',
        'Sugestão de nova funcionalidade',
        'Sugestão de compra',
        'Elogio',
        'Outro'
    ];

    const handleOnChangeType = (e) => setSuggestionType({ ...suggestionData, type: e.target.value });

    const handleInput = e => {
        const { value } = e.target;
        setSuggestionType({ ...suggestionData, content: value })
    }

    const handleSendForm = async () => {
        const response = await createSuggestion(suggestionData)
        if (response.status === 200)redirectWithMsg(`/livros`, 'success', 'A sugestão foi cadastrada com sucesso');
    }

    return (
        <div className='flex justify-around items-center'>
            <form className='flex flex-col rounded-xl h-3/4  mt-4 w-2/4'>
                <select onChange={handleOnChangeType} className='h-16 px-4 border-2 border-gray-400 rounded-xl font-sans text-center'>
                    {selectOptions.map(option => <option value={option}> {option} </option>)}
                </select>
                <textarea
                    className='h-32 px-4 mt-5 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans' onChange={handleInput} />
                <div className=' mt-5 flex flex-col rounded-xl h-3/4  mt-4 w-4/4'>
                    <Button onClick={handleSendForm} className='cursor-pointer bg-primary' variant="contained">Enviar</Button>
                </div>
            </form>

        </div>
    )
}

export default SuggestionPage;