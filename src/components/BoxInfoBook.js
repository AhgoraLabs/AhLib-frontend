import React from 'react'

const BoxInfoBook = ({title, icon, value}) => {
    return (
        <div className="rounded-2xl w-36 h-36 px-4 flex justify-evenly flex-col items-center text-center border border-black shadow-input-box-shadow">
            <h5>{title}</h5>
            {icon}
            <span>{value}</span>
        </div>
    )
}

export default BoxInfoBook;
