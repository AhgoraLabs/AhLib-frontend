import React from 'react'

const Button = ({ children, background, color }) => {
    return (
        <button className={`w-48 h-16 font-sans font-bold text-xl rounded-l flex items-center px-4 mb-8 hover:bg-blue ${background ? background : 'bg-primary'} ${color ? color : 'text-primary'}`}>{children}</button>
    )
}

export default Button
