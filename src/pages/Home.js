import React, { useState, useEffect, useReducer } from 'react';
import { Chart } from "react-google-charts";
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser, listBooks } from '../api/apiService';
import moment from 'moment';
import _ from 'lodash';

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
          backgroundColor: '#E4E4E4'

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
    setOptions({ title: `Total de Livros ${totalBooks}`,
    backgroundColor: '#E4E4E4',
  })
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
    backgroundColor: '#E4E4E4',
  };



  return (

      <div className='h-12'>
    <div>
      <header className='ml-20'>
        <h2 class='my-4 text-purple-600 text-2xl '> Painel - AhLib </h2>
      </header>
  </div>

      <div className='justify-center' style={{ display: "flex", position: '' }}>
        <div className='justify-center' style={{ display: "flex", position: '' }}>
      <div className='mr-10'>
        <Chart
          bg-current
          fontSize={'100'}
          width={'500px'}
          height={'300px'}
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
          height="300px"
          data={option2}
          options={options2}
          />
          </div>
          
          </div>
      </div>

</div>
   
  );
}


export default Home






