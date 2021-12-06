import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { dados } from '../utils/mock';
import { totalStars } from '../utils/totalStar';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import Commentbox from '../components/Commentbox';

const BookInfo = () => {

    const [isOpen, setIsOpen] = useState(!true)
    const { id } = useParams();

    const book = dados.find(dado => dado.id === id);

    const { image, title, alugado, authors, star, description, coments } = book;

    console.log(book);
    return (
        <div className="flex h-screen justify-center items-center">
            <section className="flex w-bookInfo h-bookInfo">
                <div className=" w-96 h-full">
                    <div style={{ backgroundImage: `url(${image})` }} className="h-96 bg-no-repeat bg-48 bg-center"></div>
                </div>
                <div className="ml-4 w-full flex justify-start flex-col ">
                    <div className="w-bookTitle h-16 mt-14 flex items-center justify-start font-sans mx-10">
                        <h1 className="text-3xl">{title}</h1>
                    </div>
                    <div className="h-7 mx-10">
                        <h2>Autor : {authors.toString()}</h2>
                    </div>
                    <div className="h-8 w-48 mt-4 mx-10 flex items-center justify-between">
                        <Rating name="half-rating-read" defaultValue={totalStars(star)} precision={0.5} readOnly />
                        <label>Votos : {star.length}</label>
                    </div>
                    <div className={`mx-10 overflow-hidden flex flex-col ${isOpen ? '' : 'h-24'}`}>
                        <h3 className="font-sans ">Descrição</h3>
                        {description}
                    </div>

                    <Button onClick={() => setIsOpen(!isOpen)}>Ler {isOpen ? 'menos' : 'mais'}</Button>

                    <div className={'h-1/4 bg-red-700'}>
                        <Commentbox></Commentbox>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default BookInfo
