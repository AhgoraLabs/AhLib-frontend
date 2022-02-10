/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { totalStars } from "../utils/totalStar";
import Rating from "@mui/material/Rating";
import { Button as ButtonMui } from "@mui/material";
import { BsCalendarDate } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import BoxInfoBook from "../components/BoxInfoBook";
import Button from "../components/Button";
import moment from "moment";
import { getBookById, removeBook, getLoanByBookId, getAllLoansByBookId, getCommentsById, endLoan } from "../api/apiService";
import { isAdminOrSuper } from "../utils/validationProfile";
import Modal from "../components/Modal";
import ModalComments from "../components/ModalComments";
import Toast from "../components/Toasts";
import AuthContext from "../context/auth/AuthContext";
import { redirectWithMsg, showFlashDataMsg, checkIfUserCanExtendLoan } from "../utils/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import NoImage from "../components/NoImageBook";

const BookInfo = () => {
    const [isOpen, setIsOpen] = useState(!true);
    const {
        user: { email },
    } = useContext(AuthContext);
    const [book, setBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openModalLoan, setOpenModalLoan] = useState(false);
    const [openModalComments, setOpenModalComments] = useState(false);
    const [toastData, setToastData] = useState({});
    const [votes, setVotes] = useState([]);
    const [numberOfLoans, setNumberOfLoans] = useState(0);
    console.log(numberOfLoans, "numberOfLoans");
    const [loan, setLoan] = useState({});
    const [profile, setProfile] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const { id } = useParams();

    const openModalBookDeletion = () => {
        setOpenModal(!openModal);
    };

    const openModalBookEdit = () => {
        setOpenModalLoan(!openModalLoan);
    };
    const getTotalRating = async () => {
        const response = await getCommentsById(id);
        const data = response.map(({ stars }) => stars);
        setVotes(data);
    };
    const openModalBookComments = () => {
        setOpenModalComments(!openModalComments);
    };

    const fetchLoan = useCallback(
        async function () {
            let loanInformation = await getLoanByBookId(id);
            setLoan(loanInformation);
        },
        [id]
    );

    const fetchBook = useCallback(
        async function () {
            let bookInformation = await getBookById(id);
            console.log("bookInformation", bookInformation);
            setBook(bookInformation);
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

    const handleLoansByBookId = async () => {
        const numberOfLoansFound = await getAllLoansByBookId(id);
        setNumberOfLoans(numberOfLoansFound);
    };

    const handleLoanEnding = async () => {
        const response = await endLoan(loan._id);

        if (response.status === 200) redirectWithMsg("/livros", "success", "O empréstimo foi encerrado com sucesso");
    };

    useEffect(() => {
        fetchLoan();
        getTotalRating();
        handleLoansByBookId();
    }, [fetchLoan]);

    useEffect(async () => {
        fetchBook();
        const data = showFlashDataMsg();
        const userProfile = await isAdminOrSuper();
        setProfile(userProfile);
        setToastData(data);
    }, [fetchBook]);

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    const { image = "", title = "", alugado = false, author = [], description = [], publicado = new Date().toLocaleDateString("pt-BR", options), publisher = "", language = "", pages = 0 } = book;

    return (
        <>
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                action={handleBookRemoval}
                title={"Exclusão de livro"}
                text={"Tem certeza que deseja excluir o registro? Essa ação não poderá ser desfeita"}
            />
            <Modal
                open={openModalLoan}
                setOpen={setOpenModalLoan}
                action={handleLoanEnding}
                title={"Terminar empréstimo"}
                text={"Tem certeza que deseja executar essa ação? Essa ação não poderá ser desfeita"}
            />
            <ModalComments open={openModalComments} setOpen={setOpenModalComments} bookId={id} />
            <div className="flex h-screen justify-center items-center">
                {isLoading ? (
                    <CircularProgress size={200} />
                ) : (
                    <section className="flex w-bookInfo bg-white rounded-3xl p-6">
                        <div className="w-96 h-full ">
                            <div style={{ marginLeft: 55, marginBottom: 20 }}>
                                <NoImage title={title} />
                            </div>
                            <div className="flex justify-around">
                                {alugado && (
                                    <Button width="w-18" height="h-8" fontSize="text-base">
                                        Alugar
                                    </Button>
                                )}
                                <div className="flex items-center flex-col">
                                    {isAdminOrSuper() && (
                                        <div className="flex justify-between w-48 mb-4">
                                            <Link to={`/livros/edit/${id}`}>
                                                <Button width="w-18" height="h-8" fontSize="text-base">
                                                    Editar
                                                </Button>
                                            </Link>
                                            <Button onClick={openModalBookDeletion} width="w-18" height="h-8" fontSize="text-base">
                                                Excluir
                                            </Button>
                                        </div>
                                    )}
                                    {!loan && profile ? (
                                        <div>
                                            <Link to={`/livros/loan/${id}`}>
                                                <Button width="w-26" height="h-12">
                                                    Empréstimo
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : loan && profile ? (
                                        <div>
                                            <Button onClick={openModalBookEdit} fontSize={"28px"} width="w-26" height="h-12">
                                                Terminar Empréstimo
                                            </Button>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {loan && (
                                        <>
                                            <div>
                                                <p className="text-center font-light">Este livro está emprestado para </p>
                                                <p className="text-center font-medium">{loan.person} </p>
                                            </div>

                                            <div>
                                                <br></br>
                                                <p>Término do empréstimo</p>
                                                <p className="text-center font-medium">
                                                    {moment(loan.newLoanEnd || loan.loanEnd, "YYYY-MM-DD").format("DD-MM-YYYY")}
                                                    {new Date(loan.newLoanEnd || loan.loanEnd) < new Date() && <p className="text-lg text-red-600 "> Devolução em atraso </p>}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    {checkIfUserCanExtendLoan(loan, email) && (
                                        <div>
                                            <Link to={`/livros/loan/${id}?extend=true`}>
                                                <Button fontSize={"28px"} width="w-26" height="h-12">
                                                    Extender empréstimo
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 w-full flex justify-start flex-col ">
                            <div className="w-bookTitle break-all h-16 mt-14 flex items-center justify-start font-sans mx-10">
                                <h1 className="text-3xl">{title.toUpperCase()}</h1>
                            </div>
                            <div className="h-7 mx-10 mt-8">
                                <h2>Autor : {author.toString()}</h2>
                            </div>
                            <div className="h-8 w-48 mt-4 mx-10 flex items-center justify-between">
                                {votes.length > 0 && (
                                    <>
                                        <Rating name="half-rating-read" defaultValue={totalStars(votes)} precision={0.5} readOnly />
                                        <label>Votos : {votes.length}</label>
                                    </>
                                )}
                            </div>
                            <div className={`mx-10 overflow-hidden flex flex-col ${isOpen ? "" : "h-24"}`}>
                                <h3 className="font-sans ">Descrição</h3>
                                {description}
                            </div>
                            <ButtonMui onClick={() => setIsOpen(!isOpen)}>Ler {isOpen ? "menos" : "mais"}</ButtonMui>
                            <div className="h-1/4 flex items-center justify-around">
                                <BoxInfoBook title={"Número de empréstimos"} value={numberOfLoans} />
                                <BoxInfoBook title={"Editora"} value={publisher} />
                                <BoxInfoBook title={"Idioma"} icon={<GrLanguage />} value={language} />
                                <BoxInfoBook title={"Total de páginas"} icon={<RiPagesLine />} value={pages} />
                            </div>
                            <div className="mx-10">
                                <Button height="h-12" onClick={openModalBookComments}>
                                    {"Comentários"}
                                    {<AiOutlineArrowRight />}
                                </Button>
                            </div>
                        </div>

                        {toastData.msg && <Toast type={toastData.type} msg={toastData.msg} open={true} setToastData={setToastData} />}
                    </section>
                )}
            </div>
        </>
    );
};

export default BookInfo;
