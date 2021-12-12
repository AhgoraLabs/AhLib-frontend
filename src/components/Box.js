import React from 'react'
import Rating from '@mui/material/Rating';

const Box = ({title, star, image, alugado}) => {
    return (
        <div className="h-80 w-56 mx-10 border border-gray-100 rounded-3xl shadow-input-box-shadow">
            <div style={{backgroundImage: `url(${image})`}} className="h-52 mt-4 bg-no-repeat bg-contain bg-center "></div>
            <div className={`text-center mt-4 flex  flex-col items-center ${title.length > 28 ? 'text-xs' : ''}`}>
                <label>{title.split(':')[0]}</label>
                <Rating name="half-rating-read" defaultValue={star} precision={0.5} readOnly />
            </div>
            <div className={`${alugado ? ' text-danger' : ''} text-center `}>{alugado ? 'Alugado' : 'Livre'}</div>
        </div>
    )
}

export default Box
