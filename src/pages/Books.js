/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Input from '../components/Input'
import Button from '../components/Button';
import Box from '../components/Box';
import { BiBookAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { listBooks, getBookByTitle } from '../api/apiService';
import { isAdminOrSuper } from '../utils/validationProfile';
import { showFlashDataMsg } from '../utils/helpers';
import Toast from '../components/Toasts';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '../components/Pagination';
import _ from 'lodash';


const buttonsValues = [
    {
        name: 'Cadastrar',
        path: '/livros/cadastrar',
        icon: <BiBookAdd className="w-12" />
    }
]

const Books = () => {
    let typingTime;
    const TIMEOUT_TYPING_TIME = 500;

    const [books, setBooks] = useState([])
    const [toastData, setToastData] = useState({});
    const [profile, setProfile] = useState(null);
    const [count, setCount] = useState(0);
    const [booksPerPage, setBooksPerPage] = useState(8);
    console.log(booksPerPage, 'booksPerPage');
    console.log(count, 'count');

    const [page, setPage] = useState(0);
    console.log(page, 'page');

    const fetchBooks = async (limit = 8, page) => {
        const { data: { data, count } } = await listBooks(limit, page);
        setCount(count);
        setBooks(data)
    };

    const fetchBookForInput = async (value) => {
        if (value === '') {
            return fetchBooks();
        } else {

            clearTimeout(typingTime);
            let data = '';
            typingTime = setTimeout(async () => {
                data = await getBookByTitle(value)
                return setBooks(data)
            }, TIMEOUT_TYPING_TIME)
        }
    }

    const handleChangePage = async (operation) => {
        const miniMum = booksPerPage * page;
        const maxiMum = booksPerPage * (page + 1);

        if (operation === 'subtract' && page > 0) setPage(page - 1);
        else if (operation === 'add' && !_.inRange(count, miniMum, maxiMum)) setPage(page + 1)
    };

    const handleChangeRowsPerPage = (event) => {
        setBooksPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(async () => {
        await fetchBooks(8, 0);
        const userProfile = await isAdminOrSuper();
        setProfile(userProfile);
        const data = showFlashDataMsg();
        setToastData(data);
    }, [])

    const firstUpdate = useRef(true);
    useEffect(async () => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        await fetchBooks(booksPerPage, page);
    }, [booksPerPage, page])


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
                    {books || books?.length > 0 ? books.map(({ _id, title, author, image, coments }) => (
                        <Box key={_id} title={title} authors={author} star={5} image={image} coments={coments} bookId={_id} />

                    )) : 'Não Foi encontrado nenhum livro'}
                    <div className='fixed bottom-0'>
                        <Pagination
                            options={[8, 16, 32, 40]}
                            label={"Livros por página"}
                            handleChangePage={handleChangePage}
                            page={page}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            booksPerPage={booksPerPage}
                            total={count}
                        />
                    </div>

                </section>
                <aside className='w-56 h-large flex flex-col items-end'>
                    <IconContext.Provider value={{ color: '#fff' }}>
                        {profile && buttonsValues.map(({ name, icon, path }) => (
                            <Link to={path}>
                                <Button>
                                    {icon}
                                    <label>
                                        {name}
                                    </label>
                                </Button>
                            </Link>
                        ))}
                    </IconContext.Provider>
                </aside>
            </main>
            {toastData.msg && <Toast type={toastData.type} msg={toastData.msg} open={true} setToastData={setToastData} />}

        </div>
    )
}

export default Books
