import React, { useState, useEffect } from 'react';
import style from 'styled-components';
import { BidivAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const sugestionDataMock = [
    {
        authorImage: "https://media-exp1.licdn.com/dms/image/C4E03AQFQGjfq97pmDA/profile-displayphoto-shrink_200_200/0/1616757635695?e=1649894400&v=beta&t=PqlqDBBrdwlUEiLA-EzSboUT3vaPMXiJ6im2aGLne2E",
        bookImage: "http://books.google.com/books/content?id=c0U4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        bookTitle: "Clean code",
        bookDescription: " Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica",
        department: "DSW",
        author: "Thiago quadros",
        date: new Date()
    },
    {
        authorImage: "https://media-exp1.licdn.com/dms/image/C4E03AQFQGjfq97pmDA/profile-displayphoto-shrink_200_200/0/1616757635695?e=1649894400&v=beta&t=PqlqDBBrdwlUEiLA-EzSboUT3vaPMXiJ6im2aGLne2E",
        bookImage: "http://books.google.com/books/content?id=c0U4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
        bookTitle: "Clean code",
        bookDescription: " Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica Estou recomendando esse livro para todos os devs melhorarem sua capacidade analitica",
        department: "DSW",
        author: "Thiago Quadros",
        date: new Date()
    }

]

const Season = () => {

    return (
        <div className="flex justify-center h-full w-screen font-poppins">
            <div className="w-4/5 h-full">
                {sugestionDataMock.map(sugestion => {
                    return (
                        <div className='flex m-4 h-card justify-between shadow-lg rounded-xl border-gray-100'>
                            <div className='w-1/5 flex justify-center items-center'>
                                <img className='h-3/4' src={sugestion.bookImage} />
                            </div>
                            <div className='w-3/4'>
                                <div>
                                    <h2 className='text-left mt-6 tracking-wider text-3xl'>{sugestion.bookTitle}</h2>
                                </div>
                                <div>
                                    <span>
                                        <p className='mt-4 tracking-wider text-ellipsis overflow-hidden'>{sugestion.bookDescription}</p>
                                    </span>
                                </div>
                                <div className='w-full h-1/4 flex justify-end items-end'>
                                    <div className='h-full flex flex-col p-0 lg:m-0 m-4 xl:pt-8'>
                                        <span>{sugestion.author}</span>
                                        <span className='text-right'>{sugestion.department}</span>
                                    </div>

                                </div>
                            </div>
                            <div className='w-18 flex justify-end items-end lg:flex hidden '>
                                <img className='m-4 rounded-xl h-1/4' src={sugestion.authorImage} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Season;