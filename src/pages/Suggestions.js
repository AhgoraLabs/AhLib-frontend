import React from 'react';
import { Button } from '@mui/material';

const SuggestionPage = () => {
    const selectOptions = [
        'Tipo de sugestão',
        'Sugestão de nova funcionalidade',
        'Sugestão de compra',
        'Elogio',
        'Outro'
    ];

    return (
        <div className='flex justify-around items-center'>
            <form className='flex flex-col rounded-xl h-3/4  mt-4 w-2/4'>
                <select className='h-16 px-4 border-2 border-gray-400 rounded-xl font-sans text-center'>
                    {selectOptions.map(option => <option value={option}> {option} </option>)}
                </select>

                <textarea
                    className='h-32 px-4 mt-5 outline-none border-2 border-gray-400 rounded-xl focus:border-blue-700 font-sans'
                ></textarea>
                <div className=' mt-5 flex flex-col rounded-xl h-3/4  mt-4 w-4/4'>
                    <Button className='cursor-pointer bg-primary' variant="contained" type="submit">Enviar</Button>
                </div>
            </form>

        </div>
    )
}

export default SuggestionPage;