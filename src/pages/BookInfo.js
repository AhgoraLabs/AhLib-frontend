import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { dados } from '../utils/mock';
import { totalStars } from '../utils/totalStar';
import Rating from '@mui/material/Rating';
import { Button as ButtonMui } from '@mui/material';
import { BsCalendarDate } from 'react-icons/bs';
import { GrLanguage } from 'react-icons/gr';
import { RiPagesLine } from 'react-icons/ri';
import { AiOutlineArrowRight} from 'react-icons/ai';
import BoxInfoBook from '../components/BoxInfoBook';

import Button from '../components/Button';

const BookInfo = () => {

    const [isOpen, setIsOpen] = useState(!true)
    const { id } = useParams();

    const book = dados.find(dado => dado.id === id);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const {
        image = '',
        title = '',
        alugado = false,
        authors = [],
        star = [],
        description = [],
        publicado = new Date().toLocaleDateString('pt-BR', options),
        publisher = '',
        language = '',
        pageCount = '',
    } = book || {};

    console.log(publicado);
    return (
        <div className="flex h-screen justify-center items-center">
            <section className="flex w-bookInfo h-bookInfo">
                <div className="w-96 h-full">
                    <div style={{ backgroundImage: `url(${image})` }} className="h-96 bg-no-repeat bg-48 bg-center"></div>
                    <div className="flex justify-around">
                        {alugado && <Button width="w-18" height="h-8" fontSize="text-base">Alugar</Button>}
                        <Button width="w-18" height="h-8" fontSize="text-base">Editar</Button>
                        <Button width="w-18" height="h-8" fontSize="text-base">Excluir</Button>
                    </div>
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
                    <ButtonMui onClick={() => setIsOpen(!isOpen)}>Ler {isOpen ? 'menos' : 'mais'}</ButtonMui>
                    <div className="h-1/4 flex items-center justify-around">
                        <BoxInfoBook title={'publicado'} icon={<BsCalendarDate/>} value={publicado}/>
                        <BoxInfoBook title={'Editora'} value={publisher}/>
                        <BoxInfoBook title={'Idioma'} icon={<GrLanguage/>} value={language}/>
                        <BoxInfoBook title={'Total de páginas'} icon={<RiPagesLine/>} value={pageCount}/>
                    </div>  
                    <div className="mx-10">
                        <Button height="h-12">{'Comentários'}{<AiOutlineArrowRight/>}</Button>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default BookInfo
