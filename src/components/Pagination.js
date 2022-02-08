import React, { useState } from 'react';

const Pagination = ({ label, options, total, handleChangePage, page, handleChangeRowsPerPage, booksPerPage }) => {
    return (
        <>
            <label className='text-sm'>{label}: </label>
            <select onChange={handleChangeRowsPerPage}>
                {options.map(option => {
                    return <option>{option}</option>
                })}
            </select>
            <label>{'\u00A0'} {(booksPerPage * page) +page} - {Math.min(booksPerPage * (page + 1), total)} de {total}{'\u00A0'}</label>
            <label className='cursor-pointer' onClick={() => handleChangePage('subtract')}>{'\u00A0<\u00A0'}  </label>
            <label className='cursor-pointer' onClick={() => handleChangePage('add')}>{'\u00A0>'}</label>
        </>
    )
}

export default Pagination;