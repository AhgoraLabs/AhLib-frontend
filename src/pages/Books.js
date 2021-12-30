import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../components/Input'
import Button from '../components/Button';
import Box from '../components/Box';
import { BiBookAdd } from "react-icons/bi";
import { IconContext } from 'react-icons';
import { listBooks, getBook } from '../api/apiService';
import { isAdminOrSuper } from '../utils/validationProfile';
import { isAvailableForLoan, showFlashDataMsg } from '../utils/helpers';
import Toast from '../components/Toasts';
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
    const [toastData, setToastData] = useState({});
    const [loan, setLoan ] = useState({});
    const [profile, setProfile] =useState(null);



    const fetchBooks = async () => {
        const { data: { data } } = await listBooks();
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

    useEffect(async() => {
        fetchBooks();
        const userProfile = await isAdminOrSuper();
        setProfile(userProfile);
        const data = showFlashDataMsg();
        setToastData(data);
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
                        <Link key={_id} to={`/livros/info/${_id}`}>
                            <Box key={_id} title={title} authors={author} star={5} image={image} coments={coments} bookId={_id}/>
                        </Link>
                    )) : ''}
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
