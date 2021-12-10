import React from 'react'

const Button = ({ children, background, color, width, height, fontSize }) => {
   
    const styleClass = `
        ${width ? width : 'w-48'}
        ${background ? background : 'bg-primary'}
        ${color ? color : 'text-primary'}
        ${height ? height : 'h-16'}
        ${fontSize ? fontSize : 'text-xl'}
        font-sans font-bold rounded-l flex items-center px-4 mb-8 hover:bg-blue 
        `;
        
    return (
        <button className={styleClass}>{children}</button>
    )
}

export default Button
