
import { Container } from './style';

import React, { useState, useEffect, useCallback, useContext, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import { totalStars } from "../../utils/totalStar";
import Rating from "@mui/material/Rating";
import { Button as ButtonMui } from "@mui/material";
import { GrLanguage } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import Button from "../../components/Button";
import moment from "moment";
import { getBookById, removeBook, getLoanByBookId, getAllLoansByBookId, getCommentsById, endLoan } from "../../api/apiService";
import { createRequestBooking, checkIfBookIsBookedById } from "../../api/RequestService/index";
import { isAdminOrSuper } from "../../utils/validationProfile";
import Modal from "../../components/Modal";
import ModalComments from "../../components/ModalComments";
import Toast from "../../components/Toasts";
import AuthContext from "../../context/auth/AuthContext";
import { redirectWithMsg, showFlashDataMsg, checkIfUserCanExtendLoan } from "../../utils/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import NoImage from "../../components/NoImageBook";
import {ReadMoreMore} from 'read-more-more';

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const BookInfo = () => {
    const { width, height } = useWindowSize()
    const reducer = (state, {type, payload}) => {
        const reducerObj = {
            CHANGE: {
                data: {
                    ...state.data,
                    [payload.name]: payload.value
                }
            }
        }

        return reducerObj[type]
    }

    const [state, dispatch] = useReducer(reducer, {
        data: {
            book: {},
            loan: {},
            comments: {},
            votes: {},
            numberOfLoans: 0,
        }
    })

    const [isOpen, setIsOpen] = useState(!true);
    const {
        user: { email, profile, id: userId, name: userName },
    } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);
    const [openModalLoan, setOpenModalLoan] = useState(false);
    const [openModalComments, setOpenModalComments] = useState(false);
    const [openModalRequest, setOpenModalRequest] = useState(false);
    const [toastData, setToastData] = useState({});
    const [isBooked, setIsBooked] = useState(false);
    const [isLoading, setLoading] = useState(true);

    //const userHasGreatAccess = isAdminOrSuper(profile);
    const userHasGreatAccess = true;

    const { id } = useParams();

    const openModalBookDeletion = () =>  dispatch({type: 'CHANGE', payload: {name: 'delete', value: !state.modal.delete}})

    const openModalBookEdit = () => dispatch({type: 'CHANGE', payload: {name: 'loan', value: !state.modal.loan}});

    const getTotalRating = async () => {
        const response = await getCommentsById(id);
        dispatch({ type: 'CHANGE', payload: { name: 'comments', value: response } })
        const data = response.map(({ stars }) => stars);
        dispatch({ type: 'CHANGE', payload: { name: 'votes', value: data } })
    };

    const openModalRequestBook = () => setOpenModalRequest(!openModalComments);
    
    const openModalBookComments = () => setOpenModalComments(!openModalComments);

    const fetchLoan = useCallback(
        async function () {
            let loanInformation = await getLoanByBookId(id);
            dispatch({type: 'CHANGE', payload: { name: 'loan', value: loanInformation}})
        },
        [id]
    );

    const fetchBooking = useCallback(
        async function () {
            const response = await checkIfBookIsBookedById(id);

            setIsBooked(!!response.data);
        }
    )

    const fetchBook = useCallback(
        async function () {
            let bookInformation = await getBookById(id);
            dispatch({
                type: 'CHANGE',
                payload: { name: 'book', value: bookInformation },
              })
        },
        [id]
    );

    setTimeout(() => {
        setLoading(false);
    }, 600);

    const handleBookRemoval = async () => {
        const response = await removeBook(id);
        if (response.status === 200) redirectWithMsg("/livros", "success", "O livro foi removido com sucesso");
    };

    const handleRequestBooking = async () => {
        const response = await createRequestBooking({ bookId: id, userId, userEmail: email, bookName: state.data.book.title, userName });

        if (response.status === 201) {
            redirectWithMsg("/livros", "success", "Sua reserva foi realizada com sucesso");
        }
    }

    const handleLoansByBookId = async () => {
        const numberOfLoansFound = await getAllLoansByBookId(id);
        dispatch({ type: 'CHANGE', payload: { name: 'numberOfLoans', value: numberOfLoansFound } })
    };

    const handleLoanEnding = async () => {
        const response = await endLoan(state.data.loan._id);

        if (response.status === 200) redirectWithMsg("/livros", "success", "O empréstimo foi encerrado com sucesso");
    };

    useEffect(() => {
        fetchLoan();
        getTotalRating();
        fetchBooking();
        handleLoansByBookId();
    }, []);

    useEffect(async () => {
        fetchBook();
        const data = showFlashDataMsg();
        setToastData(data);
    }, []);

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    const { image = "", title = "", subtitle = "", alugado = false, author = [], description = [], publicado = new Date().toLocaleDateString("pt-BR", options), publisher = "", language = "", pages = 0 } = state.data.book;

    return (
        <>
            <Confetti
                width={width-50}
                height={height-599}
                tweenDuration={100}
            />
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                action={handleBookRemoval}
                title={"Exclusão de livro"}
                text={"Tem certeza que deseja excluir o registro? Essa ação não poderá ser desfeita"}
            />

            <Modal
                open={openModalRequest}
                setOpen={setOpenModalRequest}
                action={handleRequestBooking}
                title={"Solicitação de reserva"}
                text={`Ao confirmar, sua reserva será enviada ao RH, caso aprovada, um empréstimo será criado automaticamente.`}
            />
            <Modal
                open={openModalLoan}
                setOpen={setOpenModalLoan}
                action={handleLoanEnding}
                title={"Terminar empréstimo"}
                text={"Tem certeza que deseja executar essa ação? Essa ação não poderá ser desfeita"}
            />
            <ModalComments open={openModalComments} currentComments={state.data.comments} setOpen={setOpenModalComments} bookId={id} />
            <div>
                {isLoading ? (
                    <CircularProgress size={200} />
                ) : (
                    <Container>
                        <div id="modal">
                            <div id="modal-left">
                                {image ? (
                                    <div className="flex justify-center">
                                        <div
                                            style={{ backgroundImage: `url(${!!image ? image : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg"})` }}
                                            id='imageBook'
                                        ></div>
                                    </div>
                                ) : (
                                    <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
                                        <NoImage title={title} />
                                    </div>
                                )}
                                <div className="flex justify-around">
                                    {alugado && <Button width="w-18" height="h-8" fontSize="text-base"> Alugar </Button>}
                                    <div className="flex items-center flex-col">
                                        {userHasGreatAccess && 
                                            <div className="flex justify-between w-48 mb-4">
                                                <Link to={`/livros/edit/${id}`}><Button width="w-18" height="h-8" fontSize="text-base">Editar</Button></Link>
                                                <Button onClick={openModalBookDeletion} width="w-18" height="h-8" fontSize="text-base">Excluir</Button>
                                            </div>
                                        }

                                        {state.data.book.ebookUrl ? (
                                            <a href={state.data.book.ebookUrl} target="_blank" rel="noreferrer"><Button width="w-18" height="h-8" fontSize="text-base">Download</Button></a>
                                        ) : isBooked && !userHasGreatAccess ? (
                                            <div style={{ marginBottom: 20 }}> <p className="text-center font-medium">Reservado </p></div>
                                        )
                                            : !state.data.loan && userHasGreatAccess ? (
                                                <div>
                                                    <Link to={`/livros/loan/${id}`}><Button width="w-26" height="h-12">Empréstimo</Button></Link>
                                                </div>
                                            ) : !state.data.loan && (profile === 'user') ? (
                                                <div style={{ marginBottom: 20 }}>
                                                    <Button onClick={openModalRequestBook}>
                                                        Reservar Livro
                                                    </Button>
                                                </div>

                                            ) : state.data.loan && userHasGreatAccess ? (
                                                <div style={{ marginBottom: 20 }}>
                                                    <Button onClick={openModalBookEdit} fontSize={"28px"} width="w-26" height="h-12">
                                                        Terminar Empréstimo
                                                    </Button>
                                                </div>
                                            ) : ''
                                        }

                                        {state.data.loan && (
                                            <>
                                                <div>
                                                    <p className="text-center font-light">Este livro está emprestado para </p>
                                                    <p className="text-center font-medium">{state.data.loan.person} </p>
                                                </div>

                                                <div>
                                                    <br></br>
                                                    <p>Término do empréstimo</p>
                                                    <p className="text-center font-medium">
                                                        {moment(state.data.loan.newLoanEnd || state.data.loan.loanEnd, "YYYY-MM-DD").format("DD-MM-YYYY")}
                                                        {new Date(state.data.loan.newLoanEnd || state.data.loan.loanEnd) < new Date() && <p className="text-lg text-red-600 "> Devolução em atraso </p>}
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        {checkIfUserCanExtendLoan(state.data.loan, email) && (
                                            <div style={{ marginTop: 30 }}>
                                                <Link to={`/livros/loan/${id}?extend=true`}>
                                                    <Button fontSize={"28px"} width="w-26" height="h-12">
                                                        Estender empréstimo
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div id="modal-right">
                                <div id="infos">
                                    <h1>{title.toUpperCase()}</h1>
                                    <h2>{subtitle.toUpperCase()}</h2>
                                    <h2>Autor : {author.toString()}</h2>
                                    <div id="votes">
                                    {state.data.votes.length > 0 && (
                                        <>
                                            <Rating name="half-rating-read" defaultValue={totalStars(state.data.votes)} precision={0.5} readOnly />
                                            <label style={{marginLeft: 15}}>Votos : {state.data.votes.length}</label>
                                        </>
                                    )}
                                    </div>
                                </div>
                                <div id="boxes">
                                    <div className="box"><h1>Número de empréstimos</h1><h1>{state.data.numberOfLoans}</h1></div>
                                    <div className="box"><h1>Editora</h1><h1>{publisher}</h1></div>
                                    <div className="box"><h1>Idioma</h1><GrLanguage /><h1>{language}</h1></div>
                                    <div className="box"><h1>Total de páginas</h1><RiPagesLine /><h1>{pages}</h1>
                                    </div>
                                </div>

                                <div id="comments">
                                <Button height="h-12" onClick={openModalBookComments}>
                                    {"Comentários"}
                                    {<AiOutlineArrowRight style={{ marginLeft: 10 }} />}
                                </Button>
                                </div>

                                
                                    <div id='description'>
                                        <ReadMoreMore text={description} 
                                            linesToShow={5}
                                            checkFor={500}
                                            readMoreText={"Leia mais"}
                                            readLessText={"Leia menos"}
                                            transDuration={2}
                                            btnStyles={{fontSize: 16, color: 'DodgerBlue'}}
                                            textStyles={{textAlign: 'justify'}}
                                        />
                                    </div>
                                </div>
                              
                        </div>
                        {toastData.msg && <Toast type={toastData.type} msg={toastData.msg} open={true} setToastData={setToastData} />}
                    </Container>
                )}
            </div>
        </>
    );
};

export default BookInfo;
