import React, { useState, useEffect } from 'react';
import style from 'styled-components';
import { BidivAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Season = () => {

    return (
        <>
            <div className='flex justify-between border border-gray-100 container mx-auto'>

                <div style={{ width: '10vw' }}>
                    <div className="flex space-x-2">
                        <div className="relative w-38 h-40">
                            <img className="rounded-full border border-gray-100 shadow-sm" src="https://media-exp1.licdn.com/dms/image/C4E03AQFQGjfq97pmDA/profile-displayphoto-shrink_200_200/0/1616757635695?e=1649894400&v=beta&t=PqlqDBBrdwlUEiLA-EzSboUT3vaPMXiJ6im2aGLne2E" alt="user image" />
                        </div>
                    </div>
                </div>

                <div style={{ width: '10vw' }}>
                    <div>
                        <div className='flex space-x-2'>
                            <img className="border border-gray-100 shadow-sm" src="http://books.google.com/books/content?id=c0U4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="user image" />
                        </div>
                    </div>
                </div>

                <div style={{ width: '70vw' }}>
                    O Apanhador de pererecas <br />
                    Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica
                </div>

                <div style={{ width: '10vw' }}>
                    <div>
                        Data da temporada
                    </div>

                </div>
            </div>
        </>
    )
}

export default Season;