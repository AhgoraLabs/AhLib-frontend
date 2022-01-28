import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import { Button, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createUser } from '../api/apiService';


const moment = require('moment');

    function ano(){
        const startdate = moment().format('MMM-YYYY')
        const startdate1 = moment().subtract(1, 'months').format('MMM-YYYY');
        const startdate2 = moment().subtract(2, 'months').format('MMM-YYYY');
        return [ startdate, startdate1, startdate2 ]
    }

function Home() {


    const startdate = ano();
    const mouth1 = startdate[0].replace('-', '/');
    const mouth2 = startdate[1].replace('-', '/');
    const mouth3 = startdate[2].replace('-', '/');
    const valueFake = 100

    const [options, setOptions] = useState({
      title:`Total de livros: ${valueFake}`
    });
    const [data, setData] = useState([
      ['Livros', 'Quantidade'],
      ['Livros Livres', 70],
      ['Livros Alugados', 30]
    ]);


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
        [mouth3, 8.94, "blue", null],
        [mouth2, 10.49, "green", null],
        [mouth1, 19.3, "gold", null],
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
          <div className=' flex justify-end' style={{display: "flex", position: 'absolute'}}>

            <Chart
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
            <div className=''>
                <Button variant='contained' type='submit'>Livros</Button>

    </div>
          </div>


      </div>
    );
  }


export default Home






