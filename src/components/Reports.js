import React from 'react';
import MultiSelect from '../components/Multiselect';

const Report = ({users}) => {
    return (
        <div className='container mx-auto px-4'>
            <h1 className='text-3xl'> Relatório de Avaliações</h1>
            <div className='border-2 border-solid border-black w-5/5'>
                <h2> Filtros </h2>
                <div id='filtros' className='flex justify-evenly'>
                    <MultiSelect users={users} />

                </div>
                <div className='flex justify-end'>
                    <button className='bg-blue-500  text-white font-bold py-2 px-4 rounded-full'>Gerar Relatório</button>
                </div>

            </div>
        </div>
    )
}

export default Report;