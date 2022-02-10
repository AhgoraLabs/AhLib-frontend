import React, { useState, useEffect, useReducer, useContext } from "react";
import { Chart } from "react-google-charts";
import { Button, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser, listBooks, getUsers } from "../api/apiService";
import moment from "moment";
import _ from "lodash";
import qrCode from "../images/qrCodeApp.png";
import { fontSize, height, width } from "@mui/system";
import sugestoes from "../images/sugestoes.png";
import usuarios from "../images/usuarios.png";
import emprestados from "../images/emprestados.png";
import atraso from "../images/atraso.png";
import avaliacao from "../images/avaliacao.png";
import AuthContext from "../context/auth/AuthContext";
import sugestionLenght from "../pages/Season";
import { BiLike, BiUser, BiCommentMinus, BiBookBookmark } from "react-icons/bi";
import { BsStopwatch } from "react-icons/bs";
const urlBase = !window.location.host.includes("netlify") ? "http://localhost:5000" : "https://sound-aileron-337523.rj.r.appspot.com";

function Home() {
    const sugestoes = sugestionLenght();
    console.log(sugestoes);

    const { user } = useContext(AuthContext);
    const usuario = user.name;

    const largura = window.screen.width;
    console.log(largura);
    const month1 = moment().format("MMM/YYYY");
    const month2 = moment().subtract(1, "months").format("MMM/YYYY");
    const month3 = moment().subtract(2, "months").format("MMM/YYYY");

    const [options, setOptions] = useState({});
    const [data, setData] = useState([
        ["Livros", "Quantidade"],
        ["Livros Livres", 0],
        ["Livros Alugados", 0],
    ]);
    const [booksLate, setLivrosAtrasados] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalBooks, setTotalbooks] = useState(0);
    const [totalLoans, setTotalLoans] = useState(0);
    const [loansGrouped, setloansGrouped] = useState({});
    const [chartHeight, setChartHeight] = useState(0);
    const [chartWidth, setChartWidth] = useState(0);
    const [loans2, setTotalLoans2] = useState(0);
    console.log(loans2.length);
    console.log("totalLoans", totalLoans);
    console.log("totalBooks", totalBooks);
    console.log("livrosAtrasados", booksLate);

    const [option2, setOption2] = useState([
        [
            "Elemento",
            "Quantidade",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "number",
                calc: "stringfy",
                bars: "horizontal",
            },
        ],
        [month3, 0, "blue", null],
        [month2, 0, "green", null],
        [month1, 0, "gold", null],
    ]);

    async function loans() {
        const response = await fetch(`${urlBase}/loan`);
        const { data } = await response.json();
        const group = data.map(loan => ({ date: moment(loan.createdAt, "YYYY-MM-DD").format("MMM/YYYY") }));
        // const loansGroupedBy = _.groupBy(group, 'date')
        const teste = Object.entries(_.groupBy(group, "date")).reduce((acc, [key, value]) => {
            acc[key] = value.length;
            return acc;
        }, {});
        console.log("teste", teste);

        var b = option2.map(([a, b, c, d]) => {
            if (teste[a]) b = teste[a];
            return [a, b, c, d];
        });
        setOption2(b);

        const booksHasntReturned = data.filter(({ bookHasReturned }) => !bookHasReturned);
        const booksLate = booksHasntReturned.filter(book => {
            const now = new Date();
            const loanEnd = new Date(book.newloanEnd || book.loanEnd);
            return loanEnd < now;
        });
        setLivrosAtrasados(booksLate.length);
        setTotalLoans(booksHasntReturned.length);
        setTotalLoans2(data);
    }

    async function books() {
        const {
            data: { count },
        } = await listBooks(8, 0);
        setTotalbooks(count);
    }
    useEffect(async () => {
        const allUsers = await getUsers();
        setUsers(allUsers);
        console.log(users);
        var b = data.map(([a, b]) => {
            if (a == "Livros Livres") b = totalBooks - totalLoans;
            if (a == "Livros Alugados") b = totalLoans;
            return [a, b];
        });
        setOptions({ title: `Total de Livros ${totalBooks}` });
        setData(b);
        books();
        loans();
    }, [totalBooks, totalLoans]);

    const options2 = {
        title: "Emprestimos por Periodo",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };

    return (
        <div className="justify-start mt-8 flex-row justify-center flex">
            <div className="justify-start items-start flex-col flex">
                <div className="items-start text-bemvindo text-4xl mb-10 flex-col flex ">
                    <h1>Olá, {usuario} !</h1>
                    <h2 className="mt-2 text-lg font-sans">Bem vindo ao Ahlib!</h2>
                </div>

                <div className="flex-row justify-center flex ">
                    <div
                        className=" justify-evenly mr-10 flex shadow-md"
                        style={{ width: 440, height: 260, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 10 }}
                    >
                        <Chart bg-current width={"440px"} height={"220px"} chartType="PieChart" graphID="ScatterChart1" loader={<div>Carregando Painel</div>} data={data} options={options} />
                    </div>
                    <div className="shadow-sm" style={{ width: 440, height: 260, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 10 }}>
                        <Chart bg-current chartType="BarChart" width={"440px"} height={"220px"} graphID="ScatterChart" fontSize={"100"} data={option2} options={options2} />
                    </div>
                </div>
                <div className="shadow-sm mt-4" style={{ width: 920, height: 180, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 10 }}>
                    <img
                        style={{ width: 500, height: 120 }}
                        src="data:image/png;base64,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"
                    ></img>
                </div>
            </div>

            <div className="ml-10 bg-white w-72 flex-col flex rounded-xl shadow-md p-4" style={{ height: 600 }}>
                <div className=" flex-col items-center flex">
                    <h2 className="text-xl flex mb-4 mt-4 ">
                        <b>Indicadores Gerais</b>
                    </h2>
                </div>

                <h3 className="ml-4 mt-4 flex flex-row items-center">
                    <BiUser size={20} style={{ marginRight: 5 }} />
                    Usuários cadastrados: {users.length ? users.length : 0}
                </h3>
                <h3 className="ml-4 mt-4 flex flex-row items-center">
                    <BiCommentMinus size={20} color="#494949" style={{ marginRight: 5 }} />
                    Recomendações: 2
                </h3>

                <h3 className="ml-4 mt-4 flex flex-row items-center">
                    <BiBookBookmark size={20} color="#494949" style={{ marginRight: 5 }} />
                    Emprestimos Totais: {loans2.length}
                </h3>

                <h3 className="ml-4 mt-4 flex flex-row items-center">
                    <BsStopwatch size={20} color="#494949" style={{ marginRight: 5 }} />
                    Livros em atraso: {booksLate}
                </h3>

                <h3 className="ml-4 mt-4 flex flex-row items-center">
                    <BiLike size={20} color="#494949" style={{ marginRight: 5 }} />
                    Livros avaliados: 0
                </h3>

                <div className="flex-col items-center flex">
                    <h1 className="mt-10 h-10 text-lg">Acesse pelo App</h1>
                    <img alt="qrCode" src={qrCode} width={"170"} height={"170"} />
                </div>
            </div>
        </div>
    );
}

export default Home;
