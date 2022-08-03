import React from "react";

const Button = ({ children, background, color, width, height, fontSize, styleCustom, onClick, padding }) => {

    const styleClass = `
        ${width ? width : 'w-48'}
        ${background ? background : 'bg-primary'}
        ${color ? color : 'text-primary'}
        ${height ? height : 'h-16'}
        ${fontSize ? fontSize : 'text-xl'}
        ${padding ? padding : 'p-0'}
        ${styleCustom}
        font-sans font-bold rounded flex items-center justify-center px-4 text-center hover:bg-blue 
        `;

    return (
        <button onClick={onClick} className={styleClass}>
            {children ? children : ""}
        </button>
    );
};

export default Button;
