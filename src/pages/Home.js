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
        const response = await fetch("http://localhost:5000/loan");
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
                    <div className=" justify-evenly mr-10 flex shadow-md" style={{ width: 440, height: 220 }}>
                        <Chart bg-current width={"440px"} height={"220px"} chartType="PieChart" graphID="ScatterChart1" loader={<div>Carregando Painel</div>} data={data} options={options} />
                    </div>
                    <div className="shadow-sm" style={{ width: 440, height: 220 }}>
                        <Chart bg-current chartType="BarChart" width={"440px"} height={"220px"} graphID="ScatterChart" fontSize={"100"} data={option2} options={options2} />
                    </div>
                </div>
            </div>

            <div className="ml-10 bg-white w-72 flex-col flex rounded-xl shadow-md p-4" style={{ height: 600 }}>
                <div className=" flex-col items-center flex">
                    <h2 className="text-xl flex mb-4 mt-4 ">Indicadores Gerais</h2>
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
