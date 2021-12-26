import React from 'react'

const Button = ({ children, background, color, width, height, fontSize, onClick }) => {

    const styleClass = `
        ${width ? width : 'w-48'}
        ${background ? background : 'bg-primary'}
        ${color ? color : 'text-primary'}
        ${height ? height : 'h-16'}
        ${fontSize ? fontSize : 'text-xl'}
        font-sans font-bold rounded flex items-center px-4 hover:bg-blue
        `;

    return (
        <button onClick={onClick} className={styleClass}>{children ? children : ''}</button>
    )
}

export default Button
