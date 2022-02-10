import React from "react";

const Button = ({ children, background, color, width, height, fontSize, onClick }) => {
    const styleClass = `
        ${width ? width : "w-48"}
        ${background ? background : "bg-primary"}
        ${color ? color : "text-primary"}
        ${height ? height : "h-16"}
        ${fontSize ? fontSize : "text-xl"}
        font-sans font-bold rounded flex items-center justify-center px-4 text-center hover:bg-blue mt-4 mb-4
        `;

    return (
        <button onClick={onClick} className={styleClass}>
            {children ? children : ""}
        </button>
    );
};

export default Button;
