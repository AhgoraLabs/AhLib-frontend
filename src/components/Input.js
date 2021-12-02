import React from 'react'

const Input = ({ value, placeholder }) => {
    return (
            <input
             className='h-16 w-large pl-4 shadow-input-box-shadow rounded-3xl outline-none font-sans text-xl border border-gray-200'
             placeholder={placeholder}
             value={value}/>
    )
}

export default Input
