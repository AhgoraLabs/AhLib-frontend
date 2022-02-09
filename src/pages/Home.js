import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Chart } from "react-google-charts";
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser, listBooks } from '../api/apiService';
import moment from 'moment';
import _ from 'lodash';
import qrCode from '../images/qrCodeApp.png';
import { fontSize, height, width } from '@mui/system';
import sugestoes from '../images/sugestoes.png';
import usuarios from '../images/usuarios.png';
import emprestados from '../images/emprestados.png';
import atraso from '../images/atraso.png';
import avaliacao from '../images/avaliacao.png';
import AuthContext from '../context/auth/AuthContext';


function Home() {


    const { user } = useContext(AuthContext);
    const usuario = user.name

    const largura = window.screen.width;
    console.log(largura)
    const month1 = moment().format('MMM/YYYY')
    const month2 = moment().subtract(1, 'months').format('MMM/YYYY');
    const month3 = moment().subtract(2, 'months').format('MMM/YYYY');

    const [options, setOptions] = useState({})
    const [data, setData] = useState([
        ['Livros', 'Quantidade'],
        ['Livros Livres', 0],
        ['Livros Alugados', 0]
    ]);

  const [totalBooks, setTotalbooks] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [loansGrouped, setloansGrouped] = useState({});
  const [chartHeight, setChartHeight] = useState(0);
  const [chartWidth, setChartWidth] = useState(0);

  const [option2, setOption2] = useState(
    [
      [
        "Elemento",
        "Quantidade",
        { role: "style" },
        {
          sourceColumn: 0,
          role: "annotation",
          type: "number",
          calc: 'stringfy',
          bars: 'horizontal',

        },
      ],
      [month3, 0, "blue", null],
      [month2, 0, "green", null],
      [month1, 0, "gold", null],
    ]
  )


  async function loans() {
    const response = await fetch('http://localhost:5000/loan');
    const { data } = await response.json();
    const group = data.map(loan => ({ date: moment(loan.createdAt, 'YYYY-MM-DD').format('MMM/YYYY') }));
    // const loansGroupedBy = _.groupBy(group, 'date')
    const teste = Object.entries(_.groupBy(group, 'date')).reduce((acc, [key, value]) => {
      acc[key] = value.length;
      return acc;

    }, {})
    console.log('teste', teste)

    var b = option2.map(([a,b,c,d]) => {

      if(teste[a]) b = teste[a];
      return [a, b, c,  d]
})
  setOption2(b)
    const booksHasntReturned = data.filter(({ bookHasReturned }) => !bookHasReturned);
    setTotalLoans(booksHasntReturned.length)

  }

  async function books() {
    const { data: { count } } = await listBooks(8, 0);
    setTotalbooks(count);
  }
  useEffect(() => {

    var b = data.map(([a, b]) => {
      if (a == 'Livros Livres') b = totalBooks - totalLoans;
      if (a == 'Livros Alugados') b = totalLoans;
      return [a, b]
    })
    setOptions({ title: `Total de Livros ${totalBooks}`})
    setData(b)
    books()
    loans()
  }, [totalBooks, totalLoans]);



  const options2 = {
    title: "Emprestimos por Periodo",
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  return (

   
    <div className='justify-start mt-8 flex-row justify-center flex'>
      <div className='justify-start items-start flex-col flex'>

        <div className='items-start text-bemvindo text-4xl mb-10 flex-col flex ' style={{fontFamily: 'Comic Sans MS, Comic Sans, cursive'}}>
          <h1>Olá, <b>{usuario}</b> !</h1>
          <h2 className='text-lg'>Seja bem vindo ao Ahlib</h2>
        </div>
   

        <div className='flex-row justify-center flex '>
            <div className='justify-evenly mr-10 flex' style={{ width: 440, height: 220 }}>
              <Chart
              bg-current
              width={'440px'}
              height={'220px'}
              chartType="PieChart"
              graphID="ScatterChart1"
              loader={<div>Carregando Painel</div>}
              data={data}
              options={options}
              />
            </div>
            <div className='shadow-sm' style={{ width: 440, height: 220 }}>
              <Chart
              bg-current
              chartType="BarChart"
              width={'440px'}
              height={'220px'}
              graphID="ScatterChart"
              fontSize={'100'}
              data={option2}
              options={options2}
            />
            </div>
        </div>
      </div>

    <div className='ml-10 bg-white w-72 flex-col flex ' style={{ height: 600 }}>
                <div className=' flex-col items-center flex'>
                    <h2 className='text-xl flex mb-4 mt-4 '>Indicadores Gerais</h2>
                </div>
                
                <h3 className='ml-4 mt-4 flex flex-row items-center'>
                    <img className='mr-2' alt='usuarios' src={usuarios} width={'20'} height={'20'}/>
                    Usuários cadastrados:
                </h3>
                <h3 className='ml-4 mt-4 flex flex-row items-center'>
                    <img className='mr-2' alt='sugestoes' src={sugestoes} width={'20'} height={'20'}/>
                     Recomendações na semana:
                </h3>

                <h3 className='ml-4 mt-4 flex flex-row items-center'>
                    <img className='mr-2' alt='emprestados' src={emprestados} width={'23'} height={'23'}/>
                     Emprestimos Totais:
                </h3>
                
                <h3 className='ml-4 mt-4 flex flex-row items-center'>
                    <img className='mr-2' alt='atraso' src={atraso} width={'20'} height={'20'}/>
                     Livros em atraso:
                </h3>

                <h3 className='ml-4 mt-4 flex flex-row items-center'>
                    <img className='mr-2' alt='avaliacao' src={avaliacao} width={'20'} height={'20'}/>
                     Livros avaliados:
                </h3>
            
                <div className='flex-col items-center flex'>
                    <h1 className='mt-10 h-10 text-lg'>Acesse pelo App</h1>
                    <img alt='qrCode' src={qrCode} width={'170'} height={'170'}/>
                </div>
        </div>
</div>
  );
}


export default Home






