import React, { useEffect, useState, useContext } from "react";
import { Container } from './style'
import Button from '../../components/Button'
import { fetchRequest } from '../../api/apiService'
import AuthContext from "../../context/auth/AuthContext";
import moment from 'moment'
import {getApprovedRequests} from '../../api/RequestService/index';

import { SnackbarProvider, useSnackbar } from 'notistack'

import { AiOutlineBook } from "react-icons/ai";
import { BsPerson, BsCalendarDate } from "react-icons/bs";

const Requests = ({ }) => {

    const [dataRequests, setDataRequests] = useState([])
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [type, setType]= useState('Pendentes')

    const { user: { id: userId } } = useContext(AuthContext);

    const approveRequests = async ({ id, type = 'approve' }) => {
        const response = await fetchRequest({
            url: `/request/${type}`, method: 'PUT', data: {
                id, userId
            }
        })
        mountPendingList();

        enqueueSnackbar(`Solicitação ${type === 'approve' ? ' aprovada ' : ' recusada'} com sucesso.`, { variant: `success` })
    }

    const mountPendingList = async () => {
        const data = await fetchRequest({ url: '/request/pending', method: 'GET' })
        setDataRequests(data)
    }

    const mountApprovedList = async () => {
        const data = (await getApprovedRequests()).data;
        setDataRequests(data)
        setType('Aprovados')
    }
    
    useEffect(async () => {
        mountPendingList();
    }, []);

    return (
        <Container>
            <div id='menu'>
                <Button  onClick={mountApprovedList} height='h-8' fontSize='text-l' styleCustom='m-4'><h1>Aprovadas</h1></Button>
                <Button height='h-8' fontSize='text-l' styleCustom='m-4'><h1>Recusadas</h1></Button>
            </div>
            <div className="flex justify-center">
				<h1 className="text-2xl">{dataRequests.length ? `Exibindo ${type}` : 'Não há solicitações deste tipo para exibir'}</h1>
			 </div> 
               
           
            <div id='table'>
                {
                    dataRequests &&
                    dataRequests.map((elem, index) =>
                    (
                        <div className='card' key={index}>
                            <div className='card-left'>
                                <span className='person-name'>
                                    <BsPerson size={18} />
                                    Nome: {elem.userName || elem.userId}
                                </span>
                                <span className='book-name'>
                                    <AiOutlineBook size={18} />
                                    Livro: {elem.bookName || elem.bookId}
                                </span>
                                <span className='date'>
                                    <BsCalendarDate size={18} style={{ marginRight: 3 }} />
                                    Solicitado Dia: {moment(elem.createdAt).format("DD/MM/YYYY")}
                                </span>
                            </div>
                            <div className='card-right'>
                                <div className='div-buttons'>
                                    <Button onClick={() => approveRequests({ id: elem._id, type: 'approve' })} background='bg-green-700' height='h-6' width='w-18' fontSize='text-sm' styleCustom='m-4'><h1>Aprovar</h1></Button>
                                    <Button onClick={() => approveRequests({ id: elem._id, type: 'decline' })} background='bg-red-700' height='h-6' width='w-18' fontSize='text-sm' styleCustom='m-4'><h1>Recusar</h1></Button>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>


        </Container>
    );
};

export default Requests