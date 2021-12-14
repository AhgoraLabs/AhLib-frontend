import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../components/Input'
import Button from '../components/Button';
import Box from '../components/Box';
import { BiBookAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { listBooks, getBook } from '../api/apiService';
import { isUser } from '../utils/validationProfile';
// import { totalStars } from '../utils/totalStar';
// import { normalizeBookData } from '../utils/normalize';

const buttonsValues = [
    {
        name: 'Cadastrar',
        path: '/livros/cadastrar',
        icon: <BiBookAdd className="w-12" />
    }
]

const Books = () => {

    const [books, setBooks] = useState([])
    const fetchBooks = async () => {
        const {data:{ data } } = await listBooks();
        setBooks(data)
    };

    const fetchBookForInput = async (value) => {
        let data = '';
        if (value === '') {
            return fetchBooks();
        }

        data = await getBook(value)
        return setBooks(data)
    }

    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <div>
            <header className='w-full flex justify-center h-32 items-center'>
                <Input
                    placeholder={'Pesquisar'}
                    fetchBookForInput={fetchBookForInput}
                />
            </header>
            <main className=' w-full flex justify-between'>
                <section className='w-56 h-large'>
                </section>
                <section className='w-8/12 h-large flex justify-center flex-row flex-wrap'>
                    {books.length > 0 ? books.map(({ _id, title, author, image, coments, active }) => (
                        <Link key={_id} to={`/livros/bookInfo/${title}`}>
                            <Box key={_id} title={title} authors={author} star={5} image={image} coments={coments} alugado={!active} />
                        </Link>
                    )) : ''}
                </section>
                <aside className='w-56 h-large flex flex-col items-end'>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        {isUser('admin') ?  buttonsValues.map(({ name, icon, path }) => (
                            <Link to={path}>
                                <Button>
                                    {icon}
                                    <label>
                                        {name}
                                    </label>
                                </Button>
                            </Link>
                        )): ''}
                    </IconContext.Provider>
                </aside>
            </main>
        </div>
    )
}

export default Books
