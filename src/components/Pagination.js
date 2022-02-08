import React, { useState } from 'react';

const Pagination = ({ label, options, total, handleChangePage, page, handleChangeRowsPerPage, booksPerPage }) => {
    return (
        <>
            <label className='text-base'>{label}</label>
            <select className='bg-transparent ' onChange={handleChangeRowsPerPage}>
                {options.map(option => {
                    return <option>{option}</option>
                })}
            </select>
            <label className='ml-3 mr-3'>{'\u00A0'} {(booksPerPage * page) +1} - {Math.min(booksPerPage * (page + 1), total)} de {total}{'\u00A0'}</label>
            <label className='text-xl mr-4 cursor-pointer' onClick={() => handleChangePage('subtract')}>{'\u00A0<\u00A0'}  </label>
            <label className='text-xl  cursor-pointer' onClick={() => handleChangePage('add')}>{'\u00A0>'}</label>
        </>
    )
}

export default Pagination;