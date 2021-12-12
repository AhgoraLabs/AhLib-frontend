import React from 'react'

const Input = ({ value, placeholder, width, height, shadow, border }) => {

    const styleClass = `
    ${height ? height : 'h-16'}
    ${width ? width : 'w-large'}
    ${shadow ? shadow : 'shadow-input-box-shadow'}
    ${border ? border : 'rounded-3xl'}
    outline-none font-sans text-xl border border-gray-200  pl-4  `;


    return (
            <input
             className={styleClass}
             placeholder={placeholder}
             value={value}/>
    )
}

export default Input
