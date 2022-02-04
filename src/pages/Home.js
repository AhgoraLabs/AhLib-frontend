import React, { useState, useEffect, useReducer } from 'react';
import { Chart } from "react-google-charts";
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser, listBooks } from '../api/apiService';
import moment from 'moment';
import _ from 'lodash';
import qrCode from '../images/qrCodeApp.png';
import { height } from '@mui/system';

const getChartSize = (windowSize) => ({
   [windowSize < 1000]: [10, 5], 
   [windowSize > 1000 && windowSize < 1700]: [800, 500] 
}).true || [1500, 1000]

function Home() {
  const month1 = moment().format('MMM/YYYY')
  const month2 = moment().subtract(1, 'months').format('MMM/YYYY');
  const month3 = moment().subtract(2, 'months').format('MMM/YYYY');


  // const month1 = startdate[0].replace('-', '/');
  // const month2 = startdate[1].replace('-', '/');
  // const month3 = startdate[2].replace('-', '/');
  // const valueFake = 100

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
  const [windowSize, setwindowSize] = useState(0);




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
    window.addEventListener('resize', ()=>{
        const {innerWidth} = window;
        setwindowSize(innerWidth)
        const [width, height] = getChartSize(innerWidth)
        setChartWidth(width)
        setChartHeight(height)
        console.log('teste')
    }) 
     
    var b = data.map(([a, b]) => {
      if (a == 'Livros Livres') b = totalBooks - totalLoans;
      if (a == 'Livros Alugados') b = totalLoans;
      return [a, b]
    })
    setOptions({ title: `Total de Livros ${totalBooks}`})
    const {innerWidth} = window;
    setwindowSize(innerWidth)
    const [width, height] = getChartSize(innerWidth)
    setChartWidth(width)
    setChartHeight(height)
    setData(b)
    books()
    loans()
  }, [totalBooks, totalLoans]);

  

  const options2 = {
    title: "Emprestimos por Periodo",
    width: 600,
    height: 250,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };



  return (

      <div className='h-12'>
        <div>
      <header className='ml-20'>
        <h2 class='my-4 text-purple-600 text-2xl '> Painel - AhLib </h2>
      </header>
  </div>

      <div className='justify-center flex'>
        <div className='justify-center flex'>
      <div className='mr-10'>
        <Chart
          bg-current
          fontSize={'100'}
          width={chartWidth}
          height={chartHeight}
          chartType="PieChart"
          graphID="ScatterChart"
          loader={<div>Carregando Painel</div>}
          data={data}
          options={options}
          />
          </div>
          <div>
        <Chart
          chartType="BarChart"
          width="100%"
          height="100%"
          data={option2}
          options={options2}
        />
          </div>
          
          </div>
      </div>
    <div className='justify-center flex flex-nowrap' >
      <div className='justify-center text-center text-lg'>
      <h1 className='h-10'>Acesse pelo App</h1> 
      <img alt='qrCode' src={qrCode} width={'250px'}/>
      </div>
    </div>
</div>
   
  );
}


export default Home






