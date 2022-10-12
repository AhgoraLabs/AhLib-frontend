/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { totalStars } from "../utils/totalStar";
import Rating from "@mui/material/Rating";
import { Button as ButtonMui } from "@mui/material";
import { GrLanguage } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { AiOutlineArrowRight } from "react-icons/ai";
import BoxInfoBook from "../components/BoxInfoBook";
import Button from "../components/Button";
import moment from "moment";
import { getBookById, removeBook, getLoanByBookId, getAllLoansByBookId, getCommentsById, endLoan } from "../api/apiService";
import { createRequestBooking, checkIfBookIsBookedById } from "../api/RequestService/index";
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
        user: { email, profile, id: userId, name: userName },
    } = useContext(AuthContext);

    const [book, setBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openModalLoan, setOpenModalLoan] = useState(false);
    const [openModalComments, setOpenModalComments] = useState(false);
    const [openModalRequest, setOpenModalRequest] = useState(false);
    const [comments, setComments] = useState([]);
    const [toastData, setToastData] = useState({});
    const [votes, setVotes] = useState([]);
    const [numberOfLoans, setNumberOfLoans] = useState(0);
    const [loan, setLoan] = useState({});
    const [isBooked, setIsBooked] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const userHasGreatAccess = isAdminOrSuper(profile);


    const { id } = useParams();

    const openModalBookDeletion = () => {
        setOpenModal(!openModal);
    };

    const openModalBookEdit = () => {
        setOpenModalLoan(!openModalLoan);
    };
    const getTotalRating = async () => {
        const response = await getCommentsById(id);
        setComments(response);
        const data = response.map(({ stars }) => stars);
        setVotes(data);
    };

    const openModalRequestBook = () => {
        setOpenModalRequest(!openModalComments);
    }
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

    const fetchBooking = useCallback(
        async function () {
            const response = await checkIfBookIsBookedById(id);

            setIsBooked(!!response.data);
        }
    )

    const fetchBook = useCallback(
        async function () {
            let bookInformation = await getBookById(id);
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

    const handleRequestBooking = async () => {
        const response = await createRequestBooking({ bookId: id, userId, userEmail: email, bookName: book.title, userName });

        if (response.status === 201) {
            redirectWithMsg("/livros", "success", "Sua reserva foi realizada com sucesso");
        }
    }

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
        fetchBooking();
        handleLoansByBookId();
    }, []);

    useEffect(async () => {
        fetchBook();
        const data = showFlashDataMsg();
        setToastData(data);
    }, []);

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    const { image = "", title = "", subtitle = "", alugado = false, author = [], description = [], publicado = new Date().toLocaleDateString("pt-BR", options), publisher = "", language = "", pages = 0 } = book;

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
            <ModalComments open={openModalComments} currentComments={comments} setOpen={setOpenModalComments} bookId={id} />
            <div className="flex h-screen justify-center items-center">
                {isLoading ? (
                    <CircularProgress size={200} />
                ) : (
                    <section className="flex w-bookInfo bg-white rounded-3xl p-6">
                        <div className="w-96 h-full ">
                            {image ? (
                                <div className="flex justify-center mb-14">
                                    <Link to={`newlivros/info/${id}`}>
                                        <div
                                            style={{ backgroundImage: `url(${!!image ? image : "https://www.biotecdermo.com.br/wp-content/uploads/2016/10/sem-imagem-10.jpg"})` }}
                                            className="flex justify-center h-48 w-44 mt-4 bg-no-repeat bg-contain bg-center "
                                        ></div>
                                    </Link>
                                </div>
                            ) : (
                                <div style={{ marginBottom: 20, display: "flex", justifyContent: "center" }}>
                                    <Link to={`newlivros/info/${id}`}>
                                        <NoImage title={title} />
                                    </Link>
                                </div>
                            )}


                        </div>
                        <div className="ml-4 w-full flex justify-start flex-col ">
                            <div className="w-bookTitle break-all h-16 mt-14 flex items-center justify-start font-sans mx-10">
                                <h1 className="text-3xl">{title.toUpperCase()}</h1>
                            </div>

                            <div className="h-7 mx-10">
                                <h2 className="text-xl">{subtitle.toUpperCase()}</h2>
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
                            <div className={`mx-10 overflow-hidden flex flex-col ${isOpen ? "h-full" : "h-24"}`}>
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
                            <div className="mx-10 mt-4 ">
                                <Button height="h-12" onClick={openModalBookComments}>
                                    {"Comentários"}
                                    {<AiOutlineArrowRight style={{ marginLeft: 10 }} />}
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
