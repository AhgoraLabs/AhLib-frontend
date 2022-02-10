import React from "react";

const BoxInfoBook = ({ title, icon, value }) => {
    return (
        <div className="rounded-2xl w-36 h-36 px-4 flex justify-evenly flex-col items-center text-center border border-gray-400 shadow-input-box-shadow bg-white">
            <h5>{title}</h5>
            {icon}
            <span>{value}</span>
        </div>
    );
};

export default BoxInfoBook;
