import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import { totalStars } from '../utils/totalStar';
import Rating from '@mui/material/Rating';
import { Button as ButtonMui } from '@mui/material';
import { BsCalendarDate } from 'react-icons/bs';
import { GrLanguage } from 'react-icons/gr';
import { RiPagesLine } from 'react-icons/ri';
import { AiOutlineArrowRight } from 'react-icons/ai';
import BoxInfoBook from '../components/BoxInfoBook';
import Button from '../components/Button';
import { getBook, removeBook, getLoanByBookId } from '../api/apiService';
import { isAdminOrSuper } from '../utils/validationProfile';
import Modal from '../components/Modal';
import Toast from '../components/Toasts';
import AuthContext from '../context/auth/AuthContext';
import { redirectWithMsg, showFlashDataMsg, isNotAvailableForLoan, checkIfUserCanExtendLoan } from '../utils/helpers';

const BookInfo = () => {

    const [isOpen, setIsOpen] = useState(!true)
    const { user: { email } } = useContext(AuthContext);
    console.log('email', email);

    const [book, setBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [toastData, setToastData] = useState({});
    const [loan, setLoan] = useState({});
    const { id } = useParams();

    const openModalBookDeletion = () => {
        setOpenModal(!openModal)
    }

    const fetchLoan = useCallback(async function () {
        let loanInformation = await getLoanByBookId(id);
        setLoan(loanInformation[loanInformation.length - 1]);
    }, [id])

    const fetchBook = useCallback(async function () {
        let bookInformation = await getBook(id);
        setBook(bookInformation);
    }, [id])

    const handleBookRemoval = async () => {
        const response = await removeBook(id);
        if (response.status === 200) redirectWithMsg('/livros', 'success', 'O livro foi removido com sucesso');
    }
    useEffect(() => {
        fetchLoan();
    }, [fetchLoan])

    useEffect(() => {
        fetchBook();
        const data = showFlashDataMsg();
        setToastData(data);
    }, [fetchBook])

    console.log('loan', loan)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const {
        image = '',
        title = '',
        alugado = false,
        author = [],
        star = [5],
        description = [],
        publicado = new Date().toLocaleDateString('pt-BR', options),
        publisher = '',
        language = '',
        pages = 0,
    } = book;


    return (
        <>
            <Modal open={openModal} setOpen={setOpenModal} removeBook={handleBookRemoval} />
            <div className="flex h-screen justify-center items-center">

                <section className="flex w-bookInfo h-bookInfo">
                    <div className="w-96 h-full">
                        <div style={{ backgroundImage: `url(${image})` }} className="h-96 bg-no-repeat bg-48 bg-center"></div>
                        <div className="flex justify-around">
                            {alugado && <Button width="w-18" height="h-8" fontSize="text-base">Alugar</Button>}
                            <div className="flex items-center flex-col">
                                {isAdminOrSuper() &&
                                    <div className="flex justify-between w-48 mb-4">
                                        <Link to={`/livros/edit/${id}`}>
                                            <Button width="w-18" height="h-8" fontSize="text-base">Editar</Button>
                                        </Link>
                                        <Button onClick={openModalBookDeletion} width="w-18" height="h-8" fontSize="text-base">Excluir</Button>
                                    </div>
                                }
                                {!isNotAvailableForLoan(loan) && <div>
                                    <Link to={`/livros/loan/${id}`}>
                                        <Button width="w-26" height="h-12">Empréstimo</Button>
                                    </Link>
                                </div>
                                }
                                {checkIfUserCanExtendLoan(loan, email) && <div>
                                    <Link to={`/livros/loan/${id}`}>
                                        <Button width="w-26" height="h-12">Extender empréstimo</Button>
                                    </Link>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                    <div className="ml-4 w-full flex justify-start flex-col ">

                        <div className="w-bookTitle h-16 mt-14 flex items-center justify-start font-sans mx-10">
                            <h1 className="text-3xl">{title.toUpperCase()}</h1>
                        </div>
                        <div className="h-7 mx-10">
                            <h2>Autor : {author.toString()}</h2>
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
                            <BoxInfoBook title={'publicado'} icon={<BsCalendarDate />} value={publicado} />
                            <BoxInfoBook title={'Editora'} value={publisher} />
                            <BoxInfoBook title={'Idioma'} icon={<GrLanguage />} value={language} />
                            <BoxInfoBook title={'Total de páginas'} icon={<RiPagesLine />} value={pages} />
                        </div>
                        <div className="mx-10">
                            <Button height="h-12">{'Comentários'}{<AiOutlineArrowRight />}</Button>
                        </div>
                    </div>

                    {toastData.msg && <Toast type={toastData.type} msg={toastData.msg} open={true} setToastData={setToastData} />}
                </section>
            </div>
        </>



    )
}

export default BookInfo
