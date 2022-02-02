import React, { useState, useEffect, useReducer } from 'react';
import { Chart } from "react-google-charts";
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser, listBooks } from '../api/apiService';
import moment from 'moment';
import _ from 'lodash';

    function ano(){
        const startdate = moment().format('MMM-YYYY')
        const startdate1 = moment().subtract(1, 'months').format('MMM-YYYY');
        const startdate2 = moment().subtract(2, 'months').format('MMM-YYYY');
        return [ startdate, startdate1, startdate2 ]
    }
    
function Home() {

  const [options, setOptions] = useState({})
  const [data, setData] = useState([
    ['Livros', 'Quantidade'],
    ['Livros Livres', 0],
    ['Livros Alugados', 0]
  ]);

    const [totalBooks, setTotalbooks] = useState(0);
    const [totalLoans, setTotalLoans] = useState(0);
    const [loansGrouped, setloansGrouped] = useState({});
    console.log(totalLoans);

    async function loans(){
      const response = await fetch('http://localhost:5000/loan');
      const {data} = await response.json();
      const group = data.map(loan => ({date:moment(loan.createdAt, 'YYYY-MM-DD').format('MMYY')}));
      const loansGroupedBy = _.groupBy(group, 'date')
      console.log('loansGroupedBy', loansGroupedBy)
      console.log('group', group);
      const booksHasntReturned = data.filter(({bookHasReturned})=> !bookHasReturned);
      setTotalLoans(booksHasntReturned.length)
  
      console.log(data)
    }

    async function books(){
      const {data:{count}} = await listBooks(8,0);
      setTotalbooks(count);
    }
    useEffect(()=>{
      var b = data.map(([a, b])=> {
        if(a == 'Livros Livres') b = totalBooks-totalLoans;
        if(a == 'Livros Alugados') b = totalLoans;
        return [a, b]
    })
    setOptions({title: `Total de Livros ${totalBooks}`})
    setData(b)
      books()
      loans()
    }, [totalBooks, totalLoans]);

    

    
    const startdate = ano();
    const month1 = startdate[0].replace('-', '/');
    const month2 = startdate[1].replace('-', '/');
    const month3 = startdate[2].replace('-', '/');
    


  

    const data2 = [
        [
          "Element",
          "Density",
          { role: "style" },
          {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
          },
        ],
        [month3, 8, "blue", null],
        [month2, 10, "green", null],
        [month1, 19, "gold", null],
      ];
      
      const options2 = {
        title: "Emprestimos por Periodo",
        width: 600,
        height: 250,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };



    return (
        <div className='container mx-auto'>
            <header className='ml-20 h-12'> 
                <h2 class='my-4 text-purple-600 text-2xl '> Painel - AhLib </h2>
            </header>
          <div className='flex justify-end' style={{display: "flex", position: 'absolute'}}>
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

     
            <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={data2}
                options={options2}
          />
          </div>

          
      </div>
    );
  }

      
export default Home




  
  
